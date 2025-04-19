import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/middleware/auth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // In a real application, you might want to:
    // 1. Add the token to a blacklist in Redis or similar
    // 2. Clear any server-side session data
    // 3. Set a cookie with an expired date
    
    // For this simple implementation, we'll just return a success message
    // The client should handle removing the token from local storage
    
    return res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

// Require authentication to logout (to prevent CSRF attacks)
export default withAuth(handler); 