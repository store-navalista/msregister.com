"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import css from "./BurgerMenu.module.css";
import { BurgerMenuList } from "./BurgerMenuList";

export const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <button onClick={() => setIsOpen((prev) => !prev)} className={css.burger}>
            {isOpen && <BurgerMenuList isOpen={isOpen} />}
            <motion.svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" animate={isOpen ? "open" : "closed"} initial="closed">
                <motion.rect
                    fill="#f8a541"
                    x="3.05"
                    y="2.76"
                    width="19"
                    height="19"
                    rx="2.27"
                    ry="2.27"
                    variants={{
                        closed: { scale: 1 },
                        open: { scale: 0.6 },
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
                <motion.rect
                    fill="#39527a"
                    x="26.1"
                    y="10.85"
                    width="20.85"
                    height="36.4"
                    rx="2.27"
                    ry="2.27"
                    variants={{
                        closed: { height: 36.4 },
                        open: { height: 26 },
                    }}
                    transition={{ duration: 0.3 }}
                />
                <motion.rect
                    fill="#61b357"
                    x="7.08"
                    y="28.36"
                    width="10.94"
                    height="11.08"
                    rx="2.27"
                    ry="2.27"
                    variants={{
                        closed: { scale: 1 },
                        open: { scale: 1.5 },
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.svg>
        </button>
    );
};
