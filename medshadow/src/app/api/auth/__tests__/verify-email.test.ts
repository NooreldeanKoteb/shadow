// Polyfill Request for Next.js API route tests
if (typeof global.Request === 'undefined') {
  // @ts-expect-error: Polyfill for Request needed for Next.js API route tests
  global.Request = class {};
}

import { GET } from '../verify-email/route';
import { User } from '@/models/User';
import { verifyEmailToken } from '@/utils/emailVerification';
import type { NextRequest } from 'next/server';

// Mock NextRequest
class MockNextRequest extends Request {
  cookies: Map<string, string>;
  geo: { city?: string; country?: string; region?: string };
  ip: string;
  nextUrl: URL;
  headers: Headers;

  constructor(url: string) {
    super(url);
    this.cookies = new Map();
    this.geo = {};
    this.ip = '127.0.0.1';
    this.nextUrl = new URL(url);
    this.headers = new Headers();
  }
}

// Mock NextResponse.json to avoid ReadableStream/undici issues
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, init?: { status?: number }) => ({
      json: async () => data,
      status: init?.status || 200,
    }),
  },
}));

// Mock the User model as a named export
jest.mock('@/models/User', () => ({
  __esModule: true,
  User: { findOne: jest.fn() },
}));

// Mock verifyEmailToken
jest.mock('@/utils/emailVerification', () => ({
  verifyEmailToken: jest.fn(),
}));

describe('Email Verification API', () => {
  let mockUser: unknown;

  beforeEach(() => {
    mockUser = {
      emailVerified: false,
      save: jest.fn().mockResolvedValue(true),
    };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (verifyEmailToken as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 for missing token or email', async () => {
    const request = new MockNextRequest('http://localhost:3000/api/auth/verify-email');
    const response = await GET(request as unknown as NextRequest);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Token and email are required');
  });

  it('should return 400 for invalid token', async () => {
    const request = new MockNextRequest('http://localhost:3000/api/auth/verify-email?token=invalid&email=test@example.com');
    // Simulate verifyEmailToken returning false
    (verifyEmailToken as jest.Mock).mockResolvedValueOnce(false);
    const response = await GET(request as unknown as NextRequest);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid token');
  });

  it('should return 404 for non-existent user', async () => {
    const request = new MockNextRequest('http://localhost:3000/api/auth/verify-email?token=valid-token&email=test@example.com');
    (User.findOne as jest.Mock).mockResolvedValue(null);
    const response = await GET(request as unknown as NextRequest);
    const data = await response.json();
    expect(response.status).toBe(404);
    expect(data.error).toBe('User not found');
  });

  it('should verify email for valid token', async () => {
    const request = new MockNextRequest('http://localhost:3000/api/auth/verify-email?token=valid-token&email=test@example.com');
    const response = await GET(request as unknown as NextRequest);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe('Email verified successfully');
    expect((mockUser as { emailVerified: boolean }).emailVerified).toBe(true);
    expect((mockUser as { save: jest.Mock }).save).toHaveBeenCalled();
  });

  it('should handle server errors', async () => {
    const request = new MockNextRequest('http://localhost:3000/api/auth/verify-email?token=valid-token&email=test@example.com');
    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
    const response = await GET(request as unknown as NextRequest);
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to verify email');
  });
}); 