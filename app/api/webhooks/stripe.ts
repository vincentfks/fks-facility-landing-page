/**
 * API Route Vercel - Webhook Stripe
 * 
 * Endpoint: POST /api/webhooks/stripe
 * 
 * Gère les événements Stripe et envoie des emails automatiques via Resend
 */

import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

/**
 * Envoyer un email via Resend
 */
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured');
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'FKS Facility <noreply@fks-facility.com>',
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Failed to send email:', errorData);
      return;
    }

    const data = await response.json();
    console.log('Email sent successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Import des templates d'email
import { generatePaymentSuccessEmail } from '../../lib/email-templates/payment-success';
import { generatePaymentFailedEmail } from '../../lib/email-templates/payment-failed';
import { generateSubscriptionCreatedEmail } from '../../lib/email-templates/subscription-created';
import { generateSubscriptionCancelledEmail } from '../../lib/email-templates/subscription-cancelled';
import { generateInvoicePaymentSucceededEmail } from '../../lib/email-templates/invoice-payment-succeeded';
import { generateInvoicePaymentFailedEmail } from '../../lib/email-templates/invoice-payment-failed';
import { generateCheckoutCompletedEmail } from '../../lib/email-templates/checkout-completed';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  // Pour Vercel, récupérer le body brut
  // @ts-ignore - rawBody existe dans Vercel
  const rawBody = (req as any).rawBody || req.body;
  
  let body: string | Buffer;
  if (typeof rawBody === 'string') {
    body = rawBody;
  } else if (Buffer.isBuffer(rawBody)) {
    body = rawBody;
  } else {
    // Fallback : convertir en string si c'est un objet
    body = JSON.stringify(rawBody);
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  console.log(`🔔 Event received: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email;
        
        if (customerEmail) {
          const emailHtml = generateCheckoutCompletedEmail(session);
          await sendEmail(
            customerEmail,
            '✅ Confirmation de votre adhésion FKS Facility',
            emailHtml
          );
          
          // Envoyer aussi une notification interne
          await sendEmail(
            process.env.ADMIN_EMAIL || 'franck.k@fks-facility.com',
            `🎉 Nouvelle adhésion - ${session.customer_details?.name || 'Client'}`,
            emailHtml
          );
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const customerEmail = (paymentIntent as any).receipt_email || paymentIntent.metadata?.email;
        
        if (customerEmail) {
          const emailHtml = generatePaymentSuccessEmail(paymentIntent);
          await sendEmail(
            customerEmail,
            '✅ Paiement confirmé - FKS Facility',
            emailHtml
          );
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const customerEmail = (paymentIntent as any).receipt_email || paymentIntent.metadata?.email;
        
        if (customerEmail) {
          const emailHtml = generatePaymentFailedEmail(paymentIntent);
          await sendEmail(
            customerEmail,
            '❌ Échec du paiement - FKS Facility',
            emailHtml
          );
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = invoice.customer_email;
        
        if (customerEmail) {
          const emailHtml = generateInvoicePaymentSucceededEmail(invoice);
          await sendEmail(
            customerEmail,
            '✅ Facture payée - FKS Facility',
            emailHtml
          );
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = invoice.customer_email;
        
        if (customerEmail) {
          const emailHtml = generateInvoicePaymentFailedEmail(invoice);
          await sendEmail(
            customerEmail,
            '⚠️ Échec du paiement de la facture - FKS Facility',
            emailHtml
          );
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        const customerEmail = (customer as Stripe.Customer).email;
        
        if (customerEmail) {
          const emailHtml = generateSubscriptionCreatedEmail(subscription, customer as Stripe.Customer);
          await sendEmail(
            customerEmail,
            '🎉 Bienvenue chez FKS Facility !',
            emailHtml
          );
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        const customerEmail = (customer as Stripe.Customer).email;
        
        if (customerEmail) {
          const emailHtml = generateSubscriptionCancelledEmail(subscription, customer as Stripe.Customer);
          await sendEmail(
            customerEmail,
            '👋 Désolés de vous voir partir - FKS Facility',
            emailHtml
          );
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription updated: ${subscription.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Webhook processing failed', message: error.message });
  }
}

// Important : Pour Vercel, le body brut est disponible via rawBody
// Le bodyParser est désactivé par défaut pour les routes POST dans Vercel

