declare global {
    interface Window {
        QuickBpmWebForms?: {
            form: () => void;
        };
    }
}

import css from "./RequestForm.module.css";
import { useEffect } from "react";

export const CustomRequestForm = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://elma.tm-z.com/web-forms/assets/quickbpm-web-forms.js";
        script.crossOrigin = "anonymous";
        script.onload = () => {
            if (window.QuickBpmWebForms) {
                window.QuickBpmWebForms.form();
            }
        };
        document.head.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    // const id = "019778ce-5ac2-7c4e-91b6-8979d7482c98203881";

    return (
        <div>
            <iframe className={css.custom_form} src="https://elma.tm-z.com/web-forms/assets/iframe.html?iframe=qbpm-019778ce-5ac2-7c4e-91b6-8979d7482c98203881&amp;form=019778ce-5ac2-7c4e-91b6-8979d7482c98" id="qbpm-019778ce-5ac2-7c4e-91b6-8979d7482c98203881" style={{ visibility: "visible" }} height="199" width="520"></iframe>
        </div>
    );
};
