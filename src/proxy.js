import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const pathname = request.nextUrl.pathname;

    if (!session) {
        return NextResponse.redirect(
            new URL(`/login?redirect=${pathname}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/add-idea",
        "/my-ideas",
        "/my-interactions",
        "/my-profile",
    ],
};