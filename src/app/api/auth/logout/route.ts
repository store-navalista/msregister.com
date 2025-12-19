import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            status: 200,
            message: "Logged out successfully",
        });

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
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
