import React from 'react';
import {
  Monitor,
  Coffee,
  Briefcase,
  Package,
  Truck,
  Sparkles,
  PenTool,
} from 'lucide-react';
import { SolutionCard } from './SolutionCard';

const solutions = [
  {
    icon: Monitor,
    title: 'Informatique',
    description: 'Téléphonie, dématérialisation, logiciel, impression, intégration...',
    path: '/solutions/informatique',
    color: 'primary' as const,
  },
  {
    icon: Coffee,
    title: 'Snacking',
    description: 'Distributeurs de boissons, machine à café, encas chauds et froids...',
    path: '/solutions/snacking',
    color: 'accent' as const,
  },
  {
    icon: Briefcase,
    title: 'Espace bureau',
    description: 'Fournitures de bureau, mobilier, décoration, hygiène et entretien...',
    path: '/solutions/bureau',
    color: 'secondary' as const,
  },
  {
    icon: Truck,
    title: 'Transport & logistique',
    description: 'Affrètement, location, suivi, stockage, express, etc.',
    path: '/solutions/transport',
    color: 'primary' as const,
  },
  {
    icon: Package,
    title: 'Emballage',
    description: 'Caisse, film étirable, rouleau bulle, cerclage, adhésif, etc.',
    path: '/solutions/emballage',
    color: 'secondary' as const,
  },
  {
    icon: Sparkles,
    title: 'Nettoyage',
    description: 'Nettoyage de vitres professionnel, entretien régulier, après chantier...',
    path: '/solutions/nettoyage',
    color: 'primary' as const,
  },
  {
    icon: PenTool,
    title: 'Design marque',
    description: 'Identité visuelle, sites web, réseaux sociaux, print, vidéo, photographie...',
    path: '/solutions/design-marque',
    color: 'accent' as const,
  },
  // {
  //   icon: Zap,
  //   title: 'Énergie',
  //   description: 'Vos contrats gaz et électricité, au meilleur prix.',
  //   path: '/solutions/energie',
  //   color: 'accent' as const,
  // },
];

export const SolutionsGrid: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute -left-64 top-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-[100px]" />
      <div className="absolute -right-64 bottom-1/4 w-96 h-96 bg-secondary-100/40 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4 border border-primary-100">
            NOS SOLUTIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
            Des solutions complètes <br /> pour les entreprises
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Une expertise à 360° pour optimiser chaque poste de dépense de votre entreprise.
            Qualité premium, tarifs négociés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.path}
              {...solution}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
