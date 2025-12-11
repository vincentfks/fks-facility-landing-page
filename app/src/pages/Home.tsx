import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { SolutionsGrid } from '../components/solutions/SolutionsGrid';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { PricingSection } from '../components/pricing/PricingSection';
import { ProcessTimeline } from '../components/features/ProcessTimeline';
import { FeatureCard } from '../components/features/FeatureCard';
import { StatCard } from '../components/features/StatsCounter';
import { MultiStepForm } from '../components/forms/MultiStepForm';
import { Button } from '../components/ui/Button';
import { SecurityBadges } from '../components/security/SecurityBadges';
import { FAQSection } from '../components/faq/FAQSection';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Settings, TrendingUp } from 'lucide-react';
import { api } from '../lib/api';

const features = [
  {
    icon: ShieldCheck,
    title: 'Accès Direct',
    description:
      'Accès privilégié directement chez le fournisseur. Éliminez les intermédiaires pour une efficacité maximale et des coûts réduits.',
    link: '/solutions',
  },
  {
    icon: Zap,
    title: 'Liberté Totale',
    description:
      'Achetez sans obligations ni minimum requis. Une gestion flexible qui s\'adapte à votre rythme, sans contraintes cachées.',
    link: '/tarifs',
  },
  {
    icon: Settings,
    title: 'Contrôle Absolu',
    description:
      'Gardez la main sur vos achats. Commandez où vous voulez, quand vous voulez. Vous restez le seul décideur.',
    link: '/a-propos',
  },
];

const partners = [
  { name: 'D8', src: '/partners/D8-logo.webp' },
  // { name: 'ENI', src: '/partners/eni-logo.png' },
  { name: 'Cenpac', src: '/partners/cenpac-logo.png' },
  { name: 'Bruneau', src: '/partners/logo-bruneau.png' },
  { name: 'Polaris', src: '/partners/polaris.png' },
  { name: 'CP Consulting', src: '/transport-page/CP-consulting-logo.png' },
  { name: 'Yaklean', src: '/partners/Yaklean-logo.png' },
];

export const Home: React.FC = () => {
  const handleFormSubmit = async (data: any) => {
    try {
      await api.submitContact({
        ...data,
        source: 'contact',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection />

      {/* Partner logos section */}
      <section className="py-10 border-y border-gray-100 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
            Ils nous font confiance pour leurs achats
          </p>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="flex items-center gap-12 lg:gap-20 animate-scroll whitespace-nowrap group-hover:[animation-play-state:paused]">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={`partner-1-${index}`}
                className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20 opacity-60 hover:opacity-100 transition-opacity duration-300 mx-6"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            
            {/* Second set of logos for infinite loop */}
            {partners.map((partner, index) => (
              <div
                key={`partner-2-${index}`}
                className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20 opacity-60 hover:opacity-100 transition-opacity duration-300 mx-6"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}

            {/* Third set of logos for smoother infinite loop on wide screens */}
            {partners.map((partner, index) => (
              <div
                key={`partner-3-${index}`}
                className="flex items-center justify-center w-32 h-16 lg:w-40 lg:h-20 opacity-60 hover:opacity-100 transition-opacity duration-300 mx-6"
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          
          {/* Fade edges */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Stats section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <StatCard label="Des clients satisfaits" value={98} suffix="%" delay={0} />
            <StatCard label="Retour sur investissement (jours)" value={30} suffix="j" delay={0.1} />
            <StatCard label="Jusqu'à" value={70} suffix="% d'économies" delay={0.2} />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-white text-primary-600 text-sm font-semibold mb-4 border border-primary-100 shadow-sm">
              POURQUOI NOUS CHOISIR
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Optimisez vos achats, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                boostez vos marges
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Grâce aux volumes d'achats de nos adhérents, nous négocions des conditions tarifaires 
              que seule une grande entreprise pourrait obtenir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <SolutionsGrid />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Simulation CTA - Modern Strip */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="absolute -left-20 top-1/2 w-96 h-96 bg-primary-600/30 rounded-full blur-[100px]"></div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Combien allez-vous économiser cette année ?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Faites le test. Notre simulateur calcule vos économies potentielles en moins de 2 minutes, basé sur vos dépenses réelles.
          </p>
          <Link to="/simuler-mes-economies">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-xl shadow-white/10">
              Lancer la simulation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing */}
      <PricingSection />

      {/* Final CTA with form */}
      <section id="contact-form" className="py-24 bg-white relative scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <span className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-6">
               <TrendingUp className="w-8 h-8" />
             </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
              Prêt à réduire vos coûts ?
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez la centrale d'achat nouvelle génération. 
              <br className="hidden md:block" />
              Jusqu'à -70% d'économies sur certaines catégories.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100">
            <MultiStepForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Security Badges */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <SecurityBadges />
      </div>
    </main>
  );
};
