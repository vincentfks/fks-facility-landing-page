/**
 * Métadonnées SEO des pages /solutions/:slug.
 * `h1` remplace le titre affiché en tête de page.
 */
export interface SolutionSeo {
  slug: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  serviceType: string;
  /** Zone couverte par le partenaire, France entière par défaut */
  areaServed?: string[];
  /** Questions affichées en bas de page et reprises en FAQPage */
  faq: { question: string; answer: string }[];
}

export const solutionsSeo: SolutionSeo[] = [
  {
    slug: 'emballage',
    name: 'Emballage',
    h1: 'Cartons et emballages pour entreprises',
    title: "Cartons et emballages PME à prix négociés | FKS Facility",
    description:
      "Cartons, adhésifs, films, palettes : plus de 6 000 références d'emballage à tarifs négociés avec CENPAC, livrées en 24/72 h, sans minimum d'achat.",
    serviceType: 'Achat groupé de cartons et emballages professionnels',
    faq: [
      { question: "Comment acheter des cartons et emballages moins cher pour une PME ?", answer: "En passant par la centrale d'achat FKS Facility, vous commandez directement chez CENPAC aux tarifs négociés : remises allant jusqu'à 80 % sur plus de 6 000 références, sans minimum d'achat." },
      { question: "Quels emballages sont disponibles ?", answer: "Cartons simple et double cannelure, boîtes, adhésifs, films étirables et à bulles, palettes, cerclage, articles de déménagement, emballages personnalisés, ainsi que du matériel de manutention et des EPI." },
      { question: "Quels sont les délais de livraison ?", answer: "Les références CENPAC sont livrables en 24 à 72 heures, partout en France. Vous restez client direct du fournisseur, qui gère la livraison et le service après-vente." },
    ],
  },
  {
    slug: 'bureau',
    name: 'Espace bureau',
    h1: 'Fournitures et mobilier de bureau à prix négociés',
    title: 'Fournitures et mobilier de bureau pour PME | FKS Facility',
    description:
      "Fournitures, mobilier, hygiène et objets publicitaires à tarifs négociés avec Bruneau pour les TPE et PME. Commandez en direct, sans minimum d'achat.",
    serviceType: 'Achat groupé de fournitures et mobilier de bureau',
    faq: [
      { question: "Comment réduire le coût des fournitures de bureau ?", answer: "Avec l'adhésion FKS Facility, vous accédez aux conditions négociées avec Bruneau : 10 % de remise sur la quasi-totalité des 80 000 produits et jusqu'à 70 % sur certaines références." },
      { question: "Le mobilier de bureau est-il concerné ?", answer: "Oui : bureaux, fauteuils, caissons, armoires et tables, mais aussi fournitures, consommables, hygiène, décoration et objets publicitaires." },
      { question: "Faut-il commander un volume minimum ?", answer: "Non. Vous commandez ce dont vous avez besoin, quand vous en avez besoin, directement chez Bruneau, avec une livraison en 24 à 48 heures." },
    ],
  },
  {
    slug: 'informatique',
    name: 'Informatique',
    h1: 'Informatique et intelligence artificielle pour PME',
    title: 'Informatique, IA et site web pour TPE et PME | FKS Facility',
    description:
      "Audit, formations à l'IA, agents intelligents et création de site web pour TPE et PME avec Polaris, partenaire informatique de la centrale d'achat FKS.",
    serviceType: 'Services informatiques et intelligence artificielle',
    faq: [
      { question: "Quels services informatiques propose FKS Facility ?", answer: "Avec Polaris, FKS Facility donne accès à un audit de vos process, à des formations à l'IA générative, à des agents intelligents et automatisations sur mesure, ainsi qu'à la création de sites web." },
      { question: "L'IA est-elle adaptée à une TPE ou une PME ?", answer: "Oui, à condition de partir de vos usages réels. L'audit identifie les tâches où l'IA fait gagner du temps, puis les formations rendent vos équipes autonomes." },
      { question: "Comment bénéficier des conditions négociées ?", answer: "Adhérez à FKS Facility selon la taille de votre entreprise, puis contactez Polaris en précisant votre adhésion pour profiter des conditions dédiées." },
    ],
  },
  {
    slug: 'nettoyage',
    name: 'Nettoyage',
    h1: 'Nettoyage de vitres et locaux professionnels (91, 92)',
    title: 'Nettoyage de vitres professionnel en Essonne | FKS Facility',
    description:
      "Nettoyage de vitres et de locaux professionnels en Essonne (91) et Hauts-de-Seine (92) avec Yak Clean, à tarif négocié pour les entreprises adhérentes.",
    serviceType: 'Nettoyage professionnel de vitres et de locaux',
    areaServed: ['Essonne', 'Hauts-de-Seine'],
    faq: [
      { question: "Où intervient le nettoyage de vitres Yak Clean ?", answer: "Yak Clean intervient en Essonne (91) et dans les Hauts-de-Seine (92), pour les vitres intérieures et extérieures, vitrines commerciales, bureaux et bâtiments industriels." },
      { question: "Les prestations peuvent-elles être régulières ?", answer: "Oui. L'entretien peut être ponctuel ou régulier, avec des prestations sur mesure et des produits écologiques." },
      { question: "Comment obtenir le tarif négocié ?", answer: "Une fois adhérent à la centrale d'achat FKS Facility, vous contactez Yak Clean directement et bénéficiez des conditions négociées pour votre entreprise." },
    ],
  },
  {
    slug: 'snacking',
    name: 'Snacking',
    h1: 'Snacking et machines à café en entreprise',
    title: 'Snacking et machine à café en entreprise | FKS Facility',
    description:
      "Machines à café, distributeurs de boissons et de snacks, fontaines à eau : équipez vos locaux avec D8 à tarif négocié. Offre snacking pour TPE et PME.",
    serviceType: 'Snacking, machines à café et distributeurs pour entreprises',
    faq: [
      { question: "Quelles solutions de snacking pour une entreprise ?", answer: "Machines à café et percolateurs professionnels, coffee corner, distributeurs de boissons chaudes et froides, fontaines à eau et distributeurs de snacks, avec notre partenaire D8." },
      { question: "Pourquoi installer une machine à café au bureau ?", answer: "La pause café améliore le bien-être au travail et favorise les échanges entre collègues. Avec FKS Facility, vous l'équipez à des conditions commerciales négociées." },
      { question: "Le snacking est-il accessible aux petites entreprises ?", answer: "Oui. L'offre s'adapte à votre effectif, de la TPE à la PME, sans obligation d'achat liée à l'adhésion FKS Facility." },
    ],
  },
  {
    slug: 'transport',
    name: 'Transport & logistique',
    h1: 'Transport, logistique et messagerie pour PME',
    title: 'Transport, logistique et messagerie pour PME | FKS Facility',
    description:
      "Messagerie, affrètement, express, stockage et location d'utilitaires : accédez à des tarifs transport et logistique négociés pour votre TPE ou PME.",
    serviceType: 'Transport, messagerie et logistique pour entreprises',
    faq: [
      { question: "Quelles prestations de transport sont couvertes ?", answer: "Expédition et stockage de colis, messagerie monocolis, solutions express, affrètement, location d'utilitaires et de camions de livraison, ainsi que les emballages de protection." },
      { question: "À qui s'adresse l'offre transport et logistique ?", answer: "Aux TPE et PME qui expédient régulièrement et veulent fiabiliser leurs livraisons tout en maîtrisant leurs coûts, avec notre partenaire CP Consulting." },
      { question: "Comment en profiter ?", answer: "Adhérez à FKS Facility, puis nous vous mettons en relation avec nos fournisseurs en transport et logistique aux conditions négociées." },
    ],
  },
  {
    slug: 'design-marque',
    name: 'Design de marque',
    h1: 'Design de marque et communication digitale',
    title: 'Identité visuelle et design de marque PME | FKS Facility',
    description:
      "Identité visuelle, site web, réseaux sociaux et SEO local avec l'agence Rouge Varap, à tarif négocié pour les TPE et PME adhérentes à FKS Facility.",
    serviceType: 'Design de marque et communication digitale',
    faq: [
      { question: "Que comprend l'offre design de marque ?", answer: "Création d'identité visuelle, sites web, gestion des réseaux sociaux, production de contenus et stratégie SEO locale, avec l'agence Rouge Varap." },
      { question: "Quelle est l'expérience de l'agence partenaire ?", answer: "Rouge Varap, agence de communication digitale basée à Toulouse, revendique plus de 8 ans d'expérience et plus de 100 projets réalisés." },
      { question: "L'accompagnement est-il possible à distance ?", answer: "Oui. L'agence accompagne les entreprises partout en France ; les adhérents FKS Facility bénéficient de conditions négociées." },
    ],
  },
  {
    slug: 'agence-video',
    name: 'Agence vidéo',
    h1: 'Production vidéo et réseaux sociaux pour entreprises',
    title: 'Agence vidéo et réseaux sociaux entreprise | FKS Facility',
    description:
      "Stratégie, tournage, montage et gestion de vos réseaux sociaux avec Redcut : une production vidéo clé en main à tarif négocié pour les TPE et PME.",
    serviceType: 'Production vidéo et gestion des réseaux sociaux',
    faq: [
      { question: "Que propose l'agence vidéo Redcut ?", answer: "Une production vidéo clé en main : stratégie, tournage sur site, montage dynamique et gestion complète de vos réseaux sociaux pour transformer votre audience en clients." },
      { question: "La vidéo est-elle utile pour une PME ?", answer: "Oui : sur les réseaux sociaux, la vidéo aide à présenter vos produits, vos équipes et vos réalisations de façon concrète, et à gagner en visibilité." },
      { question: "Comment bénéficier du tarif négocié ?", answer: "Adhérez à la centrale d'achat FKS Facility puis contactez Redcut en tant qu'adhérent pour accéder aux conditions dédiées." },
    ],
  },
];

export const getSolutionSeo = (slug: string): SolutionSeo | undefined =>
  solutionsSeo.find((solution) => solution.slug === slug);
