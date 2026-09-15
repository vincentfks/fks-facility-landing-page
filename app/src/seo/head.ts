import type { PageSeo } from './routes';
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from './site';

/** Attribut posé sur chaque balise gérée, pour pouvoir la remplacer à la navigation */
const SEO_ATTRIBUTE = 'data-seo';

interface HeadTag {
  tag: 'title' | 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  content?: string;
}

const buildHeadTags = (seo: PageSeo): HeadTag[] => {
  const url = absoluteUrl(seo.path);
  const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  const tags: HeadTag[] = [
    { tag: 'title', attrs: {}, content: seo.title },
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
    { tag: 'meta', attrs: { name: 'robots', content: robots } },
    { tag: 'meta', attrs: { property: 'og:type', content: seo.ogType ?? 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'fr_FR' } },
    { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: DEFAULT_OG_IMAGE } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: DEFAULT_OG_IMAGE } },
  ];

  if (!seo.noindex) {
    tags.push(
      { tag: 'link', attrs: { rel: 'canonical', href: url } },
      { tag: 'meta', attrs: { property: 'og:url', content: url } },
    );
  }

  tags.push({
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    content: JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c'),
  });

  return tags;
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Balises <head> sérialisées pour le HTML pré-rendu */
export const renderHeadTags = (seo: PageSeo): string =>
  buildHeadTags(seo)
    .map(({ tag, attrs, content }) => {
      const attributes = Object.entries({ ...attrs, [SEO_ATTRIBUTE]: '' })
        .map(([key, value]) => (value === '' ? key : `${key}="${escapeHtml(value)}"`))
        .join(' ');
      if (tag === 'meta' || tag === 'link') return `<${tag} ${attributes}>`;
      const body = tag === 'script' ? content ?? '' : escapeHtml(content ?? '');
      return `<${tag} ${attributes}>${body}</${tag}>`;
    })
    .join('\n    ');

/** Remplace les balises gérées dans le document courant (navigation côté client) */
export const applyHeadTags = (seo: PageSeo): void => {
  document.head.querySelectorAll(`[${SEO_ATTRIBUTE}]`).forEach((node) => node.remove());

  buildHeadTags(seo).forEach(({ tag, attrs, content }) => {
    const element = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    element.setAttribute(SEO_ATTRIBUTE, '');
    if (content !== undefined) element.textContent = content;
    document.head.appendChild(element);
  });
};
