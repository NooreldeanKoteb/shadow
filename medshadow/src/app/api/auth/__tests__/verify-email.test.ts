import { NextRequest } from 'next/server';
import { GET } from '../verify-email/route';
import { verifyToken } from '@/utils/emailVerification';
import User from '@/models/User';

// Mock the email verification utility
jest.mock('@/utils/emailVerification', () => ({
  verifyToken: jest.fn(),
}));

// Mock the User model
jest.mock('@/models/User', () => ({
  findOne: jest.fn(),
}));

describe('Email Verification API', () => {
  let mockUser: any;

  beforeEach(() => {
    mockUser = {
      emailVerified: false,
      save: jest.fn().mockResolvedValue(true),
    };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (verifyToken as jest.Mock).mockResolvedValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 for missing token', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/verify-email');
    const response = await GET(request);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Token is required');
  });

  it('should return 400 for invalid token', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/verify-email?token=invalid');
    (verifyToken as jest.Mock).mockResolvedValue(false);
    const response = await GET(request);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid token');
  });

  it('should return 404 for non-existent user', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/verify-email?token=valid-token');
    (User.findOne as jest.Mock).mockResolvedValue(null);
    const response = await GET(request);
    const data = await response.json();
    expect(response.status).toBe(404);
    expect(data.error).toBe('User not found');
  });

  it('should verify email for valid token', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/verify-email?token=valid-token');
    const response = await GET(request);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe('Email verified successfully');
    expect(mockUser.emailVerified).toBe(true);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('should handle server errors', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/verify-email?token=valid-token');
    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
    const response = await GET(request);
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to verify email');
  });
}); 