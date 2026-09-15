/**
 * Pré-rendu statique après `vite build` + `vite build --ssr src/entry-server.tsx`.
 *
 * Pour chaque route connue (src/seo/routes.ts), écrit dist/<route>.html avec le contenu
 * rendu et les balises SEO propres à la page, puis génère dist/404.html et dist/sitemap.xml.
 * Vercel sert ces fichiers via `cleanUrls` ; le client hydrate le HTML existant.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST_DIR = join(process.cwd(), 'dist');
const SERVER_ENTRY = join(process.cwd(), 'dist-server', 'entry-server.js');
const SITE_URL = 'https://www.fks-facility.com';

/** Pages non indexables : shell client uniquement (données navigateur, accès protégé) */
const CLIENT_ONLY_PATHS = new Set(['/fournisseurs', '/paiement-reussi']);

const HEAD_PLACEHOLDER = '<!--app-head-->';
const HTML_PLACEHOLDER = '<!--app-html-->';

const { render, renderHeadTags, getSeoForPath, getPrerenderPaths, NOT_FOUND_PATH } = await import(
  pathToFileURL(SERVER_ENTRY).href
);

const template = readFileSync(join(DIST_DIR, 'index.html'), 'utf8');
if (!template.includes(HEAD_PLACEHOLDER) || !template.includes(HTML_PLACEHOLDER)) {
  throw new Error('dist/index.html ne contient pas les marqueurs <!--app-head--> et <!--app-html-->');
}

const outputFileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);

const writePage = (fileName, head, body) => {
  const html = template.replace(HEAD_PLACEHOLDER, head).replace(HTML_PLACEHOLDER, body);
  const target = join(DIST_DIR, fileName);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
};

const paths = getPrerenderPaths();
const failures = [];

for (const path of paths) {
  const seo = getSeoForPath(path);
  try {
    const body = CLIENT_ONLY_PATHS.has(path) ? '' : await render(path);
    writePage(outputFileFor(path), renderHeadTags(seo), body);
    console.log(`✓ ${path}${seo.noindex ? ' (noindex)' : ''}`);
  } catch (error) {
    failures.push(path);
    console.error(`✗ ${path}`, error);
  }
}

// Page 404 servie par Vercel avec le statut HTTP 404
writePage('404.html', renderHeadTags(getSeoForPath(NOT_FOUND_PATH)), await render(NOT_FOUND_PATH));
console.log('✓ 404.html');

if (failures.length > 0) {
  console.error(`Pré-rendu en échec pour : ${failures.join(', ')}`);
  process.exit(1);
}

// Sitemap généré depuis le même registre que les balises SEO
const urls = paths
  .map((path) => getSeoForPath(path))
  .filter((seo) => seo.sitemap && !seo.noindex)
  .map(({ path, sitemap }) => {
    const loc = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${sitemap.lastmod}</lastmod>`,
      `    <changefreq>${sitemap.changefreq}</changefreq>`,
      `    <priority>${sitemap.priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n');
  });

writeFileSync(
  join(DIST_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
console.log(`✓ sitemap.xml (${urls.length} URL)`);

rmSync(join(process.cwd(), 'dist-server'), { recursive: true, force: true });
