import React from 'react';
import { SolutionsGrid } from '../../components/solutions/SolutionsGrid';
import { motion } from 'framer-motion';

export const SolutionsIndex: React.FC = () => {
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
            <p className="text-primary-500 font-medium mb-3">| NOS SOLUTIONS</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Des solutions complètes pour les entreprises
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bénéficiez de nos tarifs négociés et de notre expertise dans divers secteurs
              d'achats.
            </p>
          </motion.div>
        </div>
      </div>
      <SolutionsGrid />
    </div>
  );
};

