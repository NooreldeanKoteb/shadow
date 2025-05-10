import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/emailVerification';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const email = await verifyToken(token);
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    user.emailVerified = true;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
} 