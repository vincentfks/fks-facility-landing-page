import { sanitizeContactData, checkRateLimit } from './security';
import { generateEmailHtml } from './email-template';

const RESEND_API_URL = 'https://api.resend.com/emails';
/**
 * WARNING: Exposing API keys in client-side code is a security risk.
 * In a production environment, this key should be kept on a secure backend server.
 * Anyone with access to this bundle can potentially use this key to send emails.
 * 
 * Recommended fix: Move email sending logic to a serverless function (e.g., Vercel Functions, Supabase Edge Functions)
 * and call that function from here instead of calling Resend directly.
 */
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  employees_range?: string;
  sector?: string;
  message?: string;
  current_spending?: number;
  source?: 'contact' | 'simulation' | 'solution';
  supplies_interests?: string;
}

export interface SimulationData extends ContactData {
  current_spending: number;
  sector: string;
}

/**
 * Send email via Resend API
 */
const sendEmailViaResend = async (data: ContactData) => {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  // Rate limiting check
  const rateLimitKey = `email_${data.email}`;
  if (!checkRateLimit(rateLimitKey, 5, 900000)) {
    throw new Error('Trop de requêtes. Veuillez réessayer dans quelques minutes.');
  }

  // Sanitize and validate data
  const sanitized = sanitizeContactData(data);

  // Generate email content
  const emailHtml = generateEmailHtml(sanitized);

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'FKS Facility <onboarding@resend.dev>', // Update with verified domain
      to: ['franck.k@fks-facility.com'],
      subject: `Nouvelle demande FKS (${data.source || 'contact'}): ${sanitized.company || sanitized.name}`,
      html: emailHtml,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to send email: ${errorData}`);
  }

  return response.json();
};

/**
 * Create Stripe Checkout Session
 * Note: This should be implemented server-side for security
 */
const createStripeCheckout = async (_priceId: string) => {
  // For production, you should call your own API endpoint that uses the secret key
  // This is a placeholder - you'll need to implement a server-side endpoint
  throw new Error('Stripe Checkout must be implemented server-side. Please create an API endpoint.');
};

export const api = {
  async submitContact(data: ContactData) {
    try {
      return await sendEmailViaResend({
        ...data,
        source: data.source || 'contact',
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      throw error;
    }
  },

  async submitSimulation(data: SimulationData) {
    try {
      return await sendEmailViaResend({
        ...data,
        source: 'simulation',
      });
    } catch (error) {
      console.error('Simulation submission error:', error);
      throw error;
    }
  },

  async createCheckoutSession(priceId: string) {
    return createStripeCheckout(priceId);
  },
};
