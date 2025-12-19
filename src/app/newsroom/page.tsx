import NewsContentClient from "@/components/News";
import { NewsTemplate } from "@/components/Pages/NewsTemplate/NewsTemplate";
import { getNewsById } from "@/services/elma/news";
import { markdownToHtml } from "@/services/markdown";
import { generatePageMetadata } from "@/services/seo";

export async function generateMetadata() {
    return generatePageMetadata({
        namespace: "NEWS",
        path: "newsroom",
    });
}

export default async function IndexPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id: news_ID } = await searchParams;

    if (!news_ID) return <NewsContentClient />;

    const news = await getNewsById(news_ID);

    const htmlBody = markdownToHtml(String(news?.body));

    return <NewsTemplate news={{ ...news, body: htmlBody }} />;
}
