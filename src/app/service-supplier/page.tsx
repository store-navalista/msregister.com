import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "SERV_SUP";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "service-supplier",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
