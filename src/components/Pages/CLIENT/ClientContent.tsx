"use client";

import Content from "@/content/en.json" assert { type: "json" };
import { api } from "@/store/reducers/apiReducer";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import css from "./ClientContent.module.css";
import { InfoBlock } from "./components/InfoBlock";

export const ClientContent: FC<{ utn?: string }> = ({ utn }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState("");
    const [editedUTN, setEditedUTN] = useState("");

    const changeUTN = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setEditedUTN(value);
        }
    };

    const verifyHandler = () => {
        dispatch(api.util.invalidateTags([{ type: "Certificate", id: editedUTN }]));
        setisLoading(true);
        router.push(`/for-clients/verification/${editedUTN}`);
        setTimeout(() => {
            setisLoading(false);
        }, 2000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isLoading && editedUTN) {
            verifyHandler();
        }
    };

    useEffect(() => {
        if (utn) {
            setEditedUTN(utn);
        }
    }, [utn]);

    return (
        <div className={css.client_content}>
            <Image className={css.image_verify} src="/images/svg/verify.svg" alt="verify" width={50} height={50} />
            <div className={css.header}>
                <p>{Content.CLIENT.req_p1}</p>
                <h2>{Content.CLIENT.req_p3}</h2>
            </div>
            <div className={css.input_wrapper + `${isLoading || !editedUTN ? " " + css.loading : ""}`}>
                <p className={css.title}>{Content.CLIENT.req_p2}</p>
                <input onChange={changeUTN} onKeyDown={handleKeyDown} type="text" value={editedUTN} placeholder="Enter UTN" />
                <button disabled={isLoading || !editedUTN} onClick={verifyHandler}>
                    {isLoading ? <Image src="/images/svg/loader.svg" alt="loader" width={24} height={24} /> : <p>{Content.CLIENT.req_p4}</p>}
                </button>
            </div>
            {utn && <InfoBlock {...{ utn, setError, setisLoading }} />}
            {utn && error && <p className={css.error}>{error}</p>}
        </div>
    );
};
