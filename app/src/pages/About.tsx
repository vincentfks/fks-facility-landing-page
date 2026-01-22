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
                Tout a commencé durant la crise sanitaire de la COVID-19, une période où le monde s'est mis à l'arrêt et où la réorganisation budgétaire est devenue cruciale pour la pérennité des entreprises. C'est dans ce contexte particulier que <strong className="text-gray-900">Franck</strong> et <strong className="text-gray-900">Vincent</strong>, deux entrepreneurs aux parcours différents, ont vu leurs chemins se croiser.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Chacun de leur côté, ils avaient constaté un même constat : les entreprises, qu'elles soient petites ou grandes, payaient souvent trop cher pour leurs achats quotidiens. L'un venait du monde de la logistique et de l'approvisionnement, l'autre de l'entrepreneuriat et de l'optimisation opérationnelle. Mais au-delà de leurs expériences respectives, ils partageaient une conviction profonde : <strong className="text-gray-900">il était possible de permettre aux entreprises d'accéder à des prix plus avantageux</strong>, sans compromettre la qualité ni les relations avec les fournisseurs.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                C'est ainsi qu'est née <strong className="text-gray-900">FKS Facility</strong>, portée par une ambition commune : créer une centrale d'achat nouvelle génération qui met le pouvoir de négociation au service des entreprises. Leur mission ? Réaliser une expertise approfondie des achats pour identifier des opportunités d'optimisation, que ce soit en termes de qualité ou de coûts. Leur idée ? Rassembler les volumes d'achats de nombreuses entreprises pour négocier des conditions tarifaires exceptionnelles, que seules les grandes corporations pouvaient obtenir jusqu'alors.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aujourd'hui, cette vision est devenue réalité. FKS Facility accompagne des centaines d'entreprises dans l'optimisation de leurs achats, leur permettant de réaliser des économies significatives tout en conservant leur liberté de choix et leur autonomie. Nous sommes déterminés à vous aider à économiser, améliorer la qualité de vos achats, et garantir la santé financière de votre entreprise. Parce que nous croyons que <strong className="text-gray-900">chaque entreprise mérite d'avoir accès aux meilleurs prix</strong>, quelle que soit sa taille.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-full flex items-center"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
                {/* Franck - Colonne de gauche */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -8 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-full flex justify-center"
                >
                  <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
                    <img 
                      src="/a-propos/franck.jpeg" 
                      alt="Franck - Fondateur et directeur commercial FKS Facility" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5">
                      <p className="text-white font-bold text-xl">Franck</p>
                      <p className="text-white/90 text-sm font-medium">Fondateur et directeur commercial</p>
                    </div>
                  </div>
                </motion.div>

                {/* Vincent - Colonne de droite */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative w-full flex justify-center"
                >
                  <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white">
                    <img 
                      src="/a-propos/vincent.jpeg" 
                      alt="Vincent - Associé et directeur marketing FKS Facility" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5">
                      <p className="text-white font-bold text-xl">Vincent</p>
                      <p className="text-white/90 text-sm font-medium">Associé et directeur marketing</p>
                    </div>
                  </div>
                </motion.div>
              </div>
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

