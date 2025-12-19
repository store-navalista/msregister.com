import { ClientPageContent } from "@/components/Pages/CLIENT/ClientPageContent";
import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "CLIENT";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "for-clients",
    });
}

export default async function IndexPage() {
    return (
        <Template type="without_content" {...{ page_ID }}>
            <ClientPageContent />
        </Template>
    );
}
