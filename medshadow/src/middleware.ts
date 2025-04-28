import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/signin', '/auth/signup', '/api/auth'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // If there's no token and it's not a public path, redirect to signin
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check role-based access
  const userRole = token.role;
  const isStudentPath = pathname.startsWith('/student') || pathname.startsWith('/dashboard/student');
  const isFacilityPath = pathname.startsWith('/facility') || pathname.startsWith('/dashboard/facility');

  if ((isStudentPath && userRole !== 'student') || (isFacilityPath && userRole !== 'facility')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}; 