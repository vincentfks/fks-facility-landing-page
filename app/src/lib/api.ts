import { ContactData, SimulationData } from './types';

export type { ContactData, SimulationData };

/**
 * Send email via API route
 */
const sendEmailViaResend = async (data: ContactData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      const text = await response.text();
      console.error('❌ Réponse non-JSON:', text);
      throw new Error(`Erreur serveur (${response.status}): ${text.substring(0, 200)}`);
    }

    if (!response.ok || !result.success) {
      console.error('❌ API Error:', { 
        status: response.status, 
        statusText: response.statusText,
        result 
      });
      const errorMsg = result.error || result.message || result.details || `Erreur serveur (${response.status})`;
      throw new Error(errorMsg);
    }

    return result;
  } catch (error) {
    console.error('❌ Fetch Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erreur réseau lors de l\'envoi');
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
