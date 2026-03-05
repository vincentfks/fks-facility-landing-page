import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { MultiStepForm } from '../../components/forms/MultiStepForm';
import { Card } from '../../components/ui/Card';
import { api } from '../../lib/api';
import { Check, Package, PenTool, FileText, Sparkles, TrendingDown, ShoppingCart, Zap, Clock, Star, Brain, GraduationCap, Rocket, Sparkle, Camera, Video, Globe, Palette, Search, Printer, Calendar, Share2 } from 'lucide-react';

const solutions: Record<string, any> = {
  emballage: {
    title: 'Solutions Emballage',
    description:
      'Emballons vos idées avec excellence. Accédez au meilleur choix et au meilleur rapport qualité/prix pour vos solutions d\'emballage chez notre partenaire CENPAC.',
    heroImage: '/emballage-page/Photo_1_1-removebg-preview.png',
    icon: '📦',
    introTitle: 'Emballé, c\'est pesé !',
    introIcons: ['📦', '🎁', '📋'],
    introText1: 'Grâce aux avantages commerciaux que nous avons négociés avec <span class="text-orange-600 font-semibold">CENPAC</span>, vous pouvez bénéficier de remises allant jusqu\'à 80 % sur plus de 6 000 références, livrables en 24/72 heures.',
    introText2: 'Des produits tels que des emballages en carton, des adhésifs, des palettes, des boîtes, des films à bulles, des articles pour le déménagement, et même des options d\'emballage personnalisé.',
    introFeatures: [],
    partnersInfo: [
      { icon: TrendingDown, title: 'Économies', description: 'Tarifs négociés' },
      { icon: Check, title: 'Gestion simplifiée', description: 'Suivi facilité' },
      { icon: Star, title: 'Service Client', description: 'Support dédié' },
      { icon: Package, title: 'Large gamme', description: '6 000 références' },
    ],
    categories: [
      {
        title: 'Emballage',
        description: 'Boîtes, caisses, palettes, film étirable, pochettes, adhésifs, cerclages...',
        image: '/emballage-page/package_574352-1.svg',
      },
      {
        title: 'Équipement',
        description: 'Manutention, Équipement de protection individuelle (EPI), machines.',
        image: '/emballage-page/Group.svg',
      },
    ],
    products: [
      {
        name: 'COLIS DE FILM ÉTIRABLE',
        description: '6 bobines 17m x 450mm x 270m',
        price: '4,45 €',
        oldPrice: '13,02 € HT',
        image: '/emballage-page/film-etirable.png',
      },
      {
        name: 'CAISSE CARTON',
        description: 'Simple cannelure 500 x 400 x 300 mm',
        price: '1,07 €',
        oldPrice: '3,14 € HT',
        image: '/emballage-page/Photo_1_1-removebg-preview.png',
      }
    ],
    benefits: [
      '50% de remises en moyenne sur plusieurs milliers de références',
      'Des conditions négociées sur les machines et systèmes d\'emballage',
      'Des experts de l\'emballage dédiés pour réduire vos coûts de fonctionnement',
      'Livraison rapide en 24/72 heures',
      'Plus de 6 000 références disponibles',
    ],
    savings: 'jusqu\'à 65%',
  },
  bureau: {
    title: 'Solutions Espace Bureau',
    description:
      'FKS Facility vous offre des économies sur l’aménagement de vos espaces de travail et l’achat de fournitures de bureau grâce à notre partenariat avec la société BRUNEAU, leader du e-commerce en France et en Belgique pour la vente de mobilier, consommables, équipements et fournitures de bureau. Réduisez vos dépenses en toute simplicité avec nos tarifs négociés.',
    icon: '💼',
    heroImage: '/bruneau-page/bureau-image.jpg',
    partnerLogo: '/partners/logo-bruneau.png',
    introTitle: 'Pierre, Feuille, Stylo !',
    introIcons: ['🪨', '📄', '✏️'],
    introText1: 'Découvrez l\'efficacité à prix réduits avec <span class="text-primary-600 font-semibold">BRUNEAU</span> ! Grâce à nos avantages commerciaux exclusifs, bénéficiez de remises exceptionnelles sur tout votre équipement de bureau.',
    introText2: 'Que ce soit pour votre bureau, des ramettes de papier A4, des cartouches, de la décoration, des écrans, des classeurs, des essuie-mains, du café… Bruneau assure une <span class="text-secondary-600 font-semibold">livraison rapide en 24/48 heures</span> pour répondre à tous vos besoins.',
    introFeatures: [],
    partnersInfo: [
      { icon: TrendingDown, title: 'Économies', description: 'Tarifs négociés' },
      { icon: Package, title: 'Variété', description: 'Large choix' },
      { icon: Star, title: 'Confort', description: 'Ergonomie' },
      { icon: Clock, title: 'Service Client', description: 'Support dédié' },
    ],
    categories: [
      {
        title: 'Mobilier de bureau',
        description: 'Caissons, tables, lampadaire, bureaux, fauteuils, tableaux, stores, armoires...',
        image: '/bruneau-page/desk_4296109-1.svg',
      },
      {
        title: 'Décoration & Publicité',
        description: 'Stylos, petits objets publicitaires, textiles, objets de décoration variés, plantes...',
        image: '/bruneau-page/bookshelf_863969-1.svg',
      },
      {
        title: 'Fourniture de bureau',
        description: 'Ramettes papier, stylos, agrafeuses, enveloppes, carnets, tampons...',
        image: '/bruneau-page/stationery_4645342-1.svg',
      },
      {
        title: 'Hygiène & Entretien',
        description: 'Gels hydroalcoolique, gants de protections, savons, lessives, lingettes...',
        image: '/bruneau-page/detergent_4360228-1.svg',
      }
    ],
    products: [
      {
        name: 'CLASSEUR BRUNEAU',
        description: 'à levier cartonné A4 Dos 5 cm',
        price: '2,18 €',
        oldPrice: '4,99 € HT',
        image: '/bruneau-page/classeur-bruneau.png',
      },
      {
        name: 'PAPIER CLAIRALFA A4',
        description: 'blanc 80 g Clairefontaine (500 feuilles)',
        price: '4,28 €',
        oldPrice: '7,75 € HT',
        image: '/bruneau-page/clairefontaine-bruneau.png',
      }
    ],
    benefits: [
      '70% de remise en moyenne sur plusieurs centaines de références',
      '10% de remise sur la quasi-totalité des 80 000 produits disponibles',
      '17% de remise sur le mobilier et aménagement de bureau',
    ],
    savings: 'jusqu\'à 70%',
  },
  informatique: {
    title: 'Solutions Informatique',
    description:
      'Transformez votre entreprise avec l\'intelligence artificielle. Polaris Agency vous accompagne dans votre transformation digitale avec des solutions IA sur mesure pour augmenter votre productivité et améliorer la qualité de votre travail.',
    icon: '💻',
    heroImage: '/partners/polaris.png',
    introTitle: 'L\'intelligence artificielle à votre service',
    introIcons: ['🤖', '⚡', '🚀'],
    introText1: 'Maîtrisez et intégrez l\'<span class="text-amber-400 font-semibold">IA générative</span> pour augmenter la productivité de votre entreprise et améliorer la qualité de votre travail grâce à des solutions sur-mesure.',
    introText2: 'Polaris est une agence indépendante, agile et sur-mesure dédiée à la croissance des entreprises, qui allie trois expertises : <span class="text-amber-400 font-semibold">conseil, formation et automatisation</span>.',
    introFeatures: [
      { icon: Brain, title: 'Audit & Conseil', description: 'Recommandations personnalisées' },
      { icon: GraduationCap, title: 'Formations', description: 'Équipes opérationnelles rapidement' },
      { icon: Rocket, title: 'Solutions IA', description: 'Agents intelligents sur mesure' },
      { icon: PenTool, title: 'Site web', description: 'Création d\'un site web sur-mesure qui converti' },
    ],
    partnersInfo: [
      { icon: Brain, title: 'Audit & Conseil', description: 'Recommandations personnalisées' },
      { icon: GraduationCap, title: 'Formations', description: 'Équipes opérationnelles rapidement' },
      { icon: Rocket, title: 'Solutions IA', description: 'Agents intelligents sur mesure' },
      { icon: PenTool, title: 'Site web', description: 'Création d\'un site web sur-mesure qui converti' },
    ],
    categories: [
      {
        title: 'Audit & Conseil',
        description: 'Audit détaillé de vos process et recommandations personnalisées pour intégrer l\'IA de manière optimale dans votre organisation.',
        image: '/informatique-page/audit.svg',
      },
      {
        title: 'Formations',
        description: 'Formations en IA générative conçues pour faciliter son intégration en entreprise et rendre vos équipes opérationnelles rapidement.',
        image: '/informatique-page/formation.svg',
      },
      {
        title: 'Solutions IA',
        description: 'Agents intelligents, automatisations, applications personnalisées et systèmes vocaux pensés pour s\'intégrer naturellement à vos outils.',
        image: '/informatique-page/solutions.svg',
      },
    ],
    products: [],
    benefits: [
      'Solutions IA sur mesure adaptées à vos spécificités',
      'Accompagnement de l\'adoption à l\'impact mesurable',
      'Projets centrés sur l\'utilisateur avec livrables pertinents',
      'Formations pour rendre vos équipes opérationnelles rapidement',
      'Automatisations et agents intelligents intégrés à vos outils',
    ],
    savings: 'jusqu\'à 30%',
  },
  snacking: {
    title: 'Solutions Snacking',
    description:
      'Transformez votre pause en une expérience avec D8 ! Augmentez le bien-être de vos équipes au travail en faisant de la pause café un moment privilégié. Bien plus qu\'une simple détente, c\'est l\'occasion parfaite pour créer des liens, échanger avec vos collègues et renforcer l\'esprit d\'équipe. Redéfinissez la pause café avec nous, pour un environnement de travail plus agréable et une équipe plus unie.',
    icon: '☕',
    heroImage: '/partners/D8-logo.webp',
    introTitle: 'Offrez la meilleure des pauses',
    introIcons: ['☕', '🥐', '🥤'],
    introText1: 'Explorez une expérience gustative exceptionnelle avec notre partenaire <span class="text-primary-600 font-semibold">D8</span>, expert incontesté de l\'espresso à l\'italienne et de la pause café en entreprise.',
    introText2: 'FKS Facility vous fait bénéficier de <span class="text-primary-600">conditions commerciales sur-mesure pour votre choix</span> en machines à café, percolateurs professionnels, coffee corner, fontaines à eau et <span class="text-secondary-600">snacks</span>.',
    introFeatures: [],
    partnersInfo: [
      { icon: TrendingDown, title: 'Économies', description: 'Tarifs négociés' },
      { icon: Star, title: 'Variété', description: 'Large choix' },
      { icon: Zap, title: 'Livraison rapide', description: 'Service réactif' },
      { icon: Clock, title: 'Service Client', description: 'Support dédié' },
    ],
    categories: [
      {
        title: 'Boissons',
        description: 'Machine à café, distributeur de boissons chaudes et froide, fontaine à eau...',
        image: '/snacking-page/machine_2935543-1.svg',
      },
      {
        title: 'Snacks',
        description: 'Distributeurs de snacks, gâteaux, bonbons, produits frais.',
        image: '/snacking-page/vending-machine_1198337-1-1.svg',
      },
    ],
    products: [],
    benefits: [
      'Conditions commerciales sur-mesure avec D8',
      'Expert incontesté de l\'espresso à l\'italienne',
      'Machines à café, percolateurs professionnels, coffee corner',
      'Fontaines à eau et snacks variés',
      'Augmentation du bien-être de vos équipes au travail',
    ],
    savings: 'jusqu\'à 40%',
  },
  transport: {
    title: 'Solutions Transport & Logistique',
    description:
      'Parce que chaque colis a son histoire, confiez-nous la vôtre. Que vous ayez besoin d\'un service d\'affrètement dédié, d\'une messagerie rapide ou d\'un stockage sécurisé, faites appel à FKS Facility pour vous mettre en relation avec nos fournisseurs en transport et logistique.',
    icon: '🚚',
    heroImage: '/transport-page/office-arrangement-with-partitions-1-5.jpg',
    partnerLogo: '/transport-page/CP-consulting-logo.png',
    introTitle: 'Du point <span class="text-pink-600 font-bold">A</span> au succès <span class="text-pink-500 font-bold">B</span>',
    introIcons: ['🚚', '📦', '📍'],
    introText1: 'Vous en avez marre des retards de livraison chez vos clients, des colis perdus ou endommagés ? Un transporteur reflète votre image et se doit d\'être irréprochable.',
    introText2: 'Chez FKS Facility, nous vous offrons des <span class="text-pink-600">partenaires logistiques de qualité pour une image impeccable</span>. Notre engagement ? Réduire vos dépenses tout en garantissant une <span class="text-pink-500">qualité de service optimale</span>. Faites confiance à nos experts pour vous guider vers les transporteurs idéaux, adaptés à vos besoins, avec une solution rentable à la clé.',
    introFeatures: [],
    partnersInfo: [
      { icon: TrendingDown, title: 'Économies', description: 'Tarifs négociés' },
      { icon: Check, title: 'Gestion simplifiée', description: 'Suivi facilité' },
      { icon: Star, title: 'Fiabilité', description: 'Partenaires certifiés' },
    ],
    categories: [
      {
        title: 'Transport et stockage',
        description: 'Expédition et stockage de colis, solution express, affrètement...',
        image: '/transport-page/delivery-truck_9862689-1.svg',
      },
      {
        title: 'Emballage',
        description: 'Films, palettes, manutention, calages, protection, cerclage, cartons...',
        image: '/transport-page/box_3639221-1.svg',
      },
      {
        title: 'Location',
        description: 'Location utilitaires, camions de livraisons.',
        image: '/transport-page/car-key_361161-1.svg',
      },
      {
        title: 'Messagerie',
        description: 'Monocolis et fonctionnalité express.',
        image: '/transport-page/printing_2361937-1.svg',
      },
    ],
    products: [],
    benefits: [
      'Partenaires logistiques de qualité pour une image impeccable',
      'Réduction des dépenses tout en garantissant une qualité de service optimale',
      'Experts pour vous guider vers les transporteurs idéaux',
      'Solutions adaptées à vos besoins avec une solution rentable à la clé',
      'Services d\'affrètement dédié, messagerie rapide et stockage sécurisé',
    ],
    savings: 'jusqu\'à 50%',
  },
  nettoyage: {
    title: 'Solutions Nettoyage',
    description:
      'Faites briller vos vitres avec Yak Clean ! Expert en nettoyage de vitres professionnel en Essonne (91) et Hauts-de-Seine (92). Que ce soit pour un entretien ponctuel ou régulier, bénéficiez d\'un service de qualité et de prestations sur-mesure pour un nettoyage impeccable adapté à vos besoins.',
    icon: '✨',
    heroImage: '/nettoyage-page/Nettoyage-de-vitres-dans-le-91-92-YAK-Clean-13-2048x1906.webp',
    partnerLogo: '/partners/Yaklean-logo.png',
    introTitle: 'Laissez entrer la lumière !',
    introIcons: ['✨', '🪟', '💧'],
    introText1: 'Découvrez l\'excellence du nettoyage de vitres avec <span class="text-blue-600 font-semibold">Yak Clean</span> ! Grâce à notre partenariat exclusif, bénéficiez de prestations professionnelles de qualité pour particuliers et entreprises en Essonne et Hauts-de-Seine.',
    introText2: 'Que ce soit pour vos vitres intérieures et extérieures, vitrines commerciales, bureaux ou bâtiments industriels, Yak Clean assure un <span class="text-blue-500 font-semibold">nettoyage impeccable avec des produits écologiques</span>. Profitez aussi de l\'avance immédiate du crédit d\'impôt : vous ne payez que 50% du prix !',
    introFeatures: [],
    partnersInfo: [
      { icon: TrendingDown, title: 'Économies', description: 'Crédit d\'impôt 50%' },
      { icon: Sparkle, title: 'Qualité', description: 'Rendu impeccable' },
      { icon: Check, title: 'Écologique', description: 'Produits respectueux' },
      { icon: Clock, title: 'Réactivité', description: 'Service rapide' },
    ],
    categories: [
      {
        title: 'Nettoyage de vitres',
        description: 'Lavage de vitres intérieures et extérieures, vitrines commerciales, bureaux, bâtiments industriels, vitres en hauteur jusqu\'à 12 mètres.',
        image: '/nettoyage-page/window.svg',
      },
      {
        title: 'Nettoyage après chantier',
        description: 'Élimination des poussières, autocollants, traces de peinture et résidus de colle pour des vitres parfaitement claires.',
        image: '/nettoyage-page/construction.svg',
      },
      {
        title: 'Entretien régulier',
        description: 'Formules flexibles : ponctuel, trimestriel, mensuel. Entretien régulier de vitrages pour un résultat impeccable toute l\'année.',
        image: '/nettoyage-page/calendar.svg',
      },
      {
        title: 'Détachage en profondeur',
        description: 'Nettoyage intensif des encadrements, décrassage en profondeur pour des vitres comme neuves.',
        image: '/nettoyage-page/cleaning.svg',
      },
    ],
    products: [],
    benefits: [
      'Avance immédiate du crédit d\'impôt : vous ne payez que 50% du prix',
      'Nettoyage de vitres en hauteur jusqu\'à 12 mètres en toute sécurité',
      'Produits écologiques et respectueux de l\'environnement',
      'Technique à l\'américaine garantissant des vitres sans traces ni auréoles',
      'Intervention en Essonne (91) et Hauts-de-Seine (92)',
      'Formules flexibles adaptées à vos besoins (ponctuel, trimestriel, mensuel)',
    ],
    savings: 'jusqu\'à 20%',
  },
  'design-marque': {
    title: 'Solutions Design & Marque',
    description:
      'VARAP, votre agence de communication digitale à Toulouse, propose des solutions sur-mesure pour renforcer votre image de marque et attirer de nouveaux clients. Sites web performants, identité visuelle, réseaux sociaux, stratégies SEO locales, et bien plus encore.',
    icon: '🎨',
    heroImage: '/design-page/agenceV1.png',
    partnerLogo: '/design-page/Agence-rouge-Varap.svg',
    introTitle: 'Votre image, notre expertise !',
    introIcons: ['🎨', '✨', '🚀'],
    introText1: 'Découvrez l\'excellence de la communication digitale avec <span class="text-red-600 font-semibold">VARAP</span> ! Grâce à notre partenariat exclusif, bénéficiez de solutions sur-mesure pour renforcer votre image de marque et maximiser votre visibilité en ligne.',
    introText2: 'Que ce soit pour créer votre identité visuelle, développer votre site web, gérer vos réseaux sociaux, ou produire des contenus percutants, VARAP vous accompagne avec <span class="text-red-500 font-semibold">plus de 8 ans d\'expérience</span> et plus de 100 projets réalisés.',
    introFeatures: [],
    partnersInfo: [
      { icon: Star, title: 'Expertise', description: '8+ ans d\'expérience' },
      { icon: Check, title: 'Qualité', description: '100+ projets réalisés' },
      { icon: Zap, title: 'Réactivité', description: 'Solutions sur-mesure' },
      { icon: Sparkles, title: 'Créativité', description: 'Designs percutants' },
    ],
    categories: [
      {
        title: 'Identité visuelle',
        description: 'Création de logo, palette de couleurs, typographie, charte graphique, guide de style complet pour définir votre identité de marque.',
        icon: Palette,
        iconColor: 'text-red-600',
        gradientColor: 'from-red-50 to-white',
      },
      {
        title: 'Sites Web',
        description: 'Création de sites performants, modernes et optimisés pour votre activité. Sites vitrine et sites personnalisés (E-commerce, Blog...).',
        icon: Globe,
        iconColor: 'text-rose-600',
        gradientColor: 'from-rose-50 to-white',
      },
      {
        title: 'Réseaux Sociaux',
        description: 'Gestion et création de contenu pour engager et fédérer votre communauté. Stratégie de contenu et community management.',
        icon: Share2,
        iconColor: 'text-pink-600',
        gradientColor: 'from-pink-50 to-white',
      },
      {
        title: 'Stratégie SEO',
        description: 'Boostez votre visibilité en ligne grâce à un référencement optimisé et efficace. Stratégies SEO locales adaptées à votre secteur.',
        icon: Search,
        iconColor: 'text-red-700',
        gradientColor: 'from-red-100 to-white',
      },
      {
        title: 'Print & Web',
        description: 'Des supports visuels percutants et sur-mesure, pensés pour le digital et l\'impression. Cartes de visite, affiches, brochures...',
        icon: Printer,
        iconColor: 'text-rose-700',
        gradientColor: 'from-rose-100 to-white',
      },
      {
        title: 'Vidéo & Motion',
        description: 'Vidéos professionnelles et animations fluides pour sublimer vos produits ou événements. Storytelling impactant pour captiver.',
        icon: Video,
        iconColor: 'text-pink-700',
        gradientColor: 'from-pink-100 to-white',
      },
      {
        title: 'Photographie',
        description: 'Des clichés professionnels pour sublimer vos produits ou événements. Shooting produit, événementiel, packshot...',
        icon: Camera,
        iconColor: 'text-red-600',
        gradientColor: 'from-red-50 to-white',
      },
      {
        title: 'Événementiel',
        description: 'Valorisez vos événements avec une communication sur-mesure et percutante. Organisation et couverture d\'événements.',
        icon: Calendar,
        iconColor: 'text-rose-600',
        gradientColor: 'from-rose-50 to-white',
      },
    ],
    products: [],
    benefits: [
      'Plus de 8 ans d\'expérience dans la communication ciblée',
      'Plus de 100 projets variés réalisés avec succès',
      'Solutions sur-mesure adaptées à vos besoins spécifiques',
      'Expertise locale à Toulouse et ses alentours',
      'Accompagnement dédié de la conception à la réalisation',
      'Stratégies personnalisées pour maximiser votre impact',
    ],
    savings: 'jusqu\'à 20%',
  },
  'agence-video': {
    title: 'Solutions Agence Vidéo',
    description:
      'Redcut transforme vos réseaux sociaux en accélérateur de business. Production vidéo clé en main : stratégie, tournage sur site, montage dynamique et gestion complète de vos réseaux sociaux pour convertir votre audience en clients.',
    icon: '🎬',
    heroImage: '/agence-video/redcut-degrade.png',
    partnerLogo: '/partners/redcut.png',
    introTitle: 'Vos réseaux sociaux, votre machine à business !',
    introIcons: ['🎬', '📱', '🚀'],
    introText1:
      '<span class="text-red-600 font-semibold">Redcut</span> ne fait pas "juste des vidéos" — ils convertissent vos vues en prospects qualifiés. Grâce à notre partenariat exclusif, bénéficiez d\'une offre 100% clé en main pour transformer votre expertise en visibilité et surtout en chiffre d\'affaires.',
    introText2:
      'BTP, Immobilier, Restauration... Redcut accompagne les entreprises avec une méthode éprouvée : stratégie sur-mesure, tournage sur site, montage dynamique et suivi des performances. Résultat : <span class="text-red-500 font-semibold">jusqu\'à x3.5 de chiffre d\'affaires</span> pour leurs clients.',
    introFeatures: [],
    partnersInfo: [
      { icon: FileText, title: 'Stratégie', description: 'Scripts sur-mesure' },
      { icon: Camera, title: 'Tournage', description: 'Équipe sur site' },
      { icon: Sparkles, title: 'Création', description: 'Montage dynamique' },
      { icon: TrendingDown, title: 'Résultats', description: 'x3.5 de CA' },
    ],
    categories: [
      {
        title: 'Stratégie & Scripts',
        description:
          'Audit de positionnement, direction éditoriale et scripts optimisés adaptés à votre cible et votre secteur d\'activité.',
        icon: FileText,
        iconColor: 'text-red-600',
        gradientColor: 'from-red-50 to-white',
      },
      {
        title: 'Tournage sur site',
        description:
          'Nos équipes se déplacent partout en France pour capturer votre savoir-faire et humaniser votre marque avec des contenus authentiques.',
        icon: Camera,
        iconColor: 'text-red-600',
        gradientColor: 'from-red-50 to-white',
      },
      {
        title: 'Montage & Publication',
        description:
          'Montage dynamique et créatif, publication optimisée sur vos réseaux sociaux et suivi des performances en temps réel.',
        icon: Video,
        iconColor: 'text-red-700',
        gradientColor: 'from-red-100 to-white',
      },
      {
        title: 'Conversion & ROI',
        description:
          'On ne cherche pas juste à faire des vues — on cherche à convertir votre audience en clients avec des résultats mesurables.',
        icon: TrendingDown,
        iconColor: 'text-red-700',
        gradientColor: 'from-red-100 to-white',
      },
    ],
    products: [],
    benefits: [
      'Offre 100% clé en main : de la stratégie à la publication',
      'Tournage professionnel sur site, partout en France',
      'Résultats prouvés : jusqu\'à x3.5 de chiffre d\'affaires',
      'Spécialistes BTP, Immobilier, Restauration et plus',
      '-20% sur toutes les prestations via FKS Facility',
      'Suivi des performances et optimisation continue',
    ],
    savings: 'jusqu\'à 20%',
  },
};

