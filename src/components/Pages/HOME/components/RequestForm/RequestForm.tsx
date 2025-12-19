import { UI } from "@/components/UI";
import Content from "@/content/en.json" assert { type: "json" };
import { useEffect, useState } from "react";
import { OnlineRequest } from "../OnlineRequest/OnlineRequest";
import DragDrop from "./DragDrop";
import css from "./RequestForm.module.css";
import { useRequestMutation } from "@/store/reducers/apiReducer";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";
import clsx from "clsx";

type UserDataType = {
    companyId: UUID;
    userId: UUID;
    user: {
        lastname: string;
        firstname: string;
        middlename: string;
    };
};

export const RequestForm = () => {
    const [sendRequest, { isLoading, isSuccess, isError }] = useRequestMutation();
    const router = useRouter();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [message, setMessage] = useState("");
    const [requestData, setRequestData] = useState({
        context: {
            company: "",
            company_representative: "",
            comment: "",
            source: "website",
        },
    });

    useEffect(() => {
        setRequestData((prevData) => ({
            context: {
                ...prevData.context,
                comment: comment,
            },
        }));
    }, [comment]);

    useEffect(() => {
        if (isSuccess) {
            setMessage("Your request has been sent successfully.");
            const timer = setTimeout(() => {
                setMessage("");
            }, 4000);

            return () => clearTimeout(timer);
        } else if (isError) {
            setMessage("An unexpected error occurred while sending your request.");
            const timer = setTimeout(() => {
                setMessage("");
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/auth/verify", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const userData = await response.json().catch(() => null);

                    setUserData(userData);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            }
        };

        checkAuth();
    }, [router]);

    useEffect(() => {
        if (userData && "companyId" in userData && "userId" in userData) {
            setRequestData((prevState) => ({
                ...prevState,
                context: {
                    ...prevState.context,
                    company: userData.companyId,
                    company_representative: userData.userId,
                },
            }));
        }
    }, [userData]);

    const sendHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!uploadedFile) return;

        setIsSubmitting(true);
        try {
            const formData = new FormData();

            formData.append("file", uploadedFile);

            formData.append("company", requestData.context.company);
            formData.append("company_representative", requestData.context.company_representative);
            formData.append("comment", requestData.context.comment);
            formData.append("source", requestData.context.source);

            await sendRequest(formData);

            setUploadedFile(null);
            setComment("");
            setRequestData({
                context: {
                    company: "",
                    comment: "",
                    company_representative: "",
                    source: "website",
                },
            });
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = uploadedFile && !isSubmitting;

    return (
        <section id="request-form" className={css.request_form}>
            <h3 id="classification-survey-heading">{Content.Home._request_form.h3}</h3>
            <p>{Content.Home._request_form.desc}</p>

            <OnlineRequest />

            <form className={css.form} onSubmit={sendHandler}>
                <p>{Content.Home._request_form.after_fill}</p>

                <div className={css.file_block}>
                    <DragDrop uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
                    <textarea placeholder="Here you can leave a comment for our manager." className={css.comments} value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
                </div>

                <UI.Button isLoading={isLoading} disabled={!isFormValid} colorScheme={!isFormValid ? "disabled" : "secondary"} type="submit">
                    {isSubmitting ? "Submitting..." : Content.Home._request_form.button}
                </UI.Button>
            </form>
            <p className={clsx(css.message, isError && css.error_message)}>{message}</p>
        </section>
    );
};
