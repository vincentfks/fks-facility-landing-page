import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import { faqData } from '../../content/faq';


export const FAQSection: React.FC = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-flex items-center justify-center py-2 px-4 rounded-full bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-600 text-sm font-bold mb-6 border border-primary-100 shadow-sm">
            QUESTIONS FRÉQUENTES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-8 leading-tight">
            Vous avez des{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
              questions ?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Trouvez les réponses aux questions les plus fréquentes sur FKS Facility
          </p>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="space-y-5"
        >
          {faqData.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="group border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    'w-full px-8 py-7 text-left flex items-center justify-between',
                    'hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-transparent transition-all duration-300',
                    'focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:ring-inset',
                    'group-data-[state=open]:bg-gradient-to-r group-data-[state=open]:from-primary-50/50 group-data-[state=open]:to-transparent'
                  )}
                >
                  <span className="text-lg md:text-xl font-bold text-gray-900 pr-6 group-hover:text-primary-600 group-data-[state=open]:text-primary-600 transition-colors leading-tight">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 group-data-[state=open]:bg-primary-200 transition-colors">
                    <ChevronDown
                      className={cn(
                        'w-6 h-6 text-primary-600 transition-transform duration-300',
                        'group-data-[state=open]:rotate-180'
                      )}
                    />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={cn(
                  'px-8 pb-7 text-gray-700',
                  'data-[state=open]:animate-accordion-down',
                  'data-[state=closed]:animate-accordion-up',
                  'overflow-hidden'
                )}
              >
                <div className="text-lg md:text-xl leading-relaxed font-normal">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};

