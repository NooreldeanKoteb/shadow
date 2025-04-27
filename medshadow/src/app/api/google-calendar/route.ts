import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { googleCalendarService } from '@/lib/services/googleCalendar';

// GET /api/google-calendar/auth
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authUrl = await googleCalendarService.getAuthUrl();
    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Error getting Google Calendar auth URL:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/google-calendar/sync
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deadlines, accessToken } = await req.json();
    if (!deadlines || !Array.isArray(deadlines)) {
      return NextResponse.json({ error: 'Invalid deadlines data' }, { status: 400 });
    }

    const googleEvents = deadlines.map(deadline => 
      googleCalendarService.convertDeadlineToGoogleEvent(deadline)
    );

    const results = await googleCalendarService.syncEvents(accessToken, googleEvents);
    
    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/google-calendar/callback
export async function POST_CALLBACK(req: Request) {
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