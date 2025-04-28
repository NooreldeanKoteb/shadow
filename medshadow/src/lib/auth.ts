import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export interface TokenPayload {
  id: string;
  userId: string;
  role: string;
  interests?: string[];
  iat: number;
  exp: number;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as unknown as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function generateToken(userId: string, role: string, interests?: string[]): string {
  return jwt.sign({ id: userId, userId, role, interests }, JWT_SECRET as string, { expiresIn: '7d' });
} 