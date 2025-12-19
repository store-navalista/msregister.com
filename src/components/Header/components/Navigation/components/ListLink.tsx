import { SmartLink } from "@/components/Pages/SmartLink/SmartLink";
import { MENU, MenuKeys } from "@/constants/parts";
import { ROUTES } from "@/constants/routes";
import Content from "@/content/en.json" assert { type: "json" };
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import css from "../Navigation.module.css";
import { DropdownList } from "./Dropdown";
import { AnimatedIcon } from "./Icons";

export const ListLink: FC<{ page_id: keyof typeof Content.MenuItems }> = ({ page_id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isList = MENU[page_id as MenuKeys].length > 0;

    return isList ? (
        <li onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <p>{Content.MenuItems[page_id]}</p>
            <AnimatedIcon page_id={page_id as "COMPANY" | "SERVICES" | "NEWS"} />
            <AnimatePresence>
                {isOpen && (
                    <motion.ul className={css.dropdown} initial={{ opacity: 0, x: "-50%", y: -10 }} animate={{ opacity: 1, x: "-50%", y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                        <DropdownList {...{ page_id }} />
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    ) : (
        <li>
            <SmartLink className={css.single_link} href={ROUTES[page_id as "CLIENT"]}>
                <p>{Content.MenuItems[page_id]}</p>
                <AnimatedIcon page_id={page_id as "CLIENT"} />
            </SmartLink>
        </li>
    );
};
