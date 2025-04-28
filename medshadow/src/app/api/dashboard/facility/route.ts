import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';
import { Opportunity } from '@/models/Opportunity';
import { Application } from '@/models/Application';

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
    
    if (!user || user.role !== 'facility') {
      return NextResponse.json(
        { message: 'Unauthorized - Must be a facility' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Get facility's opportunities
    const opportunities = await Opportunity.find({ facility: user.id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get recent applications for facility's opportunities
    const recentApplications = await Application.find({
      opportunity: { $in: opportunities.map(opp => opp._id) }
    })
    .populate('student', 'name email')
    .populate('opportunity', 'title')
    .sort({ createdAt: -1 })
    .limit(5);

    return NextResponse.json({
      success: true,
      data: {
        opportunities,
        recentApplications,
        stats: {
          totalOpportunities: await Opportunity.countDocuments({ facility: user.id }),
          totalApplications: await Application.countDocuments({
            opportunity: { $in: opportunities.map(opp => opp._id) }
          }),
          activeOpportunities: await Opportunity.countDocuments({
            facility: user.id,
            status: 'active'
          })
        }
      }
    });
  } catch (error) {
    console.error('Error fetching facility dashboard:', error);
    return NextResponse.json(
      { message: 'Error fetching dashboard data' },
      { status: 500 }
    );
  }
} 