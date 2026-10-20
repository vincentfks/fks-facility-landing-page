/**
 * Modèle et règles d'affichage des promotions temporaires.
 * Le contenu de la promo en cours vit dans src/content/promo.ts.
 */

export interface PromoImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Promo {
  /** Identifiant stable, transmis comme source du formulaire de contact */
  id: string;
  /** URL de la page dédiée */
  path: string;
  /** Bornes ISO 8601 avec décalage horaire explicite (heure de Paris), bornes incluses */
  startsAt: string;
  endsAt: string;
  partner: string;
  nav: { label: string };
  card: { eyebrow: string; title: string; deadline: string };
  badge: string;
  /** Suite du titre affichée après le badge */
  headline: string;
  intro: string;
  universes: readonly string[];
  periodLabel: string;
  perks: readonly string[];
  conditions: { label: string; url: string };
  flyer: { href: string; label: string; fileName: string };
  images: readonly PromoImage[];
  contact: { title: string; text: string; cta: string };
  seo: { title: string; description: string };
}

/** Vrai si `now` (timestamp ms) est compris dans la période de la promo */
export const isPromoActive = (promo: Promo | null, now: number): promo is Promo =>
  promo !== null && now >= Date.parse(promo.startsAt) && now <= Date.parse(promo.endsAt);

/** Vrai tant que la promo n'est pas terminée (à venir ou en cours) */
export const isPromoUpcomingOrActive = (promo: Promo | null, now: number): promo is Promo =>
  promo !== null && now <= Date.parse(promo.endsAt);
