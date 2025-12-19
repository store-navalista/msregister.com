import { useEffect, useState } from "react";

export const useMatchQuery = (width: number) => {
    const [isMatchMedia, setIsMatchMedia] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
        const handleChange = (e: MediaQueryListEvent) => setIsMatchMedia(e.matches);

        setIsMatchMedia(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [width]);

    return isMatchMedia;
};
