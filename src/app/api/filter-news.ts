import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { keyword } = req.query;

    if (!keyword || typeof keyword !== "string") {
        return res.status(400).json({ message: "Keyword is required" });
    }

    const contentFilesPath = path.join(process.cwd(), "components/PagesComponents/news/content");
    const pagesDataPath = path.join(process.cwd(), "pages/news/data.json");

    const pagesData = JSON.parse(fs.readFileSync(pagesDataPath, "utf-8")).news;
    const fileNames = fs.readdirSync(contentFilesPath);
    const keywordLower = keyword.toLowerCase();

    const matchingFiles = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .filter((fileName) => {
            const filePath = path.join(contentFilesPath, fileName);
            const fileContent = fs.readFileSync(filePath, "utf-8");

            return fileContent.toLowerCase().includes(keywordLower);
        })
        .map((fileName) => fileName.replace(".mdx", ""));

    const filteredNews = pagesData.filter((news: { url: string }) => matchingFiles.includes(news.url));

    res.status(200).json(filteredNews);
}
