import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import { z } from 'zod';
import type { Deadline } from '@/app/deadlines/page';

// Validation schema for deadline
const deadlineSchema = z.object({
  title: z.string().min(1),
  start: z.string().datetime(),
  end: z.string().datetime(),
  type: z.enum(['application', 'interview', 'start_date', 'school_deadline', 'other']),
  description: z.string().optional(),
  location: z.string().optional(),
  color: z.string().optional(),
});

// GET /api/deadlines
export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // TODO: Replace with actual database query
    const deadlines: Deadline[] = []; // Query from MongoDB

    return NextResponse.json(deadlines);
  } catch (error) {
    console.error('Error fetching deadlines:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/deadlines
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = deadlineSchema.parse(body);

    // TODO: Save to MongoDB
    const deadline = {
      ...validatedData,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json(deadline, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating deadline:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/deadlines/[id]
export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = deadlineSchema.parse(body);

    // TODO: Update in MongoDB
    const deadline = {
      ...validatedData,
      updatedAt: new Date(),
    };

    return NextResponse.json(deadline);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error updating deadline:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/deadlines/[id]
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = req.url.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'Invalid deadline ID' }, { status: 400 });
    }

    // TODO: Delete from MongoDB
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting deadline:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 