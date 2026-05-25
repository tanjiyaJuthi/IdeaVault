import { NextResponse } from "next/server";

export function proxy(request) {
    const token = request.cookies.get("token")?.value;

    const { pathname } = request.nextUrl;

    // Only protect edit pages
    const isProtectedIdeaRoute =
        pathname.startsWith("/ideas/") &&
        pathname.endsWith("/edit");

    const protectedRoutes = [
        "/add-idea",
        "/my-ideas",
        "/my-interactions",
        "/my-profile",
    ];

    const isProtectedRoute =
        protectedRoutes.includes(pathname) ||
        isProtectedIdeaRoute;

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(
            new URL(`/login?redirect=${pathname}`, request.url)
        );
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


// import { NextResponse } from "next/server";

// export function proxy() {
//     return NextResponse.next();
// }