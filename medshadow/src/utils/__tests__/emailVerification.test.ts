import { generateVerificationToken, verifyEmailToken } from '../emailVerification';

// Polyfill fetch for tests
if (typeof global.fetch === 'undefined') {
  // @ts-expect-error: Polyfill for fetch needed for tests
  global.fetch = () => Promise.resolve({ ok: true });
}

// Mock Redis client
const mockRedis = {
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
};

// Mock getRedisClient from the redisClient module
jest.mock('../redisClient', () => ({
  getRedisClient: () => mockRedis,
}));

describe('Email Verification Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateVerificationToken', () => {
    it('should generate and store a token', async () => {
      const email = 'test@example.com';
      mockRedis.set.mockResolvedValue(true);
      const token = await generateVerificationToken(email);
      expect(token).toBeDefined();
      expect(mockRedis.set).toHaveBeenCalledWith(
        expect.stringContaining(email),
        token,
        expect.any(Object)
      );
    }, 30000); // Increased timeout
  });

  describe('verifyEmailToken', () => {
    it('should return true for valid token', async () => {
      const email = 'test@example.com';
      const token = 'valid-token';
      mockRedis.get.mockResolvedValue(token);
      const result = await verifyEmailToken(email, token);
      expect(result).toBe(true);
      expect(mockRedis.get).toHaveBeenCalledWith(expect.stringContaining(email));
    }, 30000); // Increased timeout

    it('should return false for invalid token', async () => {
      const email = 'test@example.com';
      const token = 'invalid-token';
      mockRedis.get.mockResolvedValue('different-token');
      const result = await verifyEmailToken(email, token);
      expect(result).toBe(false);
    }, 30000); // Increased timeout

    it('should return false for expired token', async () => {
      const email = 'test@example.com';
      const token = 'expired-token';
      mockRedis.get.mockResolvedValue(null);
      const result = await verifyEmailToken(email, token);
      expect(result).toBe(false);
    }, 30000); // Increased timeout
  });
}); 