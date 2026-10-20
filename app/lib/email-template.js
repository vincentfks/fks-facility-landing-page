/**
 * Email template generator (JavaScript version for server.js)
 * Shared with TypeScript version in src/lib/email-template.ts
 */

const colors = {
  primary: '#0066FF',
  secondary: '#00C853',
  dark: '#0F172A',
  gray: '#64748B',
  lightGray: '#F8FAFC',
  white: '#FFFFFF',
};

const sanitizeForHtml = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

export const generateEmailHtml = (data) => {
  const {
    name = '',
    email = '',
    phone = '',
    company = '',
    employees_range = '',
    sector = '',
    message = '',
    current_spending,
    source = 'contact',
    supplies_interests = ''
  } = data;

  // Sanitize all inputs
  const safeName = sanitizeForHtml(name);
  const safeEmail = sanitizeForHtml(email);
  const safePhone = phone ? sanitizeForHtml(phone) : 'Non renseigné';
  const safeCompany = company ? sanitizeForHtml(company) : 'Non renseigné';
  const safeEmployeesRange = employees_range ? sanitizeForHtml(employees_range) : 'Non renseigné';
  const safeSector = sector ? sanitizeForHtml(sector) : 'Non renseigné';
  const safeSuppliesInterests = supplies_interests ? sanitizeForHtml(supplies_interests) : 'Non renseigné';
  const safeMessage = message ? sanitizeForHtml(message).replace(/\n/g, '<br>') : '';

  const title = source === 'simulation' ? 'Nouvelle Simulation' : 'Nouvelle Demande de Contact';
  const sourceLabel = source.toUpperCase();
  
  // Calculate savings if simulation
  let savingsHtml = '';
  if (source === 'simulation' && current_spending && typeof current_spending === 'number') {
    const estimatedSavings = current_spending * 0.3;
    savingsHtml = `
      <tr>
        <td style="padding-top: 24px;">
          <div style="background: linear-gradient(135deg, ${colors.secondary}15 0%, ${colors.secondary}08 100%); border-left: 4px solid ${colors.secondary}; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h3 style="margin: 0 0 16px 0; color: ${colors.secondary}; font-size: 18px; font-weight: 700;">💰 Estimation des économies</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="background: white; padding: 12px; border-radius: 6px;">
                <p style="margin: 0; font-size: 11px; color: ${colors.gray}; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Dépenses actuelles</p>
                <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 700; color: ${colors.dark};">${current_spending.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
              </div>
              <div style="background: white; padding: 12px; border-radius: 6px;">
                <p style="margin: 0; font-size: 11px; color: ${colors.gray}; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Économies estimées (30%)</p>
                <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 700; color: ${colors.secondary};">${estimatedSavings.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title} - FKS Facility</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.lightGray}; font-family: 'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${colors.lightGray}; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: ${colors.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, ${colors.primary} 0%, #0052CC 100%); padding: 40px 32px; text-align: center;">
              <h1 style="margin: 0; color: ${colors.white}; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">FKS Facility</h1>
              <p style="margin: 12px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 400;">${title}</p>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding: 24px 32px 0 32px; text-align: right;">
              <span style="display: inline-block; padding: 6px 12px; border-radius: 20px; background-color: ${colors.primary}15; color: ${colors.primary}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">${sourceLabel}</span>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 24px 32px 32px 32px;">
              
              <!-- Contact Info Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: ${colors.gray}; border-bottom: 2px solid ${colors.lightGray}; padding-bottom: 8px;">Informations de Contact</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${colors.lightGray};">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 140px; font-weight: 600; color: ${colors.dark}; font-size: 14px;">Nom:</td>
                        <td style="color: ${colors.gray}; font-size: 14px;">${safeName}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${colors.lightGray};">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 140px; font-weight: 600; color: ${colors.dark}; font-size: 14px;">Email:</td>
                        <td style="color: ${colors.gray}; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: ${colors.primary}; text-decoration: none; font-weight: 500;">${safeEmail}</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 140px; font-weight: 600; color: ${colors.dark}; font-size: 14px;">Téléphone:</td>
                        <td style="color: ${colors.gray}; font-size: 14px;">${safePhone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Company Info Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: ${colors.gray}; border-bottom: 2px solid ${colors.lightGray}; padding-bottom: 8px;">Informations Entreprise</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${colors.lightGray};">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 140px; font-weight: 600; color: ${colors.dark}; font-size: 14px;">Entreprise:</td>
                        <td style="color: ${colors.gray}; font-size: 14px;">${safeCompany}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid ${colors.lightGray};">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 140px; font-weight: 600; color: ${colors.dark}; font-size: 14px;">Taille:</td>
                        <td style="color: ${colors.gray}; font-size: 14px;">${safeEmployeesRange}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 140px; font-weight: 600; color: ${colors.dark}; font-size: 14px;">Secteur:</td>
                        <td style="color: ${colors.gray}; font-size: 14px;">${safeSector}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Interests Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td>
                    <h2 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: ${colors.gray}; border-bottom: 2px solid ${colors.lightGray}; padding-bottom: 8px;">Besoins & Intérêts</h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 140px; font-weight: 600; color: ${colors.dark}; font-size: 14px;">Intérêts:</td>
                        <td style="color: ${colors.primary}; font-size: 14px; font-weight: 600;">${safeSuppliesInterests}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${safeMessage ? `
                <tr>
                  <td style="padding-top: 20px;">
                    <div style="background-color: ${colors.lightGray}; padding: 20px; border-radius: 8px; border-left: 3px solid ${colors.primary};">
                      <p style="margin: 0 0 12px 0; font-size: 11px; color: ${colors.gray}; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Message</p>
                      <p style="margin: 0; color: ${colors.dark}; font-size: 14px; line-height: 1.6;">${safeMessage}</p>
                    </div>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${savingsHtml}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: ${colors.lightGray}; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: ${colors.gray}; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} FKS Facility. Tous droits réservés.
              </p>
              <p style="margin: 0; font-size: 11px; color: ${colors.gray}; opacity: 0.8;">
                Cet email a été envoyé automatiquement depuis le formulaire de contact de <a href="https://fks-facility.com" style="color: ${colors.primary}; text-decoration: none;">fks-facility.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

