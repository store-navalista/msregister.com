import { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    return {
        start_url: "/",
        theme_color: "#101E33",
    };
}
