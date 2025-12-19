"use client";

import { SVG } from "@/components/SVG";
import Content from "@/content/en.json" assert { type: "json" };
import { useLogoutMutation } from "@/store/reducers/apiReducer";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { TabsType } from "../ClientCabinet";
import css from "./Navigation.module.css";

type NavigationProps = {
    activeTab: TabsType;
    setActiveTab: React.Dispatch<React.SetStateAction<TabsType>>;
};

export const Navigation: FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
    const isScreen = useMediaQuery({ query: "(min-width: 780px)" });
    const [logout, { isLoading }] = useLogoutMutation();
    const buttons = Object.keys(Content.CLIENT.Cabinet.navigation) as TabsType[];
    const router = useRouter();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            router.push(`/for-clients/cabinet`);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className={css.nav}>
            {buttons.map((tab: TabsType) => {
                return (
                    <button className={clsx(!isScreen && css.mobile_btn)} onClick={() => setActiveTab(tab)} data-active={activeTab === tab} key={tab} style={{ padding: isScreen ? "6px 16px" : "0" }}>
                        {isScreen ? Content.CLIENT.Cabinet.navigation[tab] : <SVG.CabinetTabsIcons type={tab} />}
                    </button>
                );
            })}
            <button style={{ backgroundColor: !isScreen ? "var(--color-red)" : "" }} onClick={logoutHandler} className={clsx(css.logout, !isScreen && css.mobile_btn)} disabled={isLoading}>
                {isScreen ? "Logout" : <SVG.CabinetTabsIcons type={"logout"} />}
            </button>
        </nav>
    );
};
