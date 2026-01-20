import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import css from "./ColorThemeToggle.module.css";
import clsx from "clsx";

export type ThemeType = "light" | "dark";

export const ColorThemeToggle: FC<{ theme: ThemeType; setTheme: Dispatch<SetStateAction<ThemeType>> }> = ({ theme, setTheme }) => {
    const controlsDay = useAnimation();
    const controlsNight = useAnimation();
    const controlsCircleDay = useAnimation();
    const controlsCircleNight = useAnimation();

    useEffect(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
            return null;
        };

        const cookieTheme = getCookie("theme") as ThemeType;
        setTheme(cookieTheme || "light");
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            controlsDay.start({ opacity: 0, transition: { duration: 0.5 } });
            controlsNight.start({ opacity: 1, transition: { duration: 0.5 } });

            controlsCircleDay.start({
                x: 20,
                opacity: 0,
                transition: { duration: 0.4 },
            });
            controlsCircleNight.start({
                x: 20,
                opacity: 1,
                transition: { duration: 0.4 },
            });
        } else {
            controlsDay.start({ opacity: 1, transition: { duration: 0.5 } });
            controlsNight.start({ opacity: 0, transition: { duration: 0.5 } });

            controlsCircleDay.start({
                x: -5,
                opacity: 1,
                transition: { duration: 0.4 },
            });
            controlsCircleNight.start({
                x: 1,
                opacity: 0,
                transition: { duration: 0.4 },
            });
        }
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const onClick = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const initialDay = {
        x: theme === "dark" ? 20 : -5,
        opacity: theme === "dark" ? 0 : 1,
        backgroundColor: "#fff",
    };

    const initialNight = {
        x: theme === "dark" ? 20 : 1,
        opacity: theme === "dark" ? 1 : 0,
        backgroundColor: "#465577",
    };

    return (
        <div className={css.wrapper} onClick={onClick}>
            <motion.div className={clsx(css.circle, css.day)} animate={controlsCircleDay} initial={initialDay}>
                <Image src="/images/svg/mode-toggle-day.svg" alt="day icon" fill />
            </motion.div>
            <motion.div className={clsx(css.circle, css.night)} animate={controlsCircleNight} initial={initialNight}>
                <Image src="/images/svg/mode-toggle-night.svg" alt="night icon" fill />
            </motion.div>
        </div>
    );
};
