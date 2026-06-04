// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();

        // Wipe out the secure cookies
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to clear sessions" },
            { status: 500 }
        );
    }
}