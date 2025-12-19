import { RoutesTypes } from "./routes";

export type MenuKeys = "SERVICES" | "COMPANY" | "NEWS" | "CLIENT";

type MenuSection = Array<Record<string, RoutesTypes[]> | RoutesTypes>;

export const MENU: Record<MenuKeys, MenuSection> = {
    SERVICES: [{ CLASS: ["CLASS_SERV", "TRANSF"] }, { APP_CERT: ["TYPE_APPROVAL", "STATE_COMP", "SERV_SUP"] }, { COMP_AU: ["REM_AU", "CONV_AU"] }, { SURV: ["STAT_SURV", "TOW_SURV", "OTHER_SURV"] }, { TECH_SUP: ["AT_SHIP", "IN_IND"] }, "OTHER_SERVICES", "ADV_CONS"],
    COMPANY: ["ABOUT", "CONTACTS"],
    NEWS: ["NEWS", "INFO"],
    CLIENT: ["CLIENT_VERIFY", "CLIENT_CABINET"],
};

export const MOBILE_MENU = {
    first_block: ["HOME", "ABOUT", "CONTACTS", "NEWS", "INFO", "CLIENT"],
    second_block: [
        { title: "CLASS", items: ["CLASS_SERV", "TRANSF"] },
        { title: "APP_CERT", items: ["TYPE_APPROVAL", "STATE_COMP", "SERV_SUP"] },
        { title: "COMP_AU", items: ["REM_AU", "CONV_AU"] },
    ],
    third_block: ["OTHER_SERVICES", "ADV_CONS", { title: "SURV", items: ["STAT_SURV", "TOW_SURV", "OTHER_SURV"] }, { title: "TECH_SUP", items: ["AT_SHIP", "IN_IND"] }],
};
