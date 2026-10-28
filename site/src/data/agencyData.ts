export interface AgencyService {
  id: string;
  name: string;
  badge: string;
  price: number;
  priceFormatted: string;
  depositAmount: number;
  deliveryTime: string;
  target: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface AgencyProject {
  id: string;
  name: string;
  category: string;
  status: 'Livré & En Ligne' | 'En cours de déploiement';
  location: string;
  image: string;
  demoUrl?: string;
  metrics: string;
  description: string;
  tags: string[];
}

export interface AgencyData {
  name: string;
  brandName: string;
  tagline: string;
  shortDescription: string;
  heroPitch: string;
  stats: Array<{ value: string; label: string; sub: string }>;
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
    address: {
      street: string;
      district: string;
      city: string;
      country: string;
    };
    geo: {
      lat: number;
      lng: number;
    };
    socials: {
      linkedin: string;
      instagram: string;
      facebook: string;
      twitter: string;
      github: string;
    };
  };
  hours: Array<{
    days: string[];
    opens: string | null;
    closes: string | null;
  }>;
  coreValues: Array<{
    id: string;
    title: string;
    iconSvg: string;
    highlight: string;
    description: string;
  }>;
  services: AgencyService[];
  projects: AgencyProject[];
  faqs: Array<{
    question: string;
    answer: string;
    defaultOpen?: boolean;
  }>;
}

