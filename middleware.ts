import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Check if the path starts with /dashboard
  if (pathname.startsWith('/dashboard')) {
    // Check for authentication token/cookie
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true' ||
                      request.headers.get('authorization');

    // For demo purposes, we'll also check a simple cookie
    // In a real app, you'd verify a JWT token or session
    if (!isLoggedIn) {
      // Redirect to login page
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while already authenticated, redirect to dashboard
  if (pathname === '/login') {
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};