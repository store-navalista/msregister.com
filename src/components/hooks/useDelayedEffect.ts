import { useEffect } from "react";

export function useDelayedEffect(effect: () => void | (() => void), deps: unknown[] = []) {
    useEffect(() => {
        let raf2: number;
        let cleanup: void | (() => void);

        const raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
                cleanup = effect();
            });
        });

        return () => {
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
            if (cleanup) cleanup();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
