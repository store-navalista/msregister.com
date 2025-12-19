"use client";

import dynamic from "next/dynamic";

const NewsContentClient = dynamic(() => import("./NewsContent").then((mod) => mod.NewsContent), {
    ssr: false,
    loading: () => <p style={{ width: "100%", height: "1060px" }}>Loading...</p>,
});

export default NewsContentClient;
