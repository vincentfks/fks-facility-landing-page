/** Questions fréquentes affichées sur l'accueil et reprises en données structurées FAQPage */
interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
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
