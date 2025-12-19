import { ClientContent } from "@/components/Pages/CLIENT/ClientContent";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "CLIENT_VERIFY";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "for-clients/verification",
    });
}

export default async function IndexPage() {
    return <ClientContent />;
}
