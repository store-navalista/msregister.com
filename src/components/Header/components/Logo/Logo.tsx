import Image from "next/image";
import Content from "@/content/en.json" assert { type: "json" };
import css from "./Logo.module.css";
import { FC } from "react";
import clsx from "clsx";
import { SmartLink } from "@/components/Pages/SmartLink/SmartLink";

export const Logo: FC<{ isScrolled?: boolean }> = ({ isScrolled }) => {
    return (
        <SmartLink href="/" className={clsx(css.wrapper, isScrolled && css.scrolled)}>
            <div className={css.logo}>
                <Image src="/images/svg/logo.svg" fill alt="logo" />
            </div>
            {!isScrolled && <p>{Content.GlobalMeta.site}</p>}
        </SmartLink>
    );
};
