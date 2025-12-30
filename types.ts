import { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  isNew?: boolean;
  isHot?: boolean;
}

export type ProductCategory = 'All' | 'Suiting' | 'Ladies' | 'Shirt' | 'Coat' | 'Eco' | 'Classic' | 'Fashion' | 'Basic' | 'Custom' | 'Sport' | 'Casual';

export interface StatItem {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon; 
}

export interface ProcessStep {
  id: number;
  title: string;
  desc: string;
  image: string;
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface CalculatorOption {
    standardThickness: number;
    types: Record<string, number>;
    obliquePriceRatio: number;
    laserSurfaceLetter: number;
    laserSideEdge: number;
}

export interface UreaOption {
    mold: number;
    turned: number;
    minOrder: number;
    surcharge: number;
}

export interface CalculatorTranslation {
  title: string;
  subtitle: string;
  close: string;
  sectionMaterial: string;
  sectionProcess: string;
  sectionSize: string;
  sectionThickness: string;
  sectionQuantity: string;
  sectionServices: string;
  serviceLaser: string;
  serviceOblique: string;
  serviceOil: string;
  options: {
    none: string;
    surface: string;
    side: string;
    yes: string;
    no: string;
  };
  receipt: {
    estCost: string;
    currency: string;
    unitPrice: string;
    moqSurcharge: string;
    basePrice: string;
    thicknessAdj: string;
    obliqueCut: string;
    laserEngraving: string;
    oilTreatment: string;
    moqCharge: string;
    savePdf: string;
    disclaimer: string;
  };
  types: Record<string, string>;
  processes: Record<string, string>;
}

export interface Translation {
  nav: { name: string; href: string }[];
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    est: string;
    trust: string;
  };
  stats: StatItem[];
  features: Feature[];
  productSection: {
    badge: string;
    title: string;
    subtitle: string;
    viewDetails: string;
    tags: Record<string, string>;
  };
  sampleRoom: {
    title: string;
    countLabel: string;
    searchPlaceholder: string;
    exitLabel: string;
    allCategory: string;
    categories: Record<string, string>;
    noResults: string;
    contactPrompt: string;
    contactAction: string;
  };
  products: Product[]; 
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  partners: {
    title: string;
  };
  footer: {
    contactTitle: string;
    exploreTitle: string;
    links: string[];
    newsTitle: string;
    newsDesc: string;
    subscribe: string;
    rights: string;
    address: string;
  };
  calculator: CalculatorTranslation;
}