import React from 'react';
import type { SolutionSeo } from '../../seo/solutions';

interface SolutionFaqProps {
  solution: SolutionSeo;
  isDark?: boolean;
}

/** Questions fréquentes d'une page solution (reprises en données structurées FAQPage) */
export const SolutionFaq: React.FC<SolutionFaqProps> = ({ solution, isDark = false }) => {
  return (
    <section
      aria-labelledby={`faq-${solution.slug}`}
      className={`py-16 lg:py-20 ${isDark ? 'bg-black text-gray-300' : 'bg-white text-gray-600'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id={`faq-${solution.slug}`}
          className={`text-3xl lg:text-4xl font-display font-bold mb-10 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          {solution.name} : vos questions
        </h2>
        <dl className="space-y-8">
          {solution.faq.map((item) => (
            <div key={item.question} className={`border-l-2 pl-6 ${isDark ? 'border-amber-500/60' : 'border-primary-200'}`}>
              <dt className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.question}</dt>
              <dd className="leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
