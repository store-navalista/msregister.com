import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ companyId: string }> }) {
    const { companyId } = await params;

    if (!companyId) {
        return NextResponse.json({ message: "Company ID is required" }, { status: 400 });
    }

    const apiUrl = process.env.ELMA_COMPANY_DATA_URL;

    if (!apiUrl) {
        return NextResponse.json({ message: "API URL is not configured" }, { status: 500 });
    }

    try {
        const response = await axios.get(`${apiUrl}${companyId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ELMA_AUTH_TOKEN?.trim()}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Ошибка аутентификации:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return NextResponse.json({ status: 401, message: "Пользователь не найден" });
        }
        return NextResponse.json({ message: "Внутренняя ошибка сервера" }, { status: 500 });
    }
}
