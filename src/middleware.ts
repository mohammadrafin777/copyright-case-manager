import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/cases') ||
    pathname.startsWith('/clients') ||
    pathname.startsWith('/hearings') ||
    pathname.startsWith('/settings');

  // No token + protected route => redirect to login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token + auth page (login/register) => redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Admin route + non-admin => redirect to dashboard
  if (token && isAdminRoute && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cases/:path*',
    '/clients/:path*',
    '/hearings/:path*',
    '/settings/:path*',
    '/admin/:path*',
    '/login',
    '/register'
  ]
};
