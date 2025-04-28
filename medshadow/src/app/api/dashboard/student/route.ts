import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { Application } from '@/models/Application';
import { Opportunity } from '@/models/Opportunity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
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
    
    if (!user || user.role !== 'student') {
      return NextResponse.json(
        { message: 'Unauthorized - Must be a student' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Get student's applications
    const applications = await Application.find({ student: user.id })
      .populate({
        path: 'opportunity',
        populate: {
          path: 'facility',
          select: 'name location'
        }
      })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recommended opportunities based on student's interests
    const recommendedOpportunities = await Opportunity.find({
      specialty: { $in: user.interests || [] },
      _id: { $nin: applications.map(app => app.opportunity._id) }
    })
    .populate('facility', 'name location')
    .limit(5);

    return NextResponse.json({
      success: true,
      data: {
        applications,
        recommendedOpportunities,
        stats: {
          totalApplications: await Application.countDocuments({ student: user.id }),
          pendingApplications: await Application.countDocuments({ 
            student: user.id,
            status: 'pending'
          })
        }
      }
    });
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    return NextResponse.json(
      { message: 'Error fetching dashboard data' },
      { status: 500 }
    );
  }
} 