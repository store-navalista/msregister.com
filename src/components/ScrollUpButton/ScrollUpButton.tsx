"use client";

import css from "./ScrollUpButton.module.css";

export const ScrollUpButton = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return <button className={css.upp_button} onClick={handleClick} />;
};
