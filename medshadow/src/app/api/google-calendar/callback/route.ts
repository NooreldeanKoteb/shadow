import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { googleCalendarService } from '@/lib/services/googleCalendar';

// POST /api/google-calendar/callback
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Authorization code required' }, { status: 400 });
    }

    const tokens = await googleCalendarService.getTokens(code);
    // TODO: Store tokens securely in the database associated with the user
    return NextResponse.json({
      success: true,
      accessToken: tokens.access_token,
    });
  } catch (error) {
    console.error('Error handling Google Calendar callback:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 