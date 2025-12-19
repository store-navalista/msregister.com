import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "ADV_CONS";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "advisory-and-consulting",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
