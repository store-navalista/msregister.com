import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "TRANSF";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "transfer-of-class",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
