import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import type { Deadline } from '@/app/deadlines/page';

export interface GoogleCalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  colorId?: string;
}

class GoogleCalendarService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  async getAuthUrl(): Promise<string> {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  async addEvent(accessToken: string, event: GoogleCalendarEvent) {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding event to Google Calendar:', error);
      throw error;
    }
  }

  async listEvents(accessToken: string, timeMin: Date, timeMax: Date) {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    try {
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });
      return response.data.items;
    } catch (error) {
      console.error('Error listing Google Calendar events:', error);
      throw error;
    }
  }

  async syncEvents(accessToken: string, events: GoogleCalendarEvent[]) {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const results = await Promise.allSettled(
      events.map(event => 
        calendar.events.insert({
          calendarId: 'primary',
          requestBody: event,
        })
      )
    );

    return results.map((result, index) => ({
      event: events[index],
      success: result.status === 'fulfilled',
      error: result.status === 'rejected' ? result.reason : null,
    }));
  }

  // Convert MedShadow deadline to Google Calendar event format
  convertDeadlineToGoogleEvent(deadline: Deadline): GoogleCalendarEvent {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return {
      summary: deadline.title,
      description: deadline.description,
      location: deadline.location,
      start: {
        dateTime: new Date(deadline.start).toISOString(),
        timeZone,
      },
      end: {
        dateTime: new Date(deadline.end).toISOString(),
        timeZone,
      },
      colorId: this.getColorIdForType(deadline.type),
    };
  }

  private getColorIdForType(type: string): string {
    // Google Calendar color IDs (1-11)
    const colorMap: Record<string, string> = {
      application: '1',    // Blue
      interview: '2',      // Green
      start_date: '3',     // Purple
      school_deadline: '4', // Red
      other: '5',          // Yellow
    };
    return colorMap[type] || '1';
  }
}

export const googleCalendarService = new GoogleCalendarService(); 