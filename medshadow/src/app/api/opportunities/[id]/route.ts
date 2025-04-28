import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Opportunity } from '@/models/Opportunity';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    const opportunity = await Opportunity.findById(id)
      .populate('facility', 'name location contact')
      .populate({
        path: 'applications',
        populate: {
          path: 'student',
          select: 'name email'
        }
      });

    if (!opportunity) {
      return NextResponse.json(
        { message: 'Opportunity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        opportunity
      }
    });
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return NextResponse.json(
      { message: 'Error fetching opportunity' },
      { status: 500 }
    );
  }
} 