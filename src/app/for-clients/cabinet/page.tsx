import { generatePageMetadata } from "@/services/seo";
import { ClientCabinet } from "@/components/Pages/CLIENT/CLIENT_CABINET/ClientCabinet";
import { Suspense } from "react";

const page_ID = "CLIENT";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "for-clients",
    });
}

export default function IndexPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientCabinet />;
        </Suspense>
    );
}
