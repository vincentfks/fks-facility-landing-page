/**
 * Template email pour échec de paiement de facture
 */

export function generateInvoicePaymentFailedEmail(invoice) {
  const amount = (invoice.amount_due / 100).toLocaleString('fr-FR', {
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
  <title>Échec du paiement de la facture</title>
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
      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px;">Paiement en attente</div>
    </div>
    
    <div class="content">
      <div class="warning-icon">
        <div>⚠</div>
      </div>

      <h2 style="text-align: center; color: #0F172A; margin: 24px 0;">
        Le paiement de votre facture n'a pas pu être effectué
      </h2>

      <div class="error-box">
        <div style="font-size: 14px; color: #991B1B; margin-bottom: 8px; font-weight: 600;">Facture en attente</div>
        <div style="font-size: 12px; color: #64748B; margin-bottom: 8px;">NUMÉRO DE FACTURE</div>
        <div style="font-family: monospace; font-size: 14px; color: #0F172A; font-weight: 600; margin-bottom: 12px;">${invoice.number || invoice.id}</div>
        <div style="font-size: 14px; color: #0F172A;">
          Montant à payer: <strong>${amount}</strong>
        </div>
      </div>

      <p style="color: #64748B; line-height: 1.8;">
        Nous n'avons pas pu traiter le paiement de votre facture. Cela peut être dû à :
      </p>

      <ul style="color: #64748B; line-height: 2;">
        <li>Solde insuffisant sur votre carte</li>
        <li>Carte expirée ou informations incorrectes</li>
        <li>Limite de transaction dépassée</li>
        <li>Problème temporaire avec votre banque</li>
      </ul>

      <p style="color: #64748B; line-height: 1.8;">
        <strong>Action requise</strong><br>
        Veuillez mettre à jour votre méthode de paiement et régler cette facture dès que possible 
        pour éviter toute interruption de service.
      </p>

      ${invoiceUrl ? `
      <div style="text-align: center; margin-top: 32px;">
        <a href="${invoiceUrl}" class="button">
          Régler la facture maintenant
        </a>
      </div>
      ` : ''}

      <p style="color: #64748B; line-height: 1.8; margin-top: 24px;">
        Si le problème persiste, contactez-nous à 
        <a href="mailto:contact@fks-facility.com" style="color: #0066FF;">contact@fks-facility.com</a>
        ou votre banque pour vérifier l'état de votre carte.
      </p>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.</p>
      <p>Cet email a été envoyé automatiquement suite à l'échec du paiement de votre facture.</p>
    </div>
  </div>
</body>
</html>
  `;
}

