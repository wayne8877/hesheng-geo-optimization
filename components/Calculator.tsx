import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator as CalcIcon, RefreshCw, DollarSign, ChevronDown, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

// --- 🔴 必填配置区域 (REQUIRED CONFIGURATION) ---
// 请登录 https://dashboard.emailjs.com/ 获取以下信息
const EMAILJS_CONFIG = {
  // 1. Service ID (在 "Email Services" 创建 Gmail 服务后获取)
  SERVICE_ID: "service_t6ykvlf",   
  
  // 2. Template ID (在 "Email Templates" 创建模板后，点击 Settings 获取)
  TEMPLATE_ID: "template_fmpuoij", 
  
  // 3. Public Key (在头像 -> Dashboard -> Account -> API Keys 获取)
  PUBLIC_KEY: "a_Mi1Rg1J31HnjKQ9"    
};

// --- CURRENCY CONFIGURATION ---
const CURRENCY_CONFIG: Record<string, { rate: number; symbol: string; code: string; decimals: number }> = {
  ZH: { rate: 1, symbol: '¥', code: 'CNY', decimals: 2 },
  EN: { rate: 0.14, symbol: '$', code: 'USD', decimals: 2 },
  ES: { rate: 0.13, symbol: '€', code: 'EUR', decimals: 2 },
  FR: { rate: 0.13, symbol: '€', code: 'EUR', decimals: 2 },
  JA: { rate: 21.5, symbol: '¥', code: 'JPY', decimals: 0 },
  KO: { rate: 190, symbol: '₩', code: 'KRW', decimals: 0 },
};

// --- INTERNAL TRANSLATION MAP (FORCE ENGLISH PDF) ---
// Maps internal DB keys (often Chinese) to English for the PDF
const ENGLISH_MAP: Record<string, string> = {
    // Types
    "磁钮": "Magnetic",
    "月光": "Moonlight",
    "珠光": "Pearl Finish",
    "混色散花": "Mixed Color",
    "彩虹钮": "Rainbow",
    "棒花钮": "Bar Pattern",
    "尿素钮扣": "Urea",
    // Processes
    "tube": "Tube/Stick",
    "punch": "Sheet/Punch",
    "mold": "Molded",
    "turned": "Turned",
    // Services
    "none": "None",
    "surfaceLetter": "Surface",
    "sideEdge": "Side",
    "yes": "Included",
    "no": "None"
};

// --- PDF TEXT (STRICTLY ENGLISH) ---
const PDF_TEXT_EN = {
    title: "OFFICIAL QUOTATION",
    subtitle: "Direct Manufacturer | Est. 2007",
    date: "Date",
    ref: "Reference",
    currency: "Currency",
    to: "Prepared For",
    specs: "Specification Details",
    col1: "Parameter",
    col2: "Selected Value",
    cost: "Cost Breakdown",
    colItem: "Item",
    colAmount: "Amount",
    total: "TOTAL ESTIMATE",
    unit: "UNIT PRICE",
    disclaimer: "Disclaimer: System generated estimate. Subject to final mold review."
};

