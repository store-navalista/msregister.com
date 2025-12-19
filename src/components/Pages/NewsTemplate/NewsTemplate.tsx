import Image from "next/image";
import { FC } from "react";
import css from "./NewsTemplate.module.css";
import { NewItemType } from "@/constants/types";

export const NewsTemplate: FC<{ news: NewItemType }> = ({ news }) => {
    const { title, body, href_source } = news;

    return (
        <div className={css.news_template}>
            <div className={css.image}>
                <div className={css.dark_curtain} />
                <div className={css.white_brick} />
                <Image src={`/images/pages/template/intlreg_excellence.jpg`} fill alt="service" style={{ objectFit: "cover" }} />
            </div>
            <div className={css.news_mdx}>
                <h1>{title}</h1>
                <div data-type="wrapper">
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                    <blockquote>{href_source}</blockquote>
                </div>
            </div>
        </div>
    );
};
