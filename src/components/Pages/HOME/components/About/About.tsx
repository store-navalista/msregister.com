import Image from "next/image";
import css from "./About.module.css";
import Content from "@/content/en.json" assert { type: "json" };
import { FC } from "react";
import { useAnimateOnView } from "@/components/hooks/useAnimateOnView";
import { motion } from "framer-motion";

const CheckDiv: FC<{ item: string; index: number }> = ({ item, index }) => {
    const { ref, animation } = useAnimateOnView("bottom", index * 0.2);

    return (
        <motion.div ref={ref} key={item} className={css.card} {...animation}>
            <div className={css.icon}>
                <Image src="/images/svg/double-check.svg" fill alt="check" />
            </div>
            <p>{item}</p>
        </motion.div>
    );
};

export const About = () => {
    const { ref, animation } = useAnimateOnView("left");

    return (
        <section className={css.about}>
            <motion.div ref={ref} className={css.desc} {...animation}>
                <h2>{Content.Home._services_block.h2}</h2>
                <p>{Content.Home._services_block.desc}</p>
            </motion.div>
            <div className={css.cards}>
                {Content.Home._services_block.desc_list.map((item, index) => {
                    return <CheckDiv key={item} {...{ item, index }} />;
                })}
            </div>
        </section>
    );
};
