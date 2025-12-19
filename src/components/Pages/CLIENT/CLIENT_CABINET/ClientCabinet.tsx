"use client";

import Content from "@/content/en.json" assert { type: "json" };
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Auth } from "./Auth/Auth";
import css from "./ClientCabinet.module.css";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Tabs } from "./components/Tabs/Tabs";
import { CompanyDataType } from "./components/Tabs/components/Vessels";

export type TabsType = keyof typeof Content.CLIENT.Cabinet.navigation;

export const ClientCabinet = () => {
    const searchParams = useSearchParams();
    const [companyData, setCompanyData] = useState<CompanyDataType | null>(null);
    const [queryParams, setQueryParams] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState<TabsType>("basic");

    useEffect(() => {
        const getData = async () => {
            try {
                const dataRes = await fetch("/api/auth/verify", {
                    method: "GET",
                    credentials: "include",
                });

                if (dataRes.ok) {
                    const userData = await dataRes.json();

                    const companyData = await fetch(`/api/user/get-company-data/${userData?.companyId}`, {
                        method: "GET",
                        credentials: "include",
                    });

                    setCompanyData(await companyData.json());
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            }
        };

        getData();
    }, [searchParams]);

    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        setQueryParams(params);

        const tab = params.tab;
        if (tab && Object.keys(Content.CLIENT.Cabinet.navigation).includes(tab)) {
            setActiveTab(tab as TabsType);
        }
    }, [searchParams]);

    return (
        <div className={css.cabinet}>
            {!Object.keys(queryParams).length ? (
                <Auth />
            ) : (
                <div>
                    <Header />
                    <Navigation {...{ activeTab, setActiveTab }} />
                    <p className={css.company}>{typeof companyData?.companies_name === "string" ? companyData.companies_name : "Company"}</p>
                    {companyData && <Tabs {...{ activeTab, companyData }} />}
                </div>
            )}
        </div>
    );
};
