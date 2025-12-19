"use client";

import Content from "@/content/en.json" assert { type: "json" };
import { useGetVerifiedCertificateQuery } from "@/store/reducers/apiReducer";
import clsx from "clsx";
import Image from "next/image";
import React, { CSSProperties, FC, useEffect } from "react";
import css from "../ClientContent.module.css";

type InfoBlockProps = {
    utn: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setisLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InfoBlock: FC<InfoBlockProps> = ({ utn, setError, setisLoading }) => {
    const [isCertificateDownloading, setIsCertificateDownloading] = React.useState(false);
    const { data, error, isLoading } = useGetVerifiedCertificateQuery(utn);

    const downloadHandler = () => {
        if (!data?.signed_file) return;

        setIsCertificateDownloading(true);

        try {
            const byteCharacters = atob(data.signed_file);
            const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${data.certificate_name}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (e) {
            console.error("Error creating and downloading file:", e);
            setError("Error downloading file");
        } finally {
            setTimeout(() => {
                setIsCertificateDownloading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (error && "data" in error && error.data && typeof error.data === "object" && "error" in error.data) {
            setError((error.data as { error: string }).error);
        } else if (error && "message" in error) {
            setError((error as { message: string }).message);
        }
    }, [error, setError]);

    useEffect(() => {
        setisLoading(isLoading);
    }, [isLoading, setisLoading]);

    if (!data) return;

    const fields: Array<"vessel" | "imo_number" | "certificate_number" | "certificate_status" | "certificate_name" | "issue_date" | "expiry_date"> = ["vessel", "imo_number", "certificate_number", "certificate_status", "certificate_name", "issue_date", "expiry_date"];

    const VerificationStatus = () => {
        if (data.certificate_status === "Expired") {
            return (
                <div>
                    <p>{Content.CLIENT.Info_block.not_verified}</p>
                    <p>{Content.CLIENT.Info_block.not_verified_desc}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{Content.CLIENT.Info_block.verified}</p>
                    <p>{Content.CLIENT.Info_block.verified_desc}</p>
                </div>
            );
        }
    };

    return (
        <div className={css.data_body}>
            <div className={css.message} style={{ "--bg-status": data.certificate_status === "Expired" ? "var(--color-red)" : "var(--color-green)" } as CSSProperties}>
                <VerificationStatus />
            </div>
            <div className={css.info}>
                {(fields as typeof fields).map((field) => (
                    <div key={field} className={css.data_item}>
                        <p>{Content.CLIENT.Info_block[field]}</p>
                        <p>{data[field]}</p>
                    </div>
                ))}
            </div>
            {data?.signed_file && (
                <button disabled={isCertificateDownloading} onClick={downloadHandler} className={clsx(css.download_button)}>
                    <div>
                        <Image src="/images/svg/download.svg" alt="arrow" width={20} height={20} />
                        <p>{Content.CLIENT.Info_block.view_cert}</p>
                    </div>
                    {isCertificateDownloading && <Image src="/images/svg/loader.svg" alt="arrow" width={24} height={24} />}
                </button>
            )}
        </div>
    );
};
