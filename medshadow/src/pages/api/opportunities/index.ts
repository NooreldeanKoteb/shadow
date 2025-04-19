import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Opportunity, IOpportunity } from '@/models/Opportunity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // Parse query parameters
    const {
      page = '1',
      limit = '10',
      type,
      specialty,
      isPaid,
      status = 'active',
      facility,
      search,
    } = req.query;

    // Build filter object
    const filter: Record<string, any> = { status };
    if (type) filter.type = type;
    if (specialty) filter.specialty = specialty;
    if (isPaid !== undefined) filter.isPaid = isPaid === 'true';
    if (facility) filter.facility = facility;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const [opportunities, total] = await Promise.all([
      Opportunity.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('facility', 'name location'),
      Opportunity.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        opportunities,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return res.status(500).json({ message: 'Error fetching opportunities' });
  }
} 