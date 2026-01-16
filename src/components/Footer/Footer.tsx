import { MENU } from "@/constants/parts";
import { SOCIAL } from "@/constants/social";
import Content from "@/content/en.json" assert { type: "json" };
import React, { AnchorHTMLAttributes, FC } from "react";
import { SVG } from "../SVG";
import css from "./Footer.module.css";
import { SmartLink } from "../Pages/SmartLink/SmartLink";
import { ROUTES, RoutesTypes } from "@/constants/routes";

export type LinksType = keyof typeof Content.MenuItems | Record<keyof typeof Content.MenuItems, Array<keyof typeof Content.MenuItems>>;

const first_block = [
    { type: "mail", cnt: "mail_1" },
    { type: "tel", cnt: "phone_1" },
];

const CustomLink: FC<{ href: string; text: string } & AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, text, ...rest }) => {
    return (
        <SmartLink href={href} className={css.custom_link} style={{ fontFamily: "var(--font-g-light)" }} {...rest}>
            <span>⮞</span>
            {text}
        </SmartLink>
    );
};

const CompositeLinks: FC<{ page_id: LinksType }> = ({ page_id }) => {
    switch (typeof page_id) {
        case "string":
            return <CustomLink key={page_id} href={"/"} text={Content.MenuItems[page_id]} />;
        default: {
            const [title_id, serv_ids] = Object.entries(page_id).flat();

            return (
                <div key={`${page_id}`} className={css.serv_links}>
                    <p>{Content.MenuItems[title_id as keyof typeof Content.MenuItems]}</p>
                    {(serv_ids as Array<keyof typeof Content.MenuItems>).map((sub_page_id) => {
                        return <CustomLink key={sub_page_id} style={{ marginLeft: "12px" }} href={ROUTES[sub_page_id as RoutesTypes]} text={Content.MenuItems[sub_page_id as keyof typeof Content.MenuItems]} />;
                    })}
                </div>
            );
        }
    }
};

const FirstBlock = () => {
    return (
        <div>
            <p>{Content.Footer.description}</p>
            <div className={css.tel}>
                {first_block.map((item) => {
                    const { type, cnt } = item;
                    const a_type = type === "tel" ? "tel:" : "mailto:";

                    return (
                        <a key={cnt} href={`${a_type}${SOCIAL[cnt as keyof typeof SOCIAL]}`}>
                            {type === "tel" ? <SVG.Phone className={css.icon} /> : <SVG.Mail className={css.icon} />}
                            {SOCIAL[cnt as keyof typeof SOCIAL]}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

const Footer: FC = () => {
    const year = new Date().getFullYear();
    const company = [...MENU.COMPANY, ...MENU.NEWS, "CLIENT"];
    const [serv_left, serv_right] = [MENU.SERVICES.slice(0, 3), MENU.SERVICES.slice(3)];

    return (
        <footer className={css.footer}>
            <div className={css.blocks}>
                <div className={css.main_block}>
                    <FirstBlock />
                    <div>
                        <h3>{Content.MenuItems.COMPANY}</h3>
                        {company.map((page_id, i) => {
                            const href = ROUTES[page_id as RoutesTypes];

                            return <CustomLink key={`${page_id} + ${i}`} href={href} text={Content.MenuItems[page_id as keyof typeof Content.MenuItems]} />;
                        })}
                    </div>
                    <div>
                        <h3>{Content.MenuItems.SERVICES}</h3>
                        <div className={css.compoosite_wrapper}>
                            <div className={css.composite}>
                                {(serv_left as LinksType[]).map((page_id, i) => (
                                    <CompositeLinks key={`${i} + l`} {...{ page_id }} />
                                ))}
                            </div>
                            <div className={css.composite}>
                                {(serv_right as LinksType[]).map((page_id, i) => (
                                    <CompositeLinks key={`${i} + r`} {...{ page_id }} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <div>
                            <h3>{'3'}</h3>
                            <SocialLink type="instagram" />
                            <SocialLink type="linkedin" />
                        </div> */}
                        <p className={css.address}>{SOCIAL.address}</p>
                    </div>
                </div>
                <div id="footer" className={css.trademark}>
                    <div>
                        <p>{Content.Footer.copyright}</p>
                        <p>
                            {Content.Footer.trademark}
                            {year}
                        </p>
                    </div>
                    {/* <CustomLink href="/privacy-policy" text="cookie-notive-privacy" /> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
