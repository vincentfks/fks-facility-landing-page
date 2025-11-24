import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-glow-sm hover:border-primary-100 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl -z-10" />
      
      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-6 group-hover:bg-primary-100 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary-600" />
      </div>
      
      <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed text-base">
        {description}
      </p>
    </motion.div>
  );
};
