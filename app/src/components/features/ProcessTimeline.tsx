import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, TrendingDown, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Adhésion simple',
    description: 'Choisissez votre formule et adhérez en quelques minutes. Aucune condition ni minimum requis.',
    delay: 0,
  },
  {
    icon: TrendingDown,
    title: 'Accès immédiat',
    description: 'Bénéficiez immédiatement de tarifs préférentiels négociés avec nos fournisseurs partenaires.',
    delay: 0.2,
  },
  {
    icon: CheckCircle2,
    title: 'Économies réelles',
    description: 'Réalisez jusqu\'à 70% d\'économies sur certaines catégories d\'achats dès le premier mois.',
    delay: 0.4,
  },
];

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="max-w-xl">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4 border border-primary-100">
              COMMENT ÇA MARCHE
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Trois étapes vers <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                la rentabilité
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Un processus simplifié pour vous permettre de vous concentrer sur votre cœur de métier, pas sur la négociation.
            </p>
          </div>
          
          <div className="flex justify-end">
             {/* Optional decorative visual or just whitespace */}
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary-100 via-primary-200 to-primary-100" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="relative"
            >
              {/* Step Number */}
              <div className="relative z-10 flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-white border-4 border-primary-50 rounded-full shadow-sm">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm shadow-sm">
                  {index + 1}
                </div>
              </div>

              <div className="text-center bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary-100 hover:shadow-lg transition-all duration-300 group">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {step.description}
                </p>
                {index < 2 && (
                  <div className="md:hidden flex justify-center mt-4 text-primary-200">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
