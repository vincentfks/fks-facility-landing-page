import React from 'react';
import { SavingsSimulator } from '../components/simulation/SavingsSimulator';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { SecurityBadges } from '../components/security/SecurityBadges';

export const Simulation: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SavingsSimulator />
      </div>

      <div className="mt-12">
        <TestimonialsSection />
      </div>
      
      <div className="bg-white py-8 border-t border-gray-200">
        <SecurityBadges />
      </div>
    </main>
  );
};

