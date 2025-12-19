import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "REM_AU";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "remote-audit",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
