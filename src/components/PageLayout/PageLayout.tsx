"use client";

import { ROUTES } from "@/constants/routes";
import store from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { FC, ReactNode, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import { NewsBlock } from "../Pages/components/NewsBlock/NewsBlock";
import { ScrollUpButton } from "../ScrollUpButton/ScrollUpButton";
import { useScrollStep } from "../hooks/useScrollStep";
import css from "./PageLayout.module.css";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";

type PageLayoutProps = {
    children: ReactNode;
};

NProgress.configure({
    showSpinner: true,
    trickleSpeed: 100,
    minimum: 0.1,
});

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    const scrollStep = useScrollStep();
    const pathname = usePathname();

    useEffect(() => {
        NProgress.done();
    }, [pathname]);

    useEffect(() => {
        const loader = document.getElementById("global-loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.remove();
            }, 300);
        }
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
                <ErrorBoundary>
                    <div className={css.page_layout}>
                        <Header />
                        {children}
                        <AnimatePresence>
                            {scrollStep > 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                                    <ScrollUpButton />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {pathname !== ROUTES.NEWS && <NewsBlock />}
                        <Footer />
                    </div>
                </ErrorBoundary>
            </Provider>
        </Suspense>
    );
};
