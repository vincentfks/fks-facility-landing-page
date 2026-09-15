const FRENCH_MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/**
 * Formate une date ISO (AAAA-MM-JJ) en « 15 septembre 2026 ».
 * Implémentation manuelle pour un rendu identique au pré-rendu et dans le navigateur.
 */
export function formatFrenchDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${day} ${FRENCH_MONTHS[month - 1]} ${year}`;
}
