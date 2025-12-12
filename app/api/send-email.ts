import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, employees_range, sector, message, current_spending, source, supplies_interests } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'name and email are required' });
    }

    const safe = (str: any) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

    const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande - FKS Facility</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: Helvetica, Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F8FAFC; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, #0066FF 0%, #0052CC 100%); padding: 40px 32px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 700;">FKS Facility</h1>
              <p style="margin: 12px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Nouvelle Demande de Contact</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748B; border-bottom: 2px solid #F8FAFC; padding-bottom: 8px;">Informations de Contact</h2>
              <p style="margin: 8px 0; color: #0F172A; font-size: 14px;"><strong>Nom:</strong> <span style="color: #64748B;">${safe(name)}</span></p>
              <p style="margin: 8px 0; color: #0F172A; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${safe(email)}" style="color: #0066FF; text-decoration: none;">${safe(email)}</a></p>
              <p style="margin: 8px 0; color: #0F172A; font-size: 14px;"><strong>Téléphone:</strong> <span style="color: #64748B;">${phone ? safe(phone) : 'Non renseigné'}</span></p>
              
              <h2 style="margin: 24px 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748B; border-bottom: 2px solid #F8FAFC; padding-bottom: 8px;">Informations Entreprise</h2>
              <p style="margin: 8px 0; color: #0F172A; font-size: 14px;"><strong>Entreprise:</strong> <span style="color: #64748B;">${company ? safe(company) : 'Non renseigné'}</span></p>
              <p style="margin: 8px 0; color: #0F172A; font-size: 14px;"><strong>Taille:</strong> <span style="color: #64748B;">${employees_range ? safe(employees_range) : 'Non renseigné'}</span></p>
              <p style="margin: 8px 0; color: #0F172A; font-size: 14px;"><strong>Secteur:</strong> <span style="color: #64748B;">${sector ? safe(sector) : 'Non renseigné'}</span></p>
              
              ${supplies_interests ? `<p style="margin: 24px 0 8px 0; color: #0F172A; font-size: 14px;"><strong>Intérêts:</strong> <span style="color: #0066FF; font-weight: 600;">${safe(supplies_interests)}</span></p>` : ''}
              
              ${message ? `<div style="background-color: #F8FAFC; padding: 20px; border-radius: 8px; border-left: 3px solid #0066FF; margin-top: 24px;"><p style="margin: 0 0 12px 0; font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 600;">Message</p><p style="margin: 0; color: #0F172A; font-size: 14px; line-height: 1.6;">${safe(message).replace(/\n/g, '<br>')}</p></div>` : ''}
              
              ${source === 'simulation' && current_spending ? `<div style="background: linear-gradient(135deg, #00C85315 0%, #00C85308 100%); border-left: 4px solid #00C853; padding: 20px; margin-top: 24px; border-radius: 8px;"><h3 style="margin: 0 0 16px 0; color: #00C853; font-size: 18px; font-weight: 700;">💰 Estimation des économies</h3><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;"><div style="background: white; padding: 12px; border-radius: 6px;"><p style="margin: 0; font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 600;">Dépenses actuelles</p><p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 700; color: #0F172A;">${Number(current_spending).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p></div><div style="background: white; padding: 12px; border-radius: 6px;"><p style="margin: 0; font-size: 11px; color: #64748B; text-transform: uppercase; font-weight: 600;">Économies estimées (30%)</p><p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 700; color: #00C853;">${(Number(current_spending) * 0.3).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p></div></div></div>` : ''}
            </td>
          </tr>
          <tr>
            <td style="background-color: #F8FAFC; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #64748B;">&copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Utiliser onboarding@resend.dev pour les tests (domaine vérifié par défaut)
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.ADMIN_EMAIL || process.env.TO_EMAIL || 'franck.k@fks-facility.com';

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Nouvelle demande FKS: ${company || name}`,
      html: emailHtml,
      replyTo: email,
    });

    if (result.error) {
      console.error('❌ Erreur Resend:', result.error);
      const errorMessage = result.error.message || 'Erreur lors de l\'envoi';
      // Si le domaine n'est pas vérifié, donner un message plus clair
      if (errorMessage.includes('domain is not verified')) {
        return res.status(500).json({ 
          success: false, 
          error: 'Domaine non vérifié dans Resend. Utilisez onboarding@resend.dev pour les tests.',
          details: errorMessage
        });
      }
      return res.status(500).json({ success: false, error: errorMessage });
    }

    return res.status(200).json({ success: true, message: 'Email envoyé avec succès', id: result.data?.id });

  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Erreur serveur' });
  }
}
