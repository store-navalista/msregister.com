"use client";

import { UI } from "@/components/UI";
import css from "./OnlineRequest.module.css";
import { SVG } from "@/components/SVG";

export const OnlineRequest = () => {
    const downloadFile = () => {
        const link = document.createElement("a");
        link.href = "/docs/QP 07 F01 Service request form.pdf";
        link.download = "QP 07 F01 Service request form.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={css.online}>
            <div className={css.desc}>
                <p>This downloadable Word document is the official Request Form for services provided by Mediterranean Shipping Register. It allows you to submit a formal inquiry for classification, inspection, certification, or consultancy. The form includes sections for your company information, vessel details, the type of services required, and contact data. By completing and sending it to our email address, you help us understand your needs and provide an appropriate response or quotation. Intended for shipowners, operators, managers, and shipyards, this form is the first step to initiate cooperation. Please fill it out accurately to ensure timely processing.</p>
            </div>
            <UI.Button onClick={downloadFile} colorScheme="secondary" className={css.button}>
                <SVG.PdfDoc className={css.icon} /> Download request form
            </UI.Button>
        </div>
    );
};
