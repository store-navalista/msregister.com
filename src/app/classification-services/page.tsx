import { Template } from "@/components/Pages/Template/Template";
import { generatePageMetadata } from "@/services/seo";

const page_ID = "CLASS_SERV";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: page_ID,
        path: "classification-services",
    });
}

export default async function IndexPage() {
    return <Template {...{ page_ID }} />;
}
