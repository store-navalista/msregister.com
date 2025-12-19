import React, { FC, ReactNode } from "react";
import css from "./Tooltip.module.css";

interface TooltipProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const Tooltip: FC<TooltipProps> = ({ children, className, style }) => {
    return (
        <div className={`${css.tooltip} ${className || ""}`} style={style}>
            {children}
        </div>
    );
};
