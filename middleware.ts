import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')

    if (!accessToken) {
        const protectedPaths = [
            '/about',
            '/discover',
            '/privacy',
            '/sports',
        ]

        //  check if next path starts with any of the protected paths or root
        if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path)) || request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
}
