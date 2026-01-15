import { SmartLink } from "@/components/Pages/SmartLink/SmartLink";
import Content from "@/content/en.json" assert { type: "json" };
import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";
import { ThemeType } from "../ColorThemeToggle/ColorThemeToggle";
import css from "./Logo.module.css";

export const Logo: FC<{ isScrolled?: boolean; theme: ThemeType }> = ({ isScrolled, theme }) => {
    return (
        <SmartLink href="/" className={clsx(css.wrapper, isScrolled && css.scrolled)}>
            <div className={css.logo}>
                <Image src={`/images/svg/${theme === "light" ? "logo" : "logo-dark"}.svg`} fill alt="logo" />
            </div>
            {!isScrolled && <p>{Content.GlobalMeta.site}</p>}
        </SmartLink>
    );
};
