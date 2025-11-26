import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Qu'est-ce qu'une centrale de référencement ?",
    answer:
      "Une centrale de référencement, c'est une structure qui négocie des accords-cadres avec différents fournisseurs pour obtenir les meilleurs tarifs. Grâce au volume total regroupé, chaque entreprise profite de prix beaucoup plus avantageux que si elle négociait seule.",
  },
  {
    question: 'Comment fonctionne FKS Facility ?',
    answer:
      "On négocie pour vous des remises exclusives auprès de nos fournisseurs partenaires. Vous commandez ensuite directement chez eux, mais avec nos tarifs négociés. Aucune contrainte, aucune modification de vos habitudes : juste des économies dès la première commande.",
  },
  {
    question: 'Qui peut bénéficier de nos offres ?',
    answer:
      "Toutes les entreprises en France : TPE, PME, artisans, associations, collectivités… Peu importe la taille ou le secteur : nos conditions s'adaptent à tous.",
  },
  {
    question: 'Quels sont les avantages pour votre entreprise ?',
    answer:
      'Jusqu\'à 60 % de remise selon les fournisseurs, des économies immédiates souvent dès la première commande, un interlocuteur unique pour fluidifier vos achats, aucune négociation à gérer, un accès à des conditions normalement réservées aux grosses structures, et votre adhésion est très vite rentabilisée.',
  },
  {
    question: 'Comment adhérer à FKS Facility ?',
    answer:
      "Vous choisissez la formule correspondant à votre entreprise (calculée selon le nombre de salariés). Une fois votre adhésion validée, nous transmettons vos informations aux fournisseurs afin qu'ils vous intègrent sous les conditions FKS Facility. Vous bénéficiez alors immédiatement des tarifs négociés.",
  },
  {
    question: 'FKS est-il un intermédiaire ?',
    answer:
      "Non, vous restez client direct des fournisseurs. Nous intervenons uniquement pour vous obtenir les meilleurs tarifs et suivre votre dossier si besoin.",
  },
  {
    question: 'Qui gère le service client et le SAV ?',
    answer:
      "Le service client et le SAV sont assurés directement par les fournisseurs. Et si une demande bloque, FKS Facility peut intervenir pour accélérer ou débloquer la situation.",
  },
  {
    question: "Y a-t-il des frais d'adhésion ?",
    answer:
      "Oui, une adhésion annuelle calculée selon le nombre de salariés de votre entreprise. Aucun autre frais. Le montant reste volontairement abordable, et il est en général amorti en quelques commandes grâce aux remises obtenues.",
  },
  {
    question: 'Quels types de produits couvre FKS ?',
    answer:
      "Fournitures de bureau, mobilier, transport, machine à café, hygiène, nettoyage, matériel professionnel, emballage, consommables… Tout ce dont une entreprise a besoin pour fonctionner au quotidien.",
  },
  {
    question: 'Comment se passe la facturation ?',
    answer:
      "Vous êtes facturé directement par les fournisseurs, aux prix négociés. Les moyens de paiement dépendent de chaque fournisseur (CB, virement, prélèvement…).",
  },
  {
    question: "Y a-t-il un engagement ou une obligation d'achat ?",
    answer:
      "Aucune obligation d'achat. Vous commandez ce que vous voulez, quand vous voulez, avec les fournisseurs de votre choix. Vous gardez une totale maîtrise de vos achats.",
  },
  {
    question: 'Comment résilier ?',
    answer:
      "L'adhésion fonctionne par année civile. Vous pouvez décider de ne pas renouveler l'année suivante, sans justification et sans frais supplémentaires.",
  },
];

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

