import { NextConfig } from "next";

const config: NextConfig = {
    devIndicators: false,
    transpilePackages: ["next-mdx-remote"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "elma.tm-z.com",
                pathname: "/s3elma365/**",
            },
        ],
    },
};

export default config;
