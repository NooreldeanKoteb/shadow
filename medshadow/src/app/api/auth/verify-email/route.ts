import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailToken } from '@/utils/emailVerification';
import { User } from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    const email = request.nextUrl.searchParams.get('email');
    
    if (!token || !email) {
      return NextResponse.redirect(new URL('/auth/verify-email/error', request.url));
    }

    const isValid = await verifyEmailToken(email, token);
    if (!isValid) {
      return NextResponse.redirect(new URL('/auth/verify-email/error', request.url));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.redirect(new URL('/auth/verify-email/error', request.url));
    }

    user.emailVerified = true;
    await user.save();

    return NextResponse.redirect(new URL('/auth/verify-email/success', request.url));
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(new URL('/auth/verify-email/error', request.url));
  }
} 