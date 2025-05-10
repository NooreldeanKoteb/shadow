import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@medshadow.com',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
} 