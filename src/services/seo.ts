import { RoutesTypes } from "@/constants/routes";
import SEO from "@/content/seo.json" assert { type: "json" };

type MetaDataType = {
    namespace: RoutesTypes | "Global";
    path?: string;
};

const BASE_URL = "https://msregister.com";
export const GOOGLE_BUSINESS_URL = "https://www.google.com/maps?cid=12801926833004466332";

export async function generatePageMetadata({ namespace, path = "" }: MetaDataType) {
    const url = `${BASE_URL}/${path ? `/${path}` : ""}`;
    const data = SEO[namespace];

    if (!("title" in data) || !("description" in data)) {
        throw new Error(`SEO data for namespace "${namespace}" is missing 'title' or 'description'`);
    }

    const { title, description } = data;

    const fullTitle = `${title} | ${SEO.Global.siteName}`;

    return {
        title: fullTitle,
        description,
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: SEO.Global.siteName,
            images: [
                {
                    url: `${BASE_URL}/images/opengraph/${path}.jpg`,
                    width: 800,
                    height: 600,
                },
            ],
        },
    };
}
