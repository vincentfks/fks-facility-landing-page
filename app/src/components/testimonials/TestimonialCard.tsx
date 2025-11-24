import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  avatar?: string;
  delay?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  company,
  avatar,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-100 h-full"
    >
      <Quote className="w-10 h-10 text-primary-200 mb-4" />
      <p className="text-gray-700 mb-6 leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center space-x-4">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>
    </motion.div>
  );
};

