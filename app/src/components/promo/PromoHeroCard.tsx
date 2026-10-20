import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import type { Promo } from '../../lib/promo';
import { cn } from '../../lib/cn';

type Props = {
  promo: Promo;
  /** `floating` : carte flottante du visuel desktop ; `inline` : bandeau sous les CTA en mobile */
  variant: 'floating' | 'inline';
  className?: string;
};

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2';

/** Carte « Promo exclusive » du hero, cliquable vers la page de la promo */
export function PromoHeroCard({ promo, variant, className }: Props) {
  const [thumbnail] = promo.images;
  const isFloating = variant === 'floating';

  return (
    <Link
      to={promo.path}
      className={cn(
        'group block glass-card rounded-2xl border-red-200 bg-white/90 hover:border-red-300 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.35)] text-left',
        FOCUS_RING,
        isFloating ? 'w-64 p-4' : 'flex items-center gap-4 p-3 w-full max-w-md mx-auto',
        className,
      )}
    >
      <div className={cn('relative overflow-hidden rounded-xl', isFloating ? 'mb-3' : 'shrink-0 w-28')}>
        {/* Décorative : le texte du lien décrit déjà l'offre */}
        <img
          src={thumbnail.src}
          alt=""
          width={thumbnail.width}
          height={thumbnail.height}
          loading={isFloating ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'w-full object-cover transition-transform duration-500 group-hover:scale-105',
            isFloating ? 'h-24' : 'h-20',
          )}
        />
        <span className="absolute top-2 left-2 rounded-md bg-red-600 px-2 py-0.5 text-sm font-bold text-white shadow-sm">
          {promo.badge}
        </span>
      </div>

      <div className={cn('min-w-0', !isFloating && 'flex-1')}>
        <p className="text-xs font-semibold uppercase tracking-wide text-red-700">{promo.card.eyebrow}</p>
        <p className="font-display font-semibold text-gray-900 leading-snug">{promo.card.title}</p>
        <p className="mt-1 flex items-center text-xs text-gray-600">
          <Clock className="mr-1.5 h-3.5 w-3.5 text-red-600" aria-hidden="true" />
          {promo.card.deadline}
          <ArrowRight
            className="ml-auto h-4 w-4 text-red-700 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </p>
      </div>
    </Link>
  );
}
