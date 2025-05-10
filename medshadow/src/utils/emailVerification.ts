import { randomBytes } from 'crypto';
import { getRedisClient } from './redisClient';
import { sendEmail } from './email';

export async function generateVerificationToken(email: string): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const redis = getRedisClient();
  await redis.set(`email-verification:${email}`, token, {
    ex: 24 * 60 * 60, // 24 hours
  });
  return token;
}

export async function verifyEmailToken(email: string, token: string): Promise<boolean> {
  const redis = getRedisClient();
  const storedToken = await redis.get(`email-verification:${email}`);
  if (!storedToken || storedToken !== token) {
    return false;
  }
  await redis.del(`email-verification:${email}`);
  return true;
}

export async function sendVerificationEmail(email: string, name: string): Promise<void> {
  const token = await generateVerificationToken(email);
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html: `
      <p>Hello ${name},</p>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  });
} 