export const agencyData: AgencyData = {
  name: "WebAgency Abidjan",
  brandName: "Légion WebAgency",
  tagline: "Créateur de sites web B2C ultra-rapides & à forte conversion pour commerces de proximité et PME à Abidjan",
  shortDescription: "L'agence web nouvelle génération en Côte d'Ivoire : sites mobiles sans latence, intégration directe WhatsApp, appels 1-clic et paiements Wave & Mobile Money.",
  heroPitch: "Votre commerce mérite un site web qui attire des clients réels, se charge en moins d'une seconde sur smartphone et génère des ventes via WhatsApp et Wave.",
  stats: [
    { value: "< 1.0s", label: "Temps de chargement", sub: "Optimisé pour la 3G/4G ivoirienne" },
    { value: "+300%", label: "Conversions clients", sub: "Appels & WhatsApp direct" },
    { value: "0 FCFA", label: "Abonnement mensuel", sub: "Hébergement mondial sans frais cachés" },
    { value: "3 à 7j", label: "Délai de livraison", sub: "Mise en ligne express garantie" }
  ],
  contact: {
    phone: "+2250789083085",
    phoneDisplay: "+225 07 89 08 30 85",
    whatsapp: "+2250544263245",
    whatsappDisplay: "+225 05 44 26 32 45",
    email: "contact@webagency-abidjan.ci",
    address: {
      street: "Boulevard des Martyrs, Deux Plateaux (proximité Vallons & Sococé)",
      district: "Cocody Deux Plateaux",
      city: "Abidjan",
      country: "Côte d'Ivoire"
    },
    geo: {
      lat: 5.362692,
      lng: -3.998492
    },
    socials: {
      linkedin: "https://www.linkedin.com/company/webagency-abidjan",
      instagram: "https://www.instagram.com/webagency_abidjan",
      facebook: "https://www.facebook.com/webagencyabidjan",
      twitter: "https://x.com/webagency_ci",
      github: "https://github.com/Lgion/webAgency"
    }
  },
  hours: [
    {
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
      opens: "08:30",
      closes: "18:30"
    },
    {
      days: ["Samedi"],
      opens: "09:00",
      closes: "15:00"
    },
    {
      days: ["Dimanche"],
      opens: null,
      closes: null
    }
  ],
  coreValues: [
    {
      id: "speed",
      title: "Vitesse Éclair & 0 Latence",
      iconSvg: "lightning",
      highlight: "Score 98-100/100 Google Lighthouse",
      description: "Plus de 85% de vos clients consultent votre site depuis un smartphone avec un débit variable. Nos sites sont conçus sans frameworks lourds (Astro & SCSS pur) pour s'ouvrir instantanément, même en 3G à Abidjan."
    },
    {
      id: "conversion",
      title: "Conversion Locale Ivoirienne",
      iconSvg: "target",
      highlight: "Habitudes d'achat locales respectées",
      description: "À Abidjan, les clients n'aiment pas remplir de longs formulaires email. Nous intégrons un bouton flottant WhatsApp avec message prérempli, un appel 1-clic et le paiement Wave QR code."
    },
    {
      id: "mobile-first",
      title: "100% Taillé pour Smartphone",
      iconSvg: "mobile",
      highlight: "Expérience application native",
      description: "Navigation ergonomique au pouce, menu fluide sans saccades, boutons d'action toujours accessibles en bas d'écran et adaptation parfaite de 360 px à tous les écrans."
    },
    {
      id: "no-fees",
      title: "Zéro Frais Mensuels Cachés",
      iconSvg: "shield",
      highlight: "Code propre & hébergement mondial sécurisé",
      description: "Fini les abonnements WordPress coûteux et les pannes de plugins. Le site vous appartient à 100%, sans redevance d'hébergement mensuelle obligatoire."
    },
    {
      id: "admin",
      title: "Espace Admin Simple & Temps Réel",
      iconSvg: "dashboard",
      highlight: "Modifiez vos prix depuis votre téléphone",
      description: "Ajoutez un nouveau produit, modifiez un tarif ou changez vos horaires d'ouverture en 30 secondes depuis votre téléphone sans jamais avoir besoin d'un développeur."
    },
    {
      id: "seo",
      title: "SEO Local & Fiche Google Maps",
      iconSvg: "map-pin",
      highlight: "Visibilité N°1 à Abidjan & par quartier",
      description: "Structure sémantique HTML5 et données Schema.org pour positionner votre commerce en tête des recherches Google Maps à Cocody, Marcory, Plateau, Yopougon ou Treichville."
    }
  ],
  services: [
    {
      id: "pack-vitrine",
      name: "Pack Vitrine Commerce B2C",
      badge: "Le plus demandé",
      price: 150000,
      priceFormatted: "150 000 FCFA",
      depositAmount: 50000,
      deliveryTime: "3 à 5 jours",
      target: "Salons de coiffure, esthétique, maquis & restaurants, artisans, pressings, professionnels",
      description: "La solution clé-en-main pour donner une présence web prestigieuse à votre commerce et convertir chaque visiteur en client WhatsApp ou en appel téléphonique.",
      features: [
        "Site web moderne 1 à 3 sections ultra-optimisé",
        "Boutons d'action rapide fixes (Appel + WhatsApp direct)",
        "Horaires dynamiques avec badge Ouvert / Fermé en direct",
        "Fiche Google Maps & optimisation SEO local par quartier",
        "Galerie photos & présentation des prestations / tarifs",
        "Hébergement ultra-rapide et sécurisé inclus à vie (0 FCFA/mois)",
        "Nom de domaine personnalisé .ci ou .com inclus 1 an"
      ],
      isPopular: true
    },
    {
      id: "pack-admin",
      name: "Pack Vitrine + Espace Admin Dynamique",
      badge: "Autonomie totale",
      price: 250000,
      priceFormatted: "250 000 FCFA",
      depositAmount: 75000,
      deliveryTime: "5 à 7 jours",
      target: "Commerces avec tarifs évolutifs, spas, cabinets, centres de formation, menus du jour",
      description: "Tout le pack vitrine, enrichi d'un espace d'administration sécurisé pour mettre à jour vous-même vos prix, photos et horaires en temps réel sans coder.",
      features: [
        "Tout le contenu du Pack Vitrine B2C",
        "Espace d'administration privé accessible sur mobile & PC",
        "Mise à jour immédiate des prix, photos et services",
        "Publication instantanée en temps réel sans délai de build",
        "Statistiques de visites privatives & respectueuses de la vie privée",
        "Multi-comptes avec gestion des rôles (Admin / Collaborateur)",
        "Formation vidéo personnalisée de 30 minutes offerte"
      ]
    },
    {
      id: "pack-ecommerce",
      name: "Pack E-Commerce & Paiements Wave",
      badge: "Ventes 24h/24",
      price: 380000,
      priceFormatted: "380 000 FCFA",
      depositAmount: 120000,
      deliveryTime: "7 à 10 jours",
      target: "Boutiques de mode, vente d'accessoires tech, cosmétiques, livraison de plats, cavistes",
      description: "Transformez votre commerce en boutique en ligne ivoirienne complète avec panier d'achat, paiement Wave QR Code / Mobile Money et commandes WhatsApp.",
      features: [
        "Tout le Pack Vitrine + Admin Dynamique",
        "Catalogue produits illimité avec variantes (tailles, couleurs)",
        "Panier d'achat interactif fluide et panier persistant",
        "Tunnel de commande complet en 3 étapes sans friction",
        "Paiement Wave QR Code temps réel + Deep Link mobile",
        "Intégration Mobile Money (Orange Money, MTN MoMo, PayDunya)",
        "Envoi instantané de la commande préremplie sur WhatsApp",
        "Gestion du stock et alertes de rupture dans l'admin"
      ]
    },
    {
      id: "pack-refonte",
      name: "Refonte Express & Accélération",
      badge: "Booster de performance",
      price: 95000,
      priceFormatted: "95 000 FCFA",
      depositAmount: 40000,
      deliveryTime: "48 heures",
      target: "Entreprises possédant un site WordPress lent, obsolète ou mal affiché sur téléphone",
      description: "Votre site actuel met plus de 4 secondes à s'ouvrir ? Nous reconstruisons votre code sur notre socle moderne pour multiplier sa vitesse par 4.",
      features: [
        "Audit complet des lenteurs et des failles du site actuel",
        "Migration du contenu vers le socle ultra-rapide Astro",
        "Passage du score Google Lighthouse de <40 à >95/100",
        "Optimisation du poids des images (formats modernes WebP/AVIF)",
        "Ajout des boutons rapides WhatsApp et Appel 1-clic",
        "Zéro perte de référencement Google grâce à la préservation des URLs"
      ]
    }
  ],
  projects: [
    {
      id: "bcps-sococe",
      name: "Business Center Prestige Services & Studio Photo Maria",
      category: "Multiservices & Studio Photo",
      status: "Livré & En Ligne",
      location: "Galerie Super U Deux Plateaux (Sococé), Cocody, Abidjan",
      image: "/images/agency/project_bcps.jpg",
      demoUrl: "https://business-center-prestige-services-s.vercel.app/",
      metrics: "+280% de contacts WhatsApp • 0.8s temps de chargement",
      description: "Pôle d'excellence multiservices haut de gamme : Studio photo d'art & identité biométrique, tirages 2m×2m, réparation express de smartphones (30 min), accessoires certifiés et guichet Mobile Money sécurisé (Wave, Orange, MTN).",
      tags: ["Multiservices", "Studio Photo Pro", "Paiement Wave QR", "Super U Sococé"]
    },
    {
      id: "chez-elle-et-lui",
      name: "Salon Elle & Lui — Coiffure Afro-Chic & Institut de Beauté",
      category: "Coiffure & Soins Beauté",
      status: "Livré & En Ligne",
      location: "Cocody N°39, Abidjan",
      image: "/images/agency/project_elle_et_lui.jpg",
      demoUrl: "https://lgion.github.io/chezElleEtLui___CLIENTS/",
      metrics: "100% de réservations weekend par WhatsApp • Zéro latence mobile",
      description: "Salon de coiffure afro-chic et institut de bien-être : tresses phares, tissages d'exception, soins visage, massages spa K.V.S, onglerie et forfaits mariée. Prise de rendez-vous directe sur WhatsApp et paiement d'acompte Wave.",
      tags: ["Coiffure Afro-Chic", "Institut Beauté", "Réservation WhatsApp", "Cocody N°39"]
    },
    {
      id: "mall-of-beauty",
      name: "Mall of Beauty (MoB) — Cosmétiques USA & Pagnes Vlisco",
      category: "Cosmétiques & Soins Beauté",
      status: "Livré & En Ligne",
      location: "Rue des Jardins, Vallons, Cocody, Abidjan",
      image: "/images/agency/project_mall_of_beauty.jpg",
      demoUrl: "https://mall-of-beauty-clients.vercel.app/",
      metrics: "Catalogue 70% USA certifié • Commande directe WhatsApp & Wave",
      description: "Boutique de référence à Abidjan : 70% de dermocosmétiques certifiés d'origine américaine, K-Beauty coréenne authentique, pagnes Vlisco officiels, maroquinerie italienne et diagnostic de peau personnalisé avec commande instantanée.",
      tags: ["Dermocosmétique USA", "K-Beauty", "Pagnes Vlisco", "Cocody Vallons"]
    },
    {
      id: "rewaste-bsf",
      name: "ReWaste BSF — Bioconversion & Élevage de Mouche Soldat Noire",
      category: "AgriTech & Innovation Écologique",
      status: "Livré & En Ligne",
      location: "Abidjan & Exploitations Régionales, Côte d'Ivoire",
      image: "/images/agency/project_rewaste.jpg",
      demoUrl: "https://incandescent-bombolone-54a664.netlify.app/",
      metrics: "Jusqu'à 80% de réduction des biodéchets • Pépinière 5-DOL",
      description: "Plateforme hybride de valorisation des biodéchets industriels en protéines animales et fertilisants bio par larves de mouche soldat noire (BSF). Pépinière centrale 5-DOL, formation pratique d'éleveurs et logiciel SaaS Colony Manager.",
      tags: ["AgriTech", "Bioconversion BSF", "Formation Éleveurs", "Économie Circulaire"]
    },
    {
      id: "desire-esthetique",
      name: "Désiré Esthétique — Soins & Pédicure Médicale à Domicile",
      category: "Soins Beauté & Institut à Domicile",
      status: "Livré & En Ligne",
      location: "À Domicile : Cocody, Marcory, Plateau, Riviera, Abidjan",
      image: "/images/agency/project_desire_esthetique.jpg",
      demoUrl: "https://lgion.github.io/desireEsthetique/",
      metrics: "Réservation 24h/24 en ligne • Paiement sécurisé Wave 1-Clic",
      description: "L'institut d'exception s'invite chez vous à Abidjan : pédicure médicale & spa, manucure gel et semi-permanent, beauté du regard, coiffure et maquillage VIP. Réservation en ligne avec sélection de créneaux et paiement Wave direct.",
      tags: ["Soins à Domicile", "Pédicure Médicale", "Paiement Wave", "Service VIP"]
    },
    {
      id: "marie-the-affoue",
      name: "Les Perles et Moi & Voyages et Découvertes — Mme Affoué",
      category: "Artisanat d'Art & Tourisme Ivoirien",
      status: "Livré & En Ligne",
      location: "Abidjan, Assinie & Régions Baoulé, Côte d'Ivoire",
      image: "/images/agency/project_marie_the.jpg",
      demoUrl: "https://lgion.github.io/marieThe___CLIENTS/",
      metrics: "Pièces artisanales uniques • Évasion culturelle ivoirienne",
      description: "Créations exclusives de bijoux d'art associant perles fines rares, perles de verre recyclées et authentiques poids traditionnels Akan/Baoulé dorés à la feuille. Organisation d'escapades culturelles et séjours authentiques à Assinie et en Côte d'Ivoire.",
      tags: ["Bijoux d'Art", "Poids Baoulé Dorés", "Assinie & Tourisme", "Artisanat d'Exception"]
    },
    {
      id: "dr-aka-jules",
      name: "Dr. AKA Jules | MedEduc Pro — Soins ORL & Enseignement CHU",
      category: "Santé & MedTech Pro",
      status: "Livré & En Ligne",
      location: "Abidjan & Centres Hospitaliers Universitaires (CHU)",
      image: "/images/agency/project_aka_jules.jpg",
      demoUrl: "https://lgion.github.io/akaJules___CLIENTS/",
      metrics: "Gestion double agenda soins & CHU • Dossiers otoscopiques sécurisés",
      description: "Application professionnelle d'avant-garde pour praticien spécialiste ORL : double agenda intelligent soins cliniques et enseignement médical, dossiers patients avec suivi photographique otoscopique/plaies et comptes-rendus vocaux.",
      tags: ["Santé & MedTech", "Soins ORL", "Dossiers Sécurisés", "CHU Abidjan"]
    }
  ],
  faqs: [
    {
      question: "Combien de temps faut-il pour créer et mettre en ligne mon site web ?",
      answer: "Pour un Pack Vitrine Commerce B2C, votre site est livré et opérationnel en 3 à 5 jours ouvrés dès réception de vos éléments (photos, tarifs, coordonnées). Pour les boutiques e-commerce complètes, comptez entre 7 et 10 jours ouvrés.",
      defaultOpen: true
    },
    {
      question: "Y a-t-il un abonnement mensuel à payer pour garder le site en ligne ?",
      answer: "Non, absolument aucun abonnement obligatoire ! Contrairement aux agences traditionnelles qui vous facturent 20 000 à 50 000 FCFA chaque mois pour l'hébergement, nous déployons votre site sur un réseau CDN mondial gratuit et ultra-sécurisé (GitHub Pages). Seul le renouvellement annuel de votre nom de domaine personnalisé (ex. .ci ou .com) reste à votre charge (environ 10 000 à 15 000 FCFA / an)."
    },
    {
      question: "Comment mes clients paient-ils avec Wave sur mon site ?",
      answer: "Nous intégrons la technologie Wave officielle pour la Côte d'Ivoire. Sur ordinateur ou tablette, un QR Code Wave s'affiche et le client le scanne avec l'application Wave de son smartphone. Sur smartphone, un bouton ouvre directement l'application Wave avec le montant et votre compte marchand déjà préremplis !"
    },
    {
      question: "Puis-je modifier moi-même les prix de mes prestations ou produits ?",
      answer: "Oui ! Avec notre Pack Vitrine + Admin ou notre Pack E-Commerce, vous disposez d'un espace d'administration sécurisé, simple et conçu pour smartphone. Vous modifiez un tarif, activez une promotion ou changez vos horaires : la modification est immédiatement visible par vos clients en temps réel."
    },
    {
      question: "Comment se déroule le paiement de la création de mon site ?",
      answer: "La collaboration est transparente et sécurisée : nous demandons un acompte de 30% au démarrage des travaux (réglable directement par Wave Mobile Money ou virement bancaire), puis le solde de 70% uniquement lors de la livraison finale après validation de votre part."
    },
    {
      question: "Mon commerce sera-t-il visible sur Google Maps à Abidjan ?",
      answer: "Tout à fait. Tous nos packs incluent le balisage sémantique local (Schema.org LocalBusiness) ainsi que la configuration ou l'optimisation de votre fiche Google Business Profile afin que vos clients vous trouvent dès qu'ils cherchent votre activité dans votre quartier (Cocody, Marcory, Yopougon, Plateau, etc.)."
    }
  ]
};
