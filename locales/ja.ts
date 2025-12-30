import { Translation } from '../types';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { Crown, PenTool, ShieldCheck, Zap } from 'lucide-react';

export const ja: Translation = {
  nav: [
    { name: 'ホーム', href: '#home' }, 
    { name: 'カタログ', href: '#products' }, 
    { name: '工場案内', href: '#about' }, 
    { name: '製造工程', href: '#process' }, 
    { name: '信頼と実績', href: '#partners' }
  ],
  hero: {
    badge: 'メーカー直販',
    titleStart: '合盛',
    titleHighlight: 'ボタン工場',
    subtitle: '中国広東省で18年の製造実績。 \nグローバルなファッションサプライチェーン向けに不飽和ポリエステル樹脂（UPR）ボタンを専門に製造。',
    ctaPrimary: '見積システム',
    ctaSecondary: '工場VRツアー',
    est: '2007年設立 • 中国広東省',
    trust: 'GRS認証 • OEKO-TEX'
  },
  stats: [
    { value: '18', label: '製造実績年数' }, 
    { value: '50万+', label: '日次生産量' }, 
    { value: '5000㎡', label: '工場面積' }, 
    { value: '100%', label: '樹脂専門' }, 
    { value: '24-48H', label: '試作対応' }
  ],
  features: [
    { title: '工場直販', description: '仲介業者なし。広東工場からの直接価格。', icon: Crown }, 
    { title: 'イタリア製機械', description: '高密度樹脂を実現する遠心鋳造機を導入。', icon: PenTool }, 
    { title: '国際規格準拠', description: 'GRS、OEKO-TEX、Reach準拠。', icon: ShieldCheck }, 
    { title: '大量生産対応', description: 'ファストファッションの需要に応える拡張性。', icon: Zap }
  ],
  productSection: { 
    badge: '厳選セレクション', 
    title: '今月の主力製品', 
    subtitle: '18年にわたり磨き上げた技術とテクスチャの数々をご覧ください。', 
    viewDetails: 'カタログPDFをダウンロード', 
    tags: { New: '新作', Hot: '人気' } 
  },
  sampleRoom: {
    title: 'デジタルサンプルルーム',
    countLabel: 'アーカイブ掲載数',
    searchPlaceholder: '品番を検索...',
    exitLabel: '閉じる',
    allCategory: 'すべて',
    categories: { Suiting: 'スーツ', Ladies: 'レディース', Shirt: 'シャツ', Coat: 'コート', Eco: 'エコ', Classic: 'クラシック', Fashion: 'ファッション' },
    noResults: '該当するカテゴリーのボタンが見つかりません',
    contactPrompt: 'アーカイブの一部を表示しています。全カタログの閲覧や現物サンプルのご依頼は、専門スタッフまでお問い合わせください。',
    contactAction: '工場に問い合わせる'
  },
  products: FEATURED_PRODUCTS,
  process: { 
    badge: '製造プロセス', 
    title: '樹脂ボタンの製造工程', 
    subtitle: '液状樹脂から完成品まで、標準化された工業フロー。', 
    steps: [
      { id: 1, title: '樹脂調合', desc: 'UPR樹脂と顔料を正確に配合。', image: "/images/process/step1-mix.webp" }, 
      { id: 2, title: '遠心鋳造', desc: 'シリンダーによる遠心鋳造成形。', image: "/images/process/step2-cast.webp" }, 
      { id: 3, title: '模様付け', desc: 'マーブル模様などのテクスチャ作成。', image: "/images/process/step3-dose.webp" }, 
      { id: 4, title: '切削成形', desc: '自動旋盤によるボタン形状の切削。', image: "/images/process/step4-cut.webp" }, 
      { id: 5, title: '研磨', desc: '48時間にわたるバレル研磨仕上げ。', image: "/images/process/step5-polish.webp" }
    ] 
  },
  partners: {
    title: '国際規格と環境基準への取り組み',
    brandsTitle: 'グローバルトップブランドから信頼されています',
    strategicCompliance: '戦略的コンプライアンス',
    mainTitle: '繊維安全における',
    mainTitleHighlight: 'ゴールドスタンダード',
    oeko: {
      subtitle: 'Standard 100 認証',
      status: '認証済み',
      desc: 'OEKO-TEX® Standard 100認証取得、有害物質を含まず、世界的な繊維安全基準を満たしています。'
    },
    globalCompliance: {
      title: '国際規格準拠',
      desc: 'REACH & CPSIA 適合'
    },
    auditedQuality: {
      title: '監査済み品質',
      desc: '年次監査認証'
    }
  },
  footer: { 
    contactTitle: '工場連絡先', 
    exploreTitle: '会社情報', 
    links: ['工場概要', '生産能力', 'サステナビリティ', 'OEM/ODM対応'], 
    newsTitle: 'マーケット情報', 
    newsDesc: '樹脂原料の価格動向と新作金型情報。', 
    subscribe: '購読する', 
    rights: 'All rights reserved.', 
    address: '中国広東省東莞市鳳崗鎮 523000' 
  },
  calculator: { 
    title: "見積エンジン", subtitle: "リアルタイム試算 /// V.2.0", close: "閉じる", 
    sectionMaterial: "材質タイプ", sectionProcess: "製造工法", sectionSize: "サイズ (Ligne)", sectionThickness: "厚み (mm)", sectionQuantity: "注文数量", sectionServices: "追加加工", serviceLaser: "レーザー彫刻", serviceOblique: "斜め削り加工", serviceOil: "オイル加工", 
    options: { none: "なし", surface: "表面", side: "側面", yes: "あり", no: "なし" }, 
    receipt: { estCost: "見積概算", currency: "通貨: 日本円 (¥)", unitPrice: "単価", moqSurcharge: "小口手数料", basePrice: "基本単価", thicknessAdj: "厚み調整", obliqueCut: "斜め削り", laserEngraving: "レーザー費用", oilTreatment: "オイル加工費用", moqCharge: "MOQ加算", savePdf: "見積をPDF保存", disclaimer: "*システムによる概算です。最終仕様により変動する場合があります。" }, 
    types: { "磁钮": "マグネット", "月光": "ムーンライト", "珠光": "パール", "混色散花": "ミックスカラー", "彩虹钮": "レインボー", "棒花钮": "バーパターン", "尿素钮扣": "ユリア" }, 
    processes: { "tube": "棒花（チューブ）", "punch": "板（パンチ）", "mold": "成形", "turned": "旋盤切削" } 
  }
};