export const SolutionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? solutions[slug] : null;

  // Carousel automatique pour la page nettoyage
  const nettoyageImages = slug === 'nettoyage' 
    ? ['/nettoyage-page/yak1.jpeg', '/nettoyage-page/yak2.jpeg', '/nettoyage-page/yak3.jpeg']
    : [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slug === 'nettoyage' && nettoyageImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % nettoyageImages.length);
      }, 3000); // 3 secondes

      return () => clearInterval(interval);
    }
  }, [slug, nettoyageImages.length]);

  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Solution non trouvée</h1>
          <Link to="/solutions">
            <Button>Retour aux solutions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (data: any) => {
    try {
      await api.submitContact({
        ...data,
        sector: solution.title,
        source: 'solution',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  // Détermine quelle image afficher
  const displayImage = slug === 'nettoyage' && nettoyageImages.length > 0
    ? nettoyageImages[currentImageIndex]
    : solution.heroImage;

  return (
    <div className={`min-h-screen ${slug === 'informatique' ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Hero section */}
      <section className={`py-16 lg:py-24 bg-gradient-to-br relative overflow-hidden ${
        slug === 'informatique'
          ? 'from-gray-900 via-gray-800 to-black'
          : slug === 'transport' 
          ? 'from-white via-white to-white' 
          : slug === 'emballage'
          ? 'from-white via-white to-white'
          : slug === 'bureau'
          ? 'from-white via-white to-white'
          : slug === 'snacking'
          ? 'from-white via-white to-white'
          : slug === 'nettoyage'
          ? 'from-white via-white to-white'
          : slug === 'design-marque'
          ? 'from-white via-white to-white'
          : slug === 'agence-video'
          ? 'from-white via-white to-white'
          : 'from-primary-50 via-white to-secondary-50'
      }`}>
        {/* Gradient fade overlay for seamless transition */}
        {slug === 'informatique' && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
        )}
        {/* Animated grid background for informatique */}
        {slug === 'informatique' && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>
        )}
        
        {/* Animated particles for informatique */}
        {slug === 'informatique' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Light effects */}
        {slug === 'informatique' ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </>
        ) : (
          <>
            <div className={`absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none ${
              slug === 'transport' ? 'bg-pink-200/20' : slug === 'emballage' ? 'bg-orange-200/10' : slug === 'energie' ? 'bg-green-200/20' : slug === 'bureau' ? 'bg-teal-200/20' : slug === 'snacking' ? 'bg-rose-200/20' : slug === 'nettoyage' ? 'bg-blue-200/20' : slug === 'design-marque' ? 'bg-red-200/20' : slug === 'agence-video' ? 'bg-red-200/20' : 'bg-primary-200/20'
            }`} />
            <div className={`absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none ${
              slug === 'transport' ? 'bg-pink-200/20' : slug === 'emballage' ? 'bg-orange-200/10' : slug === 'energie' ? 'bg-green-200/20' : slug === 'bureau' ? 'bg-teal-200/20' : slug === 'snacking' ? 'bg-rose-200/20' : slug === 'nettoyage' ? 'bg-blue-200/20' : slug === 'design-marque' ? 'bg-red-200/20' : slug === 'agence-video' ? 'bg-red-200/20' : 'bg-secondary-200/20'
            }`} />
          </>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col ${solution.heroImage ? 'lg:flex-row lg:items-center lg:text-left' : 'items-center text-center'} gap-12`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={solution.heroImage ? 'lg:w-1/2' : 'w-full'}
            >
              <div className={`text-6xl mb-4 ${solution.heroImage ? '' : 'mx-auto'}`}>{solution.icon}</div>
              <h1 className={`text-4xl lg:text-5xl font-display font-bold mb-4 ${
                slug === 'informatique' ? 'text-white' : 'text-gray-900'
              }`}>
                {solution.title}
              </h1>
              <p className={`text-lg mb-8 leading-relaxed ${
                slug === 'informatique' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {solution.description}
              </p>
              <div className={`inline-flex items-center px-6 py-3 rounded-full font-semibold shadow-sm border ${
                slug === 'informatique'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 backdrop-blur-sm'
                  : slug === 'transport' 
                  ? 'bg-pink-100 text-pink-700 border-pink-200' 
                  : slug === 'emballage'
                  ? 'bg-orange-100 text-orange-700 border-orange-200'
                  : slug === 'energie'
                  ? 'bg-green-100 text-green-700 border-green-200'
                  : slug === 'bureau'
                  ? 'bg-teal-100 text-teal-700 border-teal-200'
                  : slug === 'snacking'
                  ? 'bg-rose-100 text-rose-700 border-rose-200'
                  : slug === 'nettoyage'
                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                  : slug === 'design-marque'
                  ? 'bg-red-100 text-red-700 border-red-200'
                  : slug === 'agence-video'
                  ? 'bg-red-100 text-red-700 border-red-200'
                  : 'bg-primary-100 text-primary-700 border-primary-200'
              }`}>
                Économies {solution.savings}
              </div>
            </motion.div>

            {solution.heroImage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:w-1/2 relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-tr rounded-2xl blur-2xl opacity-50 transform rotate-3 animate-pulse ${
                  slug === 'transport' 
                    ? 'from-pink-200/40 to-pink-200/40' 
                    : slug === 'emballage'
                    ? 'from-orange-200/40 to-orange-200/40'
                    : slug === 'energie'
                    ? 'from-green-200/40 to-green-200/40'
                    : slug === 'bureau'
                    ? 'from-teal-200/40 to-teal-200/40'
                    : slug === 'snacking'
                    ? 'from-rose-200/40 to-rose-200/40'
                    : 'from-primary-200/40 to-secondary-200/40'
                }`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br to-transparent rounded-2xl ${
                  slug === 'transport' ? 'from-pink-100/20' : slug === 'emballage' ? 'from-orange-100/20' : slug === 'energie' ? 'from-green-100/20' : slug === 'bureau' ? 'from-teal-100/20' : slug === 'snacking' ? 'from-rose-100/20' : slug === 'nettoyage' ? 'from-blue-100/20' : 'from-primary-100/20'
                }`}></div>
                {/* Image principale */}
                {slug === 'nettoyage' && nettoyageImages.length > 0 ? (
                  <div className="relative rounded-2xl shadow-2xl w-full overflow-hidden shadow-blue-500/20">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={displayImage}
                        alt={solution.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full object-cover transform -rotate-1 hover:rotate-0 transition-transform duration-500"
                      />
                    </AnimatePresence>
                  </div>
                ) : (
                  <img
                    src={displayImage}
                    alt={solution.title}
                    className={`relative rounded-2xl shadow-2xl w-full object-cover transform -rotate-1 hover:rotate-0 transition-transform duration-500 ${
                      slug === 'transport' ? 'shadow-pink-500/20' : slug === 'emballage' ? 'shadow-orange-500/20' : slug === 'energie' ? 'shadow-green-500/20' : slug === 'bureau' ? 'shadow-teal-500/20' : slug === 'snacking' ? 'shadow-rose-500/20' : slug === 'nettoyage' ? 'shadow-blue-500/20' : slug === 'design-marque' ? 'shadow-red-500/20' : slug === 'agence-video' ? 'shadow-red-500/20' : 'shadow-primary-500/20'
                    }`}
                  />
                )}
                {/* Logo partenaire (si disponible) */}
                {solution.partnerLogo && (
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-xl shadow-xl p-2 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300 ${
                     slug === 'transport' ? 'shadow-pink-500/20' : slug === 'emballage' ? 'shadow-orange-500/20' : slug === 'energie' ? 'shadow-green-500/20' : slug === 'bureau' ? 'shadow-teal-500/20' : slug === 'snacking' ? 'shadow-rose-500/20' : 'shadow-primary-500/20'
                  }`}>
                    <img 
                      src={solution.partnerLogo} 
                      alt="Partner Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                {/* Mention Polaris pour la page informatique */}
                {slug === 'informatique' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-sm text-gray-400 italic">
                      💡 <span className="text-amber-400/80">Ce site web a été créé par Polaris</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Partners Info Carousel */}
      {solution.partnersInfo && solution.partnersInfo.length > 0 && (
        <section className={`py-12 overflow-hidden relative ${
          slug === 'informatique'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black -mt-1'
            : slug === 'emballage' 
            ? 'bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50' 
            : slug === 'energie'
            ? 'bg-gradient-to-r from-green-50 via-green-100/50 to-green-50'
            : slug === 'bureau'
            ? 'bg-gradient-to-r from-teal-50 via-teal-100/50 to-teal-50'
            : slug === 'snacking'
            ? 'bg-gradient-to-r from-rose-50 via-rose-100/50 to-rose-50'
            : slug === 'nettoyage'
            ? 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-blue-50'
            : slug === 'design-marque'
            ? 'bg-gradient-to-r from-red-50 via-red-100/50 to-red-50'
            : slug === 'agence-video'
            ? 'bg-gradient-to-r from-red-50 via-red-100/50 to-red-50'
            : 'bg-gradient-to-r from-pink-50 via-pink-100/50 to-pink-50'
        }`}>
          {/* Gradient fade overlay for seamless transition */}
          {slug === 'informatique' && (
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
          )}
          {slug === 'informatique' ? (
            <div className="relative">
              <div className="flex animate-scroll">
                {[...solution.partnersInfo, ...solution.partnersInfo, ...solution.partnersInfo, ...solution.partnersInfo].map((info: any, idx: number) => {
                  const IconComponent = info.icon;
                  return (
                    <div
                      key={idx}
                      className="flex-shrink-0 mx-8 flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-12 py-4 hover:bg-white/10 hover:border-amber-400/50 transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-500/20 border border-amber-500/30">
                        <IconComponent className="w-5 h-5 text-amber-300" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-white text-sm">{info.title}</h3>
                        <p className="text-xs text-gray-300">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-r via-transparent z-10 pointer-events-none ${
                slug === 'emballage' 
                  ? 'from-orange-50/80 to-orange-50/80' 
                  : slug === 'energie'
                  ? 'from-green-50/80 to-green-50/80'
                  : slug === 'bureau'
                  ? 'from-teal-50/80 to-teal-50/80'
                  : slug === 'snacking'
                  ? 'from-rose-50/80 to-rose-50/80'
                  : slug === 'nettoyage'
                  ? 'from-blue-50/80 to-blue-50/80'
                  : slug === 'design-marque'
                  ? 'from-red-50/80 to-red-50/80'
                  : slug === 'agence-video'
                  ? 'from-red-50/80 to-red-50/80'
                  : 'from-pink-50/80 to-pink-50/80'
              }`} />
              <div className="relative">
                <div className="flex animate-scroll">
                  {[...solution.partnersInfo, ...solution.partnersInfo, ...solution.partnersInfo, ...solution.partnersInfo].map((info: any, idx: number) => {
                    const IconComponent = info.icon;
                    return (
                      <div
                        key={idx}
                        className={`flex-shrink-0 mx-8 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-xl px-12 py-4 shadow-sm border hover:shadow-md transition-all ${
                          slug === 'emballage' 
                            ? 'border-orange-200/50 hover:border-orange-300' 
                            : slug === 'energie'
                            ? 'border-green-200/50 hover:border-green-300'
                            : slug === 'bureau'
                            ? 'border-teal-200/50 hover:border-teal-300'
                            : slug === 'snacking'
                            ? 'border-rose-200/50 hover:border-rose-300'
                            : slug === 'nettoyage'
                            ? 'border-blue-200/50 hover:border-blue-300'
                            : slug === 'design-marque'
                            ? 'border-red-200/50 hover:border-red-300'
                            : slug === 'agence-video'
                            ? 'border-red-200/50 hover:border-red-300'
                            : 'border-pink-200/50 hover:border-pink-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          slug === 'emballage' 
                            ? 'bg-orange-100' 
                            : slug === 'energie'
                            ? 'bg-green-100'
                            : slug === 'bureau'
                            ? 'bg-teal-100'
                            : slug === 'snacking'
                            ? 'bg-rose-100'
                            : slug === 'nettoyage'
                            ? 'bg-blue-100'
                            : slug === 'design-marque'
                            ? 'bg-red-100'
                            : slug === 'agence-video'
                            ? 'bg-red-100'
                            : 'bg-pink-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            slug === 'emballage' 
                              ? 'text-orange-600' 
                              : slug === 'energie'
                              ? 'text-green-600'
                              : slug === 'bureau'
                              ? 'text-teal-600'
                              : slug === 'snacking'
                              ? 'text-rose-600'
                              : slug === 'nettoyage'
                              ? 'text-blue-600'
                              : slug === 'design-marque'
                              ? 'text-red-600'
                              : slug === 'agence-video'
                              ? 'text-red-600'
                              : 'text-pink-600'
                          }`} />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-gray-900 text-sm">{info.title}</h3>
                          <p className="text-xs text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 30s linear infinite;
              display: flex;
              width: fit-content;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>
      )}

      {/* Intro Section */}
      {solution.introTitle && (
        <section className={`py-24 bg-gradient-to-br relative overflow-hidden ${
          slug === 'informatique'
            ? 'from-gray-900 via-gray-800 to-black -mt-1'
            : slug === 'transport' 
            ? 'from-white via-white to-white' 
            : slug === 'emballage'
            ? 'from-white via-white to-white'
          : slug === 'snacking'
          ? 'from-white via-white to-white'
          : slug === 'nettoyage'
          ? 'from-white via-white to-white'
          : slug === 'design-marque'
          ? 'from-white via-white to-white'
          : slug === 'agence-video'
          ? 'from-white via-white to-white'
          : 'from-white via-primary-50/30 to-secondary-50/30'
        }`}>
          {/* Gradient fade overlay for seamless transition */}
          {slug === 'informatique' && (
            <>
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
            </>
          )}
          {/* Animated grid background for informatique */}
          {slug === 'informatique' && (
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }} />
            </div>
          )}
          
          {/* Animated particles for informatique */}
          {slug === 'informatique' && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Animated light effects */}
          {slug === 'informatique' ? (
            <>
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              />
            </>
          ) : (
            <>
              <motion.div 
                className={`absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none ${
                  slug === 'transport' 
                    ? 'bg-pink-200/30' 
                    : slug === 'emballage'
                    ? 'bg-orange-200/15'
                    : slug === 'energie'
                    ? 'bg-green-200/15'
                    : slug === 'bureau'
                    ? 'bg-teal-200/15'
                    : slug === 'snacking'
                    ? 'bg-rose-200/15'
                    : slug === 'nettoyage'
                    ? 'bg-blue-200/15'
                    : slug === 'design-marque'
                    ? 'bg-red-200/15'
                    : slug === 'agence-video'
                    ? 'bg-red-200/15'
                    : 'bg-primary-200/30'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
                  slug === 'transport' 
                    ? 'bg-pink-200/30' 
                    : slug === 'emballage'
                    ? 'bg-orange-200/15'
                    : slug === 'energie'
                    ? 'bg-green-200/15'
                    : slug === 'bureau'
                    ? 'bg-teal-200/15'
                    : slug === 'snacking'
                    ? 'bg-rose-200/15'
                    : slug === 'nettoyage'
                    ? 'bg-blue-200/15'
                    : slug === 'design-marque'
                    ? 'bg-red-200/15'
                    : slug === 'agence-video'
                    ? 'bg-red-200/15'
                    : 'bg-secondary-200/30'
                }`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              />
            </>
          )}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Icon badges */}
            {solution.introIcons && (
              <div className="flex justify-center items-center gap-4 mb-16">
                {solution.introIcons.map((icon: string, idx: number) => (
                  <motion.div
                    key={idx}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                    className={`w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center border-2 ${
                      slug === 'informatique'
                        ? 'bg-white/5 backdrop-blur-md border-white/10'
                        : slug === 'transport'
                        ? 'bg-white border-pink-100'
                        : slug === 'emballage'
                        ? 'bg-white border-orange-100'
                        : slug === 'energie'
                        ? 'bg-white border-green-100'
                        : slug === 'bureau'
                        ? 'bg-white border-teal-100'
                        : slug === 'snacking'
                        ? 'bg-white border-rose-100'
                        : slug === 'nettoyage'
                        ? 'bg-white border-blue-100'
                        : slug === 'design-marque'
                        ? 'bg-white border-red-100'
                        : slug === 'agence-video'
                        ? 'bg-white border-red-100'
                        : idx % 2 === 0 ? 'bg-white border-primary-100' : 'bg-white border-secondary-100'
                    }`}
                  >
                    <span className="text-3xl">{icon}</span>
                  </motion.div>
                ))}
              </div>
            )}

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-16 text-center">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r animate-gradient bg-[length:200%_auto] ${
                slug === 'informatique'
                  ? 'from-white via-amber-300 to-white'
                  : slug === 'transport'
                  ? 'from-pink-600 via-pink-500 to-pink-600'
                  : slug === 'emballage'
                  ? 'from-orange-600 via-orange-500 to-orange-600'
                  : slug === 'energie'
                  ? 'from-green-600 via-green-500 to-green-600'
                  : slug === 'bureau'
                  ? 'from-teal-600 via-teal-500 to-teal-600'
                  : slug === 'snacking'
                  ? 'from-rose-600 via-rose-500 to-rose-600'
                  : slug === 'nettoyage'
                  ? 'from-blue-600 via-blue-500 to-blue-600'
                  : slug === 'design-marque'
                  ? 'from-red-600 via-red-500 to-red-600'
                  : slug === 'agence-video'
                  ? 'from-red-600 via-red-500 to-red-600'
                  : 'from-primary-600 via-secondary-500 to-primary-600'
              }`} dangerouslySetInnerHTML={{ __html: solution.introTitle }} />
            </h2>

            {/* Two column diagonal layout */}
            {solution.introText1 && solution.introText2 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
                {/* First text block - top left, shifted down */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="lg:pt-12 lg:pr-8"
                >
                  <p 
                    className={`text-2xl md:text-3xl font-display font-bold mb-6 leading-tight ${
                      slug === 'informatique' ? 'text-white' : 'text-gray-900'
                    }`}
                    dangerouslySetInnerHTML={{ __html: solution.introText1 }}
                  />
                </motion.div>

                {/* Second text block - bottom right, shifted up */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="lg:pb-12 lg:pl-8 lg:mt-20"
                >
                  <p 
                    className={`text-lg leading-relaxed mb-6 ${
                      slug === 'informatique' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                    dangerouslySetInnerHTML={{ __html: solution.introText2 }}
                  />
                </motion.div>
              </div>
            ) : solution.introText ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <p className={`text-xl leading-relaxed max-w-3xl mx-auto text-center ${
                  slug === 'informatique' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {solution.introText}
                </p>
              </motion.div>
            ) : null}
          </div>
        </section>
      )}

      {/* Futuristic Services Section - Informatique only */}
      {slug === 'informatique' && solution.introFeatures && (
        <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden -mt-1">
          {/* Gradient fade overlay for seamless transition */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
          
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>
          
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Glowing orbs - amber/gold theme */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">Solutions IA sur mesure</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-white animate-gradient bg-[length:200%_auto]">
                  Nos services
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Des solutions d'intelligence artificielle sur mesure pour transformer votre entreprise et augmenter votre productivité
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solution.introFeatures.map((feature: any, idx: number) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="relative group"
                  >
                    {/* Card with glassmorphism effect */}
                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-400/50 transition-all duration-500 overflow-hidden">
                      {/* Animated border glow */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 blur-xl" />
                      </div>

                      {/* Icon with glow */}
                      <div className="relative z-10 mb-6">
                        <div className="relative w-16 h-16 mx-auto">
                          <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-xl group-hover:bg-amber-500/40 transition-colors" />
                          <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl flex items-center justify-center border border-amber-500/30 backdrop-blur-sm">
                            <IconComponent className="w-8 h-8 text-amber-300" />
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-yellow-400 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-200 transition-all duration-500" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Process steps - inspired by Polaris */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-32"
            >
              <div className="text-center mb-16">
                <h3 className="text-4xl font-display font-bold text-white mb-4">
                  Comment cela fonctionne
                </h3>
                <p className="text-gray-300 text-lg">
                  Un processus simple et efficace en 4 étapes
                </p>
              </div>

              <div className="relative">
                {/* Continuous line connecting all steps */}
                <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/30 via-amber-400/50 to-amber-500/30 z-0" />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                  {[
                    { step: '1', title: 'Appel découverte', desc: 'Comprendre vos besoins et définir vos objectifs' },
                    { step: '2', title: 'Appel de cadrage', desc: 'Approfondir votre projet et établir une feuille de route' },
                    { step: '3', title: 'Développement', desc: 'Développement de votre solution IA sur mesure' },
                    { step: '4', title: 'Test et lancement', desc: 'Tests, ajustements et mise en production' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative text-center"
                    >
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full flex items-center justify-center border-2 border-amber-500/50 backdrop-blur-sm relative z-10">
                          <span className="text-3xl font-bold text-amber-300">{item.step}</span>
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Section - Only for non-informatique pages */}
      {slug !== 'informatique' && solution.categories && (
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Gradient fade overlay for seamless transition */}
          {slug === 'informatique' && (
            <>
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
            </>
          )}
          {/* Animated grid background for informatique */}
          {slug === 'informatique' && (
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }} />
            </div>
          )}
          
          {/* Animated particles for informatique */}
          {slug === 'informatique' && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Light effects */}
          {slug === 'informatique' ? (
            <>
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              />
            </>
          ) : (
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-x-[25%] translate-y-[-25%] pointer-events-none ${
              slug === 'transport' 
                ? 'bg-pink-100/30' 
                : slug === 'emballage'
                ? 'bg-orange-100/15'
                : slug === 'energie'
                ? 'bg-green-100/20'
                : slug === 'bureau'
                ? 'bg-teal-100/20'
                : slug === 'snacking'
                ? 'bg-rose-100/20'
                : slug === 'nettoyage'
                ? 'bg-blue-100/20'
                : slug === 'design-marque'
                ? 'bg-red-100/20'
                : slug === 'agence-video'
                ? 'bg-red-100/20'
                : 'bg-secondary-100/30'
            }`} />
          )}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className={`grid gap-8 ${
              solution.categories.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {solution.categories.map((cat: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative p-8 rounded-2xl transition-all duration-300 border group overflow-hidden ${
                    slug === 'informatique'
                      ? 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-amber-400/50'
                      : slug === 'transport' 
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-pink-500/10 hover:border-pink-200' 
                      : slug === 'emballage'
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-orange-500/10 hover:border-orange-200'
                      : slug === 'energie'
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-green-500/10 hover:border-green-200'
                      : slug === 'bureau'
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-teal-500/10 hover:border-teal-200'
                      : slug === 'snacking'
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-rose-500/10 hover:border-rose-200'
                      : slug === 'nettoyage'
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-blue-500/10 hover:border-blue-200'
                      : slug === 'design-marque'
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-red-500/10 hover:border-red-200'
                      : slug === 'agence-video'
                      ? 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-red-500/10 hover:border-red-200'
                      : 'bg-white shadow-sm hover:shadow-xl border-gray-100 hover:shadow-primary-500/10 hover:border-primary-200'
                  }`}
                >
                  {/* Light glow on hover */}
                  {slug === 'informatique' ? (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 blur-xl" />
                    </div>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 rounded-2xl pointer-events-none ${
                      slug === 'transport'
                        ? 'from-pink-50/0 to-pink-50/0 group-hover:from-pink-50/50 group-hover:to-pink-50/30'
                        : slug === 'emballage'
                        ? 'from-orange-50/0 to-orange-50/0 group-hover:from-orange-50/50 group-hover:to-orange-50/30'
                        : slug === 'energie'
                        ? 'from-green-50/0 to-green-50/0 group-hover:from-green-50/50 group-hover:to-green-50/30'
                        : slug === 'bureau'
                        ? 'from-teal-50/0 to-teal-50/0 group-hover:from-teal-50/50 group-hover:to-teal-50/30'
                        : slug === 'snacking'
                        ? 'from-rose-50/0 to-rose-50/0 group-hover:from-rose-50/50 group-hover:to-rose-50/30'
                        : slug === 'nettoyage'
                        ? 'from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-blue-50/30'
                        : slug === 'design-marque'
                        ? 'from-red-50/0 to-red-50/0 group-hover:from-red-50/50 group-hover:to-red-50/30'
                        : slug === 'agence-video'
                        ? 'from-red-50/0 to-red-50/0 group-hover:from-red-50/50 group-hover:to-red-50/30'
                        : 'from-primary-50/0 to-secondary-50/0 group-hover:from-primary-50/50 group-hover:to-secondary-50/30'
                    }`} />
                  )}
                  
                  <div className={`relative z-10 w-16 h-16 mb-6 flex items-center justify-center ${
                    solution.categories.length === 2 ? 'mx-auto' : 'mx-auto lg:mx-0'
                  }`}>
                    {cat.image ? (
                      <div className={`w-full h-full bg-gradient-to-br rounded-xl p-3 flex items-center justify-center group-hover:shadow-lg transition-shadow ${
                        slug === 'informatique'
                          ? 'from-amber-500/20 to-amber-600/20 border border-amber-500/30'
                          : slug === 'transport' 
                          ? 'from-pink-50 to-white' 
                          : slug === 'emballage'
                          ? 'from-orange-50 to-white'
                          : slug === 'energie'
                          ? 'from-green-50 to-white'
                          : slug === 'bureau'
                          ? 'from-teal-50 to-white'
                          : slug === 'snacking'
                          ? 'from-rose-50 to-white'
                          : slug === 'nettoyage'
                          ? 'from-blue-50 to-white'
                          : slug === 'design-marque'
                          ? 'from-red-50 to-white'
                          : slug === 'agence-video'
                          ? 'from-red-50 to-white'
                          : 'from-primary-50 to-white'
                      }`}>
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-contain" />
                      </div>
                    ) : cat.icon && (slug === 'design-marque' || slug === 'agence-video') ? (
                      <div className={`w-full h-full bg-gradient-to-br rounded-xl p-3 flex items-center justify-center group-hover:shadow-lg transition-shadow ${cat.gradientColor || 'from-red-50 to-white'}`}>
                        {React.createElement(cat.icon, { className: `w-8 h-8 ${cat.iconColor || 'text-red-600'}` })}
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                        slug === 'informatique'
                          ? 'bg-amber-500/20 border border-amber-500/30 group-hover:bg-amber-500/30'
                          : slug === 'transport'
                          ? 'bg-pink-50 group-hover:bg-pink-100'
                          : slug === 'emballage'
                          ? 'bg-orange-50 group-hover:bg-orange-100'
                          : slug === 'energie'
                          ? 'bg-green-50 group-hover:bg-green-100'
                          : slug === 'bureau'
                          ? 'bg-teal-50 group-hover:bg-teal-100'
                          : slug === 'snacking'
                          ? 'bg-rose-50 group-hover:bg-rose-100'
                          : 'bg-primary-50 group-hover:bg-primary-100'
                      }`}>
                        {idx === 0 && <Package className={`w-6 h-6 ${
                          slug === 'informatique' ? 'text-amber-300' : slug === 'transport' ? 'text-pink-600' : slug === 'emballage' ? 'text-orange-600' : slug === 'energie' ? 'text-green-600' : slug === 'bureau' ? 'text-teal-600' : slug === 'snacking' ? 'text-rose-600' : slug === 'nettoyage' ? 'text-blue-600' : slug === 'design-marque' ? 'text-red-600' : slug === 'agence-video' ? 'text-red-600' : 'text-primary-600'
                        }`} />}
                        {idx === 1 && <PenTool className={`w-6 h-6 ${
                          slug === 'informatique' ? 'text-amber-300' : slug === 'transport' ? 'text-pink-600' : slug === 'emballage' ? 'text-orange-600' : slug === 'energie' ? 'text-green-600' : slug === 'bureau' ? 'text-teal-600' : slug === 'snacking' ? 'text-rose-600' : slug === 'nettoyage' ? 'text-blue-600' : slug === 'design-marque' ? 'text-red-600' : slug === 'agence-video' ? 'text-red-600' : 'text-primary-600'
                        }`} />}
                        {idx === 2 && <FileText className={`w-6 h-6 ${
                          slug === 'informatique' ? 'text-amber-300' : slug === 'transport' ? 'text-pink-600' : slug === 'emballage' ? 'text-orange-600' : slug === 'energie' ? 'text-green-600' : slug === 'bureau' ? 'text-teal-600' : slug === 'snacking' ? 'text-rose-600' : slug === 'nettoyage' ? 'text-blue-600' : slug === 'design-marque' ? 'text-red-600' : slug === 'agence-video' ? 'text-red-600' : 'text-primary-600'
                        }`} />}
                        {idx === 3 && <Sparkles className={`w-6 h-6 ${
                          slug === 'informatique' ? 'text-amber-300' : slug === 'transport' ? 'text-pink-600' : slug === 'emballage' ? 'text-orange-600' : slug === 'energie' ? 'text-green-600' : slug === 'bureau' ? 'text-teal-600' : slug === 'snacking' ? 'text-rose-600' : slug === 'nettoyage' ? 'text-blue-600' : slug === 'design-marque' ? 'text-red-600' : slug === 'agence-video' ? 'text-red-600' : 'text-primary-600'
                        }`} />}
                        {idx > 3 && <Check className={`w-6 h-6 ${
                          slug === 'informatique' ? 'text-amber-300' : slug === 'transport' ? 'text-pink-600' : slug === 'emballage' ? 'text-orange-600' : slug === 'energie' ? 'text-green-600' : slug === 'bureau' ? 'text-teal-600' : slug === 'snacking' ? 'text-rose-600' : slug === 'nettoyage' ? 'text-blue-600' : slug === 'design-marque' ? 'text-red-600' : slug === 'agence-video' ? 'text-red-600' : 'text-primary-600'
                        }`} />}
                      </div>
                    )}
                  </div>
                  <h3 className={`relative z-10 font-display font-bold mb-3 text-lg transition-colors ${
                    solution.categories.length === 2 ? 'text-center' : ''
                  } ${
                    slug === 'informatique'
                      ? 'text-white group-hover:text-amber-300'
                      : slug === 'transport' 
                      ? 'text-gray-900 group-hover:text-pink-700' 
                      : slug === 'emballage'
                      ? 'text-gray-900 group-hover:text-orange-700'
                      : slug === 'energie'
                      ? 'text-gray-900 group-hover:text-green-700'
                      : slug === 'bureau'
                      ? 'text-gray-900 group-hover:text-teal-700'
                      : slug === 'snacking'
                      ? 'text-gray-900 group-hover:text-rose-700'
                      : slug === 'nettoyage'
                      ? 'text-gray-900 group-hover:text-blue-700'
                      : slug === 'design-marque'
                      ? 'text-gray-900 group-hover:text-red-700'
                      : slug === 'agence-video'
                      ? 'text-gray-900 group-hover:text-red-700'
                      : 'text-gray-900 group-hover:text-primary-700'
                  }`}>
                    {cat.title}
                  </h3>
                  <p className={`relative z-10 text-sm leading-relaxed ${
                    solution.categories.length === 2 ? 'text-center' : ''
                  } ${
                    slug === 'informatique' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {cat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {slug !== 'informatique' && solution.products && solution.products.length > 0 && (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Light effects */}
          <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-x-[-25%] translate-y-[-25%] pointer-events-none ${
            slug === 'transport' ? 'bg-pink-100/30' : slug === 'emballage' ? 'bg-orange-100/15' : slug === 'energie' ? 'bg-green-100/30' : slug === 'bureau' ? 'bg-teal-100/30' : slug === 'snacking' ? 'bg-rose-100/30' : 'bg-primary-100/30'
          }`} />
          <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-x-[25%] translate-y-[25%] pointer-events-none ${
            slug === 'transport' ? 'bg-pink-100/30' : slug === 'emballage' ? 'bg-orange-100/15' : slug === 'energie' ? 'bg-green-100/30' : slug === 'bureau' ? 'bg-teal-100/30' : slug === 'snacking' ? 'bg-rose-100/30' : 'bg-secondary-100/30'
          }`} />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <span className={`inline-block py-1 px-3 rounded-full bg-white text-sm font-semibold mb-4 border shadow-sm ${
                slug === 'transport' 
                  ? 'text-pink-600 border-pink-100' 
                  : slug === 'emballage'
                  ? 'text-orange-600 border-orange-100'
                  : slug === 'energie'
                  ? 'text-green-600 border-green-100'
                  : slug === 'bureau'
                  ? 'text-teal-600 border-teal-100'
                  : slug === 'snacking'
                  ? 'text-rose-600 border-rose-100'
                  : slug === 'nettoyage'
                  ? 'text-blue-600 border-blue-100'
                  : slug === 'design-marque'
                  ? 'text-red-600 border-red-100'
                  : slug === 'agence-video'
                  ? 'text-red-600 border-red-100'
                  : 'text-primary-600 border-primary-100'
              }`}>
                EXEMPLES DE TARIFS NÉGOCIÉS
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Constatez par vous-même les économies possibles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solution.products.map((prod: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                    slug === 'transport' 
                      ? 'hover:shadow-pink-500/10 hover:border-pink-200' 
                      : slug === 'energie'
                      ? 'hover:shadow-green-500/10 hover:border-green-200'
                      : slug === 'bureau'
                      ? 'hover:shadow-teal-500/10 hover:border-teal-200'
                      : slug === 'snacking'
                      ? 'hover:shadow-rose-500/10 hover:border-rose-200'
                      : slug === 'nettoyage'
                      ? 'hover:shadow-blue-500/10 hover:border-blue-200'
                      : slug === 'design-marque'
                      ? 'hover:shadow-red-500/10 hover:border-red-200'
                      : slug === 'agence-video'
                      ? 'hover:shadow-red-500/10 hover:border-red-200'
                      : 'hover:shadow-primary-500/10 hover:border-primary-200'
                  }`}
                >
                  {/* Light glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 rounded-2xl pointer-events-none ${
                    slug === 'transport'
                      ? 'from-pink-50/0 via-pink-50/0 to-pink-50/0 group-hover:from-pink-50/50 group-hover:via-pink-50/30 group-hover:to-pink-50/50'
                      : slug === 'energie'
                      ? 'from-green-50/0 via-green-50/0 to-green-50/0 group-hover:from-green-50/50 group-hover:via-green-50/30 group-hover:to-green-50/50'
                      : slug === 'bureau'
                      ? 'from-teal-50/0 via-teal-50/0 to-teal-50/0 group-hover:from-teal-50/50 group-hover:via-teal-50/30 group-hover:to-teal-50/50'
                      : slug === 'snacking'
                      ? 'from-rose-50/0 via-rose-50/0 to-rose-50/0 group-hover:from-rose-50/50 group-hover:via-rose-50/30 group-hover:to-rose-50/50'
                      : slug === 'nettoyage'
                      ? 'from-blue-50/0 via-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:via-blue-50/30 group-hover:to-blue-50/50'
                      : slug === 'design-marque'
                      ? 'from-red-50/0 via-red-50/0 to-red-50/0 group-hover:from-red-50/50 group-hover:via-red-50/30 group-hover:to-red-50/50'
                      : slug === 'agence-video'
                      ? 'from-red-50/0 via-red-50/0 to-red-50/0 group-hover:from-red-50/50 group-hover:via-red-50/30 group-hover:to-red-50/50'
                      : 'from-primary-50/0 via-primary-50/0 to-secondary-50/0 group-hover:from-primary-50/50 group-hover:via-primary-50/30 group-hover:to-secondary-50/50'
                  }`} />
                  
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-sm z-10 ${
                    slug === 'transport' 
                      ? 'bg-pink-50 text-pink-700' 
                      : slug === 'energie'
                      ? 'bg-green-50 text-green-700'
                      : slug === 'bureau'
                      ? 'bg-teal-50 text-teal-700'
                      : slug === 'snacking'
                      ? 'bg-rose-50 text-rose-700'
                      : slug === 'nettoyage'
                      ? 'bg-blue-50 text-blue-700'
                      : slug === 'design-marque'
                      ? 'bg-red-50 text-red-700'
                      : slug === 'agence-video'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-secondary-50 text-secondary-700'
                  }`}>
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Prix négocié
                  </div>
                  
                  <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl h-48 w-full flex items-center justify-center relative overflow-hidden">
                    {/* Subtle light effect behind image */}
                    <div className={`absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      slug === 'transport' ? 'from-pink-100/20' : slug === 'emballage' ? 'from-orange-100/20' : slug === 'energie' ? 'from-green-100/20' : slug === 'bureau' ? 'from-teal-100/20' : slug === 'snacking' ? 'from-rose-100/20' : slug === 'nettoyage' ? 'from-blue-100/20' : slug === 'design-marque' ? 'from-red-100/20' : slug === 'agence-video' ? 'from-red-100/20' : 'from-primary-100/20'
                    }`} />
                    {prod.image ? (
                      <img src={prod.image} alt={prod.name} className="max-w-full max-h-full object-contain relative z-10" />
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-full relative z-10">
                        <ShoppingCart className={`w-8 h-8 text-gray-400 transition-colors ${
                          slug === 'transport' ? 'group-hover:text-pink-600' : slug === 'emballage' ? 'group-hover:text-orange-600' : slug === 'energie' ? 'group-hover:text-green-600' : slug === 'bureau' ? 'group-hover:text-teal-600' : slug === 'snacking' ? 'group-hover:text-rose-600' : slug === 'nettoyage' ? 'group-hover:text-blue-600' : slug === 'design-marque' ? 'group-hover:text-red-600' : slug === 'agence-video' ? 'group-hover:text-red-600' : 'group-hover:text-primary-600'
                        }`} />
                      </div>
                    )}
                  </div>

                  <h4 className={`font-display font-bold text-gray-900 mb-2 text-lg transition-colors ${
                    slug === 'transport' ? 'group-hover:text-pink-700' : slug === 'emballage' ? 'group-hover:text-orange-700' : slug === 'energie' ? 'group-hover:text-green-700' : slug === 'bureau' ? 'group-hover:text-teal-700' : slug === 'snacking' ? 'group-hover:text-rose-700' : slug === 'nettoyage' ? 'group-hover:text-blue-700' : slug === 'design-marque' ? 'group-hover:text-red-700' : slug === 'agence-video' ? 'group-hover:text-red-700' : 'group-hover:text-primary-700'
                  }`}>{prod.name}</h4>
                  <p className="text-sm text-gray-500 mb-6">{prod.description}</p>
                  
                  <div className="mt-auto flex flex-col items-center w-full pt-6 border-t border-gray-100">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className={`text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${
                        slug === 'transport' ? 'from-pink-600 to-pink-400' : slug === 'emballage' ? 'from-orange-600 to-orange-400' : slug === 'energie' ? 'from-green-600 to-green-400' : slug === 'bureau' ? 'from-teal-600 to-teal-400' : slug === 'snacking' ? 'from-rose-600 to-rose-400' : slug === 'nettoyage' ? 'from-blue-600 to-blue-400' : slug === 'design-marque' ? 'from-red-600 to-red-400' : slug === 'agence-video' ? 'from-red-600 to-red-400' : 'from-primary-600 to-primary-400'
                      }`}>{prod.price}</span>
                      <span className="text-lg text-gray-400 line-through decoration-2">{prod.oldPrice}</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium mt-2 bg-green-50 px-2 py-1 rounded border border-green-100">
                      Économie immédiate sur prix public
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits section */}
      <section className={`py-20 relative overflow-hidden ${
        slug === 'informatique'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black -mt-1'
          : 'bg-gray-50'
      }`}>
        {/* Gradient fade overlay for seamless transition */}
        {slug === 'informatique' && (
          <>
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
          </>
        )}
        {/* Animated grid background for informatique */}
        {slug === 'informatique' && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>
        )}
        
        {/* Animated particles for informatique */}
        {slug === 'informatique' && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Light effects */}
        {slug === 'informatique' ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </>
        ) : (
          <div className={`absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] translate-x-[-25%] translate-y-[-25%] pointer-events-none ${
            slug === 'transport' ? 'bg-pink-100/40' : slug === 'emballage' ? 'bg-orange-100/20' : slug === 'energie' ? 'bg-green-100/40' : slug === 'bureau' ? 'bg-teal-100/40' : slug === 'snacking' ? 'bg-rose-100/40' : slug === 'nettoyage' ? 'bg-blue-100/40' : slug === 'design-marque' ? 'bg-red-100/40' : slug === 'agence-video' ? 'bg-red-100/40' : 'bg-primary-100/40'
          }`} />
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className={`inline-block py-1 px-3 rounded-full text-sm font-semibold mb-4 border shadow-sm ${
              slug === 'informatique'
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 backdrop-blur-sm'
                : slug === 'transport' 
                ? 'bg-white text-pink-600 border-pink-100' 
                : slug === 'emballage'
                ? 'bg-white text-orange-600 border-orange-100'
                : slug === 'energie'
                ? 'bg-white text-green-600 border-green-100'
                : slug === 'bureau'
                ? 'bg-white text-teal-600 border-teal-100'
                : slug === 'snacking'
                ? 'bg-white text-rose-600 border-rose-100'
                : slug === 'nettoyage'
                ? 'bg-white text-blue-600 border-blue-100'
                : slug === 'design-marque'
                ? 'bg-white text-red-600 border-red-100'
                : slug === 'agence-video'
                ? 'bg-white text-red-600 border-red-100'
                : 'bg-white text-primary-600 border-primary-100'
            }`}>
              DES TARIFS ULTRA-NÉGOCIÉS
            </span>
            <h2 className={`text-3xl lg:text-4xl font-display font-bold mb-6 ${
              slug === 'informatique' ? 'text-white' : 'text-gray-900'
            }`}>
              Les avantages
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {solution.benefits.map((benefit: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-xl p-6 shadow-sm border transition-all duration-300 group overflow-hidden ${
                  slug === 'informatique'
                    ? 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:border-amber-400/50'
                    : slug === 'transport' 
                    ? 'bg-white border-gray-100 hover:shadow-lg hover:border-pink-200' 
                    : slug === 'energie'
                    ? 'bg-white border-gray-100 hover:shadow-lg hover:border-green-200'
                    : slug === 'bureau'
                    ? 'bg-white border-gray-100 hover:shadow-lg hover:border-teal-200'
                    : slug === 'snacking'
                    ? 'bg-white border-gray-100 hover:shadow-lg hover:border-rose-200'
                    : slug === 'nettoyage'
                    ? 'bg-white border-gray-100 hover:shadow-lg hover:border-blue-200'
                    : slug === 'design-marque'
                    ? 'bg-white border-gray-100 hover:shadow-lg hover:border-red-200'
                    : slug === 'agence-video'
                    ? 'bg-white border-gray-100 hover:shadow-lg hover:border-red-200'
                    : 'bg-white border-gray-100 hover:shadow-lg hover:border-primary-200'
                }`}
              >
                {/* Subtle light effect */}
                {slug === 'informatique' ? (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 blur-xl" />
                  </div>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br to-transparent transition-all duration-500 rounded-xl pointer-events-none ${
                    slug === 'transport' 
                      ? 'from-pink-50/0 group-hover:from-pink-50/30' 
                      : slug === 'energie'
                      ? 'from-green-50/0 group-hover:from-green-50/30'
                      : slug === 'bureau'
                      ? 'from-teal-50/0 group-hover:from-teal-50/30'
                      : slug === 'snacking'
                      ? 'from-rose-50/0 group-hover:from-rose-50/30'
                      : slug === 'nettoyage'
                      ? 'from-blue-50/0 group-hover:from-blue-50/30'
                      : slug === 'design-marque'
                      ? 'from-red-50/0 group-hover:from-red-50/30'
                      : slug === 'agence-video'
                      ? 'from-red-50/0 group-hover:from-red-50/30'
                      : 'from-primary-50/0 group-hover:from-primary-50/30'
                  }`} />
                )}
                
                <div className="relative z-10 flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    slug === 'informatique'
                      ? 'bg-amber-500/20 group-hover:bg-amber-500/30'
                      : slug === 'energie'
                      ? 'bg-green-50 group-hover:bg-green-100'
                      : slug === 'bureau'
                      ? 'bg-teal-50 group-hover:bg-teal-100'
                      : slug === 'snacking'
                      ? 'bg-rose-50 group-hover:bg-rose-100'
                      : slug === 'nettoyage'
                      ? 'bg-blue-50 group-hover:bg-blue-100'
                      : slug === 'design-marque'
                      ? 'bg-red-50 group-hover:bg-red-100'
                      : slug === 'agence-video'
                      ? 'bg-red-50 group-hover:bg-red-100'
                      : 'bg-green-50 group-hover:bg-green-100'
                  }`}>
                    <Check className={`w-3 h-3 ${
                      slug === 'informatique' ? 'text-amber-300' : slug === 'snacking' ? 'text-rose-600' : slug === 'nettoyage' ? 'text-blue-600' : slug === 'design-marque' ? 'text-red-600' : slug === 'agence-video' ? 'text-red-600' : 'text-green-600'
                    }`} />
                  </div>
                  <p className={`transition-colors ${
                    slug === 'informatique' 
                      ? 'text-gray-300 group-hover:text-white' 
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}>{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className={`py-20 relative overflow-hidden ${
        slug === 'informatique'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black -mt-1'
          : slug === 'transport' 
          ? 'bg-gradient-to-br from-white via-white to-white' 
          : slug === 'emballage'
          ? 'bg-gradient-to-br from-white via-white to-white'
          : slug === 'bureau'
          ? 'bg-gradient-to-br from-white via-white to-white'
          : slug === 'snacking'
          ? 'bg-gradient-to-br from-white via-white to-white'
          : slug === 'nettoyage'
          ? 'bg-gradient-to-br from-white via-white to-white'
          : slug === 'design-marque'
          ? 'bg-gradient-to-br from-white via-white to-white'
          : slug === 'agence-video'
          ? 'bg-gradient-to-br from-white via-white to-white'
          : 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'
      }`}>
        {/* Gradient fade overlay for seamless transition */}
        {slug === 'informatique' && (
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-900 via-gray-900/50 to-transparent pointer-events-none z-0" />
        )}
        
        {/* Animated grid background for informatique */}
        {slug === 'informatique' && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>
        )}

        {/* Light effects */}
        {slug === 'informatique' ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </>
        ) : (
          <>
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-x-[25%] translate-y-[-25%] pointer-events-none ${
              slug === 'transport' ? 'bg-pink-100/30' : slug === 'emballage' ? 'bg-orange-100/15' : slug === 'energie' ? 'bg-green-100/30' : slug === 'bureau' ? 'bg-teal-100/30' : slug === 'snacking' ? 'bg-rose-100/30' : slug === 'nettoyage' ? 'bg-blue-100/30' : slug === 'design-marque' ? 'bg-red-100/30' : slug === 'agence-video' ? 'bg-red-100/30' : 'bg-primary-100/30'
            }`} />
            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-x-[-25%] translate-y-[25%] pointer-events-none ${
              slug === 'transport' ? 'bg-pink-100/30' : slug === 'emballage' ? 'bg-orange-100/15' : slug === 'energie' ? 'bg-green-100/30' : slug === 'bureau' ? 'bg-teal-100/30' : slug === 'snacking' ? 'bg-rose-100/30' : slug === 'nettoyage' ? 'bg-blue-100/30' : 'bg-secondary-100/30'
            }`} />
          </>
        )}
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-display font-bold mb-4 ${
              slug === 'informatique' ? 'text-white' : 'text-gray-900'
            }`}>
              Intéressé par cette solution ?
            </h2>
            <p className={`text-lg ${
              slug === 'informatique' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Contactez-nous pour en savoir plus et découvrir les économies que vous pourriez
              réaliser.
            </p>
          </div>
          <Card variant="elevated" className={`p-6 lg:p-8 shadow-xl ${
            slug === 'informatique'
              ? 'bg-white'
              : slug === 'transport' 
              ? 'border-pink-100' 
              : slug === 'emballage'
              ? 'border-orange-100'
              : slug === 'energie'
              ? 'border-green-100'
              : slug === 'bureau'
              ? 'border-teal-100'
              : slug === 'snacking'
              ? 'border-rose-100'
              : slug === 'nettoyage'
              ? 'border-blue-100'
              : slug === 'design-marque'
              ? 'border-red-100'
              : slug === 'agence-video'
              ? 'border-red-100'
              : 'border-primary-100'
          }`}>
            <MultiStepForm onSubmit={handleFormSubmit} />
          </Card>
        </div>
      </section>
    </div>
  );
};
