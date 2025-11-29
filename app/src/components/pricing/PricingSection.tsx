import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../lib/api';

/**
 * Configuration des tarifs avec Stripe (PRODUCTION)
 * 
 * STARTER - 79€ HT/an
 * - Product ID: prod_TVlvjwsGkA754F
 * - Price ID: price_1SYkQPLfvqfGVHOIc47ZhCL7
 * - Payment link: https://buy.stripe.com/dRm5kE5SXfh1gUTgeLfIs00
 * 
 * CROISSANCE - 129€ HT/an
 * - Product ID: prod_TVlvCnEq9ySqyW
 * - Price ID: price_1SYkQSLfvqfGVHOIpWEO1sA3
 * - Payment link: https://buy.stripe.com/dRmfZi959c4P9sr0fNfIs01
 * 
 * ENTREPRISE - 199€ HT/an
 * - Product ID: prod_TVlvEHxzEtiKH0
 * - Price ID: price_1SYkQULfvqfGVHOIjaP9gfB2
 * - Payment link: https://buy.stripe.com/9B6cN6gxB7OzdIHe6DfIs02
 */
const pricingTiers = [
  {
    name: 'STARTER',
    employees: 'Moins de 10 collaborateurs',
    price: '79',
    period: '/an HT',
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_STARTER || 'price_1SYkQPLfvqfGVHOIc47ZhCL7',
    description: 'Parfait pour les petites entreprises, les startups en plein essor et les travailleurs indépendants.',
      features: [
        'Accès illimité centrale d\'achat',
        'Jusqu\'à -70% sur certaines catégories',
        'Support client par email',
        'Sans engagement',
    ],
    delay: 0,
  },
  {
    name: 'CROISSANCE',
    employees: '10 à 20 collaborateurs',
    price: '129',
    period: '/an HT',
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_CROISSANCE || 'price_1SYkQSLfvqfGVHOIpWEO1sA3',
    description: 'Conçu pour les moyennes entreprises, pour qui les économies ne sont pas à prendre à la légère.',
      features: [
        'Tout du plan précédent',
        'Jusqu\'à -70% sur certaines catégories',
        'Support prioritaire',
        'Interlocuteur dédié',
      'Audit des dépenses inclus',
    ],
    delay: 0.1,
    popular: true,
  },
  {
    name: 'ENTREPRISE',
    employees: '20 à 50 collaborateurs',
    price: '199',
    period: '/an HT',
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_ENTREPRISE || 'price_1SYkQULfvqfGVHOIjaP9gfB2',
    description: 'Boostez votre potentiel avec un plan fait pour les grandes ambitions.',
    features: [
      'Tout du plan Croissance',
      'Jusqu\'à -70% sur certaines catégories',
      'Support premium 24/7',
      'Accompagnement stratégique',
      'Reporting trimestriel',
    ],
    delay: 0.2,
  },
  {
    name: 'GRANDE STRUCTURE',
    employees: '+ de 50 collaborateurs',
    price: 'Sur devis',
    period: '',
    priceId: '', // Pas de prix Stripe pour ce plan
    description: 'Sur mesure pour les grandes entreprises prêtes à transformer leur industrie. Maxi entreprise, maxi économies !',
    features: [
      'Tarifs négociés sur mesure',
      'Account Manager dédié',
      'Contrats cadres spécifiques',
    ],
    delay: 0.3,
  },
];

export const PricingSection: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to contact form if hash is present after navigation
  useEffect(() => {
    if (location.hash === '#contact-form') {
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  const handleContactRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with hash
      navigate('/#contact-form');
    }
  };

  const handleCheckout = async (tier: typeof pricingTiers[0]) => {
    if (!tier.priceId || tier.price === 'Sur devis') {
      return;
    }

    setLoading(tier.name);
    setError(null);

    try {
      await api.createCheckoutSession(tier.priceId);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Une erreur est survenue lors de la création de la session de paiement');
      setLoading(null);
    }
  };

  return (
    <section id="tarification" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary-50 text-secondary-600 text-sm font-semibold mb-4 border border-secondary-100">
            TARIFS TRANSPARENTS
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Un retour sur investissement <br />
            <span className="text-primary-600">immédiat</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des forfaits adaptés à votre taille. Rentabilisé dès votre première commande significative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: tier.delay }}
              className="relative group pt-4"
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 flex justify-center z-20 transform -translate-y-1/2">
                  <div className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    LE PLUS POPULAIRE
                  </div>
                </div>
              )}
              
              <div className={`
                h-full bg-white rounded-2xl p-1 transition-all duration-300
                ${tier.popular 
                  ? 'shadow-xl ring-2 ring-primary-500 relative z-10 scale-105 lg:scale-110' 
                  : 'border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-200'
                }
              `}>
                <div className="bg-white rounded-xl p-6 h-full flex flex-col pricing-card">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-sm text-primary-600 font-medium mb-4">{tier.employees}</p>
                    <div className="flex items-baseline gap-1 mb-2">
                      {tier.price !== 'Sur devis' ? (
                        <>
                          <span className="text-4xl font-bold text-gray-900">{tier.price}€</span>
                          <span className="text-gray-500 text-sm">{tier.period}</span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-3 min-h-[40px] leading-relaxed">{tier.description}</p>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {tier.price === 'Sur devis' ? (
                    <div className="mt-auto pt-2">
                      <Button
                        variant={tier.popular ? 'primary' : 'outline'}
                        className="w-full justify-center"
                        onClick={handleContactRedirect}
                      >
                        Faire un devis
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-auto pt-2">
                      {error && tier.name === loading && (
                        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                          {error}
                        </div>
                      )}
                      <Button
                        variant={tier.popular ? 'primary' : 'outline'}
                        className="w-full justify-center"
                        onClick={() => handleCheckout(tier)}
                        disabled={loading === tier.name || !tier.priceId}
                      >
                        {loading === tier.name ? (
                          <>
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                            Redirection...
                          </>
                        ) : (
                          'Choisir ce plan'
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
