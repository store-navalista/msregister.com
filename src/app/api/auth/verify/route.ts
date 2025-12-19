import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AuthData } from "@/store/reducers/apiReducer";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Not authorized" }, { status: 401 });
        }

        const decodedData = jwt.verify(token, process.env.ELMA_AUTH_SECRET || "") as AuthData;

        return NextResponse.json(decodedData);
    } catch (error) {
        console.error("Token verification error:", error);

        const response = NextResponse.json({ message: "Invalid token" }, { status: 401 });
        response.cookies.set({
            name: "auth_token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });

        return response;
    }
}
