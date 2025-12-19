import { RoutesTypes } from "@/constants/routes";
import { mdx_extractor } from "@/services/mdx_extractor";
import clsx from "clsx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import React, { FC } from "react";
import css from "./Template.module.css";

type TemplateProps = {
    page_ID: RoutesTypes | string;
    type?: "with_content" | "without_content";
    templateType?: "info" | "news";
    children?: React.ReactNode;
};

type ContentProps = Omit<TemplateProps, "page_ID"> & { content: string | undefined };

const Content: FC<ContentProps> = ({ content, type, children }) => {
    switch (type) {
        case "with_content":
            return content ? <MDXRemote source={content} /> : <div>No content available.</div>;
        case "without_content":
            return <div>{children}</div>;
        default:
            return <div>No content available.</div>;
    }
};

export const Template: FC<TemplateProps> = ({ page_ID, type = "with_content", templateType = "info", children }) => {
    const content = mdx_extractor(page_ID, templateType);

    return (
        <div className={css.template}>
            <div className={css.image}>
                <div className={css.dark_curtain} />
                <div className={css.white_brick} />
                <Image src={`/images/pages/template/intlreg_excellence.jpg`} fill alt="service" style={{ objectFit: "cover" }} />
            </div>
            <div className={clsx(templateType === "news" ? css.news_mdx : css.mdx)}>
                <Content {...{ content, type, children }} />
            </div>
        </div>
    );
};
