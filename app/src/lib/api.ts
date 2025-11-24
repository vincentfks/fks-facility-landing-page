import { sanitizeContactData, checkRateLimit } from './security';

const RESEND_API_URL = 'https://api.resend.com/emails';
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

  // Construct email content
  let emailHtml = `
    <h1>Nouvelle demande : ${(data.source || 'contact').toUpperCase()}</h1>
    <p><strong>Nom:</strong> ${sanitized.name}</p>
    <p><strong>Email:</strong> ${sanitized.email}</p>
    <p><strong>Téléphone:</strong> ${sanitized.phone || 'Non renseigné'}</p>
    <p><strong>Entreprise:</strong> ${sanitized.company || 'Non renseigné'}</p>
    <p><strong>Taille:</strong> ${data.employees_range || 'Non renseigné'}</p>
    <p><strong>Secteur:</strong> ${data.sector || 'Non renseigné'}</p>
  `;

  if (sanitized.message) {
    emailHtml += `<p><strong>Message:</strong><br/>${sanitized.message}</p>`;
  }

  if (data.source === 'simulation' && data.current_spending) {
    const estimatedSavings = data.current_spending * 0.3;
    emailHtml += `
      <h2>Détails Simulation</h2>
      <p><strong>Dépenses actuelles:</strong> ${data.current_spending}€</p>
      <p><strong>Économies estimées (30%):</strong> ${estimatedSavings.toFixed(2)}€</p>
    `;
  }

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
