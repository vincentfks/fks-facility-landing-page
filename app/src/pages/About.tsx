import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { StatCard } from '../components/features/StatsCounter';
import { Shield, Users, Award } from 'lucide-react';
import { FeatureCard } from '../components/features/FeatureCard';

const values = [
  {
    icon: Shield,
    title: 'Confiance',
    description: 'Un engagement total envers l\'honnêteté et la transparence.',
  },
  {
    icon: Users,
    title: 'Partenariat',
    description: 'Des relations solides qui nous unissent pour la réussite.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'L\'excellence est notre norme, votre garantie de qualité.',
  },
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-primary-500 font-medium mb-3">| À PROPOS</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Une équipe à l'écoute
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre mission est simple : faciliter la réussite de nos clients en leur permettant
              d'optimiser leurs achats. Nous croyons que des économies intelligentes peuvent
              changer le monde des affaires.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <FeatureCard key={index} {...value} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Notre histoire
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                FKS Facility est née en réponse à la crise sanitaire de la Covid-19, une période
                où la réorganisation budgétaire est devenue cruciale pour la pérennité des
                entreprises.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Notre mission a rapidement émergé : réaliser une expertise approfondie de vos
                achats pour identifier des opportunités d'optimisation, que ce soit en termes de
                qualité ou de coûts.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nous sommes déterminés à vous aider à économiser, améliorer la qualité de vos
                achats, et garantir la santé financière de votre entreprise. Avec FKS Facility,
                vous avez un partenaire dévoué pour réussir dans un monde en constante évolution.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl h-64 lg:h-96 overflow-hidden shadow-xl"
            >
              <img 
                src="/a-propos/team.png" 
                alt="L'équipe FKS Facility" 
                className="w-full h-full object-cover transform scale-110"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Chez FKS Facility Solutions, vous participez à la construction d'un réseau de
              fournisseurs qui vous satisfait et qui vous soutient.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard label="de clients satisfaits" value={98} suffix="%" delay={0} />
            <StatCard label="d'économies en moyenne" value={30} suffix="%" delay={0.1} />
            <StatCard label="rentable et sans limite !" value={100} suffix="%" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  );
};

