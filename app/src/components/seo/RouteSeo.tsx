import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyHeadTags } from '../../seo/head';
import { getSeoForPath } from '../../seo/routes';

/** Met à jour title, meta, canonical et JSON-LD à chaque changement de route */
export function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyHeadTags(getSeoForPath(pathname));
  }, [pathname]);

  return null;
}
