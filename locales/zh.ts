import { Translation } from '../types';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { Crown, PenTool, ShieldCheck, Zap } from 'lucide-react';

const ZH_PRODUCT_MAP: Record<string, { title: string, category: string }> = {
  'HS-101': { title: '匠心流沙暈染', category: '行政西裝系列' },
  'HS-102': { title: '幻彩透亮點鑽', category: '優雅針織系列' },
  'HS-103': { title: '立體斜紋樹脂', category: '經典西裝風衣' },
  'HS-104': { title: '復古琥珀流紋', category: '呢絨大衣系列' },
  'HS-105': { title: '溫潤仿貝珠光', category: '絲綢襯衫針織' },
  'HS-106': { title: '虎眼石紋樹脂', category: '意式復古外套' },
  'HS-107': { title: '柔润光泽弧面', category: '簡約襯衫針織' },
  'HS-108': { title: '經典雙色仿牛角', category: '風衣大衣外套' },
  'HS-109': { title: '六角煙雲流紋', category: '前衛精緻襯衫' },
  'HS-110': { title: '冰晶雙色套色', category: '質感襯衫系列' },
};

export const zh: Translation = {
  nav: [
    { name: '首頁', href: '#home' }, 
    { name: '鈕扣看板', href: '#products' }, 
    { name: '源頭工廠', href: '#about' }, 
    { name: '生產流程', href: '#process' }, 
    { name: '合作信賴', href: '#partners' }
  ],
  hero: {
    badge: '中國製造 18年工廠',
    titleStart: '合盛',
    titleHighlight: '鈕扣工廠',
    subtitle: '18年中国廣東源頭工廠，義大利進口設備\n為全球服裝供應鏈提供最具競爭力的樹脂解決方案',
    ctaPrimary: '實時報價系統',
    ctaSecondary: '預約驗廠',
    est: '2007年 創立於廣東',
    trust: 'OEKO-TEX • GRS認證'
  },
  stats: [
    { value: '18年', label: '製造經驗' }, 
    { value: '50萬+', label: '日產能' }, 
    { value: '5000㎡', label: '自營廠房' }, 
    { value: '100%', label: '樹脂專營' }, 
    { value: '24-48H', label: '快速打樣' }
  ],
  features: [
    { title: '源頭工廠', description: '無中間商差價，廣東工廠直供。', icon: Crown }, 
    { title: '進口設備', description: '全套義大利離心澆鑄與雷射設備。', icon: PenTool }, 
    { title: '出口認證', description: '擁有GRS, OEKO-TEX 完整資質。', icon: ShieldCheck }, 
    { title: '柔性生產', description: '支持快時尚訂單，產能彈性大。', icon: Zap }
  ],
  productSection: { 
    badge: '精選款式', 
    title: '本月主打', 
    subtitle: '18年工藝沉澱的精選之作。在此探索我們在樹脂材質上的無限可能。', 
    viewDetails: '下載完整 PDF 手冊', 
    tags: { New: '新', Hot: '熱' } 
  },
  sampleRoom: {
    title: '數位化樣板間',
    countLabel: '款在庫檔案展示',
    searchPlaceholder: '搜索編號或名稱...',
    exitLabel: '退出',
    allCategory: '全部',
    categories: { Suiting: '西裝', Ladies: '女裝', Shirt: '襯衫', Coat: '大衣', Eco: '環保', Classic: '經典', Fashion: '時尚' },
    noResults: '在此分類下未找到對應鈕扣',
    contactPrompt: '以上僅為部分展示產品。如需查看更多款式、獲取實物樣品或進行定制開發，請聯繫我們的工廠專家。',
    contactAction: '聯繫源頭工廠'
  },
  products: FEATURED_PRODUCTS.map(p => ({
    ...p,
    title: ZH_PRODUCT_MAP[p.id]?.title || p.title,
    category: ZH_PRODUCT_MAP[p.id]?.category || p.category
  })),
  process: { 
    badge: '生產工藝', 
    title: '標準化生產流程', 
    subtitle: '嚴格把控從液態樹脂到固化成型的每一道工序。', 
    steps: [
      { id: 1, title: '原料調配', desc: '不飽和樹脂与色膏精準配比。', image: "/images/process/step1-mix.webp" }, 
      { id: 2, title: '離心澆鑄', desc: '義大利設備制板/制棒。', image: "/images/process/step2-cast.webp" }, 
      { id: 3, title: '滴管注料', desc: '定量滴注入管，撥色成紋。', image: "/images/process/step3-dose.webp" }, 
      { id: 4, title: '車削成型', desc: '自動化車鈕機切削。', image: "/images/process/step4-cut.webp" }, 
      { id: 5, title: '拋光篩选', desc: '48小時滾桶拋光與全檢。', image: "/images/process/step5-polish.webp" }
    ] 
  },
  partners: {
    title: '環保合規與國際資質',
    brandsTitle: '服務於全球一線時尚供應鏈',
    strategicCompliance: '策略合規夥伴',
    mainTitle: '全球紡織標配的',
    mainTitleHighlight: '核心認證',
    oeko: {
      subtitle: 'Standard 100 認證',
      status: '已驗證',
      desc: '通過 OEKO-TEX® Standard 100 認證，確保產品不含對人體有害的化學物質，符合國際紡織品安全標準。'
    },
    globalCompliance: {
      title: '符合國際標准',
      desc: 'REACH & CPSIA 合規'
    },
    auditedQuality: {
      title: '可追蹤審計',
      desc: '年度驗證審核'
    }
  },
  footer: { 
    contactTitle: '工廠聯絡', 
    exploreTitle: '公司', 
    links: ['工廠簡介', '產能概況', '環保資質', 'OEM/ODM服務'], 
    newsTitle: '行業動態', 
    newsDesc: '訂閱樹脂原料價格與新品趨勢。', 
    subscribe: '訂閱', 
    rights: '版權所有', 
    address: '中国广东省东莞市凤岗镇 523000' 
  },
  calculator: { 
    title: "工廠報價系統", subtitle: "實時估價 /// V.2.0", close: "關閉", 
    sectionMaterial: "材質類型", sectionProcess: "製作工藝", sectionSize: "鈕扣尺寸 (Ligne)", sectionThickness: "成品厚度 (mm)", sectionQuantity: "訂單數量", sectionServices: "附加服務", serviceLaser: "雷射雕刻", serviceOblique: "斜車工藝", serviceOil: "泡油處理", 
    options: { none: "無", surface: "射面", side: "射邊", yes: "需要", no: "不需要" }, 
    receipt: { estCost: "預估成本", currency: "貨幣: 人民幣 (¥)", unitPrice: "單價", moqSurcharge: "起訂量加收", basePrice: "基礎單價", thicknessAdj: "厚度差價", obliqueCut: "斜車費用", laserEngraving: "雷射費用", oilTreatment: "泡油費用", moqCharge: "MOQ 加收", savePdf: "下載報價單 (PDF)", disclaimer: "*系統估價僅供参考，最終價格以排單為準。" }, 
    types: { "磁钮": "磁鈕", "月光": "月光", "珠光": "珠光", "混色散花": "混色散花", "彩虹钮": "彩虹鈕", "棒花钮": "棒花鈕", "尿素钮扣": "尿素鈕扣" }, 
    processes: { "tube": "棒花工藝", "punch": "片桶工藝", "mold": "模出", "turned": "車鈕" } 
  }
};