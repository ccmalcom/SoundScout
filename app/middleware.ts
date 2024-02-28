import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log('middleware function hit');
    const token = request.cookies.get('token');

    // Determine if the session is valid based on the toke
    let isValidSession = 0;
    if (token) {
        const expiration = token.value.split('exp=')[1];
        const date = new Date(expiration);
        const now = new Date();
        if (date > now) {
            isValidSession = 1; // Session is valid
        } else {
            isValidSession = -1; // Session has expired
        }
    } else {
        isValidSession = 0; // No session
    }

    // Redirect based on session validity
    if (isValidSession === -1 && !request.nextUrl.pathname.startsWith('/refresh-token')) {
        return NextResponse.redirect(new URL('/refresh-token', request.url));
    } else if (isValidSession === 0 && !request.nextUrl.pathname.startsWith('/login')) {
        // Assuming your login route is '/', change as necessary
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Proceed normally if the session is valid or if already heading to a handled route
    return NextResponse.next();
}
