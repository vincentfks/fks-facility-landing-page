import { useSyncExternalStore } from 'react';
import { CURRENT_PROMO } from '../content/promo';
import { isPromoActive, type Promo } from '../lib/promo';

/** Fréquence de réévaluation, pour qu'un onglet resté ouvert masque la promo à l'échéance */
const CHECK_INTERVAL_MS = 60_000;

const subscribe = (onChange: () => void) => {
  if (!CURRENT_PROMO) return () => {};
  const id = window.setInterval(onChange, CHECK_INTERVAL_MS);
  return () => window.clearInterval(id);
};

const getSnapshot = () => isPromoActive(CURRENT_PROMO, Date.now());

/** Au pré-rendu et à l'hydratation : état au moment du build, pour un HTML identique des deux côtés */
const getServerSnapshot = () => isPromoActive(CURRENT_PROMO, __BUILD_TIME__);

/** Promo en cours selon l'horloge du visiteur, ou null hors période */
export function useActivePromo(): Promo | null {
  const isActive = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isActive ? CURRENT_PROMO : null;
}
