import { useAnimateOnView } from "@/components/hooks/useAnimateOnView";
import Content from "@/content/en.json" assert { type: "json" };
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import css from "./WhyChoose.module.css";

const Block: FC<{ block: Record<string, string>; i: number }> = ({ block, i }) => {
    const direction = i % 2 === 0 ? "left" : "right";
    const { ref, animation } = useAnimateOnView(direction, i * 0.2);

    return (
        <motion.div ref={ref} className={css.block} {...animation}>
            <div className={css.image}>
                <Image src={`/images/svg/choose-${i + 1}.svg`} fill alt="why" />
            </div>
            <h3>{block.title}</h3>
            <p>{block.desc}</p>
        </motion.div>
    );
};

export const WhyChoose = () => {
    const { ref, animation } = useAnimateOnView("left");

    return (
        <section className={css.choose}>
            <div className={css.wrapper}>
                <motion.div ref={ref} className={css.desc} {...animation}>
                    <h2>{Content.Home._why_choose_us.title}</h2>
                    <p>{Content.Home._why_choose_us.desc}</p>
                </motion.div>
                <div className={css.blocks}>
                    {Content.Home._why_choose_us.content.map((block, i) => {
                        return <Block key={i} {...{ block, i }} />;
                    })}
                </div>
            </div>
        </section>
    );
};
