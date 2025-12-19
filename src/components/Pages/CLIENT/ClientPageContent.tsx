import { ROUTES } from "@/constants/routes";
import Content from "@/content/en.json" assert { type: "json" };
import Image from "next/image";
import React from "react";
import { SmartLink } from "../SmartLink/SmartLink";
import css from "./ClientPageContent.module.css";

export const ClientPageContent = () => {
    return (
        <div>
            <h1>{Content.CLIENT.heading}</h1>
            <div data-type="wrapper" className={css.client_content}>
                <h2>{Content.CLIENT.description}</h2>
                <div className={css.link_blok}>
                    <p style={{ marginBottom: "0" }}>{Content.CLIENT.verify_desc}</p>
                    <div className={css.link}>
                        <Image src="/images/svg/verify-fill.svg" alt="verify" width={20} height={20} />
                        <SmartLink href={ROUTES.CLIENT_VERIFY}>{Content.CLIENT.verify_link}</SmartLink>
                    </div>
                </div>
                <div className={css.link_blok}>
                    <p style={{ marginBottom: "0" }}>{Content.CLIENT.cabinet_desc}</p>
                    <div className={css.link}>
                        <Image src="/images/svg/dashboard.svg" alt="verify" width={20} height={20} />
                        <SmartLink href={ROUTES.CLIENT_CABINET}>{Content.CLIENT.cabinet_link}</SmartLink>
                    </div>
                </div>
            </div>
        </div>
    );
};
