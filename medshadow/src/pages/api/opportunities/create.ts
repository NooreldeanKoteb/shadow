import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Opportunity, IOpportunity } from '@/models/Opportunity';
import { User } from '@/models/User';
import { verifyToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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
      return res.status(403).json({ message: 'Only facilities can create opportunities' });
    }

    // Validate required fields
    const {
      title,
      description,
      type,
      specialty,
      duration,
      schedule,
      requirements,
      isPaid,
      location,
    } = req.body;

    if (!title || !description || !type || !specialty || !duration || !schedule || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate opportunity type
    const validTypes = ['shadowing', 'rotation', 'volunteering', 'internship'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid opportunity type' });
    }

    // Create new opportunity
    const opportunity = await Opportunity.create({
      title,
      description,
      type,
      specialty,
      duration,
      schedule,
      requirements: requirements || [],
      isPaid: isPaid || false,
      location,
      facility: user._id,
      status: 'active',
    });

    return res.status(201).json({
      success: true,
      message: 'Opportunity created successfully',
      opportunity,
    });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return res.status(500).json({ message: 'Error creating opportunity' });
  }
} 