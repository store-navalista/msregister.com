import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ vesselId: string }> }) {
    const { vesselId } = await params;

    if (!vesselId) {
        return NextResponse.json({ message: "Company ID is required" }, { status: 400 });
    }

    const apiUrl = process.env.ELMA_SV_URL;

    if (!apiUrl) {
        return NextResponse.json({ message: "API URL is not configured" }, { status: 500 });
    }

    try {
        const response = await axios.get(`${apiUrl}${vesselId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ELMA_SV_TOKEN?.trim()}`,
            },
        });

        if (!response.data.file_base64) {
            return NextResponse.json({ message: "PDF data not found in response" }, { status: 500 });
        }

        const pdfBuffer = Buffer.from(response.data.file_base64, "base64");

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="document-${vesselId}.pdf"`,
                "Content-Length": pdfBuffer.length.toString(),
            },
        });
    } catch (error) {
        console.error("Ошибка аутентификации:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return NextResponse.json({ status: 401, message: "Пользователь не найден" });
        }
        return NextResponse.json({ message: "Внутренняя ошибка сервера" }, { status: 500 });
    }
}
