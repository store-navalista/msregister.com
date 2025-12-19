import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "OTHER_SURV";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "other-surveys",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
