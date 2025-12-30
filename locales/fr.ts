import { Translation } from '../types';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { Crown, PenTool, ShieldCheck, Zap } from 'lucide-react';

export const fr: Translation = {
  nav: [
    { name: 'Accueil', href: '#home' }, 
    { name: 'Catalogue', href: '#products' }, 
    { name: 'Usine', href: '#about' }, 
    { name: 'Production', href: '#process' }, 
    { name: 'Confiance', href: '#partners' }
  ],
  hero: {
    badge: 'Direct du Fabricant',
    titleStart: 'USINE',
    titleHighlight: 'HESHENG',
    subtitle: "18 ans d'excellence manufacturière dans la province du Guangdong, Chine. \nSpécialiste de la résine polyester insaturée (UPR) pour la mode mondiale.",
    ctaPrimary: 'Système de Devis',
    ctaSecondary: 'Visite Virtuelle',
    est: 'Fondée en 2007 • Guangdong, Chine',
    trust: 'Certifié GRS • OEKO-TEX'
  },
  stats: [
    { value: '18', label: 'Ans d’Expérience' }, 
    { value: '500k+', label: 'Production Quotidienne' }, 
    { value: '5000㎡', label: 'Taille de l’Usine' }, 
    { value: '100%', label: 'Focus Résine' }, 
    { value: '24-48H', label: 'Prototypage' }
  ],
  features: [
    { title: 'Direct Usine', description: 'Pas d’intermédiaires. Prix direct de notre site de Guangdong.', icon: Crown }, 
    { title: 'Machines Italiennes', description: 'Coulée centrifuge pour résine haute densité.', icon: PenTool }, 
    { title: 'Conformité Mondiale', description: 'Certifié: GRS, OEKO-TEX, Reach Compliant.', icon: ShieldCheck }, 
    { title: 'Production de Masse', description: 'Capacité évolutive pour la mode rapide.', icon: Zap }
  ],
  productSection: { 
    badge: 'Sélection Curatée', 
    title: 'Vedettes du Mois', 
    subtitle: 'Un aperçu de nos capacités. Textures et motifs affinés depuis 18 ans.', 
    viewDetails: 'Télécharger Catalogue (PDF)', 
    tags: { New: 'Nouveau', Hot: 'Populaire' } 
  },
  sampleRoom: {
    title: 'SALLE D’ÉCHANTILLONS DIGITALE',
    countLabel: 'ARTICLES EN ARCHIVE',
    searchPlaceholder: 'Chercher Référence ID...',
    exitLabel: 'QUITTER',
    allCategory: 'Tout',
    categories: { Suiting: 'Costumes', Ladies: 'Femmes', Shirt: 'Chemises', Coat: 'Manteaux', Eco: 'Éco', Classic: 'Classique', Fashion: 'Mode' },
    noResults: 'Aucun bouton trouvé dans cette catégorie',
    contactPrompt: 'Affichage partiel. Pour le catalogue complet ou des échantillons physiques, contactez nos experts.',
    contactAction: 'CONTACTER L’USINE'
  },
  products: FEATURED_PRODUCTS,
  process: { 
    badge: 'Fabrication', 
    title: 'Procédé Résine', 
    subtitle: 'Flux industriel standardisé de la résine liquide au bouton fini.', 
    steps: [
      { id: 1, title: 'Mélange Résine', desc: 'Mélange UPR avec pigments.', image: "/images/process/step1-mix.webp" }, 
      { id: 2, title: 'Coulée en Plaque', desc: 'Coulée centrifuge en cylindre.', image: "/images/process/step2-cast.webp" }, 
      { id: 3, title: 'Dosage Pipette', desc: 'Création de motifs marbrés.', image: "/images/process/step3-dose.webp" }, 
      { id: 4, title: 'Tournage', desc: 'Façonnage automatisé au tour.', image: "/images/process/step4-cut.webp" }, 
      { id: 5, title: 'Polissage', desc: 'Tombage en baril pendant 48h.', image: "/images/process/step5-polish.webp" }
    ] 
  },
  partners: {
    title: 'Normes Environnementales et Conformité',
    brandsTitle: 'FAIT CONFIANCE PAR LES MARQUES MONDIALES DE PREMIER PLAN',
    strategicCompliance: 'CONFORMITÉ STRATÉGIQUE',
    mainTitle: 'La Norme de Référence',
    mainTitleHighlight: 'en Sécurité Textile',
    oeko: {
      subtitle: 'Certification Standard 100',
      status: 'VÉRIFIÉ',
      desc: "Certifié OEKO-TEX® Standard 100, garantissant des produits exempts de substances nocives et conformes aux normes mondiales de sécurité textile."
    },
    globalCompliance: {
      title: 'CONFORMITÉ MONDIALE',
      desc: 'Conforme REACH & CPSIA'
    },
    auditedQuality: {
      title: 'QUALITÉ AUDITÉE',
      desc: 'Audit Annuel Vérifié'
    }
  },
  footer: { 
    contactTitle: 'Contacts Usine', 
    exploreTitle: 'Société', 
    links: ['Profil Usine', 'Capacité', 'Durabilité', 'OEM/ODM'], 
    newsTitle: 'Perspectives Marché', 
    newsDesc: 'Tendances prix résine et mises à jour moules.', 
    subscribe: 'S’abonner', 
    rights: 'Tous droits réservés.', 
    address: 'Fenggang, Dongguan, Guangdong, Chine 523000' 
  },
  calculator: { 
    title: "Moteur de Devis", subtitle: "CALCUL EN DIRECT /// V.2.0", close: "FERMER", 
    sectionMaterial: "Type de Matériau", sectionProcess: "Procédé Production", sectionSize: "Taille (Ligne)", sectionThickness: "Épaisseur (mm)", sectionQuantity: "Quantité", sectionServices: "Services Additionnels", serviceLaser: "Gravure Laser", serviceOblique: "Coupe Oblique", serviceOil: "Traitement Huile", 
    options: { none: "Aucun", surface: "Surface", side: "Côté", yes: "Oui", no: "Non" }, 
    receipt: { estCost: "COÛT ESTIMÉ", currency: "DEVISE: EUR (€)", unitPrice: "PRIX UNITAIRE", moqSurcharge: "SURCHARGE MOQ", basePrice: "Prix de Base", thicknessAdj: "Ajust. Épaisseur", obliqueCut: "Coupe Oblique", laserEngraving: "Gravure Laser", oilTreatment: "Traitement Huile", moqCharge: "Charge MOQ", savePdf: "Sauver Devis en PDF", disclaimer: "*Estimation générée par système. Sous réserve de revue finale." }, 
    types: { "磁钮": "Magnétique", "月光": "Clair de Lune", "珠光": "Nacré", "混色散花": "Couleur Mixte", "彩虹钮": "Arc-en-ciel", "棒花钮": "Motif Barre", "尿素钮扣": "Urée" }, 
    processes: { "tube": "Tube/Bâton", "punch": "Plaque/Poinçon", "mold": "Moulé", "turned": "Tourné" } 
  }
};