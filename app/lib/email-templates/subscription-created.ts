/**
 * Template email pour création d'abonnement
 */

import type { Stripe } from 'stripe';

export function generateSubscriptionCreatedEmail(
  subscription: Stripe.Subscription,
  customer: Stripe.Customer
): string {
  const planName = subscription.items.data[0]?.price?.nickname || 'Plan d\'adhésion';
  const amount = ((subscription.items.data[0]?.price?.unit_amount || 0) / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  const frontendUrl = process.env.FRONTEND_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://fks-facility.com';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue chez FKS Facility</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #0F172A; margin: 0; padding: 0; background-color: #F8FAFC; }
    .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #0066FF 0%, #00C853 100%); padding: 32px; text-align: center; }
    .header h1 { color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 32px; }
    .welcome-icon { text-align: center; margin: 24px 0; }
    .welcome-icon div { width: 80px; height: 80px; background-color: #00C853; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white; }
    .info-box { background-color: #F0FDF4; border-left: 4px solid #00C853; padding: 16px; margin: 24px 0; border-radius: 4px; }
    .footer { background-color: #F8FAFC; padding: 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #e2e8f0; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066FF; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0; }
    .feature-list { margin: 24px 0; }
    .feature-item { display: flex; align-items: start; margin: 12px 0; }
    .feature-icon { color: #00C853; margin-right: 12px; font-size: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FKS Facility</h1>
      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px;">Bienvenue !</div>
    </div>
    
    <div class="content">
      <div class="welcome-icon">
        <div>🎉</div>
      </div>

      <h2 style="text-align: center; color: #0F172A; margin: 24px 0;">
        Bienvenue chez FKS Facility, ${customer.name || 'Cher client'} !
      </h2>

      <p style="color: #64748B; line-height: 1.8; text-align: center;">
        Merci de nous avoir rejoint. Votre adhésion a été activée avec succès !
      </p>

      <div class="info-box">
        <div style="font-size: 14px; color: #166534; margin-bottom: 12px; font-weight: 600;">Votre plan</div>
        <div style="font-size: 20px; color: #0F172A; font-weight: 700; margin-bottom: 8px;">${planName}</div>
        <div style="font-size: 14px; color: #64748B;">
          Prix: <strong>${amount}</strong> / an HT
        </div>
      </div>

      <h3 style="color: #0F172A; margin-top: 32px;">Prochaines étapes :</h3>

      <div class="feature-list">
        <div class="feature-item">
          <div class="feature-icon">✓</div>
          <div>
            <strong style="color: #0F172A;">Vous recevrez vos identifiants</strong>
            <div style="color: #64748B; font-size: 14px; margin-top: 4px;">
              Dans les 24 heures, vous recevrez un email avec vos identifiants d'accès à la centrale d'achat.
            </div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">✓</div>
          <div>
            <strong style="color: #0F172A;">Accédez à tous nos fournisseurs</strong>
            <div style="color: #64748B; font-size: 14px; margin-top: 4px;">
              Profitez dès maintenant de tarifs négociés jusqu'à -70% sur certaines catégories.
            </div>
          </div>
        </div>

        <div class="feature-item">
          <div class="feature-icon">✓</div>
          <div>
            <strong style="color: #0F172A;">Support dédié</strong>
            <div style="color: #64748B; font-size: 14px; margin-top: 4px;">
              Notre équipe est là pour vous accompagner dans votre démarche d'optimisation des coûts.
            </div>
          </div>
        </div>
      </div>

      <p style="color: #64748B; line-height: 1.8;">
        Si vous avez des questions, n'hésitez pas à nous contacter à 
        <a href="mailto:contact@fks-facility.com" style="color: #0066FF;">contact@fks-facility.com</a>
      </p>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${frontendUrl}" class="button">
          Découvrir nos solutions
        </a>
      </div>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.</p>
      <p>Cet email a été envoyé automatiquement suite à votre adhésion.</p>
    </div>
  </div>
</body>
</html>
  `;
}

