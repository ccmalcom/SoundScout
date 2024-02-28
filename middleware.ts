import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log('middleware function hit');
    const token = request.cookies.get('token');

    // Determine if the session is valid based on the token
    let isValidSession = 0;
    if (token) {
        const expiration = token.value.split('exp=')[1];
        const date = new Date(expiration).toUTCString();
        const now = new Date().toUTCString();
        if (date > now) {
            isValidSession = 1; // Session is valid
        } else {
            isValidSession = -1; // Session has expired
        }
    } else {
        isValidSession = 0; // No session
    }

    const pathname = request.nextUrl.pathname;
    console.log('###middleware### isValidSession: ', isValidSession);

    // Redirect based on session validity
    if (isValidSession === 1 && pathname === '/') {
        // User has a valid session and is at the base route, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (isValidSession === 0 && pathname === '/') {
        // User has no session and is at the base route, proceed normally
        return NextResponse.next();
    } else if (isValidSession === -1 && !pathname.startsWith('/refresh-token')) {
        // Session has expired and user is not already going to refresh-token, redirect to refresh-token
        return NextResponse.redirect(new URL('/refresh-token', request.url));
    } else if (isValidSession === 0 && pathname !== '/' && !pathname.startsWith('/public')) {
        // No session, and the user is trying to access a protected route, redirect to login (base route)
        // Assuming routes that start with '/public' are publicly accessible without a session
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Proceed normally if the session is valid or if already heading to a handled route
    return NextResponse.next();
}
export const config = {
    matcher: [
        {
            source: '/((?!_next/static|_next/image|favicon.ico|callback).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};