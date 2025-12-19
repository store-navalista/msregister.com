import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "AT_SHIP";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "technical-supervision-at-shipyard",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
