import { Translation } from '../types';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { Crown, PenTool, ShieldCheck, Zap } from 'lucide-react';

export const es: Translation = {
  nav: [
    { name: 'Inicio', href: '#home' }, 
    { name: 'Catálogo', href: '#products' }, 
    { name: 'Fábrica', href: '#about' }, 
    { name: 'Producción', href: '#process' }, 
    { name: 'Confianza', href: '#partners' }
  ],
  hero: {
    badge: 'Directo del Fabricante',
    titleStart: 'FÁBRICA',
    titleHighlight: 'HESHENG',
    subtitle: '18 años de excelencia en fabricación en la provincia de Guangdong, China. \nEspecialistas en resina de poliéster insaturado (UPR) para la moda global.',
    ctaPrimary: 'Sistema de Cotización',
    ctaSecondary: 'Tour VR de Fábrica',
    est: 'Est. 2007 • Guangdong, China',
    trust: 'Certificado GRS • OEKO-TEX'
  },
  stats: [
    { value: '18', label: 'Años de Experiencia' }, 
    { value: '500k+', label: 'Producción Diaria' }, 
    { value: '5000㎡', label: 'Tamaño de Fábrica' }, 
    { value: '100%', label: 'Enfoque en Resina' }, 
    { value: '24-48H', label: 'Prototipado' }
  ],
  features: [
    { title: 'Fábrica Directa', description: 'Sin intermediarios. Precios directos desde Guangdong.', icon: Crown }, 
    { title: 'Maquinaria Italiana', description: 'Fundición centrífuga para resina de alta densidad.', icon: PenTool }, 
    { title: 'Cumplimiento Global', description: 'Certificados: GRS, OEKO-TEX, Reach Compliant.', icon: ShieldCheck }, 
    { title: 'Producción Masiva', description: 'Escalable para la demanda de la moda rápida.', icon: Zap }
  ],
  productSection: { 
    badge: 'Selección Curada', 
    title: 'Destacados del Mes', 
    subtitle: 'Un vistazo a nuestras capacidades principales. Texturas perfeccionadas durante 18 años.', 
    viewDetails: 'Descargar Catálogo (PDF)', 
    tags: { New: 'Nuevo', Hot: 'Top' } 
  },
  sampleRoom: {
    title: 'SALA DE MUESTRAS DIGITAL',
    countLabel: 'ARTÍCULOS EN ARCHIVO',
    searchPlaceholder: 'Buscar ID de Referencia...',
    exitLabel: 'SALIR',
    allCategory: 'Todo',
    categories: { Suiting: 'Trajes', Ladies: 'Damas', Shirt: 'Camisas', Coat: 'Abrigos', Eco: 'Eco', Classic: 'Clásico', Fashion: 'Moda' },
    noResults: 'No se encontraron botones en esta categoría',
    contactPrompt: 'Mostrando archivo parcial. Para catálogo completo o muestras físicas, contacte a nuestros expertos.',
    contactAction: 'CONTACTAR FÁBRICA'
  },
  products: FEATURED_PRODUCTS,
  process: { 
    badge: 'Fabricación', 
    title: 'Proceso de Resina', 
    subtitle: 'Flujo industrial estandarizado desde resina líquida hasta el botón acabado.', 
    steps: [
      { id: 1, title: 'Mezcla de Resina', desc: 'Mezclando UPR con pigmentos.', image: "/images/process/step1-mix.webp" }, 
      { id: 2, title: 'Fundición en Lámina', desc: 'Fundición centrífuga en cilindro.', image: "/images/process/step2-cast.webp" }, 
      { id: 3, title: 'Dosificación', desc: 'Creando patrones marmolados.', image: "/images/process/step3-dose.webp" }, 
      { id: 4, title: 'Torneado', desc: 'Corte automatizado por torno.', image: "/images/process/step4-cut.webp" }, 
      { id: 5, title: 'Pulido', desc: '48 horas de tamboreado en barril.', image: "/images/process/step5-polish.webp" }
    ] 
  },
  partners: {
    title: 'Estándares Ambientales y Cumplimiento Global',
    brandsTitle: 'CONFIADO POR MARCAS GLOBALES DE PRIMER NIVEL',
    strategicCompliance: 'CUMPLIMIENTO ESTRATÉGICO',
    mainTitle: 'El Estándar de Oro',
    mainTitleHighlight: 'en Seguridad Textil',
    oeko: {
      subtitle: 'Certificación Standard 100',
      status: 'VERIFICADO',
      desc: 'Certificado OEKO-TEX® Standard 100, garantizando productos libres de sustancias nocivas y cumpliendo con estándares globales de seguridad textil.'
    },
    globalCompliance: {
      title: 'CUMPLIMIENTO GLOBAL',
      desc: 'Cumple con REACH & CPSIA'
    },
    auditedQuality: {
      title: 'CALIDAD AUDITADA',
      desc: 'Auditoría Anual Verificada'
    }
  },
  footer: { 
    contactTitle: 'Contactos de Fábrica', 
    exploreTitle: 'Empresa', 
    links: ['Perfil de Fábrica', 'Capacidad', 'Sostenibilidad', 'OEM/ODM'], 
    newsTitle: 'Perspectivas', 
    newsDesc: 'Tendencias de precios y actualizaciones de moldes.', 
    subscribe: 'Suscribirse', 
    rights: 'Todos los derechos reservados.', 
    address: 'Fenggang, Dongguan, Guangdong, China 523000' 
  },
  calculator: { 
    title: "Motor de Cotización", subtitle: "CÁLCULO EN VIVO /// V.2.0", close: "CERRAR", 
    sectionMaterial: "Tipo de Material", sectionProcess: "Proceso de Producción", sectionSize: "Tamaño (Ligne)", sectionThickness: "Grosor (mm)", sectionQuantity: "Cantidad", sectionServices: "Servicios Adicionales", serviceLaser: "Grabado Láser", serviceOblique: "Corte Oblicuo", serviceOil: "Tratamiento de Aceite", 
    options: { none: "Ninguno", surface: "Superficie", side: "Lateral", yes: "Sí", no: "No" }, 
    receipt: { estCost: "COSTO ESTIMADO", currency: "MONEDA: EUR (€)", unitPrice: "PRECIO UNITARIO", moqSurcharge: "RECARGO MOQ", basePrice: "Precio Base", thicknessAdj: "Ajuste Grosor", obliqueCut: "Corte Oblicuo", laserEngraving: "Grabado Láser", oilTreatment: "Tratamiento Aceite", moqCharge: "Cargo MOQ", savePdf: "Guardar Cotización PDF", disclaimer: "*Estimación generada por sistema. Sujeto a revisión final." }, 
    types: { "磁钮": "Magnético", "月光": "Luz de Luna", "珠光": "Perlado", "混色散花": "Color Mixto", "彩虹钮": "Arcoíris", "棒花钮": "Patrón de Barra", "尿素钮扣": "Urea" }, 
    processes: { "tube": "Tubo/Vara", "punch": "Lámina/Punzonado", "mold": "Moldeado", "turned": "Torneado" } 
  }
};