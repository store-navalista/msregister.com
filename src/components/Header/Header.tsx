import Content from "@/content/en.json" assert { type: "json" };
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useAnimateOnView } from "../hooks/useAnimateOnView";
import { useMatchQuery } from "../hooks/useMatchQuery";
import { useScrollStep } from "../hooks/useScrollStep";
import { UI } from "../UI";
import { BurgerMenu } from "./components/BurgerMenu/BurgerMenu";
import { ColorThemeToggle, ThemeType } from "./components/ColorThemeToggle/ColorThemeToggle";
import { Logo } from "./components/Logo/Logo";
import { Navigation } from "./components/Navigation/Navigation";
import css from "./Header.module.css";

export const Header = () => {
    const [theme, setTheme] = useState<ThemeType>("light");
    const isMatchMedia = useMatchQuery(1000);
    const cnt = 60;
    const isScrolled = useScrollStep() > cnt;
    const { ref, animation } = useAnimateOnView("none", 0, 0, 0.2);

    return (
        <div>
            {!isMatchMedia && (
                <header className={css.header} style={{ opacity: isScrolled ? 0 : 1 }}>
                    <Logo isScrolled={isMatchMedia} theme={theme} />
                    <Navigation />
                    <div className={css.right_block}>
                        <ColorThemeToggle {...{ theme, setTheme }} />
                        <UI.Button variant="simple_link" href="#footer" colorScheme="tertiary">
                            {Content.GlobalTitles.contact_us}
                        </UI.Button>
                    </div>
                </header>
            )}
            {(isScrolled || isMatchMedia) && (
                <motion.div ref={ref} className={css.header_wrapper} {...animation}>
                    <header className={css.scrolled_header}>
                        <Logo isScrolled={isScrolled || isMatchMedia} theme={theme} />
                        {isMatchMedia ? (
                            <div className={css.right_block}>
                                <ColorThemeToggle {...{ theme, setTheme }} />
                                <BurgerMenu />
                            </div>
                        ) : (
                            <>
                                <Navigation />
                                <div className={css.right_block}>
                                    <ColorThemeToggle {...{ theme, setTheme }} />
                                    <a href="#footer" className={css.scrolled_btn}>
                                        <Image src="/images/svg/contact-us.svg" alt="contact us" width={24} height={24} />
                                    </a>
                                </div>
                            </>
                        )}
                    </header>
                </motion.div>
            )}
        </div>
    );
};
