import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')

    if (!accessToken) {
        const protectedPaths = [
            '/about',
            '/discover',
            '/privacy',
            '/sports',
            '/information',
        ]

        //  check if next path starts with any of the protected paths or root
        if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path)) || request.nextUrl.pathname === '/') {
            const subDirectory = process.env.SUB_DIRECTORY
            if (subDirectory) {
                return NextResponse.redirect(new URL(subDirectory + '/login', request.url));
            } else {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
}
