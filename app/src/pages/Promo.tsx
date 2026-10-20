import { CalendarDays, Download, ExternalLink, RotateCcw, Truck, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { MultiStepForm } from '../components/forms/MultiStepForm';
import { useActivePromo } from '../hooks/useActivePromo';
import { api, type ContactData } from '../lib/api';
import { NotFound } from './NotFound';

const CONTACT_ANCHOR = 'demande-devis';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2';

const PERK_ICONS = [Truck, RotateCcw];

/** Page de la promo en cours ; affiche la 404 hors période */
export function Promo() {
  const promo = useActivePromo();
  if (!promo) return <NotFound />;

  const handleFormSubmit = async (data: ContactData) => {
    await api.submitContact({ ...data, source: 'promo', message: `[${promo.id}] ${data.message ?? ''}`.trim() });
  };

  const [mainImage, ...otherImages] = promo.images;

  return (
    <div className="bg-white">
      {/* Bandeau principal */}
      <section aria-labelledby="promo-heading" className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-white" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-1.5 text-sm font-semibold text-red-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600" aria-hidden="true" />
              Offre FKS Facility x {promo.partner}
            </p>

            <h1
              id="promo-heading"
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-[1.05] tracking-tight"
            >
              <span className="block text-red-700">{promo.badge}</span>
              <span className="block">{promo.headline}</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">{promo.intro}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Univers concernés">
              {promo.universes.map((universe) => (
                <li
                  key={universe}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800"
                >
                  {universe}
                </li>
              ))}
            </ul>

            <p className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-base sm:text-lg font-semibold text-white">
              <CalendarDays className="w-5 h-5" aria-hidden="true" />
              {promo.periodLabel}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`#${CONTACT_ANCHOR}`}
                className={`inline-flex h-14 items-center justify-center rounded-xl bg-red-600 px-8 text-lg font-medium text-white shadow-lg shadow-red-500/25 transition-colors hover:bg-red-700 active:scale-95 ${FOCUS_RING}`}
              >
                {promo.contact.cta}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={promo.flyer.href}
                download={promo.flyer.fileName}
                className={`inline-flex h-14 items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 text-base font-medium text-gray-800 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-800 ${FOCUS_RING}`}
              >
                <Download className="mr-2 w-5 h-5" aria-hidden="true" />
                {promo.flyer.label}
              </a>
            </div>
          </div>

          {/* Visuels de l'offre */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl w-full mx-auto">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              width={mainImage.width}
              height={mainImage.height}
              loading="eager"
              decoding="async"
              className="col-span-2 w-full h-auto rounded-2xl object-cover shadow-xl ring-1 ring-black/5"
            />
            {otherImages.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full aspect-[16/10] rounded-xl object-cover shadow-md ring-1 ring-black/5"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section aria-labelledby="promo-perks-heading" className="border-y border-gray-100 bg-gray-50/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="promo-perks-heading" className="sr-only">
            Avantages et conditions
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {promo.perks.map((perk, index) => {
              const Icon = PERK_ICONS[index % PERK_ICONS.length];
              return (
                <li key={perk} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <Icon className="h-5 w-5 text-red-700" aria-hidden="true" />
                  </span>
                  <span className="font-medium text-gray-900">{perk}</span>
                </li>
              );
            })}
            <li className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50">
                <ExternalLink className="h-5 w-5 text-red-700" aria-hidden="true" />
              </span>
              <a
                href={promo.conditions.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium text-red-700 underline underline-offset-4 hover:text-red-800 rounded-sm ${FOCUS_RING}`}
              >
                {promo.conditions.label}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Demande de devis */}
      <section
        id={CONTACT_ANCHOR}
        aria-labelledby="promo-contact-heading"
        className="py-16 lg:py-24 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-red-700 font-semibold mb-3">{promo.badge}, {promo.card.deadline.toLowerCase()}</p>
            <h2 id="promo-contact-heading" className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              {promo.contact.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{promo.contact.text}</p>
          </div>
          <Card variant="elevated" className="p-6 lg:p-8">
            <MultiStepForm onSubmit={handleFormSubmit} />
          </Card>
        </div>
      </section>
    </div>
  );
}
