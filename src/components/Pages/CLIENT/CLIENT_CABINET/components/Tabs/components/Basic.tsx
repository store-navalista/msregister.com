"use client";

import { SVG } from "@/components/SVG";
import { FC } from "react";
import css from "../Tabs.module.css";
import { CompanyDataType } from "./Vessels";

export const Basic: FC<{ companyData: CompanyDataType }> = ({ companyData = {} }) => {
    const { companies_address, companies_email, companies_imo } = companyData;

    return (
        <div className={css.basic}>
            <div className={css.info}>
                <div className={css.row}>
                    <SVG.Address className={css.icon} />
                    <p>Address:</p>
                    <p>{`${companies_address}`}</p>
                </div>
                <div className={css.row}>
                    <SVG.AltMail className={css.icon} />
                    <p>Email:</p>
                    <p>{`${companies_email}`}</p>
                </div>
                <div className={css.row}>
                    <SVG.IMO className={css.icon} />
                    <p>IMO:</p>
                    <p>{`${companies_imo}`}</p>
                </div>
            </div>
        </div>
    );
};
