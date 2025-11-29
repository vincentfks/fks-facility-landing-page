/**
 * Template email pour facture payée avec succès
 */

export function generateInvoicePaymentSucceededEmail(invoice) {
  const amount = (invoice.amount_paid / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
  
  const invoiceUrl = invoice.hosted_invoice_url;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Facture payée</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #0F172A; margin: 0; padding: 0; background-color: #F8FAFC; }
    .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #0066FF 0%, #00C853 100%); padding: 32px; text-align: center; }
    .header h1 { color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 32px; }
    .success-icon { text-align: center; margin: 24px 0; }
    .success-icon div { width: 80px; height: 80px; background-color: #00C853; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white; }
    .amount { text-align: center; margin: 24px 0; }
    .amount-value { font-size: 36px; font-weight: 700; color: #0066FF; margin: 8px 0; }
    .info-box { background-color: #F8FAFC; border-left: 4px solid #0066FF; padding: 16px; margin: 24px 0; border-radius: 4px; }
    .footer { background-color: #F8FAFC; padding: 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #e2e8f0; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066FF; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FKS Facility</h1>
      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px;">Facture payée</div>
    </div>
    
    <div class="content">
      <div class="success-icon">
        <div>✓</div>
      </div>

      <h2 style="text-align: center; color: #0F172A; margin: 24px 0;">Votre facture a été payée avec succès</h2>

      <div class="amount">
        <div style="font-size: 14px; color: #64748B; margin-bottom: 8px;">Montant payé</div>
        <div class="amount-value">${amount}</div>
      </div>

      <div class="info-box">
        <div style="font-size: 12px; color: #64748B; margin-bottom: 8px;">NUMÉRO DE FACTURE</div>
        <div style="font-family: monospace; font-size: 14px; color: #0F172A; font-weight: 600;">${invoice.number || invoice.id}</div>
        ${invoiceUrl ? `
        <div style="margin-top: 16px; text-align: center;">
          <a href="${invoiceUrl}" style="color: #0066FF; text-decoration: none; font-weight: 600;">Télécharger la facture →</a>
        </div>
        ` : ''}
      </div>

      <p style="color: #64748B; line-height: 1.8;">
        Merci pour votre paiement ! Votre facture a été réglée avec succès. 
        Vous trouverez ci-dessus un lien pour télécharger votre facture.
      </p>

      <p style="color: #64748B; line-height: 1.8;">
        Si vous avez des questions concernant cette facture, n'hésitez pas à nous contacter à 
        <a href="mailto:contact@fks-facility.com" style="color: #0066FF;">contact@fks-facility.com</a>
      </p>

      <div style="text-align: center; margin-top: 32px;">
        <a href="${process.env.FRONTEND_URL || 'https://fks-facility.com'}" class="button">
          Accéder à mon espace
        </a>
      </div>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.</p>
      <p>Cet email a été envoyé automatiquement suite au paiement de votre facture.</p>
    </div>
  </div>
</body>
</html>
  `;
}

