import React, { FC } from "react";
import css from "./Button.module.css";
import clsx from "clsx";
import { SmartLink } from "@/components/Pages/SmartLink/SmartLink";
import { SVG } from "@/components/SVG";

type ButtonProps = {
    children: React.ReactNode;
    colorScheme?: "primary" | "secondary" | "tertiary" | "disabled";
    variant?: "button" | "link" | "submit" | "simple_link";
    href?: string;
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Button: FC<ButtonProps> = ({ children, isLoading, colorScheme = "primary", variant = "button", href = "/", onClick, className, ...args }) => {
    const combinedClassName = clsx(css.button, className);

    const getColorScheme = () => {
        switch (colorScheme) {
            case "primary":
                return {
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                };
            case "secondary":
                return {
                    backgroundColor: "var(--color-secondary)",
                    color: "#000",
                };
            case "tertiary":
                return {
                    backgroundColor: "var(--color-green)",
                    color: "#fff",
                };
            case "disabled":
                return {
                    backgroundColor: "#999",
                    color: "#fff",
                };
            default:
                return {
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                };
        }
    };

    switch (variant) {
        case "button":
            return (
                <div className={combinedClassName}>
                    <button onClick={onClick} style={getColorScheme()} {...args}>
                        {isLoading ? <SVG.PulseLoader className={css.loader} /> : children}
                    </button>
                </div>
            );
        case "link":
            return (
                <div className={combinedClassName}>
                    <SmartLink style={{ ...getColorScheme(), ...args.style }} href={href}>
                        {children}
                    </SmartLink>
                </div>
            );
        case "submit":
            return (
                <div className={combinedClassName}>
                    <input type="submit" />;
                </div>
            );
        case "simple_link":
            return (
                <div className={combinedClassName}>
                    <a style={{ ...getColorScheme(), ...args.style }} href={href}>
                        {children}
                    </a>
                </div>
            );
        default:
            return null;
    }
};
