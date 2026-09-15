/**
 * Informations d'entreprise partagées par les balises SEO et les données structurées.
 * Source de vérité : mentions légales (src/pages/LegalNotice.tsx).
 */
export const SITE_URL = 'https://www.fks-facility.com';
export const SITE_NAME = 'FKS Facility';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const LOGO_URL = `${SITE_URL}/logo/FKS_LOGO_B.png`;
/** Date de dernière mise à jour éditoriale des pages statiques */
export const CONTENT_UPDATED_AT = '2026-09-15';

export const COMPANY = {
  legalName: 'FKS FACILITY',
  email: 'franck.k@fks-facility.com',
  telephone: '+33614275700',
  telephoneDisplay: '06 14 27 57 00',
  siret: '91047098800015',
  vatId: 'FR64910470988',
  streetAddress: '15 rue Lucien Sergent',
  postalCode: '91300',
  locality: 'Massy',
  region: 'Île-de-France',
  country: 'FR',
  linkedin: 'https://www.linkedin.com/company/fks-facility',
} as const;

export const absoluteUrl = (path: string): string =>
  path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
