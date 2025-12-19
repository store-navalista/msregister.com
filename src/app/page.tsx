import { HomeContent } from "@/components/Pages/HOME/HomeContent";
import { generatePageMetadata } from "@/services/seo";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: "HOME",
        path: "home",
    });
}

export default async function IndexPage() {
    return (
        <div>
            <HomeContent />
        </div>
    );
}
