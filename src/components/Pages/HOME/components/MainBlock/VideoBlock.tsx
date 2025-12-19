"use client";

import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import css from "./MainBlock.module.css";
import right_block_css from "./RightBlock.module.css";

export const VideoBlock: FC = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1430px)" });
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const ap = {
        initial: {
            opacity: 0,
            transform: "rotateX(0deg) rotateY(0deg) translateX(-16px)",
        },
        animate: {
            opacity: 1,
            transform: `rotateX(${isDesktop ? 0 : -2}deg) rotateY(${isDesktop ? -1 : -3}deg) translateX(-16px)`,
        },
    };

    if (!mounted) return null;

    return (
        <motion.div initial={ap.initial} animate={ap.animate} transition={{ duration: 0.7, delay: 0.2 }} className={right_block_css.video_block}>
            {!isDesktop && (
                <div className={css.btn_wrapper}>
                    <UI.Button variant="link" colorScheme="tertiary" href="#request-form">
                        {Content.Home.button}
                    </UI.Button>
                </div>
            )}
            <ReactPlayer className={right_block_css.video} muted={true} loop autoPlay={true} src="/video/main-block-1.mp4" />
        </motion.div>
    );
};
