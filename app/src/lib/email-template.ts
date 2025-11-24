import { ContactData } from './api';

const colors = {
  primary: '#0066FF',
  secondary: '#00C853',
  dark: '#0F172A',
  gray: '#64748B',
  lightGray: '#F8FAFC',
  white: '#FFFFFF',
};

export const generateEmailHtml = (data: ContactData): string => {
  const {
    name,
    email,
    phone,
    company,
    employees_range,
    sector,
    message,
    current_spending,
    source,
    supplies_interests
  } = data;

  const title = source === 'simulation' ? 'Nouvelle Simulation' : 'Nouvelle Demande de Contact';
  const sourceLabel = (source || 'contact').toUpperCase();
  
  // Calculate savings if simulation
  let savingsHtml = '';
  if (source === 'simulation' && current_spending) {
    const estimatedSavings = current_spending * 0.3;
    savingsHtml = `
      <div style="background-color: ${colors.secondary}15; border-left: 4px solid ${colors.secondary}; padding: 16px; margin-top: 24px; border-radius: 4px;">
        <h3 style="margin: 0 0 12px 0; color: ${colors.secondary}; font-size: 18px;">Estimation des économies</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <p style="margin: 0; font-size: 12px; color: ${colors.gray};">Dépenses actuelles</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: ${colors.dark};">${current_spending.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
          </div>
          <div>
            <p style="margin: 0; font-size: 12px; color: ${colors.gray};">Économies estimées (30%)</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 600; color: ${colors.secondary};">${estimatedSavings.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: ${colors.dark}; margin: 0; padding: 0; background-color: ${colors.lightGray}; }
    .container { max-width: 600px; margin: 0 auto; background-color: ${colors.white}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
    .header { background-color: ${colors.primary}; padding: 32px; text-align: center; }
    .header h1 { color: ${colors.white}; margin: 0; font-size: 24px; font-weight: 700; }
    .content { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section-title { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: ${colors.gray}; border-bottom: 1px solid ${colors.lightGray}; padding-bottom: 8px; margin-bottom: 16px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: ${colors.dark}; display: inline-block; width: 140px; }
    .value { color: ${colors.gray}; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; background-color: ${colors.primary}15; color: ${colors.primary}; font-size: 12px; font-weight: 600; }
    .footer { background-color: ${colors.lightGray}; padding: 24px; text-align: center; font-size: 12px; color: ${colors.gray}; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FKS Facility</h1>
      <div style="color: rgba(255,255,255,0.8); font-size: 14px; margin-top: 8px;">${title}</div>
    </div>
    
    <div class="content">
      <div style="text-align: right; margin-bottom: 24px;">
        <span class="badge">${sourceLabel}</span>
      </div>

      <div class="section">
        <div class="section-title">Informations de Contact</div>
        <div class="field"><span class="label">Nom:</span> <span class="value">${name}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value"><a href="mailto:${email}" style="color: ${colors.primary}; text-decoration: none;">${email}</a></span></div>
        <div class="field"><span class="label">Téléphone:</span> <span class="value">${phone || 'Non renseigné'}</span></div>
      </div>

      <div class="section">
        <div class="section-title">Informations Entreprise</div>
        <div class="field"><span class="label">Entreprise:</span> <span class="value">${company || 'Non renseigné'}</span></div>
        <div class="field"><span class="label">Taille:</span> <span class="value">${employees_range || 'Non renseigné'}</span></div>
        <div class="field"><span class="label">Secteur:</span> <span class="value">${sector || 'Non renseigné'}</span></div>
      </div>

      <div class="section">
        <div class="section-title">Besoins & Intérêts</div>
        <div class="field"><span class="label">Intérêts:</span> <span class="value" style="font-weight: 500; color: ${colors.primary};">${supplies_interests || 'Non renseigné'}</span></div>
        ${message ? `<div style="margin-top: 16px; background-color: ${colors.lightGray}; padding: 16px; border-radius: 4px;"><div style="font-size: 12px; color: ${colors.gray}; margin-bottom: 8px;">MESSAGE</div>${message.replace(/\n/g, '<br>')}</div>` : ''}
      </div>

      ${savingsHtml}
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.</p>
      <p>Cet email a été envoyé automatiquement depuis le formulaire de contact de fks-facility.com</p>
    </div>
  </div>
</body>
</html>
  `;
};

