import fs from "fs";
import path from "path";

export const mdx_extractor = (page_id: string, type = "info") => {
    try {
        const contentPath = `/src/content/MDX/${type === "news" ? `news/${page_id}` : page_id}.mdx`;
        const filePath = path.join(process.cwd(), contentPath);
        const mdxContent = fs.readFileSync(filePath, "utf8");

        return mdxContent;
    } catch (e) {
        console.log(e);
    }
};
