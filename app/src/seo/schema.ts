import { COMPANY, LOGO_URL, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, absoluteUrl } from './site';
import type { BlogPost } from '../content/blog/types';
import type { SolutionSeo } from './solutions';
import { stripLinks } from '../content/blog/links';

type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

interface Breadcrumb {
  name: string;
  path: string;
}

const organizationSchema = (): JsonLd => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: COMPANY.legalName,
  alternateName: 'FKS Facility Solutions',
  description:
    "Centrale d'achat et de référencement pour TPE, PME, indépendants et artisans : tarifs négociés sur les achats généraux, sans minimum d'achat.",
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL },
  image: DEFAULT_OG_IMAGE,
  email: COMPANY.email,
  telephone: COMPANY.telephone,
  vatID: COMPANY.vatId,
  identifier: { '@type': 'PropertyValue', propertyID: 'SIRET', value: COMPANY.siret },
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.streetAddress,
    postalCode: COMPANY.postalCode,
    addressLocality: COMPANY.locality,
    addressRegion: COMPANY.region,
    addressCountry: COMPANY.country,
  },
  areaServed: [
    { '@type': 'Country', name: 'France' },
    { '@type': 'AdministrativeArea', name: 'Île-de-France' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    areaServed: 'FR',
    availableLanguage: 'French',
  },
  knowsAbout: [
    "Centrale d'achat",
    'Centrale de référencement',
    'Achats généraux',
    'Réduction des frais généraux',
    'Emballage et cartons',
    'Fournitures de bureau',
    'Snacking en entreprise',
  ],
  sameAs: [COMPANY.linkedin],
});

const websiteSchema = (): JsonLd => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'fr-FR',
  publisher: { '@id': ORGANIZATION_ID },
});

export const breadcrumbSchema = (items: Breadcrumb[]): JsonLd => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqSchema = (items: { question: string; answer: string }[]): JsonLd => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: stripLinks(item.answer) },
  })),
});

export const serviceSchema = (solution: SolutionSeo): JsonLd => ({
  '@type': 'Service',
  name: solution.h1,
  serviceType: solution.serviceType,
  description: solution.description,
  url: absoluteUrl(`/solutions/${solution.slug}`),
  provider: { '@id': ORGANIZATION_ID },
  areaServed: solution.areaServed
    ? solution.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name }))
    : { '@type': 'Country', name: 'France' },
  audience: { '@type': 'BusinessAudience', name: 'TPE, PME, indépendants et artisans' },
});

export const blogPostingSchema = (post: BlogPost): JsonLd => ({
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.metaDescription,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  inLanguage: 'fr-FR',
  keywords: post.keywords.join(', '),
  articleSection: post.category,
  image: DEFAULT_OG_IMAGE,
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  author: { '@id': ORGANIZATION_ID },
  publisher: { '@id': ORGANIZATION_ID },
});

/** Regroupe les entités dans un seul graphe JSON-LD, avec l'organisation et le site sur chaque page */
export const buildGraph = (entities: JsonLd[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@graph': [organizationSchema(), websiteSchema(), ...entities],
});
