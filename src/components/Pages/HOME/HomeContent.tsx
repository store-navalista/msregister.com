"use client";

// import { useScrollStep } from "@/components/hooks/useScrollStep";
import { FC } from "react";
import css from "./HomeContent.module.css";
import { MainBlock } from "./components/MainBlock/MainBlock";
import { WhyChoose } from "./components/WhyChoose/WhyChoose";
import { RequestForm } from "./components/RequestForm/RequestForm";
import { About } from "./components/About/About";
import { ServicesBlock } from "./components/ServicesBlock/ServicesBlock";

export const HomeContent: FC = () => {
    return (
        <div className={css.home_content}>
            <MainBlock />
            <About />
            <ServicesBlock />
            <WhyChoose />
            <RequestForm />
        </div>
    );
};
