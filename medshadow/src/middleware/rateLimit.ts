import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client with fallback
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (error) {
  console.error('Failed to initialize Redis client:', error);
}

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts
  message: 'Too many requests, please try again later',
};

export async function rateLimit(
  request: NextRequest,
  config: Partial<RateLimitConfig> = {}
): Promise<NextResponse | null> {
  // If Redis is not configured, skip rate limiting
  if (!redis) {
    return null;
  }

  const { windowMs, max, message } = { ...defaultConfig, ...config };
  
  try {
    const ip = request.ip || 'anonymous';
    const key = `rate-limit:${ip}`;
    
    // Get current count
    const count = await redis.incr(key);
    
    // Set expiry on first request
    if (count === 1) {
      await redis.expire(key, Math.floor(windowMs / 1000));
    }
    
    // Check if rate limit exceeded
    if (count > max) {
      return new NextResponse(
        JSON.stringify({ error: message }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(windowMs / 1000).toString(),
          },
        }
      );
    }
    
    return null;
  } catch (error) {
    console.error('Rate limit error:', error);
    // Fail open - allow request if rate limiting fails
    return null;
  }
}

// Specific rate limiters
export const loginRateLimit = (request: NextRequest) => 
  rateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts
    message: 'Too many login attempts, please try again later',
  });

export const passwordResetRateLimit = (request: NextRequest) =>
  rateLimit(request, {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 attempts
    message: 'Too many password reset attempts, please try again later',
  }); 