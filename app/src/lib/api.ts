import { sanitizeContactData, checkRateLimit } from './security';

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
 * Send email via API route (production) or directly via Resend (local dev)
 */
const sendEmailViaResend = async (data: ContactData) => {
  // Rate limiting check
  const rateLimitKey = `email_${data.email}`;
  if (!checkRateLimit(rateLimitKey, 5, 900000)) {
    throw new Error('Trop de requêtes. Veuillez réessayer dans quelques minutes.');
  }

  // Sanitize and validate data
  let sanitized: ContactData;
  try {
    sanitized = sanitizeContactData(data);
  } catch (error) {
    console.error('Data validation error:', error);
    throw error instanceof Error ? error : new Error('Données invalides');
  }

  // Use relative path '/api' - handled by Vite proxy in dev (-> localhost:3001) and Vercel in prod
  const apiUrl = '/api';
  const endpoint = `${apiUrl}/send-email`;

  console.log('📧 Envoi email via API route:', {
    url: endpoint,
    data: {
      name: sanitized.name,
      email: sanitized.email,
      source: sanitized.source,
    },
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitized),
    });

    // Check if response has content before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(text || 'Réponse invalide du serveur');
    }

    const result = await response.json();

    if (!response.ok || !result.success) {
      const errorMessage = result.error || result.message || 'Erreur lors de l\'envoi de l\'email';
      console.error('❌ API error:', result);
      throw new Error(errorMessage);
    }

    console.log('✅ Email envoyé avec succès:', result);
    return result;
  } catch (error) {
    console.error('❌ Network/API error:', error);
    if (error instanceof Error && error.message.includes('JSON')) {
      throw new Error('Erreur de communication avec le serveur. Veuillez réessayer.');
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erreur réseau lors de l\'envoi de l\'email');
  }
};

/**
 * Create Stripe Checkout Session
 */
const createStripeCheckout = async (priceId: string, customerEmail?: string, customerName?: string) => {
  // En production, l'API est sur le même domaine
  const apiUrl = import.meta.env.VITE_API_URL || '/api';
  
  const response = await fetch(`${apiUrl}/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      customerEmail,
      customerName,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create checkout session');
  }

  const data = await response.json();
  
  // Rediriger vers Stripe Checkout
  if (data.url) {
    window.location.href = data.url;
  } else {
    throw new Error('No checkout URL returned');
  }
  
  return data;
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

  async createCheckoutSession(priceId: string, customerEmail?: string, customerName?: string) {
    return createStripeCheckout(priceId, customerEmail, customerName);
  },
};
