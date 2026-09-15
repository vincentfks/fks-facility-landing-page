import { blogPosts, getBlogPost } from '../content/blog';
import { faqData } from '../content/faq';
import { CONTENT_UPDATED_AT, SITE_NAME } from './site';
import { breadcrumbSchema, blogPostingSchema, buildGraph, faqSchema, serviceSchema } from './schema';
import { getSolutionSeo, solutionsSeo } from './solutions';

export type ChangeFrequency = 'weekly' | 'monthly' | 'yearly';

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  jsonLd: Record<string, unknown>;
  /** Absent = page exclue du sitemap */
  sitemap?: { priority: number; changefreq: ChangeFrequency; lastmod: string };
}

interface StaticPage {
  title: string;
  description: string;
  noindex?: boolean;
  breadcrumb?: string;
  sitemap?: PageSeo['sitemap'];
}

const page = (priority: number, changefreq: ChangeFrequency): PageSeo['sitemap'] => ({
  priority,
  changefreq,
  lastmod: CONTENT_UPDATED_AT,
});

const STATIC_PAGES: Record<string, StaticPage> = {
  '/': {
    title: "Centrale d'achat TPE et PME en France | FKS Facility",
    description:
      "FKS Facility, centrale d'achat et de référencement pour TPE et PME en Île-de-France et partout en France : tarifs négociés, sans minimum d'achat ni engagement.",
    sitemap: page(1, 'weekly'),
  },
  '/solutions': {
    title: "Solutions d'achats négociées pour entreprises | FKS Facility",
    description:
      'Emballage et cartons, fournitures de bureau, nettoyage, snacking, transport, informatique : réduisez vos achats généraux avec les tarifs négociés FKS.',
    breadcrumb: 'Solutions',
    sitemap: page(0.9, 'monthly'),
  },
  '/tarifs': {
    title: "Adhésion centrale d'achat dès 79 € HT par an | FKS Facility",
    description:
      "Adhésion annuelle à la centrale d'achat FKS Facility selon votre effectif : 79 € HT sous 10 salariés, 129 € ou 199 € HT au-delà. Sans obligation d'achat.",
    breadcrumb: 'Tarifs',
    sitemap: page(0.8, 'monthly'),
  },
  '/a-propos': {
    title: "À propos : centrale d'achat à Massy (91) | FKS Facility",
    description:
      "FKS Facility est une centrale d'achat basée à Massy, en Essonne, qui négocie les achats généraux des TPE, PME et indépendants en Île-de-France et en France.",
    breadcrumb: 'À propos',
    sitemap: page(0.7, 'monthly'),
  },
  '/contact': {
    title: 'Contact et audit gratuit de vos achats | FKS Facility',
    description:
      'Contactez FKS Facility à Massy (91) pour un audit gratuit de vos achats généraux : emballage, bureau, nettoyage, snacking, transport. Réponse rapide.',
    breadcrumb: 'Contact',
    sitemap: page(0.8, 'monthly'),
  },
  '/simuler-mes-economies': {
    title: "Simulateur d'économies sur vos achats | FKS Facility",
    description:
      "Estimez en 2 minutes les économies que votre TPE ou PME peut réaliser sur ses achats généraux grâce aux tarifs négociés de la centrale d'achat FKS Facility.",
    breadcrumb: 'Simulateur',
    sitemap: page(0.7, 'monthly'),
  },
  '/blog': {
    title: 'Blog achats généraux et frais généraux PME | FKS Facility',
    description:
      "Guides pratiques pour TPE et PME : centrale d'achat, centrale de référencement, cartons et emballages, snacking, fournitures, réduction des frais généraux.",
    breadcrumb: 'Blog',
    sitemap: page(0.6, 'weekly'),
  },
  '/mentions-legales': {
    title: 'Mentions légales | FKS Facility',
    description:
      'Mentions légales du site fks-facility.com : éditeur FKS FACILITY SARL (Massy), directeur de la publication, hébergeur Vercel et prestataire de paiement Stripe.',
    breadcrumb: 'Mentions légales',
    sitemap: page(0.2, 'yearly'),
  },
  '/cgv': {
    title: "Conditions générales de vente et d'adhésion | FKS Facility",
    description:
      "Conditions générales de vente et d'adhésion à la centrale d'achat FKS Facility : durée, reconduction, résiliation, paiement en euros via Stripe.",
    breadcrumb: 'CGV',
    sitemap: page(0.2, 'yearly'),
  },
  '/confidentialite': {
    title: 'Politique de confidentialité et RGPD | FKS Facility',
    description:
      'Données personnelles collectées par FKS Facility, bases légales, durées de conservation, sous-traitants et exercice de vos droits RGPD.',
    breadcrumb: 'Confidentialité',
    sitemap: page(0.2, 'yearly'),
  },
  '/cookies': {
    title: 'Politique cookies | FKS Facility',
    description:
      'Liste des cookies utilisés sur fks-facility.com, leur finalité et leur durée, et gestion de votre consentement avec Axeptio.',
    breadcrumb: 'Cookies',
    sitemap: page(0.2, 'yearly'),
  },
  '/fournisseurs': {
    title: 'Espace fournisseurs | FKS Facility',
    description: 'Espace réservé aux adhérents FKS Facility.',
    noindex: true,
  },
  '/paiement-reussi': {
    title: 'Paiement confirmé | FKS Facility',
    description: 'Confirmation de votre adhésion à FKS Facility.',
    noindex: true,
  },
};

