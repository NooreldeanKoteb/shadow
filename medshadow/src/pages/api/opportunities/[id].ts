import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Opportunity, IOpportunity } from '@/models/Opportunity';
import { Application, IApplication } from '@/models/Application';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid opportunity ID' });
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
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    return res.status(200).json({
      success: true,
      data: {
        opportunity
      }
    });
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return res.status(500).json({ message: 'Error fetching opportunity' });
  }
} 