import axios from 'axios';
import sendgridMail from '@sendgrid/mail';
import { User } from '../entities/User';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@narrivex.tech';
const APP_URL = process.env.APP_URL || 'https://narrivex.tech';

if (SENDGRID_API_KEY) {
  sendgridMail.setApiKey(SENDGRID_API_KEY);
}

export const notificationService = {
  async notify(user: User, channel: string, message: string) {
    if (channel === 'slack' && user.slackWebhookUrl) {
      await axios.post(
        user.slackWebhookUrl,
        { text: message },
        { timeout: 5000 }
      );
      return;
    }

    if (channel === 'email') {
      if (SENDGRID_API_KEY) {
        await sendgridMail.send({
          to: user.email,
          from: EMAIL_FROM,
          subject: 'Narrivex Alert Triggered',
          text: message,
          html: `<p>${message}</p>`,
        });
        return;
      }

      // Fallback for environments without SendGrid configured.
      console.log(`[EMAIL-FALLBACK] to=${user.email} message=${message}`);
      return;
    }

    console.log(`[NOTIFY:${channel}] user=${user.id} message=${message}`);
  },

  async sendOTPEmail(email: string, otp: string) {
    const subject = 'Your Narrivex Login Code';
    const text = `Your one-time password is: ${otp}. This code expires in 5 minutes.`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #111827; margin: 0; font-size: 24px;">🔐 Sign In to Narrivex</h1>
        </div>
        
        <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">Use this code to sign in to your Narrivex account:</p>
        
        <div style="background: #f3f4f6; border: 2px solid #00a0a0; border-radius: 12px; padding: 20px; text-align: center; margin: 30px 0;">
          <p style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 3px; color: #00a0a0; font-family: 'Courier New', monospace;">${otp}</p>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-bottom: 5px;">This code expires in 5 minutes.</p>
        <p style="color: #6b7280; font-size: 14px; margin: 0;">If you didn't request this code, you can safely ignore this email.</p>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            © 2026 Narrivex. All rights reserved.<br>
            <a href="${APP_URL}" style="color: #00a0a0; text-decoration: none;">Visit Narrivex</a>
          </p>
        </div>
      </div>
    `;

    if (SENDGRID_API_KEY) {
      await sendgridMail.send({
        to: email,
        from: EMAIL_FROM,
        subject,
        text,
        html,
      });
      return;
    }

    // Fallback for environments without SendGrid configured
    console.log(`[OTP-EMAIL-FALLBACK] to=${email} otp=${otp}`);
  },

  async sendPasswordResetEmail(email: string, resetLink: string, userName: string) {
    const subject = 'Reset Your Narrivex Password';
    const text = `Click the link below to reset your password: ${resetLink}. This link expires in 24 hours.`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #111827; margin: 0; font-size: 24px;">🔑 Reset Your Password</h1>
        </div>
        
        <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">Hi ${userName},</p>
        
        <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px;">We received a request to reset your Narrivex password. Click the button below to create a new password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background: #00a0a0; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">Reset Password</a>
        </div>
        
        <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px;">Or copy and paste this link in your browser:</p>
        <p style="background: #f3f4f6; padding: 12px; border-radius: 6px; font-size: 12px; word-break: break-all; color: #374151;">
          ${resetLink}
        </p>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">This link expires in 24 hours for security reasons.</p>
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">If you didn't request a password reset, please ignore this email or <a href="${APP_URL}/contact" style="color: #00a0a0; text-decoration: none;">contact support</a>.</p>
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            © 2026 Narrivex. All rights reserved.<br>
            <a href="${APP_URL}" style="color: #00a0a0; text-decoration: none;">Visit Narrivex</a>
          </p>
        </div>
      </div>
    `;

    if (SENDGRID_API_KEY) {
      await sendgridMail.send({
        to: email,
        from: EMAIL_FROM,
        subject,
        text,
        html,
      });
      return;
    }

    // Fallback for environments without SendGrid configured
    console.log(`[PASSWORD-RESET-EMAIL-FALLBACK] to=${email} link=${resetLink}`);
  },
};