const NOT_FOUND: Omit<PageSeo, 'path'> = {
  title: 'Page introuvable | FKS Facility',
  description: "La page demandée n'existe pas ou a été déplacée.",
  noindex: true,
  jsonLd: buildGraph([]),
};

export const NOT_FOUND_PATH = '/404';

const homeCrumb = { name: 'Accueil', path: '/' };

const normalizePath = (pathname: string): string => {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const staticPageSeo = (path: string, pageDef: StaticPage): PageSeo => {
  const entities = [];
  if (path === '/') entities.push(faqSchema(faqData));
  if (pageDef.breadcrumb) {
    entities.push(breadcrumbSchema([homeCrumb, { name: pageDef.breadcrumb, path }]));
  }
  return {
    path,
    title: pageDef.title,
    description: pageDef.description,
    noindex: pageDef.noindex,
    jsonLd: buildGraph(entities),
    sitemap: pageDef.sitemap,
  };
};

export const getSeoForPath = (pathname: string): PageSeo => {
  const path = normalizePath(pathname);

  const staticPage = STATIC_PAGES[path];
  if (staticPage) return staticPageSeo(path, staticPage);

  const solutionMatch = path.match(/^\/solutions\/([^/]+)$/);
  const solution = solutionMatch ? getSolutionSeo(solutionMatch[1]) : undefined;
  if (solution) {
    return {
      path,
      title: solution.title,
      description: solution.description,
      jsonLd: buildGraph([
        serviceSchema(solution),
        breadcrumbSchema([homeCrumb, { name: 'Solutions', path: '/solutions' }, { name: solution.name, path }]),
        faqSchema(solution.faq),
      ]),
      sitemap: page(0.8, 'monthly'),
    };
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  const post = blogMatch ? getBlogPost(blogMatch[1]) : undefined;
  if (post) {
    const entities = [
      blogPostingSchema(post),
      breadcrumbSchema([homeCrumb, { name: 'Blog', path: '/blog' }, { name: post.title, path }]),
    ];
    if (post.faq.length > 0) entities.push(faqSchema(post.faq));
    return {
      path,
      title: `${post.metaTitle} | ${SITE_NAME}`,
      description: post.metaDescription,
      ogType: 'article',
      jsonLd: buildGraph(entities),
      sitemap: { priority: 0.6, changefreq: 'monthly', lastmod: post.updatedAt },
    };
  }

  return { path, ...NOT_FOUND };
};

/** Toutes les URL générées en HTML statique au build (pages privées incluses, en noindex) */
export const getPrerenderPaths = (): string[] => [
  ...Object.keys(STATIC_PAGES),
  ...solutionsSeo.map((solution) => `/solutions/${solution.slug}`),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];
