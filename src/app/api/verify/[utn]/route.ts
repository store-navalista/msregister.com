import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ utn: string }> }) {
    const { utn } = await params;

    if (!utn || typeof utn !== "string") {
        return new Response(JSON.stringify({ error: "UTN is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const response = await axios.get(`${process.env.ELMA_API_URL}${utn}`, {
            headers: {
                Authorization: `Bearer ${process.env.ELMA_API_TOKEN}`,
            },
            timeout: 5000,
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    return new Response(
                        JSON.stringify({
                            error: "Certificate not found",
                            code: 404,
                        }),
                        {
                            status: 404,
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                }

                return new Response(
                    JSON.stringify({
                        error: "External API responded with an error",
                        statusCode: error.response.status,
                        message: error.response.data || "Unknown error",
                    }),
                    {
                        status: error.response.status,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } else if (error.request) {
                return new Response(
                    JSON.stringify({
                        error: "External server did not respond",
                    }),
                    {
                        status: 502,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }
        }

        return new Response(
            JSON.stringify({
                error: "Unexpected server error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
