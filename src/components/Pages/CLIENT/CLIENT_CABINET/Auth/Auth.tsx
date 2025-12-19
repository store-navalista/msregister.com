"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import css from "./Auth.module.css";
import { SVG } from "@/components/SVG";
import { useRouter } from "next/navigation";
import { useAuthMutation } from "@/store/reducers/apiReducer";
import { Tooltip } from "@/components/UI/Tooltip/Tooltip";
import Content from "@/content/en.json" assert { type: "json" };
import useHover from "@/components/hooks/useHover";

const PasswordHelp: FC<{ children: ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isHover = useHover(ref);

    return (
        <span ref={ref} style={{ position: "relative" }}>
            <SVG.Help className={css.icon} />
            {isHover && (
                <Tooltip className={css.tooltip} style={{ width: "260px" }}>
                    {children}
                </Tooltip>
            )}
        </span>
    );
};

export const Auth = () => {
    const [auth, { data, isLoading }] = useAuthMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();
    const c = Content.CLIENT.Cabinet.auth;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/verify", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const userData = await response.json().catch(() => null);
                    if (userData?.userId) {
                        router.push(`/for-clients/cabinet/?id=${userData.userId}`);
                        return;
                    }
                }

                setIsCheckingToken(false);
            } catch (error) {
                console.error("Token verification failed:", error);
                setIsCheckingToken(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        await auth({ email, password });
    };

    useEffect(() => {
        if (data?.status === 401) {
            setError(data.message + " Please check your password or contact your agent.");
        } else if (data?.status === 200) {
            setError(null);
            router.push(`/for-clients/cabinet/?id=${data?.data?.userId}`);
        }
    }, [data, router]);

    if (isCheckingToken) {
        return (
            <dialog open={true} className={css.authDialog}>
                <div className={css.loading}>Checking authentication...</div>
            </dialog>
        );
    }

    const passwordVisibleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <dialog open={true} className={css.authDialog}>
            <form onSubmit={handleSubmit}>
                <SVG.Login className={css.login_icon} />
                <h2>{c.sign_in}</h2>
                <p>{c.desc}</p>
                <div className={css.filed}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                    <SVG.Mail className={css.icon} />
                </div>
                <div className={css.filed}>
                    <label htmlFor="password">Password</label>
                    <input type={isPasswordVisible ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
                    <SVG.Password className={css.icon} />
                    <div className={css.btns}>
                        <button onClick={passwordVisibleHandler}>
                            <SVG.PasswordEye className={css.icon} type={isPasswordVisible ? "visible" : "hidden"} />
                        </button>
                        <PasswordHelp>{c.fogot_password}</PasswordHelp>
                    </div>
                </div>
                <div style={{ height: "32px" }} />
                <button type="submit">{isLoading ? <span className={css.loader} /> : c.sign_in}</button>
                <div className={css.if_not_exist}>{c.if_not_exist_acc}</div>
            </form>
            <p className={css.error}>{error}</p>
        </dialog>
    );
};
