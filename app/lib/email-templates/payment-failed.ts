/**
 * Template email pour échec de paiement
 */

import type { Stripe } from 'stripe';

export function generatePaymentFailedEmail(paymentIntent: Stripe.PaymentIntent): string {
  const amount = ((paymentIntent.amount || 0) / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
  
  const errorMessage = (paymentIntent.last_payment_error as any)?.message || 'Une erreur est survenue lors du traitement de votre paiement.';

  const frontendUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://fks-facility.com';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Échec du paiement</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #0F172A; margin: 0; padding: 0; background-color: #F8FAFC; }
    .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 32px; text-align: center; }
    .header h1 { color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 32px; }
    .warning-icon { text-align: center; margin: 24px 0; }
    .warning-icon div { width: 80px; height: 80px; background-color: #EF4444; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white; }
    .error-box { background-color: #FEF2F2; border-left: 4px solid #EF4444; padding: 16px; margin: 24px 0; border-radius: 4px; }
    .footer { background-color: #F8FAFC; padding: 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #e2e8f0; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066FF; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FKS Facility</h1>
      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px;">Échec du paiement</div>
    </div>
    
    <div class="content">
      <div class="warning-icon">
        <div>⚠</div>
      </div>

      <h2 style="text-align: center; color: #0F172A; margin: 24px 0;">Votre paiement n'a pas pu être traité</h2>

      <div class="error-box">
        <div style="font-size: 14px; color: #991B1B; margin-bottom: 8px; font-weight: 600;">Erreur</div>
        <div style="color: #0F172A;">${errorMessage}</div>
        <div style="margin-top: 12px; font-size: 12px; color: #64748B;">
          Montant: <strong>${amount}</strong>
        </div>
      </div>

      <p style="color: #64748B; line-height: 1.8;">
        Nous n'avons pas pu traiter votre paiement. Cela peut être dû à plusieurs raisons :
      </p>

      <ul style="color: #64748B; line-height: 2;">
        <li>Solde insuffisant sur votre carte</li>
        <li>Carte expirée ou informations incorrectes</li>
        <li>Limite de transaction dépassée</li>
        <li>Problème temporaire avec votre banque</li>
      </ul>

      <p style="color: #64748B; line-height: 1.8;">
        <strong>Que faire maintenant ?</strong>
      </p>

      <p style="color: #64748B; line-height: 1.8;">
        Veuillez vérifier les informations de votre carte bancaire et réessayer. 
        Si le problème persiste, contactez votre banque ou utilisez une autre méthode de paiement.
      </p>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${frontendUrl}/tarification" class="button">
          Réessayer le paiement
        </a>
      </div>

      <p style="color: #64748B; line-height: 1.8; margin-top: 24px;">
        Besoin d'aide ? Contactez-nous à 
        <a href="mailto:contact@fks-facility.com" style="color: #0066FF;">contact@fks-facility.com</a>
      </p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.</p>
      <p>Cet email a été envoyé automatiquement suite à l'échec de votre paiement.</p>
    </div>
  </div>
</body>
</html>
  `;
}

