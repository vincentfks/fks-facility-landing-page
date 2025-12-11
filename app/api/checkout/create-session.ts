/**
 * API Route Vercel - Créer une session Stripe Checkout
 * 
 * Endpoint: POST /api/checkout/create-session
 */

import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, customerEmail, customerName } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'priceId is required' });
    }

    // En production sur Vercel, utiliser l'URL du projet
    const frontendUrl = process.env.FRONTEND_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173');
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // ou 'payment' pour un paiement unique
      success_url: `${frontendUrl}/paiement-reussi?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/tarification?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName || '',
      },
      // Options supplémentaires
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      locale: 'fr',
      // Activer la collecte automatique de la TVA (Stripe Tax)
      automatic_tax: {
        enabled: true,
      },
    });

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error.message 
    });
  }
}

