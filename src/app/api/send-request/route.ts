import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const company = formData.get("company");
        const company_representative = formData.get("company_representative");
        const comment = formData.get("comment") as string;

        const hash = uuidv4();
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const size = buffer.length;

        const url = `${process.env.ELMA_CUSTOM_REQUEST_IMPORT_FILE_URL}?hash=${hash}`;

        const uploadResponse = await axios.post(url, buffer, {
            headers: {
                Authorization: `Bearer ${process.env.ELMA_AUTH_TOKEN?.trim()}`,
                "Content-Type": "application/octet-stream",
                "Content-Range": `bytes 0-${size}/${size}`,
            },
            maxBodyLength: Infinity,
        });

        const payload = {
            context: {
                company: company ? [company] : [],
                company_representative: company_representative ? [company_representative] : [],
                comment: comment || "",
                request_date: new Date().toISOString(),
                source: [{ code: "website", name: "website" }],
                file: [
                    {
                        name: file.name,
                        hash: uploadResponse.data.hash,
                    },
                ],
            },
        };

        const response = await axios.post(`${process.env.ELMA_CUSTOM_REQUEST_CREATE_URL}`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ELMA_AUTH_TOKEN?.trim()}`,
            },
            timeout: 5000,
        });

        return NextResponse.json({
            success: true,
            data: response.data,
            status: response.status,
        });
    } catch (error: unknown) {
        console.error("API route error:", error);
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    error: "External API request failed",
                    details: error.response?.data || error.message,
                    status: error.response?.status || 500,
                },
                { status: error.response?.status || 500 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: "Internal server error",
                    details: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                error: "Internal server error",
                details: "An unknown error occurred",
            },
            { status: 500 }
        );
    }
}
