// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add custom jest matchers from jest-dom
import { MessagePort, MessageChannel } from 'worker_threads';
import { ReadableStream } from 'stream/web';

// Polyfill for MessagePort and MessageChannel
global.MessagePort = MessagePort;
global.MessageChannel = MessageChannel;

// Polyfill for ReadableStream
global.ReadableStream = ReadableStream;

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
    redirect: jest.fn(),
  },
}));

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock environment variables
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.EMAIL_SERVER_HOST = 'smtp.example.com';
process.env.EMAIL_SERVER_PORT = '587';
process.env.EMAIL_SERVER_USER = 'test@example.com';
process.env.EMAIL_SERVER_PASSWORD = 'test-password';
process.env.EMAIL_FROM = 'test@example.com';

// Add dummy Upstash Redis environment variables for tests
process.env.UPSTASH_REDIS_REST_URL = 'https://dummy.upstash.io';
process.env.UPSTASH_REDIS_REST_TOKEN = 'dummy-token';

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
}); 