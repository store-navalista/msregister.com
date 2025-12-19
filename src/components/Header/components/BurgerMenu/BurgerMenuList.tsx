"use client";

import { motion } from "framer-motion";
import { FC, Fragment } from "react";
import css from "./BurgerMenu.module.css";
import { MOBILE_MENU } from "@/constants/parts";
import Content from "@/content/en.json" assert { type: "json" };
import { SmartLink } from "@/components/Pages/SmartLink/SmartLink";
import { ROUTES, RoutesTypes } from "@/constants/routes";

type MenuItemTypes = keyof typeof Content.MenuItems;

const leftToRightVariant = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const rightToLeftVariant = {
    hidden: { opacity: 0, x: "100vw" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export const BurgerMenuList: FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <div className={css.list}>
            <motion.ul className={css.first_block} initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={leftToRightVariant}>
                {MOBILE_MENU.first_block.map((item) => (
                    <li key={item}>
                        <SmartLink href={ROUTES[item as RoutesTypes]}>{Content.MenuItems[item as MenuItemTypes]}</SmartLink>
                    </li>
                ))}
            </motion.ul>

            <motion.ul className={css.second_block} initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={rightToLeftVariant}>
                {MOBILE_MENU.second_block.map((item) => {
                    const { title, items } = item as { title: string; items: MenuItemTypes[] };

                    return (
                        <Fragment key={title}>
                            <p>{Content.MenuItems[title as MenuItemTypes]}</p>
                            {items.map((menuItem, idx) => (
                                <li key={idx}>
                                    <SmartLink href={ROUTES[menuItem as RoutesTypes]}>{Content.MenuItems[menuItem]}</SmartLink>
                                </li>
                            ))}
                        </Fragment>
                    );
                })}
            </motion.ul>

            <motion.ul className={css.third_block} initial="hidden" animate={isOpen ? "visible" : "hidden"} variants={leftToRightVariant}>
                {MOBILE_MENU.third_block.map((item) => {
                    if (typeof item === "string") {
                        return (
                            <li key={item}>
                                <SmartLink href={ROUTES[item as RoutesTypes]}>{Content.MenuItems[item as MenuItemTypes]}</SmartLink>
                            </li>
                        );
                    }

                    const { title, items } = item as { title: string; items: MenuItemTypes[] };

                    return (
                        <Fragment key={title}>
                            <p>{Content.MenuItems[title as MenuItemTypes]}</p>
                            {items.map((menuItem, idx) => (
                                <li key={idx}>
                                    <SmartLink href={ROUTES[menuItem as RoutesTypes]}>{Content.MenuItems[menuItem]}</SmartLink>
                                </li>
                            ))}
                        </Fragment>
                    );
                })}
            </motion.ul>
        </div>
    );
};
