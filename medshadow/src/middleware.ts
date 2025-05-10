import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { loginRateLimit, passwordResetRateLimit } from './middleware/rateLimit';
import { csrfProtection } from './middleware/csrf';

// Define role-based access control
const roleBasedAccess = {
  student: ['/dashboard', '/applications', '/profile', '/resources'],
  facility: ['/dashboard', '/opportunities', '/profile', '/applications']
};

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Apply rate limiting for auth-related routes
    if (pathname.startsWith('/auth/signin')) {
      const rateLimitResponse = await loginRateLimit(request);
      if (rateLimitResponse) return rateLimitResponse;
    }

    if (pathname.startsWith('/auth/reset-password')) {
      const rateLimitResponse = await passwordResetRateLimit(request);
      if (rateLimitResponse) return rateLimitResponse;
    }

    // Apply CSRF protection for non-GET requests
    const csrfResponse = await csrfProtection(request);
    if (csrfResponse) return csrfResponse;

    const token = await getToken({ req: request });

    // Public paths that don't require authentication
    const publicPaths = ['/', '/auth/signin', '/auth/signup'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // If it's a public path
    if (isPublicPath) {
      // Only redirect to dashboard if explicitly trying to access signin/signup while authenticated
      if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // If there's no token and it's not a public path, redirect to signin
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Check role-based access
    const userRole = token.role as keyof typeof roleBasedAccess;
    const allowedPaths = roleBasedAccess[userRole] || [];
    
    // Check if user has access to the requested path
    const hasAccess = allowedPaths.some(path => pathname.startsWith(path));
    
    if (!hasAccess) {
      // Redirect to unauthorized page or dashboard
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to error page
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/signin',
    '/auth/signup',
    '/auth/reset-password',
    '/applications/:path*',
    '/opportunities/:path*',
    '/profile/:path*',
    '/resources/:path*'
  ],
}; 