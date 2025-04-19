import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Opportunity, IOpportunity } from '@/models/Opportunity';
import { Application, IApplication } from '@/models/Application';
import { verifyToken } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Connect to database
    await connectToDatabase();

    // Get user and verify role
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'facility') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Get opportunities for this facility
    const opportunities = await Opportunity.find({ facility: user._id });
    
    // Get applications for these opportunities
    const opportunityIds = opportunities.map(opp => opp._id);
    const applications = await Application.find({
      opportunity: { $in: opportunityIds }
    });

    // Calculate statistics
    const stats = {
      totalOpportunities: opportunities.length,
      activeOpportunities: opportunities.filter(opp => opp.status === 'active').length,
      totalApplicants: applications.length
    };

    // Format opportunities data
    const formattedOpportunities = opportunities.map(opp => ({
      id: opp._id,
      title: opp.title,
      applicants: applications.filter((app: IApplication) => app.opportunity.toString() === opp._id.toString()).length,
      status: opp.status
    }));

    return res.status(200).json({
      success: true,
      data: {
        opportunities: formattedOpportunities,
        stats
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 