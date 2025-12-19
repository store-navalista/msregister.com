import { MENU } from "@/constants/parts";
import { FC } from "react";
import { ListLink } from "./components/ListLink";
import css from "./Navigation.module.css";

export const Navigation: FC = () => {
    const menu_items = Object.keys(MENU) as Array<keyof typeof MENU>;

    return (
        <nav className={css.wrapper}>
            <ul className={css.links}>
                {menu_items.map((page_id, index) => {
                    return <ListLink key={page_id} {...{ page_id, index }} />;
                })}
            </ul>
        </nav>
    );
};
