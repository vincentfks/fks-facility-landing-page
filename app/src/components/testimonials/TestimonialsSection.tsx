import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote:
      "Grâce à leurs partenariats solides et à leurs tarifs négociés, nous avons réalisé d'importantes économies sans sacrifier la qualité. C'est bluffant.",
    author: 'Sylvain P.',
    company: 'Directeur Achat, SCARABE',
  },
  {
    quote:
      "Nous travaillons avec FKS Facility depuis presque deux ans. Tarifs ultra compétitifs et une réactivité exemplaire. Un partenaire de confiance.",
    author: 'Laura F.',
    company: 'CEO, HGH Infrared Systems',
  },
  {
    quote:
      "Nos dépenses d'emballage ont diminué de près de 50%. C'est très appréciable vu nos volumes. Je recommande les yeux fermés.",
    author: 'Guillaume R.',
    company: 'Logistique, HEXATAC',
  },
  {
    quote:
      "Un interlocuteur unique, des économies réelles sur le mobilier et les fournitures. FKS a simplifié toute notre gestion d'achats.",
    author: 'Véronique B.',
    company: 'Office Manager, DELPHARM',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden text-white">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-gray-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-primary-400 text-sm font-medium mb-6">
              <Star className="w-3 h-3 fill-current" />
              <span>Avis Clients Vérifiés</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Ils ont optimisé <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                leur rentabilité
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md">
              Découvrez comment nos clients transforment leurs coûts fixes en leviers de croissance grâce à FKS Facility.
            </p>
            
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-white font-medium">
                     {String.fromCharCode(64 + i)}
                   </div>
                 ))}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex text-yellow-400 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-sm text-gray-500">Note moyenne 4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right: Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-gray-800/50 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl"
                >
                  <Quote className="w-12 h-12 text-primary-500/30 mb-6" />
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-white mb-8">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <p className="font-bold text-white text-lg">{testimonials[currentIndex].author}</p>
                      <p className="text-primary-400">{testimonials[currentIndex].company}</p>
                    </div>
                    <div className="flex gap-2">
                       <button
                          onClick={prev}
                          className="p-3 rounded-full bg-gray-700 hover:bg-primary-600 transition-colors text-white"
                          aria-label="Précédent"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={next}
                          className="p-3 rounded-full bg-gray-700 hover:bg-primary-600 transition-colors text-white"
                          aria-label="Suivant"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
