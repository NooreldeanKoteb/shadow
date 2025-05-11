import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { generateToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/utils/emailVerification';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['student', 'facility'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be either "student" or "facility"' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create user (password will be hashed by the pre-save hook)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      emailVerified: false // Explicitly set to false
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, name);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails, but log the error
    }

    // Generate JWT token
    const token = generateToken(user._id.toString(), user.role);

    // Create user object without password
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified
    };

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: 'Registration successful. Please check your email to verify your account.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 