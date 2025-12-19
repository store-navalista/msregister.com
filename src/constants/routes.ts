export const ROUTES = {
    HOME: "/",
    ABOUT: "/about-us",
    CONTACTS: "/our-contacts",
    NEWS: "/newsroom",
    CLIENT: "/for-clients",
    INFO: "/information",

    // Classification
    CLASS_SERV: "/classification-services",
    TRANSF: "/transfer-of-class",

    // Approval and Certification
    TYPE_APPROVAL: "/type-approval",
    STATE_COMP: "/statement-of-compliance",
    SERV_SUP: "/service-supplier",

    // Company and Ship Audits
    REM_AU: "/remote-audit",
    CONV_AU: "/conventional-audit",

    // Surveys
    STAT_SURV: "/statutory-surveys",
    TOW_SURV: "/towage-survey",
    OTHER_SURV: "/other-surveys",

    // Technical Supervision
    AT_SHIP: "/technical-supervision-at-shipyard",
    IN_IND: "/technical-supervision-in-industry",

    OTHER_SERVICES: "/other-services",
    ADV_CONS: "/advisory-and-consulting",

    //For Clients
    CLIENT_VERIFY: "/for-clients/verification",
    CLIENT_CABINET: "/for-clients/cabinet",
};

export type RoutesTypes = keyof typeof ROUTES;
