import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "TYPE_APPROVAL";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "type-approval",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
