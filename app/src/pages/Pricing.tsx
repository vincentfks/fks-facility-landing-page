import React from 'react';
import { PricingSection } from '../components/pricing/PricingSection';
import { motion } from 'framer-motion';
import { StatCard } from '../components/features/StatsCounter';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-primary-500 font-medium mb-3">| ADHÉSION</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nos tarifs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choisissez votre tarif d'adhésion, ajustée à la taille de votre entreprise, basée
              sur le nombre de vos employés.
            </p>
          </motion.div>
        </div>
      </div>

      <PricingSection />

      {/* Why choose us section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bénéficiez rapidement de conditions tarifaires avantageuses permettant de réduire
              vos charges et d'optimiser votre rentabilité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard label="Des clients satisfaits" value={98} suffix="%" delay={0} />
            <StatCard label="Pour rentabiliser l'adhésion" value={30} suffix=" jours" delay={0.1} />
            <StatCard label="D'économies en moyenne" value={30} suffix="%" delay={0.2} />
          </div>
        </div>
      </section>
    </div>
  );
};

