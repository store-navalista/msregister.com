"use client";

import { animate, createScope } from "animejs";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import css from "./ScreensaverWrapper.module.css";
import { SVG } from "./SVG";

const Screensaver: FC = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const scope = useRef<ReturnType<typeof createScope> | null>(null);

    useEffect(() => {
        scope.current = createScope({ root }).add(() => {
            animate(`.${css.layer_down}`, {
                opacity: { from: 1, to: 0 },
                easing: "easeInOutSine",
                duration: 1000,
                delay: 1500,
            });
            animate(`.${css.layer_up}`, {
                opacity: { from: 0, to: 1 },
                easing: "easeInOutSine",
                duration: 1000,
                delay: 1500,
            });
        });

        return () => scope.current?.revert();
    }, []);

    return (
        <div ref={root}>
            <div className={css.layer_white} />
            <div className={css.layer_down} />
            <div className={css.layer_up} />
            <div className={css.wrapper}>
                <div className={css.svg}>
                    <SVG />
                </div>
            </div>
        </div>
    );
};

export function ScreensaverWrapper() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {show && (
                <motion.div key="screensaver" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <Screensaver />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
