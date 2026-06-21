import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Helmet } from 'react-helmet-async';

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

  // 动态 JSON-LD 结构化数据
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ManufacturingPlant",
    "name": currentLang.code === 'ZH' ? "和生钮扣厂" : "HESHENG Button Factory",
    "alternateName": "和生鈕扣",
    "description": currentMeta.description,
    "url": currentUrl,
    "logo": `${BASE_URL}/images/brand/hs-logo.webp`,
    "foundingDate": "2007",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": currentMeta.address.region,
      "addressLocality": currentMeta.address.locality,
      "addressCountry": currentMeta.address.country
    },
    "certification": ["GRS", "OEKO-TEX Standard 100"]
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

      {/* === 动态注入 JSON-LD === */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;