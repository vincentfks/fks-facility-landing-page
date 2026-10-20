/** Liens internes au format Markdown [texte](/chemin) utilisés dans les articles */
export const INTERNAL_LINK_PATTERN = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** Retire la syntaxe de lien pour ne garder que le texte (données structurées) */
export const stripLinks = (text: string): string => text.replace(INTERNAL_LINK_PATTERN, '$1');
