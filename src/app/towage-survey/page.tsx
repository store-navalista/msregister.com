import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "TOW_SURV";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "towage-survey",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
