import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Helmet } from 'react-helmet-async';
import { FEATURED_PRODUCTS } from '../data/catalog';

const SEO: React.FC = () => {
  const { currentLang } = useLanguage();
  const BASE_URL = "https://hesheng-buttons.com";

  const metadata = {
    EN: {
      title: "HESHENG Button Factory | 18 Years of Resin Excellence",
      description: "Direct from Guangdong Factory: 18 Years of Excellence in Polyester Resin Button Manufacturing. Global Supply Chain Partner for Unsaturated Polyester Resin (UPR).",
      path: "",
      address: { region: "Guangdong", locality: "Dongguan", country: "CN" }
    },
    ZH: {
      title: "和生钮扣厂 | 18年专注树脂钮扣制造 (源头工厂)",
      description: "广东18年源头工厂，专注不饱和树脂钮扣(UPR)生产。提供GRS/OEKO-TEX认证，日产50万粒，服务全球品牌供应链。",
      path: "?lang=ZH",
      address: { region: "廣東省", locality: "東莞市", country: "CN" }
    },
    ES: {
      title: "Fábrica de Botones HESHENG | Expertos en Resina",
      description: "Directo de Fábrica Guangdong: 18 años de excelencia en botones de resina de poliéster. Socio global certificado GRS/OEKO-TEX.",
      path: "?lang=ES",
      address: { region: "Guangdong", locality: "Dongguan", country: "CN" }
    },
    JA: {
      title: "HESHENG (和生) ボタン工場 | レジンボタン製造18年",
      description: "中国広東省のレジンボタン専門工場。日産50万個、GRS/OEKO-TEX認証取得。アパレル副資재のOEM/ODMパートナー。",
      path: "?lang=JA",
      address: { region: "広東省", locality: "東莞市", country: "CN" }
    },
    KO: {
      title: "HESHENG 레진 단추 공장 | 18년 제조 노하우",
      description: "광둥성 직영 공장, 불포화 폴리에스터 레진(UPR) 단추 전문 생산. 글로벌 패션 브랜드 공급 파트너.",
      path: "?lang=KO",
      address: { region: "광둥성", locality: "둥관시", country: "CN" }
    },
    FR: {
      title: "Usine de Boutons HESHENG | Excellence en Résine",
      description: "Fabricant direct du Guangdong : 18 ans d'excellence en boutons résine polyester. Certifié GRS/OEKO-TEX pour les chaînes d'approvisionnement mondiales.",
      path: "?lang=FR",
      address: { region: "Guangdong", locality: "Dongguan", country: "CN" }
    }
  };

  const currentMeta = metadata[currentLang.code as keyof typeof metadata] || metadata.EN;
  const currentUrl = `${BASE_URL}/${currentMeta.path}`;

  // === JSON-LD 增强（V2.6）：5 核心 schema + 10 featured products ===
  const brandName = currentLang.code === 'ZH' ? "和生钮扣厂" : "HESHENG Button Factory";
  const brandLogo = `${BASE_URL}/images/brand/hs-logo.webp`;
  const heroImage = `${BASE_URL}/images/hero/hero-bg.webp`;

  // 1) Organization - 总部/品牌身份
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    "name": brandName,
    "alternateName": ["和生鈕扣", "HESHENG", "HESHENG Button Factory"],
    "url": BASE_URL,
    "logo": brandLogo,
    "image": brandLogo,
    "foundingDate": "2007",
    "description": currentMeta.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No.36 Fengming Road, Fengdeling, Fenggang Town",
      "addressRegion": currentMeta.address.region,
      "addressLocality": currentMeta.address.locality,
      "addressCountry": currentMeta.address.country,
      "postalCode": "523692"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": `${BASE_URL}/?lang=${currentLang.code}#inquiry`,
      "availableLanguage": ["English", "Chinese", "Spanish", "Japanese", "Korean", "French"]
    }],
    "sameAs": [
      "https://www.facebook.com/hesheng.button",
      "https://www.instagram.com/heshengbotton",
      "https://x.com/liwi32650928",
      "https://www.xiaohongshu.com/user/profile/5f940936000000000101dc00"
    ]
  };

  // 2) WebSite - 站点信息 + 多语言
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${BASE_URL}#website`,
    "name": brandName,
    "url": BASE_URL,
    "inLanguage": ["en", "zh-Hant", "es", "ja", "ko", "fr"],
    "publisher": { "@id": `${BASE_URL}#organization` }
  };

  // 3) ManufacturingPlant - 工厂实体 (替换原 schema)
  const manufacturingSchema = {
    "@type": ["ManufacturingPlant", "LocalBusiness"],
    "@id": `${BASE_URL}#factory`,
    "name": brandName,
    "alternateName": "HESHENG Button Factory",
    "description": currentMeta.description,
    "url": currentUrl,
    "logo": brandLogo,
    "image": heroImage,
    "foundingDate": "2007",
    "numberOfEmployees": "200+",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No.36 Fengming Road, Fengdeling, Fenggang Town",
      "addressRegion": currentMeta.address.region,
      "addressLocality": currentMeta.address.locality,
      "addressCountry": currentMeta.address.country,
      "postalCode": "523692"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.7464",
      "longitude": "114.1396"
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "21:00"
    }],
    "parentOrganization": { "@id": `${BASE_URL}#organization` },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Resin Button Catalog",
      "itemListElement": FEATURED_PRODUCTS.map(p => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": p.title,
          "category": p.category,
          "image": `${BASE_URL}${p.image}`,
          "sku": p.id
        }
      }))
    }
  };

  // 4) FAQPage - 常见问题（基于行业真实买家疑问）
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${BASE_URL}#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the minimum order quantity (MOQ) for custom buttons?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard MOQ is 1,000 pieces per design. For custom molds, MOQ is 5,000 pieces. Trial orders of 500 pieces are negotiable for new clients."
        }
      },
      {
        "@type": "Question",
        "name": "How long does sample production take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In-house CNC prototyping delivers samples within 24-48 hours. Custom-developed samples with new molds take 5-7 working days."
        }
      },
      {
        "@type": "Question",
        "name": "Which international certifications do you hold?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GRS (Global Recycled Standard), OEKO-TEX Standard 100, and Higg Index. All certifications are renewable annually with current documentation."
        }
      },
      {
        "@type": "Question",
        "name": "What is the daily production capacity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "500,000 buttons per day across all product lines. Monthly capacity reaches 15 million buttons with consistent quality standards."
        }
      },
      {
        "@type": "Question",
        "name": "Do you support custom color matching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. DataColor® 800 spectrophotometer lab delivers Delta-E < 0.5 color accuracy using 3-stage verification: raw material pre-check, in-process sampling, and final inspection."
        }
      },
      {
        "@type": "Question",
        "name": "What is the lead time for bulk orders?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard bulk orders ship within 7-15 working days after sample confirmation. Express 5-day production is available for urgent orders with 15% surcharge."
        }
      }
    ]
  };

  // 5) BreadcrumbList - 页面结构
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": `${BASE_URL}#products` },
      { "@type": "ListItem", "position": 3, "name": "About", "item": `${BASE_URL}#about` },
      { "@type": "ListItem", "position": 4, "name": "Process", "item": `${BASE_URL}#process` },
      { "@type": "ListItem", "position": 5, "name": "Partners", "item": `${BASE_URL}#partners` }
    ]
  };

  // 用 @graph 打包，单 script tag 注入
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      manufacturingSchema,
      faqSchema,
      breadcrumbSchema
    ]
  };

  const hreflangs = [
    { lang: "en", url: `${BASE_URL}/` },
    { lang: "zh-Hans", url: `${BASE_URL}/?lang=ZH` },
    { lang: "es", url: `${BASE_URL}/?lang=ES` },
    { lang: "ja", url: `${BASE_URL}/?lang=JA` },
    { lang: "ko", url: `${BASE_URL}/?lang=KO` },
    { lang: "fr", url: `${BASE_URL}/?lang=FR` },
    { lang: "x-default", url: `${BASE_URL}/` }
  ];

  return (
    <Helmet>
      {/* === Core meta === */}
      <title>{currentMeta.title}</title>
      <meta name="description" content={currentMeta.description} />
      <meta name="keywords" content="Resin Buttons, Polyester Buttons, UPR Buttons, Button Manufacturer China, GRS Buttons, OEKO-TEX Buttons, OEM ODM Button Factory, Guangdong Button Factory" />
      <meta name="author" content="HESHENG Button Factory" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="theme-color" content="#C9A961" />
      <meta name="format-detection" content="telephone=no" />
      <html lang={currentLang.code === 'ZH' ? 'zh-Hant' : currentLang.code.toLowerCase()} />
      <link rel="canonical" href={currentUrl} />

      {/* === Favicon (V2.6) === */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />

      {/* === hreflang (6 languages + x-default) === */}
      {hreflangs.map((hl) => (
        <link key={hl.lang} rel="alternate" hrefLang={hl.lang} href={hl.url} />
      ))}

      {/* === Open Graph (完整) === */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="HESHENG Button Factory" />
      <meta property="og:title" content={currentMeta.title} />
      <meta property="og:description" content={currentMeta.description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={currentLang.code} />
      <meta property="og:image" content="https://hesheng-buttons.com/images/hero/hero-bg.webp" />
      <meta property="og:image:secure_url" content="https://hesheng-buttons.com/images/hero/hero-bg.webp" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:alt" content="HESHENG Button Factory - Premium Resin Button Manufacturing" />

      {/* === Twitter Card (完整) === */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentMeta.title} />
      <meta name="twitter:description" content={currentMeta.description} />
      <meta name="twitter:image" content="https://hesheng-buttons.com/images/hero/hero-bg.webp" />
      <meta name="twitter:image:alt" content="HESHENG Button Factory - Premium Resin Button Manufacturing" />

      {/* === 动态注入 JSON-LD (@graph 打包 5 schema) === */}
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
};

export default SEO;