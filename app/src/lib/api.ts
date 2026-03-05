import { ContactData, SimulationData } from './types';

export type { ContactData, SimulationData };

/**
 * Send email via API route
 */
const sendEmailViaResend = async (data: ContactData) => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    const text = await response.text();
    throw new Error(`Erreur serveur (${response.status}): ${text.substring(0, 200)}`);
  }

  if (!response.ok || !result.success) {
    const errorMsg = result.error || result.message || result.details || `Erreur serveur (${response.status})`;
    throw new Error(errorMsg);
  }

  return result;
};

/**
 * Create Stripe Checkout Session
 */
const createStripeCheckout = async (priceId: string, customerEmail?: string, customerName?: string) => {
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

  if (data.url) {
    window.location.href = data.url;
  } else {
    throw new Error('No checkout URL returned');
  }

  return data;
};

export const api = {
  async submitContact(data: ContactData) {
    return await sendEmailViaResend({
      ...data,
      source: data.source || 'contact',
    });
  },

  async submitSimulation(data: SimulationData) {
    return await sendEmailViaResend({
      ...data,
      source: 'simulation',
    });
  },

  async createCheckoutSession(priceId: string, customerEmail?: string, customerName?: string) {
    return createStripeCheckout(priceId, customerEmail, customerName);
  },
};
