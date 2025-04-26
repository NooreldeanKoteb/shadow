import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { verifyToken } from '@/lib/auth';

// Mock user data for demonstration
const mockUser = {
  _id: 'user123', // Using the same ID as in [id]/route.ts
  name: 'John Doe',
  email: 'john@example.com',
  role: 'student',
  profileImage: '/images/default-avatar.jpg',
  school: 'University of Medical Sciences',
  graduationYear: '2025',
  degree: 'Bachelor of Science (BS)',
  major: 'Pre-Medicine',
  bio: 'Passionate medical student with a focus on pediatric care. Looking for opportunities to gain hands-on experience in clinical settings.',
  location: 'Boston, MA',
  interests: ['Pediatrics', 'Emergency Medicine', 'Family Practice']
};

export async function GET() {
  try {
    // In a real application, this would:
    // 1. Get the user ID from the JWT token
    // 2. Fetch the user data from your database
    return NextResponse.json({ user: mockUser });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    // In a real application, this would update the user data in your database
    console.log('Would update user with data:', data);
    return NextResponse.json({ user: { ...mockUser, ...data } });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 