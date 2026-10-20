/**
 * Modèle d'un article de blog.
 * Les paragraphes acceptent des liens internes au format Markdown : [texte](/chemin).
 */
export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  /** Titre H1 affiché */
  title: string;
  /** Balise <title> (≤ 60 caractères, sans le suffixe de marque) */
  metaTitle: string;
  /** Meta description (140-160 caractères) */
  metaDescription: string;
  /** Résumé affiché sur la page /blog */
  excerpt: string;
  category: string;
  keywords: string[];
  /** Format ISO AAAA-MM-JJ */
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  intro: string[];
  sections: BlogSection[];
  faq: BlogFaq[];
  relatedLinks: BlogLink[];
}
