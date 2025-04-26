import { NextResponse } from 'next/server';

// Mock user data for demonstration
const mockUsers = {
  'user123': {
    _id: 'user123',
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
  },
  // Add more mock users as needed
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real application, this would fetch from your database
    const user = mockUsers[params.id as keyof typeof mockUsers];
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 