import { NewItemType } from "@/constants/types";
import axios from "axios";

export async function getNewsById(id: string): Promise<NewItemType> {
    const apiUrl = process.env.ELMA_NEWS_URL;

    if (!apiUrl) {
        throw new Error("API URL is not configured");
    }

    const response = await axios.get<NewItemType>(`${apiUrl}/get_new_by_id/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ELMA_AUTH_TOKEN?.trim()}`,
        },
    });

    return response.data;
}
