import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { MultiStepForm } from '../components/forms/MultiStepForm';
import { api } from '../lib/api';

export const Contact: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary-500 font-medium mb-3">| CONTACT</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discutons ensemble de votre projet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous sommes à votre disposition pour répondre à vos questions. Remplissez notre
            formulaire ou appelez-nous !
          </p>
        </motion.div>

        <Card variant="elevated" className="p-6 lg:p-8">
          <MultiStepForm onSubmit={handleFormSubmit} />
        </Card>
      </div>
    </div>
  );
};

