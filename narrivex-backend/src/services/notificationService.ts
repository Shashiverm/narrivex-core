import axios from 'axios';
import sendgridMail from '@sendgrid/mail';
import { User } from '../entities/User';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@narrivex.tech';

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
};