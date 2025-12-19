"use client";

import { FC, useState } from "react";
import css from "../../Tabs.module.css";
import { useLazyGenerateSVQuery } from "@/store/reducers/apiReducer";

export const DownloadButton: FC<{ vesselId: string }> = ({ vesselId }) => {
    const [loading, setLoading] = useState(false);
    const [trigger] = useLazyGenerateSVQuery();

    const handleDownload = async () => {
        setLoading(true);
        try {
            const result = await trigger(vesselId);

            if (result.data) {
                const blob = new Blob([result.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `status-report-${vesselId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleDownload} className={css.button} disabled={loading}>
            {loading ? "Generating..." : "Generate status report"}
        </button>
    );
};
