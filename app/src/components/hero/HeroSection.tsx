import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown, CheckCircle2, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-white">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      
      {/* Abstract floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-200/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary-200/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-primary-100 text-primary-700 rounded-full text-sm font-medium mb-8 shadow-sm"
            >
              <TrendingDown className="w-4 h-4 text-primary-500" />
              <span>Centrale d'achat pour TPE & PME</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight"
            >
              Réduisez vos coûts, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                pas vos ambitions
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Rejoignez +80 entreprises qui économisent <span className="font-semibold text-gray-900">jusqu'à -70%</span> sur certaines catégories. Sans engagement, sans minimum d'achat.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-primary-500/20 border-0">
                  Commencer à économiser
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/simuler-mes-economies" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur border-gray-300 hover:bg-white">
                  Simuler mes économies
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-secondary-500" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-secondary-500" />
                <span>Audit gratuit</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400 fill-yellow-400" />
                <span>4.9/5 avis clients</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floating Cards Visual */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Card 1: Savings Example */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 z-20"
            >
              <div className="glass-card p-6 rounded-2xl w-72">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-secondary-600" />
                  </div>
                  <span className="bg-secondary-50 text-secondary-700 px-2 py-1 rounded text-xs font-medium">
                    -45% économisé
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">Papier A4 (500 feuilles)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">4,38 €</span>
                  <span className="text-sm text-gray-500 line-through">7,75 €</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Feature Highlight */}
            <motion.div
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-60 left-10 z-10"
            >
              <div className="glass-card p-6 rounded-2xl w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Fournisseurs Premium</p>
                    <p className="text-xs text-gray-500">Top qualité</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                      {i === 3 ? '+' : ''}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3: Bottom Example */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 right-20 z-30"
            >
              <div className="glass-card p-5 rounded-2xl w-72 backdrop-blur-xl bg-white/90 border-white/40">
                 <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-accent-600" />
                  </div>
                   <span className="bg-accent-50 text-accent-700 px-2 py-1 rounded text-xs font-medium">
                    -66% économisé
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">Caisse Carton (x10)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">1,07 €</span>
                  <span className="text-sm text-gray-500 line-through">3,14 €</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-gray-200 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-gray-100 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
