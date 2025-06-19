import emailjs from 'emailjs-com';
import { APP_CONFIG } from '@/constants/app-config';

/**
 * Service for sending emails
 */
export const sendEmail = (templateParams: Record<string, unknown>) => {
  return emailjs.send(
    APP_CONFIG.EMAILJS_SERVICE_ID,
    APP_CONFIG.EMAILJS_TEMPLATE_ID,
    templateParams,
    APP_CONFIG.EMAILJS_USER_ID
  );
};

export const sendNewsletterConfirmation = (email: string) => {
  return sendEmail({
    to_email: email,
    subject: 'Subscription Confirmation',
    message: 'Thank you for subscribing to Momoz Oil Perfume Vault!'
  });
};