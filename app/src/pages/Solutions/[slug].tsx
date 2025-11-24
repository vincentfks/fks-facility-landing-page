import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { MultiStepForm } from '../../components/forms/MultiStepForm';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';

const solutions: Record<string, any> = {
  emballage: {
    title: 'Solutions Emballage',
    description:
      'Emballons vos idées avec excellence. Accédez au meilleur choix et au meilleur rapport qualité/prix pour vos solutions d\'emballage.',
    icon: '📦',
    benefits: [
      '50% de remises en moyenne sur plusieurs milliers de références',
      'Des conditions négociées sur les machines et systèmes d\'emballage',
      'Des experts de l\'emballage dédiés pour réduire vos coûts de fonctionnement',
    ],
    savings: 'jusqu\'à 70%',
  },
  bureau: {
    title: 'Solutions Espace Bureau',
    description:
      'Tout pour votre bureau : fournitures, mobilier, décoration, hygiène et entretien.',
    icon: '💼',
    benefits: [
      'Fournitures de bureau à prix négociés',
      'Mobilier et décoration professionnels',
      'Solutions d\'hygiène et d\'entretien',
    ],
    savings: 'jusqu\'à 50%',
  },
  energie: {
    title: 'Solutions Énergie',
    description: 'Vos contrats gaz et électricité, au meilleur prix.',
    icon: '⚡',
    benefits: [
      'Comparaison des meilleurs tarifs',
      'Négociation des contrats énergétiques',
      'Suivi et optimisation des consommations',
    ],
    savings: 'jusqu\'à 40%',
  },
  informatique: {
    title: 'Solutions Informatique',
    description:
      'Téléphonie, dématérialisation, logiciel, impression, intégration...',
    icon: '💻',
    benefits: [
      'Équipements informatiques à tarifs préférentiels',
      'Solutions téléphoniques et mobiles',
      'Logiciels et services cloud',
    ],
    savings: 'jusqu\'à 50%',
  },
  snacking: {
    title: 'Solutions Snacking',
    description: 'Distributeurs de boissons, machine à café, encas chauds et froids...',
    icon: '☕',
    benefits: [
      'Machines à café professionnelles',
      'Distributeurs de boissons et snacks',
      'Solutions pour pauses de qualité',
    ],
    savings: 'jusqu\'à 40%',
  },
  transport: {
    title: 'Solutions Transport & Logistique',
    description: 'Affrètement, location, suivi, stockage, express, etc.',
    icon: '🚚',
    benefits: [
      'Tarifs négociés sur le transport',
      'Solutions de logistique et stockage',
      'Services express et express',
    ],
    savings: 'jusqu\'à 50%',
  },
};

export const SolutionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? solutions[slug] : null;

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Solution non trouvée</h1>
          <Link to="/solutions">
            <Button>Retour aux solutions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (data: any) => {
    try {
      await api.submitContact({
        ...data,
        sector: solution.title,
        source: 'solution',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">{solution.icon}</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {solution.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {solution.description}
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-700 rounded-full font-semibold">
              Économies {solution.savings}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Les avantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {solution.benefits.map((benefit: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <p className="text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Intéressé par cette solution ?
            </h2>
            <p className="text-lg text-gray-600">
              Contactez-nous pour en savoir plus et découvrir les économies que vous pourriez
              réaliser.
            </p>
          </div>
          <Card variant="elevated" className="p-6 lg:p-8">
            <MultiStepForm onSubmit={handleFormSubmit} />
          </Card>
        </div>
      </section>
    </div>
  );
};

