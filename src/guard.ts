import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './utils/auth';

export function middleware(req: NextRequest) {
  const user = getCurrentUser();
  const { pathname } = req.nextUrl;

  if (!user && (pathname.startsWith('/admin') || pathname.startsWith('/user'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (user?.role === 'admin' && pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }
  if (user?.role === 'user' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/user/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};