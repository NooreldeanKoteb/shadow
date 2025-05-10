// Mock NextResponse from next/server
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => {
      return {
        ...init,
        json: async () => data,
        status: init?.status || 200,
      };
    }),
    redirect: jest.fn(),
  },
}));

import { POST } from '../resend-verification/route';
import { sendVerificationEmail } from '@/utils/emailVerification';
import { User } from '@/models/User';

// Mock dependencies
jest.mock('@/utils/emailVerification');
jest.mock('@/lib/mongodb');
jest.mock('@/models/User');

describe('Resend Verification API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function createRequest(bodyObj: any) {
    return {
      method: 'POST',
      json: async () => bodyObj,
    } as any;
  }

  it('should return 400 for missing email', async () => {
    const request = createRequest({});
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Email is required');
  });

  it('should return 404 for non-existent user', async () => {
    const request = createRequest({ email: 'nonexistent@example.com' });
    (User.findOne as jest.Mock).mockResolvedValue(null);
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(404);
    expect(data.error).toBe('User not found');
  });

  it('should return 400 for already verified email', async () => {
    const request = createRequest({ email: 'verified@example.com' });
    (User.findOne as jest.Mock).mockResolvedValue({
      email: 'verified@example.com',
      emailVerified: true,
    });
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe('Email is already verified');
  });

  it('should send verification email for unverified user', async () => {
    const request = createRequest({ email: 'unverified@example.com' });
    (User.findOne as jest.Mock).mockResolvedValue({
      email: 'unverified@example.com',
      name: 'Test User',
      emailVerified: false,
    });
    (sendVerificationEmail as jest.Mock).mockResolvedValue(undefined);
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe('Verification email sent');
    expect(sendVerificationEmail).toHaveBeenCalledWith('unverified@example.com', 'Test User');
  });

  it('should handle email sending errors', async () => {
    const request = createRequest({ email: 'error@example.com' });
    (User.findOne as jest.Mock).mockResolvedValue({
      email: 'error@example.com',
      name: 'Test User',
      emailVerified: false,
    });
    (sendVerificationEmail as jest.Mock).mockRejectedValue(new Error('Email sending failed'));
    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to resend verification email');
  });
}); 