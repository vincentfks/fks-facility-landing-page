/**
 * Template email pour annulation d'abonnement
 */

import type { Stripe } from 'stripe';

export function generateSubscriptionCancelledEmail(
  subscription: Stripe.Subscription,
  customer: Stripe.Customer
): string {
  const frontendUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://fks-facility.com';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abonnement annulé</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #0F172A; margin: 0; padding: 0; background-color: #F8FAFC; }
    .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #64748B 0%, #475569 100%); padding: 32px; text-align: center; }
    .header h1 { color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 32px; }
    .footer { background-color: #F8FAFC; padding: 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #e2e8f0; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066FF; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0; }
    .info-box { background-color: #F8FAFC; border-left: 4px solid #64748B; padding: 16px; margin: 24px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FKS Facility</h1>
      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px;">Abonnement annulé</div>
    </div>
    
    <div class="content">
      <h2 style="text-align: center; color: #0F172A; margin: 24px 0;">
        Désolés de vous voir partir, ${customer.name || 'Cher client'}
      </h2>

      <p style="color: #64748B; line-height: 1.8;">
        Votre abonnement a été annulé avec succès. Nous sommes désolés de vous voir partir.
      </p>

      <div class="info-box">
        <div style="font-size: 12px; color: #64748B; margin-bottom: 8px;">ID D'ABONNEMENT</div>
        <div style="font-family: monospace; font-size: 14px; color: #0F172A; font-weight: 600;">${subscription.id}</div>
      </div>

      <p style="color: #64748B; line-height: 1.8;">
        Votre accès à la centrale d'achat reste actif jusqu'à la fin de la période pour laquelle 
        vous avez déjà payé. Après cette date, votre accès sera désactivé.
      </p>

      <p style="color: #64748B; line-height: 1.8;">
        <strong>Votre avis nous intéresse</strong><br>
        Nous serions ravis de connaître les raisons de votre départ. Cela nous aiderait à améliorer 
        nos services. N'hésitez pas à répondre à cet email ou à nous contacter directement.
      </p>

      <p style="color: #64748B; line-height: 1.8;">
        Si vous changez d'avis, vous pourrez toujours réactiver votre abonnement depuis votre espace client.
      </p>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${frontendUrl}/tarification" class="button">
          Réactiver mon abonnement
        </a>
      </div>

      <p style="color: #64748B; line-height: 1.8; margin-top: 24px;">
        Merci d'avoir fait confiance à FKS Facility.<br>
        L'équipe FKS Facility
      </p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.</p>
      <p>Cet email a été envoyé automatiquement suite à l'annulation de votre abonnement.</p>
    </div>
  </div>
</body>
</html>
  `;
}

