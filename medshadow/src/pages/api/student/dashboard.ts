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
    if (!user || user.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Get applications for this student
    const applications = await Application.find({ student: user._id })
      .populate('opportunity')
      .sort({ createdAt: -1 });

    // Get saved opportunities (this would be implemented with a separate model in a real app)
    const savedOpportunities = await Opportunity.find({ 
      _id: { $in: [] } // This would be populated from a SavedOpportunity model
    }).limit(5);

    // Calculate statistics
    const stats = {
      totalApplications: applications.length,
      acceptedApplications: applications.filter(app => app.status === 'accepted').length,
      pendingApplications: applications.filter(app => app.status === 'pending').length,
      savedOpportunities: savedOpportunities.length
    };

    // Format applications data
    const formattedApplications = applications.map(app => ({
      id: app._id,
      opportunity: (app.opportunity as IOpportunity).title,
      facility: (app.opportunity as IOpportunity).facility.toString(), // This would be populated in a real app
      status: app.status
    }));

    // Format saved opportunities data
    const formattedSavedOpportunities = savedOpportunities.map(opp => ({
      id: opp._id,
      title: opp.title,
      facility: opp.facility.toString(), // This would be populated in a real app
      location: opp.location.city + ', ' + opp.location.state
    }));

    return res.status(200).json({
      success: true,
      data: {
        applications: formattedApplications,
        savedOpportunities: formattedSavedOpportunities,
        stats
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 