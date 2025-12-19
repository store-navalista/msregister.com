import { SmartLink } from "@/components/Pages/SmartLink/SmartLink";
import { MENU, MenuKeys } from "@/constants/parts";
import { ROUTES, RoutesTypes } from "@/constants/routes";
import Content from "@/content/en.json" assert { type: "json" };
import { FC } from "react";
import css from "../Navigation.module.css";

export type PageIDType = keyof typeof Content.MenuItems;

export const LinkItem: FC<{ page_id: keyof typeof Content.MenuItems; size: "xs" | "xl" }> = ({ page_id, size }) => {
    return (
        <li data-size={size}>
            <span className={css.dot} />
            <span className={css.arrow} />
            <SmartLink href={ROUTES[page_id as RoutesTypes]}>{Content.MenuItems[page_id]}</SmartLink>
        </li>
    );
};

export const DropdownList: FC<{ page_id: PageIDType }> = ({ page_id }) => {
    const list = MENU[page_id as MenuKeys];

    return (
        <div>
            {(list ?? []).map((page_id) => {
                if (typeof page_id !== "string") {
                    const [title_id, serv_ids] = Object.entries(page_id).flat();

                    return (
                        <div key={title_id as string} className={css.link_block}>
                            <p>{Content.MenuItems[title_id as PageIDType]}</p>
                            {(serv_ids as PageIDType[]).map((page_id) => {
                                return <LinkItem key={page_id} size="xl" {...{ page_id }} />;
                            })}
                        </div>
                    );
                }
                return <LinkItem key={page_id} size="xs" page_id={page_id as PageIDType} />;
            })}
        </div>
    );
};
