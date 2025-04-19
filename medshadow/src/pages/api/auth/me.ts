import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/middleware/auth';
import { AuthenticatedRequest } from '@/middleware/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // The user is already attached to the request by the withAuth middleware
    return res.status(200).json({
      message: 'User information retrieved successfully',
      user: req.user,
    });
  } catch (error) {
    console.error('Error retrieving user information:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

export default withAuth(handler); 