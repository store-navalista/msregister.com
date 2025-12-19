import Image from "next/image";
import { FC } from "react";
import css from "../Navigation.module.css";

export const AnimatedIcon: FC<{ page_id: "COMPANY" | "NEWS" | "SERVICES" | "CLIENT" }> = ({ page_id }) => {
    switch (page_id) {
        case "COMPANY":
            return (
                <div className={css.icon}>
                    <Image src="/images/svg/company.svg" fill alt="dropdown button" />
                    <Image src="/images/svg/find.svg" fill alt="dropdown button" />
                </div>
            );
        case "NEWS":
            return (
                <div className={css.icon}>
                    <Image src="/images/svg/news.svg" fill alt="dropdown button" />
                    <Image src="/images/svg/find.svg" fill alt="dropdown button" />
                </div>
            );
        case "CLIENT":
            return (
                <div className={css.icon}>
                    <Image src="/images/svg/client-support.svg" fill alt="dropdown button" />
                    <Image src="/images/svg/find.svg" fill alt="dropdown button" />
                </div>
            );
        case "SERVICES":
            return (
                <div className={css.icon_serv}>
                    <Image src="/images/svg/package.svg" width={20} height={20} alt="dropdown button" />
                    <span />
                    <span />
                    <span />
                </div>
            );
        default:
            return null;
    }
};
