import { GOOGLE_BUSINESS_URL } from "./seo";

export const StructuredData = () => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Mediterranean Shipping Register",
                url: "https://msregister.com",
                image: "https://msregister.com/images/logo.png",
                description: "Mediterranean Shipping Register is an independent ship classification society providing certification, surveys and compliance services worldwide",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Unit 3, Office A, 1st Floor, 6-7 St. Mary At Hill, London, EC3R 8EE",
                    addressLocality: "London",
                    addressCountry: "GB",
                    addressRegion: "England",
                    postalCode: "EC3R 8EE",
                },
                contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+447308100885",
                    contactType: "customer service",
                },
                sameAs: [GOOGLE_BUSINESS_URL],
            }),
        }}
    />
);
