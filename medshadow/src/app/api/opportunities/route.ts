import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Opportunity } from '@/models/Opportunity';
import { verifyToken } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const specialty = searchParams.get('specialty');
    const type = searchParams.get('type');
    
    const query: any = {};
    if (specialty) query.specialty = specialty;
    if (type) query.type = type;

    const opportunities = await Opportunity.find(query)
      .populate('facility', 'name location contact')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Opportunity.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        opportunities,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { message: 'Error fetching opportunities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const token = headersList.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);
    
    if (!user || user.role !== 'facility') {
      return NextResponse.json(
        { message: 'Unauthorized - Must be a facility' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const data = await request.json();
    
    const opportunity = new Opportunity({
      ...data,
      facility: user.id
    });

    await opportunity.save();

    return NextResponse.json({
      success: true,
      data: {
        opportunity
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { message: 'Error creating opportunity' },
      { status: 500 }
    );
  }
} 