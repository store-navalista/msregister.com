import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.method !== "POST") {
        return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
    }

    try {
        const body = await req.json();

        const response = await axios.post(process.env.ELMA_AUTH_URL || "", body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ELMA_AUTH_TOKEN?.trim()}`,
            },
        });

        if (response.data.code === 401) {
            return NextResponse.json({ status: 401, message: "User not found or password is incorrect!" });
        }

        const decodeResponse = jwt.verify(response.data.token, process.env.ELMA_AUTH_SECRET || "");

        const nextResponse = NextResponse.json({
            status: 200,
            message: "Успешно",
            data: decodeResponse,
        });

        nextResponse.cookies.set({
            name: "auth_token",
            value: response.data.token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return nextResponse;
    } catch (error) {
        console.error("Ошибка аутентификации:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return NextResponse.json({ status: 401, message: "Пользователь не найден" });
        }
        return NextResponse.json({ message: "Внутренняя ошибка сервера" }, { status: 500 });
    }
}
