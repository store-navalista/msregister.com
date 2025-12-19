"use client";

import { useCallback, useEffect, useState } from "react";

export const useScrollStep = () => {
    const [scrollStep, setScrollStep] = useState(0);

    const handleScroll = useCallback(() => {
        setScrollStep(Math.round(window.pageYOffset));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return scrollStep;
};
