import { useAnimateOnView } from "@/components/hooks/useAnimateOnView";
import { UI } from "@/components/UI";
import { ROUTES } from "@/constants/routes";
import Content from "@/content/en.json";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import css from "./ServicesBlock.module.css";

type ServiceType = {
    ID: keyof typeof ROUTES;
    title: string;
    desc: string;
};

const Service: FC<{ serv: ServiceType; i: number }> = ({ serv, i }) => {
    const direction = i % 2 === 0 ? "left" : "right";
    const { ref, animation } = useAnimateOnView(direction);

    return (
        <motion.div ref={ref} className={css.service} {...animation}>
            <h3>{serv.title}</h3>
            <p>{serv.desc}</p>
            <UI.Button variant="link" colorScheme="primary" href={ROUTES[serv.ID]} className={css.custom_btn}>
                More Details
            </UI.Button>
        </motion.div>
    );
};

const ServiceBlock: FC<{ serv: ServiceType; i: number }> = ({ serv, i }) => {
    const direction = i % 2 === 0 ? "right" : "left";
    const { ref, animation } = useAnimateOnView(direction);

    return (
        <div key={i} ref={ref} className={css.block}>
            <motion.div className={css.image} {...animation}>
                <Image src={`/images/pages/HOME/serv-bg-${i + 1}.jpg`} fill alt="service" />
            </motion.div>
            <Service {...{ serv, i }} />
        </div>
    );
};

export const ServicesBlock = () => {
    return (
        <section className={css.services}>
            {Content.Home._services_block.services.map((serv, i) => {
                return <ServiceBlock key={i} {...{ serv: serv as ServiceType, i }} />;
            })}
        </section>
    );
};
