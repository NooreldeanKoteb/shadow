import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function csrfProtection(request: NextRequest): Promise<NextResponse | null> {
  // Skip CSRF check for GET requests
  if (request.method === 'GET') {
    return null;
  }

  try {
    const token = await getToken({ req: request });
    
    // Skip CSRF check for unauthenticated requests
    if (!token) {
      return null;
    }

    // Get CSRF token from header
    const csrfToken = request.headers.get('x-csrf-token');
    
    // Get session token
    const sessionToken = token.csrfToken;

    // Verify CSRF token
    if (!csrfToken || csrfToken !== sessionToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid CSRF token' }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return null;
  } catch (error) {
    console.error('CSRF protection error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'CSRF verification failed' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 