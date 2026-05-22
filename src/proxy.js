import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    if (pathname === "/ideas") {
        return NextResponse.next();
    }

    if (pathname.startsWith("/ideas/")) {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session) {
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/ideas/:path*",
        "/add-idea",
        "/my-ideas",
        "/my-interactions",
        "/my-profile",
    ],
};