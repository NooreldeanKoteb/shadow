import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test database connection
    await connectToDatabase();
    
    return res.status(200).json({
      success: true,
      message: 'API is working correctly',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: 'Connected to MongoDB'
    });
  } catch (error) {
    console.error('Test API error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error connecting to database',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 