import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "STAT_SURV";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "statutory-surveys",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
