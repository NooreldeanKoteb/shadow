import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

interface SMTPError extends Error {
  code?: string;
  command?: string;
  responseCode?: number;
  response?: string;
}

// Create reusable transporter
let transporter: nodemailer.Transporter;

async function createTransporter() {
  if (process.env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
    // Create test account for development if no SMTP credentials are provided
    const testAccount = await nodemailer.createTestAccount();
    console.log('Ethereal Email Account created:', {
      user: testAccount.user,
      pass: testAccount.pass,
      web: 'https://ethereal.email/login'
    });
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Production SMTP configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  try {
    if (!transporter) {
      transporter = await createTransporter();
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@medshadow.com',
      to,
      subject,
      html,
    });

    if (process.env.NODE_ENV === 'development') {
      if (info.messageId) {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
    }
  } catch (error) {
    const smtpError = error as SMTPError;
    console.error('Failed to send email:', {
      error: smtpError.message,
      code: smtpError.code,
      command: smtpError.command,
      responseCode: smtpError.responseCode,
      response: smtpError.response
    });
    throw new Error('Failed to send email');
  }
} 