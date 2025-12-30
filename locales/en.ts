import { Translation } from '../types';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { Crown, PenTool, ShieldCheck, Zap } from 'lucide-react';

export const en: Translation = {
  nav: [
    { name: 'Home', href: '#home' }, 
    { name: 'Catalog', href: '#products' }, 
    { name: 'Factory', href: '#about' }, 
    { name: 'Production', href: '#process' }, 
    { name: 'Trust', href: '#partners' }
  ],
  hero: { 
    badge: 'Direct from Manufacturer', 
    titleStart: 'HESHENG', 
    titleHighlight: 'BUTTONS', 
    subtitle: '18 years of manufacturing excellence in China’s Guangdong Province. \nSpecializing in Unsaturated Polyester Resin (UPR) for global fashion supply chains.', 
    ctaPrimary: 'Quote System', 
    ctaSecondary: 'Factory VR Tour', 
    est: 'Est. 2007 • Guangdong, China', 
    trust: 'GRS Certified • OEKO-TEX' 
  },
  stats: [
    { value: '18', label: 'Years Experience' }, 
    { value: '500k+', label: 'Daily Output' }, 
    { value: '5000㎡', label: 'Factory Size' }, 
    { value: '100%', label: 'Resin Focus' }, 
    { value: '24-48H', label: 'Prototyping' }
  ],
  features: [
    { title: 'Factory Direct', description: 'No middlemen. Direct pricing from our Guangdong facility.', icon: Crown }, 
    { title: 'Italian Machinery', description: 'Imported centrifugal casting for high-density resin.', icon: PenTool }, 
    { title: 'Global Compliance', description: 'Fully certified: GRS, OEKO-TEX, Reach Compliant.', icon: ShieldCheck }, 
    { title: 'Mass Production', description: 'Scalable output to meet global fast-fashion demands.', icon: Zap }
  ],
  productSection: { 
    badge: 'Curated Selection', 
    title: 'Monthly Featured', 
    subtitle: 'A glimpse into our core capabilities. Explore textures and patterns refined over 18 years.', 
    viewDetails: 'Download Full Catalog (PDF)', 
    tags: { New: 'New', Hot: 'Hot' } 
  },
  sampleRoom: {
    title: 'DIGITAL SAMPLE ROOM',
    countLabel: 'ITEMS IN ARCHIVE',
    searchPlaceholder: 'Search Reference ID...',
    exitLabel: 'EXIT',
    allCategory: 'All',
    categories: { Suiting: 'Suiting', Ladies: 'Ladies', Shirt: 'Shirt', Coat: 'Coat', Eco: 'Eco', Classic: 'Classic', Fashion: 'Fashion' },
    noResults: 'No buttons found in this category',
    contactPrompt: 'Displaying partial archive. For full catalog access, physical samples, or custom development, please contact our experts.',
    contactAction: 'CONTACT FACTORY'
  },
  products: FEATURED_PRODUCTS,
  process: { 
    badge: 'Manufacturing', 
    title: 'Polyester Resin Process', 
    subtitle: 'Standardized industrial flow from liquid resin to finished button.', 
    steps: [
      { id: 1, title: 'Resin Mixing', desc: 'Blending UPR with pigments.', image: "/images/process/step1-mix.webp" }, 
      { id: 2, title: 'Sheet Casting', desc: 'Centrifugal cylinder casting.', image: "/images/process/step2-cast.webp" }, 
      { id: 3, title: 'Pipette Dosing', desc: 'Creating marbled patterns.', image: "/images/process/step3-dose.webp" }, 
      { id: 4, title: 'Turning & Cutting', desc: 'Automated lathe shaping.', image: "/images/process/step4-cut.webp" }, 
      { id: 5, title: 'Polishing', desc: '48-hour barrel tumbling.', image: "/images/process/step5-polish.webp" }
    ] 
  },
  partners: {
    title: 'Global Compliance & Environmental Standards',
    brandsTitle: 'TRUSTED BY GLOBAL TIER-1 BRANDS',
    strategicCompliance: 'STRATEGIC COMPLIANCE',
    mainTitle: 'The Gold Standard',
    mainTitleHighlight: 'in Textile Safety.',
    oeko: {
      subtitle: 'Standard 100 Certification',
      status: 'VERIFIED',
      desc: 'OEKO-TEX® Standard 100 certified, ensuring products are free from harmful substances and meet global safety standards for textiles.'
    },
    globalCompliance: {
      title: 'GLOBAL COMPLIANCE',
      desc: 'REACH & CPSIA Compliant'
    },
    auditedQuality: {
      title: 'AUDITED QUALITY',
      desc: 'Yearly Verified Audit'
    }
  },
  footer: { 
    contactTitle: 'Factory Contacts', 
    exploreTitle: 'Company', 
    links: ['Factory Profile', 'Production Capacity', 'Sustainability', 'OEM/ODM'], 
    newsTitle: 'Market Insights', 
    newsDesc: 'Resin material price trends & mold updates.', 
    subscribe: 'Subscribe', 
    rights: 'All rights reserved.', 
    address: 'Fenggang Town, Dongguan City, Guangdong Province, China 523000' 
  },
  calculator: { 
    title: "Quote Engine", subtitle: "LIVE CALCULATION /// V.2.0", close: "CLOSE", 
    sectionMaterial: "Material Type", sectionProcess: "Production Process", sectionSize: "Button Size (Ligne)", sectionThickness: "Thickness (mm)", sectionQuantity: "Order Quantity", sectionServices: "Additional Services", serviceLaser: "Laser Engraving", serviceOblique: "Oblique Cut", serviceOil: "Oil Treatment", 
    options: { none: "None", surface: "Surface", side: "Side", yes: "Yes", no: "No" }, 
    receipt: { estCost: "ESTIMATED COST", currency: "CURRENCY: USD ($)", unitPrice: "UNIT PRICE", moqSurcharge: "MOQ SURCHARGE", basePrice: "Base Price", thicknessAdj: "Thickness Adj.", obliqueCut: "Oblique Cut", laserEngraving: "Laser Engraving", oilTreatment: "Oil Treatment", moqCharge: "MOQ Charge", savePdf: "Save Quote to PDF", disclaimer: "*System generated estimate. Subject to final mold review." }, 
    types: { "磁钮": "Magnetic", "月光": "Moonlight", "珠光": "Pearl", "混色散花": "Mixed Color", "彩虹钮": "Rainbow", "棒花钮": "Bar Pattern", "尿素钮扣": "Urea" }, 
    processes: { "tube": "Tube/Stick", "punch": "Sheet/Punch", "mold": "Molded", "turned": "Turned" } 
  }
};