// --- DATA SOURCE ---
const buttonDatabase: any = {
    regular: {
        "12L": { standardThickness: 2.4, types: { "磁钮": 2.75, "月光": 2.97, "珠光": 2.97, "混色散花": 3.52, "彩虹钮": 4.40, "棒花钮": 3.74 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 0.90, laserSideEdge: 3.50 },
        "13L": { standardThickness: 2.4, types: { "磁钮": 2.75, "月光": 2.97, "珠光": 2.97, "混色散花": 3.52, "彩虹钮": 4.40, "棒花钮": 3.74 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 0.90, laserSideEdge: 3.50 },
        "14L": { standardThickness: 2.4, types: { "磁钮": 2.75, "月光": 2.97, "珠光": 2.97, "混色散花": 3.52, "彩虹钮": 4.40, "棒花钮": 3.74 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 0.90, laserSideEdge: 3.50 },
        "15L": { standardThickness: 2.4, types: { "磁钮": 2.75, "月光": 2.97, "珠光": 2.97, "混色散花": 3.52, "彩虹钮": 4.40, "棒花钮": 3.74 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 0.90, laserSideEdge: 3.50 },
        "16L": { standardThickness: 2.4, types: { "磁钮": 2.75, "月光": 2.97, "珠光": 2.97, "混色散花": 3.52, "彩虹钮": 4.40, "棒花钮": 3.74 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 0.90, laserSideEdge: 3.50 },
        "17L": { standardThickness: 2.4, types: { "磁钮": 2.75, "月光": 2.97, "珠光": 2.97, "混色散花": 3.52, "彩虹钮": 4.40, "棒花钮": 3.74 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 0.90, laserSideEdge: 3.50 },
        "18L": { standardThickness: 2.4, types: { "磁钮": 2.75, "月光": 2.97, "珠光": 2.97, "混色散花": 3.52, "彩虹钮": 4.40, "棒花钮": 3.74 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 0.90, laserSideEdge: 3.50 },
        "19L": { standardThickness: 2.6, types: { "磁钮": 3.30, "月光": 3.52, "珠光": 3.52, "混色散花": 4.18, "彩虹钮": 6.05, "棒花钮": 4.51 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 1.00, laserSideEdge: 3.50 },
        "20L": { standardThickness: 2.6, types: { "磁钮": 3.30, "月光": 3.52, "珠光": 3.52, "混色散花": 4.18, "彩虹钮": 6.05, "棒花钮": 4.51 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 1.00, laserSideEdge: 3.50 },
        "22L": { standardThickness: 2.8, types: { "磁钮": 4.40, "月光": 4.84, "珠光": 4.95, "混色散花": 4.95, "彩虹钮": 7.48, "棒花钮": 5.50 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 1.20, laserSideEdge: 3.50 },
        "24L": { standardThickness: 3.0, types: { "磁钮": 5.06, "月光": 5.50, "珠光": 5.72, "混色散花": 5.72, "彩虹钮": 8.25, "棒花钮": 6.49 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 1.50, laserSideEdge: 4.00 },
        "26L": { standardThickness: 3.1, types: { "磁钮": 5.83, "月光": 6.38, "珠光": 7.48, "混色散花": 7.48, "彩虹钮": 9.35, "棒花钮": 8.03 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 1.80, laserSideEdge: 4.00 },
        "27L": { standardThickness: 3.1, types: { "磁钮": 6.60, "月光": 9.90, "珠光": 10.95, "混色散花": 10.45, "彩虹钮": 9.02, "棒花钮": 9.02 }, obliquePriceRatio: 1.3, laserSurfaceLetter: 2.00, laserSideEdge: 4.00 },
        "28L": { standardThickness: 3.2, types: { "磁钮": 7.48, "月光": 8.25, "珠光": 9.13, "混色散花": 9.13, "彩虹钮": 12.10, "棒花钮": 10.01}, obliquePriceRatio: 1.4, laserSurfaceLetter: 2.20, laserSideEdge: 4.50 },
        "30L": { standardThickness: 3.3, types: { "磁钮": 8.25, "月光": 9.02, "珠光": 10.45, "混色散花": 10.45, "彩虹钮": 13.20, "棒花钮": 11.00}, obliquePriceRatio: 1.4, laserSurfaceLetter: 2.80, laserSideEdge: 4.50 },
        "32L": { standardThickness: 3.5, types: { "磁钮": 9.35, "月光": 10.45, "珠光": 11.88, "混色散花": 11.88, "彩虹钮": 15.60, "棒花钮": 13.20}, obliquePriceRatio: 1.4, laserSurfaceLetter: 3.20, laserSideEdge: 5.00 },
        "34L": { standardThickness: 3.6, types: { "磁钮": 11.55,"月光": 12.65, "珠光": 13.75, "混色散花": 13.75, "彩虹钮": 17.25, "棒花钮": 16.50}, obliquePriceRatio: 1.4, laserSurfaceLetter: 4.00, laserSideEdge: 5.00 },
        "36L": { standardThickness: 3.8, types: { "磁钮": 13.20,"月光": 14.30, "珠光": 15.95, "混色散花": 15.95, "彩虹钮": 24.20, "棒花钮": 17.60}, obliquePriceRatio: 1.4, laserSurfaceLetter: 4.20, laserSideEdge: 6.50 },
        "38L": { standardThickness: 4.0, types: { "磁钮": 18.15,"月光": 19.80, "珠光": 20.90, "混色散花": 20.90, "彩虹钮": 33.00, "棒花钮": 20.90}, obliquePriceRatio: 1.5, laserSurfaceLetter: 4.50, laserSideEdge: 9.00 },
        "40L": { standardThickness: 4.2, types: { "磁钮": 19.80,"月光": 21.45, "珠光": 22.00, "混色散花": 22.00, "彩虹钮": 35.20, "棒花钮": 22.11}, obliquePriceRatio: 1.5, laserSurfaceLetter: 6.00, laserSideEdge: 9.00 },
        "42L": { standardThickness: 4.2, types: { "磁钮": 22.00,"月光": 25.30, "珠光": 26.40, "混色散花": 26.40, "彩虹钮": 44.00, "棒花钮": 28.60}, obliquePriceRatio: 1.5, laserSurfaceLetter: 6.50, laserSideEdge: 9.00 },
        "44L": { standardThickness: 4.5, types: { "磁钮": 26.40,"月光": 28.60, "珠光": 30.80, "混色散花": 30.80, "彩虹钮": 50.60, "棒花钮": 35.20}, obliquePriceRatio: 1.5, laserSurfaceLetter: 7.00, laserSideEdge: 10.50 },
        "46L": { standardThickness: 4.5, types: { "磁钮": 26.40,"月光": 28.60, "珠光": 30.80, "混色散花": 30.80, "彩虹钮": 50.60, "棒花钮": 35.20}, obliquePriceRatio: 1.5, laserSurfaceLetter: 7.00, laserSideEdge: 10.50 },
        "48L": { standardThickness: 4.8, types: { "磁钮": 30.80,"月光": 33.00, "珠光": 36.30, "混色散花": 36.30, "彩虹钮": 56.10, "棒花钮": 41.80}, obliquePriceRatio: 1.8, laserSurfaceLetter: 8.50, laserSideEdge: 14.00 },
        "50L": { standardThickness: 4.8, types: { "磁钮": 39.60,"月光": 44.00, "珠光": 44.00, "混色散花": 44.00, "彩虹钮": 60.50, "棒花钮": 50.60}, obliquePriceRatio: 1.8, laserSurfaceLetter: 10.00, laserSideEdge: 22.00 },
        "54L": { standardThickness: 5.4, types: { "磁钮": 49.50,"月光": 55.00, "珠光": 55.00, "混色散花": 55.00, "彩虹钮": 68.20, "棒花钮": 61.60}, obliquePriceRatio: 1.8, laserSurfaceLetter: 14.00, laserSideEdge: 28.00 },
        "60L": { standardThickness: 5.4, types: { "磁钮": 49.50,"月光": 55.00, "珠光": 55.00, "混色散花": 55.00, "彩虹钮": 68.20, "棒花钮": 61.60}, obliquePriceRatio: 1.8, laserSurfaceLetter: 14.00, laserSideEdge: 28.00 },
        "64L": { standardThickness: 5.4, types: { "磁钮": 49.50,"月光": 55.00, "珠光": 55.00, "混色散花": 55.00, "彩虹钮": 68.20, "棒花钮": 61.60}, obliquePriceRatio: 1.8, laserSurfaceLetter: 14.00, laserSideEdge: 28.00 },
        "70L": { standardThickness: 5.4, types: { "磁钮": 49.50,"月光": 55.00, "珠光": 55.00, "混色散花": 55.00, "彩虹钮": 68.20, "棒花钮": 61.60}, obliquePriceRatio: 1.8, laserSurfaceLetter: 14.00, laserSideEdge: 28.00 }
    },
    urea: {
        "14L": { mold: 7.84, turned: 8.96, minOrder: 100, surcharge: 100 },
        "16L": { mold: 7.84, turned: 8.96, minOrder: 90, surcharge: 100 },
        "18L": { mold: 7.84, turned: 8.96, minOrder: 70, surcharge: 100 },
        "20L": { mold: 9.64, turned: 11.20, minOrder: 50, surcharge: 100 },
        "24L": { mold: 12.88, turned: 14.56, minOrder: 50, surcharge: 100 },
        "28L": { mold: 19.04, turned: 21.84, minOrder: 35, surcharge: 100 },
        "32L": { mold: 26.10, turned: 29.68, minOrder: 35, surcharge: 100 },
        "36L": { mold: 30.92, turned: 36.96, minOrder: 35, surcharge: 100 },
        "40L": { mold: 41.45, turned: 47.05, minOrder: 35, surcharge: 100 },
        "44L": { mold: 59.36, turned: 67.20, minOrder: 35, surcharge: 100 }
    }
};

const thicknessOptions = [1.0, 1.5, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 6.0];

const DB_KEYS = {
  types: [
    "磁钮", "月光", "珠光", "混色散花", "彩虹钮", "棒花钮", "尿素钮扣"
  ],
  processes: [
    "tube", "punch", "mold", "turned"
  ]
};

interface CalcResult {
    basePrice: number;
    thicknessAdj: number;
    obliqueCost: number;
    laserCost: number;
    oilCost: number;
    minOrderCharge: number;
    resizeCost: number;
    totalPrice: number;
    unitPrice: number;
    isMinOrderHit: boolean;
}

interface LeadInfo {
    name: string;
    email: string;
    company: string;
}

const Calculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentLang, t } = useLanguage();

  // Safety Check
  if (!t.calculator) {
      return null;
  }

  // Currency Config for DISPLAY (UI Only)
  const currency = useMemo(() => {
    return CURRENCY_CONFIG[currentLang.code] || CURRENCY_CONFIG.EN || { rate: 0.14, symbol: '$', code: 'USD', decimals: 2 };
  }, [currentLang]);

  // --- FORM STATE ---
  const [btnType, setBtnType] = useState(DB_KEYS.types[2]); // Default Pearl
  const [processType, setProcessType] = useState('tube');
  const [size, setSize] = useState('18L');
  const [quantity, setQuantity] = useState(100);
  const [thickness, setThickness] = useState('');
  
  const [laser, setLaser] = useState('none');
  const [oblique, setOblique] = useState('no');
  const [oil, setOil] = useState('no');
  const [resize, setResize] = useState('none');

  // --- LEAD CAPTURE STATE ---
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({ name: '', email: '', company: '' });
  const [honeypot, setHoneypot] = useState(''); // Honeypot state

  const isUrea = btnType === '尿素钮扣';

  // --- DERIVED OPTIONS ---
  const availableSizes = useMemo(() => {
     if (isUrea) {
         return Object.keys(buttonDatabase.urea);
     }
     return Object.keys(buttonDatabase.regular);
  }, [isUrea]);

  const availableProcesses = useMemo(() => {
     const processList = DB_KEYS.processes.map(key => ({
        value: key,
        label: t.calculator?.processes?.[key] || key 
     }));

     if (isUrea) {
         return processList.filter(p => p.value === 'mold' || p.value === 'turned');
     }
     return processList.filter(p => p.value === 'tube' || p.value === 'punch');
  }, [isUrea, t]);

  const availableTypes = useMemo(() => {
     return DB_KEYS.types.map(key => ({
         value: key,
         label: t.calculator?.types?.[key] || key
     }));
  }, [t]);

  const availableThicknesses = useMemo(() => {
      if (isUrea) return ['Standard'];
      
      const sizeData = buttonDatabase.regular[size];
      if (!sizeData) return [];

      const std = sizeData.standardThickness;
      return thicknessOptions.filter(t => t >= std);
  }, [isUrea, size]);

  // Reset logic
  useEffect(() => {
      if (isUrea) {
          if (processType !== 'mold' && processType !== 'turned') setProcessType('mold');
          if (!buttonDatabase.urea[size]) setSize('18L');
          setThickness('Standard');
      } else {
          if (processType !== 'tube' && processType !== 'punch') setProcessType('tube');
          if (!buttonDatabase.regular[size]) setSize('18L');
          
          const std = buttonDatabase.regular[size]?.standardThickness;
          if (std) setThickness(std.toString());
      }
  }, [btnType, isUrea]);

  // --- CALCULATION LOGIC (DISPLAY) ---
  const [result, setResult] = useState<CalcResult>({
      basePrice: 0, thicknessAdj: 0, obliqueCost: 0, laserCost: 0, oilCost: 0, minOrderCharge: 0, resizeCost: 0, totalPrice: 0, unitPrice: 0, isMinOrderHit: false
  });
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
      setIsCalculating(true);
      const timer = setTimeout(() => {
          let basePrice = 0;
          let thicknessAdj = 0;
          let obliqueCost = 0;
          let laserCost = 0;
          let oilCost = 0;
          let resizeCost = 0;
          let minOrderCharge = 0;
          let totalPrice = 0;
          let isMinOrderHit = false;

          if (isUrea) {
              const ureaData = buttonDatabase.urea[size];
              if (ureaData) {
                  if (processType === 'mold') basePrice = ureaData.mold;
                  else if (processType === 'turned') basePrice = ureaData.turned;

                  if (quantity < ureaData.minOrder) {
                      minOrderCharge = ureaData.surcharge;
                      isMinOrderHit = true;
                  }
                  totalPrice = (basePrice * quantity) + minOrderCharge;
              }
          } else {
              const regularData = buttonDatabase.regular[size];
              if (regularData && regularData.types[btnType]) {
                  basePrice = regularData.types[btnType];

                  const selThickness = parseFloat(thickness);
                  if (!isNaN(selThickness) && selThickness !== regularData.standardThickness) {
                       const adjusted = (selThickness * basePrice / regularData.standardThickness);
                       thicknessAdj = adjusted - basePrice;
                  }

                  if (oblique === 'yes' && regularData.obliquePriceRatio) {
                      obliqueCost = (basePrice + thicknessAdj) * (regularData.obliquePriceRatio - 1);
                  }

                  if (laser === 'surfaceLetter' && regularData.laserSurfaceLetter) {
                      laserCost = regularData.laserSurfaceLetter;
                  } else if (laser === 'sideEdge' && regularData.laserSideEdge) {
                      laserCost = regularData.laserSideEdge;
                  }

                  const subTotal = basePrice + thicknessAdj + obliqueCost + laserCost;
                  if (oil === 'yes') {
                      oilCost = subTotal * 0.05;
                  }
                  
                  if (resize !== 'none') resizeCost = 0;

                  const finalUnit = subTotal + oilCost + resizeCost;
                  totalPrice = finalUnit * quantity;
              }
          }

          const r = currency.rate;
          setResult({
              basePrice: basePrice * r,
              thicknessAdj: thicknessAdj * r,
              obliqueCost: obliqueCost * r,
              laserCost: laserCost * r,
              oilCost: oilCost * r,
              minOrderCharge: minOrderCharge * r,
              resizeCost: resizeCost * r,
              totalPrice: totalPrice * r,
              unitPrice: quantity > 0 ? (totalPrice * r) / quantity : 0,
              isMinOrderHit
          });
          setIsCalculating(false);
      }, 400);

      return () => clearTimeout(timer);
  }, [btnType, processType, size, quantity, thickness, laser, oblique, oil, resize, isUrea, currency.rate]);

  const formatMoney = (val: number) => {
    return val.toLocaleString(undefined, { 
      minimumFractionDigits: currency.decimals, 
      maximumFractionDigits: currency.decimals 
    });
  };

  // --- PDF GENERATION LOGIC (FORCE ENGLISH & USD) ---
  const generatePDF = async () => {
    try {
        // Dynamic import to prevent white screen on load
        // @ts-ignore
        const jsPDFModule = await import('jspdf');
        const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default;

        // @ts-ignore
        const autoTableModule = await import('jspdf-autotable');
        // Fix for "This expression is not callable" by casting to any
        const autoTable: any = autoTableModule.default || autoTableModule;

        // FORCE ENGLISH DICTIONARY
        const dict = PDF_TEXT_EN;
        
        // FORCE USD CURRENCY FOR PDF
        const pdfCurrency = CURRENCY_CONFIG.EN; // USD
        
        // Helper to convert current Display Price -> USD
        // Logic: (Value / CurrentRate) * USD_Rate
        const toUSD = (val: number) => {
            if (currency.code === 'USD') return val;
            const baseCNY = val / currency.rate; // Assuming base is CNY (rate 1)
            return baseCNY * pdfCurrency.rate;
        };
        
        const formatUSD = (val: number) => {
             return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        const doc = new jsPDF();
        const themeColor = "#C9A961";
        const darkColor = "#1a1a1a";

        // 1. HEADER BRANDING
        doc.setFillColor(darkColor);
        doc.rect(0, 0, 210, 30, 'F');
        
        doc.setTextColor(themeColor);
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("HESHENG BUTTON FACTORY", 15, 20);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(dict.subtitle, 130, 20);

        // 2. DOCUMENT INFO
        doc.setTextColor(darkColor);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(dict.title, 15, 45);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`${dict.date}: ${new Date().toLocaleDateString('en-US')}`, 15, 52);
        doc.text(`${dict.ref}: HS-${Date.now().toString().slice(-6)}`, 15, 57);
        doc.text(`${dict.currency}: ${pdfCurrency.code}`, 15, 62);
        doc.text(`${dict.to}: ${leadInfo.company || leadInfo.name || 'Valued Client'}`, 15, 67);

        // 3. PRODUCT SPECS - TRANSLATE TO ENGLISH
        doc.setDrawColor(200);
        doc.setLineWidth(0.1);
        doc.line(15, 72, 195, 72);

        doc.setFontSize(12);
        doc.setTextColor(darkColor);
        doc.text(dict.specs, 15, 80);
        
        // Translate values using ENGLISH_MAP
        const safeBtnType = ENGLISH_MAP[btnType] || btnType;
        const safeProcess = ENGLISH_MAP[processType] || processType;
        const safeLaser = ENGLISH_MAP[laser] || laser;
        const safeOblique = ENGLISH_MAP[oblique] || oblique;
        const safeOil = ENGLISH_MAP[oil] || oil;

        const localizedSpecs = [
        [dict.col1, dict.col2],
        ["Material", safeBtnType],
        ["Size", size],
        ["Process", safeProcess.toUpperCase()],
        ["Thickness", thickness === 'Standard' ? 'Standard' : `${thickness} mm`],
        ["Quantity", `${quantity} ${isUrea ? 'PCS' : 'G'}`],
        ["Laser", safeLaser],
        ["Oblique", safeOblique],
        ["Oil", safeOil],
        ];

        autoTable(doc, {
        startY: 86,
        head: [[dict.col1, dict.col2]],
        body: localizedSpecs.slice(1), 
        theme: 'striped',
        headStyles: { fillColor: themeColor, textColor: 0 },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } }
        });

        // 4. COST BREAKDOWN - CONVERT TO USD
        const finalY = (doc as any).lastAutoTable.finalY + 15;
        
        doc.setFontSize(12);
        doc.setTextColor(darkColor);
        doc.text(dict.cost, 15, finalY);

        const breakdownData = [
        ["Base Price", `${pdfCurrency.symbol} ${formatUSD(toUSD(result.basePrice))}`],
        result.thicknessAdj !== 0 ? ["Thickness Adjustment", `${pdfCurrency.symbol} ${formatUSD(toUSD(result.thicknessAdj))}`] : null,
        result.obliqueCost > 0 ? ["Oblique Cut", `${pdfCurrency.symbol} ${formatUSD(toUSD(result.obliqueCost))}`] : null,
        result.laserCost > 0 ? ["Laser Engraving", `${pdfCurrency.symbol} ${formatUSD(toUSD(result.laserCost))}`] : null,
        result.oilCost > 0 ? ["Oil Treatment", `${pdfCurrency.symbol} ${formatUSD(toUSD(result.oilCost))}`] : null,
        result.minOrderCharge > 0 ? ["MOQ Surcharge", `${pdfCurrency.symbol} ${formatUSD(toUSD(result.minOrderCharge))}`] : null,
        ].filter(Boolean);

        // Add Total Row
        breakdownData.push(["", ""]);
        breakdownData.push([dict.total, `${pdfCurrency.symbol} ${formatUSD(toUSD(result.totalPrice))}`]);
        breakdownData.push([dict.unit, `${pdfCurrency.symbol} ${formatUSD(toUSD(result.unitPrice))} / ${isUrea ? 'PC' : 'G'}`]);

        autoTable(doc, {
        startY: finalY + 5,
        head: [[dict.colItem, dict.colAmount]],
        body: breakdownData,
        theme: 'plain',
        headStyles: { fillColor: [240, 240, 240], textColor: 0 },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: { 
            0: { cellWidth: 120 },
            1: { fontStyle: 'bold', halign: 'right' } 
        },
        didParseCell: function (data: any) {
            // Bold the Total Row
            if (data.row.index === breakdownData.length - 2) {
                data.cell.styles.fontSize = 12;
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.textColor = themeColor; // Gold color for total
            }
        }
        });

        // 5. FOOTER / DISCLAIMER
        const footerY = 270;
        doc.setDrawColor(themeColor);
        doc.setLineWidth(0.5);
        doc.line(15, footerY, 195, footerY);
        
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(dict.disclaimer, 15, footerY + 8);
        doc.text("HESHENG BUTTON FACTORY | Guangdong, China | contact: wayne.liu86@gmail.com", 15, footerY + 18);

        doc.save(`HESHENG_Quote_EN_${Date.now()}.pdf`);
    } catch (err) {
        console.error("PDF Generation failed", err);
        alert("Could not load PDF generator. Please check your connection.");
    }
  };

  // --- LEAD CAPTURE & EMAIL SENDING ---
  const handleLeadSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // --- HONEYPOT CHECK ---
      if (honeypot) {
          console.warn("Bot submission detected via honeypot.");
          setShowLeadForm(false);
          return;
      }

      setIsSending(true);

      const templateParams = {
          to_email: 'wayne.liu86@gmail.com', // 也可以改成你的接收邮箱变量
          from_name: leadInfo.name,
          from_email: leadInfo.email,
          company: leadInfo.company,
          
          // --- UPDATED: Professional Template Data Fields ---
          ref_id: `HS-${Date.now().toString().slice(-6)}`,
          date: new Date().toLocaleDateString(),
          
          // Specs
          material: btnType,
          size: size,
          process: processType.charAt(0).toUpperCase() + processType.slice(1),
          thickness: thickness === 'Standard' ? 'Standard' : `${thickness}mm`,
          quantity: `${quantity} ${isUrea ? 'PCS' : 'G'}`,
          
          // Services
          laser_engraving: laser === 'none' ? 'None' : (laser === 'surfaceLetter' ? 'Surface' : 'Side'),
          oblique_cut: oblique === 'yes' ? 'Included' : 'None',
          oil_treatment: oil === 'yes' ? 'Included' : 'None',
          
          // Financials
          est_unit_price: `${currency.symbol} ${formatMoney(result.unitPrice)}`,
          est_total_price: `${currency.symbol} ${formatMoney(result.totalPrice)}`,
          
          // Fallback message for debugging
          message: `New Quote Request from ${leadInfo.company}`,
      };

      try {
          if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
              // Dev mode: just download PDF
              // alert("Configuration Missing: Please update the EMAILJS_CONFIG in Calculator.tsx with your keys.");
              console.warn("EmailJS Config missing, skipping email.");
          } else {
             // Dynamic import for EmailJS
             // @ts-ignore
             const emailjsModule = await import('@emailjs/browser');
             const emailjs = emailjsModule.default || emailjsModule;

             // Real Sending Logic
             await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
             );
             console.log("Email sent successfully!");
          }
          
          // Generate PDF after capturing lead
          await generatePDF();
          setShowLeadForm(false);
          setLeadInfo({ name: '', email: '', company: '' });
          setHoneypot(''); // Reset honeypot
      } catch (error) {
          console.error("Failed to send email", error);
          // Fallback: allow download even if email fails
          await generatePDF(); 
          setShowLeadForm(false);
      } finally {
          setIsSending(false);
      }
  };

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[60] bg-[#050505] text-white overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/10 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C9A961]/10 border border-[#C9A961]/30 rounded-sm flex items-center justify-center text-[#C9A961]">
                <CalcIcon size={20} />
            </div>
            <div>
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white">{t.calculator.title}</h2>
                <p className="text-[10px] text-stone-500 font-mono">{t.calculator.subtitle}</p>
            </div>
        </div>
        <button 
          onClick={onClose}
          className="group flex items-center gap-2 text-xs font-bold tracking-widest text-stone-400 hover:text-white transition-colors"
        >
            {t.calculator.close} <span className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors"><X size={16} /></span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-7 space-y-12">
            
            <div className="grid md:grid-cols-2 gap-8">
                <section>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">{t.calculator.sectionMaterial}</label>
                    <div className="relative">
                        <select 
                            value={btnType}
                            onChange={(e) => setBtnType(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-sm text-white focus:border-[#C9A961] focus:outline-none appearance-none cursor-pointer"
                        >
                            {availableTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                    </div>
                </section>

                <section>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">{t.calculator.sectionProcess}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {availableProcesses.map(p => {
                            const isSelected = processType === p.value;
                            return (
                                <button
                                    key={p.value}
                                    onClick={() => setProcessType(p.value)}
                                    className={`px-3 py-3 border text-[10px] uppercase font-bold tracking-wider rounded-sm transition-all
                                        ${isSelected 
                                            ? 'bg-[#C9A961] text-black border-[#C9A961]' 
                                            : 'bg-transparent border-white/10 text-stone-400 hover:bg-white/5'}`}
                                >
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>
                </section>
            </div>

            <section>
                <div className="flex items-end justify-between mb-4">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">{t.calculator.sectionSize}</label>
                    <span className="text-[#C9A961] text-xs font-mono">{size}</span>
                </div>
                <div className="grid grid-cols-5 md:grid-cols-8 gap-3">
                    {Object.keys(isUrea ? buttonDatabase.urea : buttonDatabase.regular).map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`aspect-square flex flex-col items-center justify-center rounded-sm border transition-all duration-200
                                ${size === s 
                                    ? 'bg-white/10 border-[#C9A961] text-white shadow-[0_0_15px_rgba(201,169,97,0.2)]' 
                                    : 'bg-white/5 border-white/5 text-stone-500 hover:border-white/20 hover:text-stone-300'}`}
                        >
                            <span className="text-sm font-bold">{s.replace('L','')}</span>
                            <span className="text-[8px] opacity-50">L</span>
                        </button>
                    ))}
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                 <section>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">{t.calculator.sectionThickness}</label>
                    <div className="relative">
                        <select 
                            value={thickness}
                            onChange={(e) => setThickness(e.target.value)}
                            disabled={isUrea}
                            className={`w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-sm text-white focus:border-[#C9A961] focus:outline-none appearance-none ${isUrea ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {availableThicknesses.map(tOption => (
                                <option key={tOption} value={tOption}>
                                    {tOption === 'Standard' ? 'Standard' : `${parseFloat(tOption as string).toFixed(1)} mm`}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                    </div>
                </section>

                <section>
                    <div className="flex items-end justify-between mb-4">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">{t.calculator.sectionQuantity}</label>
                        <span className="text-[#C9A961] text-xs font-mono">{quantity} G</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input 
                            type="range" min="1" max="5000" step="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="flex-grow h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C9A961]"
                        />
                        <input 
                            type="number" 
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            className="w-24 bg-white/5 border border-white/10 rounded-sm px-2 py-2 text-sm text-center font-mono text-white focus:border-[#C9A961] focus:outline-none"
                        />
                    </div>
                </section>
            </div>

            {!isUrea && (
                <section className="bg-white/5 border border-white/5 rounded-sm p-6">
                    <label className="block text-xs font-bold text-white mb-6 uppercase tracking-widest">{t.calculator.sectionServices}</label>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-stone-400">{t.calculator.serviceLaser}</span>
                            <div className="flex bg-black/50 rounded-sm p-1 border border-white/10">
                                <button onClick={() => setLaser('none')} className={`px-3 py-1 text-[10px] uppercase rounded-sm transition-colors ${laser === 'none' ? 'bg-[#C9A961] text-black' : 'text-stone-500 hover:text-white'}`}>{t.calculator.options.none}</button>
                                <button onClick={() => setLaser('surfaceLetter')} className={`px-3 py-1 text-[10px] uppercase rounded-sm transition-colors ${laser === 'surfaceLetter' ? 'bg-[#C9A961] text-black' : 'text-stone-500 hover:text-white'}`}>{t.calculator.options.surface}</button>
                                <button onClick={() => setLaser('sideEdge')} className={`px-3 py-1 text-[10px] uppercase rounded-sm transition-colors ${laser === 'sideEdge' ? 'bg-[#C9A961] text-black' : 'text-stone-500 hover:text-white'}`}>{t.calculator.options.side}</button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-stone-400">{t.calculator.serviceOblique}</span>
                            <div className="flex bg-black/50 rounded-sm p-1 border border-white/10">
                                <button onClick={() => setOblique('no')} className={`px-4 py-1 text-[10px] uppercase rounded-sm transition-colors ${oblique === 'no' ? 'bg-[#C9A961] text-black' : 'text-stone-500 hover:text-white'}`}>{t.calculator.options.no}</button>
                                <button onClick={() => setOblique('yes')} className={`px-4 py-1 text-[10px] uppercase rounded-sm transition-colors ${oblique === 'yes' ? 'bg-[#C9A961] text-black' : 'text-stone-500 hover:text-white'}`}>{t.calculator.options.yes}</button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-stone-400">{t.calculator.serviceOil}</span>
                            <div className="flex bg-black/50 rounded-sm p-1 border border-white/10">
                                <button onClick={() => setOil('no')} className={`px-4 py-1 text-[10px] uppercase rounded-sm transition-colors ${oil === 'no' ? 'bg-[#C9A961] text-black' : 'text-stone-500 hover:text-white'}`}>{t.calculator.options.no}</button>
                                <button onClick={() => setOil('yes')} className={`px-4 py-1 text-[10px] uppercase rounded-sm transition-colors ${oil === 'yes' ? 'bg-[#C9A961] text-black' : 'text-stone-500 hover:text-white'}`}>{t.calculator.options.yes} (+5%)</button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </div>

        {/* RIGHT: ESTIMATE PANEL */}
        <div className="lg:col-span-5">
            <div className="sticky top-32">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-sm p-8 lg:p-10 relative overflow-hidden flex flex-col h-full shadow-2xl">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-[#C9A961] tracking-[0.3em] font-bold">{t.calculator.receipt.estCost}</span>
                            <span className="text-[9px] text-stone-600 font-mono">{t.calculator.receipt.currency}</span>
                        </div>
                        <RefreshCw size={14} className={`text-stone-600 ${isCalculating ? 'animate-spin' : ''}`} />
                    </div>

                    <div className="mb-8 relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${result.totalPrice}-${currency.code}`}
                                initial={{ opacity: 0.5, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                className="flex items-baseline gap-2"
                            >
                                <span className="text-2xl text-stone-500 font-serif">{currency.symbol}</span>
                                <span className="text-6xl font-sans font-bold text-white tracking-tighter">
                                    {formatMoney(result.totalPrice)}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-[10px] text-stone-500 font-mono">
                                {t.calculator.receipt.unitPrice}: {currency.symbol}{formatMoney(result.unitPrice)} / {isUrea ? 'PC' : 'G'}
                            </p>
                            {result.isMinOrderHit && (
                                <div className="flex items-center gap-1 text-red-500">
                                    <AlertCircle size={10} />
                                    <span className="text-[9px] font-bold">{t.calculator.receipt.moqSurcharge}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 space-y-3 mb-8 relative z-10">
                        <div className="flex justify-between text-xs">
                            <span className="text-stone-500">{t.calculator.receipt.basePrice}</span>
                            <span className="text-stone-300 font-mono">{currency.symbol}{formatMoney(result.basePrice)}</span>
                        </div>
                        {Math.abs(result.thicknessAdj) > 0.001 && (
                            <div className="flex justify-between text-xs">
                                <span className="text-stone-500">{t.calculator.receipt.thicknessAdj}</span>
                                <span className="text-stone-300 font-mono">{result.thicknessAdj > 0 ? '+' : ''}{currency.symbol}{formatMoney(result.thicknessAdj)}</span>
                            </div>
                        )}
                        {result.obliqueCost > 0 && (
                            <div className="flex justify-between text-xs">
                                <span className="text-stone-500">{t.calculator.receipt.obliqueCut}</span>
                                <span className="text-stone-300 font-mono">+{currency.symbol}{formatMoney(result.obliqueCost)}</span>
                            </div>
                        )}
                        {result.laserCost > 0 && (
                            <div className="flex justify-between text-xs">
                                <span className="text-stone-500">{t.calculator.receipt.laserEngraving}</span>
                                <span className="text-stone-300 font-mono">+{currency.symbol}{formatMoney(result.laserCost)}</span>
                            </div>
                        )}
                        {result.oilCost > 0 && (
                            <div className="flex justify-between text-xs">
                                <span className="text-stone-500">{t.calculator.receipt.oilTreatment}</span>
                                <span className="text-stone-300 font-mono">+{currency.symbol}{formatMoney(result.oilCost)}</span>
                            </div>
                        )}
                         {result.minOrderCharge > 0 && (
                            <div className="flex justify-between text-xs">
                                <span className="text-red-400">{t.calculator.receipt.moqCharge}</span>
                                <span className="text-red-400 font-mono">+{currency.symbol}{formatMoney(result.minOrderCharge)}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[9px] text-stone-400 uppercase">{size}</span>
                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[9px] text-stone-400 uppercase">{thickness}</span>
                        <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[9px] text-stone-400 uppercase">{quantity} {isUrea ? 'PCS' : 'G'}</span>
                    </div>

                    <button 
                        onClick={() => setShowLeadForm(true)}
                        className="w-full group relative h-14 bg-[#C9A961] flex items-center justify-center overflow-hidden rounded-sm transition-all hover:shadow-[0_0_30px_rgba(201,169,97,0.3)] mt-auto z-10"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"></div>
                        <span className="relative z-10 text-black font-bold text-xs tracking-[0.2em] uppercase flex items-center gap-3">
                            <DollarSign size={16} /> {t.calculator.receipt.savePdf}
                        </span>
                    </button>
                    
                    <p className="text-[9px] text-stone-600 text-center mt-4 relative z-10">
                        {t.calculator.receipt.disclaimer}
                    </p>
                </div>
            </div>
        </div>

      </div>
    </motion.div>

    {/* LEAD CAPTURE MODAL */}
    <AnimatePresence>
        {showLeadForm && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-sm p-8 shadow-2xl relative"
                >
                    <button 
                        onClick={() => setShowLeadForm(false)}
                        className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="mb-6 text-center">
                        <div className="w-12 h-12 bg-[#C9A961]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C9A961]/20">
                            <Lock size={20} className="text-[#C9A961]" />
                        </div>
                        <h3 className="text-xl font-serif text-white mb-2">Unlock Quote</h3>
                        <p className="text-xs text-stone-400">Please provide your details to download the official PDF quotation.</p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                        {/* --- HONEYPOT FIELD --- */}
                        <div style={{ display: 'none' }} aria-hidden="true">
                            <input 
                                type="text" 
                                name="full_name_hidden" 
                                tabIndex={-1} 
                                autoComplete="off"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Full Name</label>
                            <input 
                                required
                                type="text" 
                                value={leadInfo.name}
                                onChange={(e) => setLeadInfo({...leadInfo, name: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A961] transition-colors rounded-sm"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Company Name</label>
                            <input 
                                required
                                type="text" 
                                value={leadInfo.company}
                                onChange={(e) => setLeadInfo({...leadInfo, company: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A961] transition-colors rounded-sm"
                                placeholder="Factory / Brand"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Email Address</label>
                            <input 
                                required
                                type="email" 
                                value={leadInfo.email}
                                onChange={(e) => setLeadInfo({...leadInfo, email: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A961] transition-colors rounded-sm"
                                placeholder="name@company.com"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isSending}
                            className="w-full h-12 bg-[#C9A961] text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#b09355] transition-colors mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? (
                                <>
                                   <RefreshCw size={14} className="animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                   Download PDF <CheckCircle2 size={16} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

export default Calculator;