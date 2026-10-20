import type { Promo } from '../lib/promo';

const ASSETS = '/promo/mobilier-oct-nov-2026';

/**
 * Promo temporaire affichée dans le hero, le menu et sur sa page dédiée.
 *
 * Tout est piloté par cette constante : la carte, l'item de menu et la page se masquent seuls
 * après `endsAt`. Pour la prochaine promo, remplacer le contenu (et les fichiers de public/promo/) ;
 * pour la retirer, passer la constante à `null`.
 */
export const CURRENT_PROMO: Promo | null = {
  id: 'promo-mobilier-oct-nov-2026',
  path: '/promo-du-moment',
  startsAt: '2026-10-15T00:00:00+02:00',
  endsAt: '2026-11-30T23:59:59+01:00',
  partner: 'Bruneau',
  nav: { label: 'Promo du moment' },
  card: {
    eyebrow: 'Promo exclusive',
    title: 'Mobilier et aménagement',
    deadline: "Jusqu'au 30 novembre",
  },
  badge: '-30 %',
  headline: "sur le mobilier et l'aménagement",
  intro:
    'En partenariat avec Bruneau, profitez de -30 % sur les univers mobilier et équipement & aménagement.',
  universes: ['Mobilier', 'Équipement & aménagement'],
  periodLabel: 'Du 15 octobre au 30 novembre 2026',
  perks: ["Livraison 24/48 h gratuite dès 99 € HT d'achat", 'Satisfait ou remboursé 30 jours'],
  conditions: { label: 'Conditions sur bruneau.fr', url: 'https://www.bruneau.fr' },
  flyer: {
    href: `${ASSETS}/promo-mobilier-fks-oct-nov-2026.pdf`,
    label: 'Télécharger le flyer (PDF)',
    fileName: 'promo-mobilier-fks-oct-nov-2026.pdf',
  },
  images: [
    {
      src: `${ASSETS}/open-space.webp`,
      alt: 'Open space aménagé avec bureaux bench noirs, fauteuils blancs et bibliothèque',
      width: 452,
      height: 280,
    },
    {
      src: `${ASSETS}/espace-detente.webp`,
      alt: 'Espace détente avec banquette, poufs, rangements bois et panneaux acoustiques',
      width: 497,
      height: 278,
    },
    {
      src: `${ASSETS}/cafeteria.webp`,
      alt: "Cafétéria d'entreprise avec tables, chaises bois et tabourets de bar",
      width: 438,
      height: 252,
    },
  ],
  contact: {
    title: 'Demandez votre devis mobilier',
    text: "Un projet d'aménagement ou de renouvellement de mobilier ? Décrivez votre besoin, l'équipe FKS Facility vous recontacte.",
    cta: 'Demander un devis',
  },
  seo: {
    title: '-30 % sur le mobilier de bureau avec Bruneau | FKS Facility',
    description:
      "Offre FKS Facility et Bruneau : -30 % sur les univers mobilier et équipement & aménagement du 15 octobre au 30 novembre 2026. Livraison 24/48 h gratuite dès 99 € HT.",
  },
};
