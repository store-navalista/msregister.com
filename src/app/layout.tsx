import { PageLayout } from "@/components/PageLayout/PageLayout";
import { StructuredData } from "@/services/structuredData";
import "@/styles/globals.css";
import { cookies } from "next/headers";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
    const cookieStore = await cookies();
    const theme = cookieStore.get("theme")?.value || "light";

    return (
        <html lang="en" data-theme={theme}>
            <body>
                <StructuredData />
                <PageLayout>{children}</PageLayout>
            </body>
        </html>
    );
}
