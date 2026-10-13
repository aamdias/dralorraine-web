import { NextResponse } from "next/server";

export function middleware(request) {
    const host = request.headers.get("host")?.split(":")[0];
    const adminHost = new URL(
        process.env.ADMIN_SITE_URL || "https://admin.dralorraine.com"
    ).hostname;
    const url = request.nextUrl.clone(),
        pathname = url.pathname;
    if (host === adminHost) {
        if (pathname === "/robots.txt")
            return new NextResponse("User-agent: *\nDisallow: /\n", {
                headers: { "Content-Type": "text/plain" }
            });
        if (pathname.startsWith("/api/") && !pathname.startsWith("/api/admin/"))
            return new NextResponse(null, { status: 404 });
        if (
            !pathname.startsWith("/api/") &&
            !pathname.startsWith("/_next/") &&
            !/\.[a-zA-Z0-9]+$/.test(pathname)
        ) {
            if (pathname === "/admin" || pathname.startsWith("/admin/")) {
                url.pathname = pathname.replace(/^\/admin/, "") || "/";
                return NextResponse.redirect(url, 308);
            }
            url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
            const response = NextResponse.rewrite(url);
            privateHeaders(response);
            return response;
        }
    } else if (
        process.env.NODE_ENV === "production" &&
        (pathname === "/admin" || pathname.startsWith("/admin/"))
    ) {
        const destination = new URL(
            process.env.ADMIN_SITE_URL || "https://admin.dralorraine.com"
        );
        destination.pathname = pathname.replace(/^\/admin/, "") || "/";
        destination.search = url.search;
        return NextResponse.redirect(destination, 307);
    }
    const response = NextResponse.next();
    if (
        host === adminHost ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/api/admin")
    )
        privateHeaders(response);
    return response;
}
function privateHeaders(response) {
    response.headers.set(
        "Content-Security-Policy",
        `default-src 'self'; script-src 'self' 'unsafe-inline'${
            process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
        }; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'`
    );
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Referrer-Policy", "no-referrer");
}
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
