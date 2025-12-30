import { Translation } from '../types';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { Crown, PenTool, ShieldCheck, Zap } from 'lucide-react';

export const ko: Translation = {
  nav: [
    { name: '홈', href: '#home' }, 
    { name: '카탈로그', href: '#products' }, 
    { name: '공장안내', href: '#about' }, 
    { name: '제조공정', href: '#process' }, 
    { name: '신뢰와 실적', href: '#partners' }
  ],
  hero: {
    badge: '제조사 직영',
    titleStart: '허성',
    titleHighlight: '버튼 공장',
    subtitle: '중국 광둥성에서 18년간의 제조 노하우 보유. \n글로벌 패션 공급망을 위한 불포화 폴리에스테르 수지(UPR) 단추 전문 제조.',
    ctaPrimary: '견적 시스템',
    ctaSecondary: '공장 VR 투어',
    est: '2007년 설립 • 중국 광둥성',
    trust: 'GRS 인증 • OEKO-TEX'
  },
  stats: [
    { value: '18', label: '제조 경력(년)' }, 
    { value: '50만+', label: '일일 생산량' }, 
    { value: '5000㎡', label: '공장 규모' }, 
    { value: '100%', label: '수지 전문' }, 
    { value: '24-48H', label: '샘플 제작' }
  ],
  features: [
    { title: '공장 직영', description: '중개인 없음. 광둥성 공장 직접 가격 공급.', icon: Crown }, 
    { title: '이탈리아 설비', description: '고밀도 수지를 구현하는 원심 주조기 도입.', icon: PenTool }, 
    { title: '글로벌 준수', description: 'GRS, OEKO-TEX, Reach 규정 준수.', icon: ShieldCheck }, 
    { title: '대량 생산', description: '패스트 패션 수요에 대응 가능한 확장성.', icon: Zap }
  ],
  productSection: { 
    badge: '엄선된 컬렉션', 
    title: '이달의 주요 제품', 
    subtitle: '18년간 정교하게 다듬어진 질감과 패턴을 확인해 보세요.', 
    viewDetails: '카탈로그 PDF 다운로드', 
    tags: { New: '신제품', Hot: '인기' } 
  },
  sampleRoom: {
    title: '디지털 샘플룸',
    countLabel: '아카이브 등록 수',
    searchPlaceholder: '품번 검색...',
    exitLabel: '닫기',
    allCategory: '전체',
    categories: { Suiting: '수트', Ladies: '여성복', Shirt: '셔츠', Coat: '코트', Eco: '에코', Classic: '클래식', Fashion: '패션' },
    noResults: '해당 카테고리의 단추를 찾을 수 없습니다',
    contactPrompt: '아카이브의 일부만 표시 중입니다. 전체 카탈로그 확인이나 실물 샘플 요청은 전문가에게 문의하세요.',
    contactAction: '공장에 문의하기'
  },
  products: FEATURED_PRODUCTS,
  process: { 
    badge: '제조 프로세스', 
    title: '수지 단추 제조 공정', 
    subtitle: '액상 수지에서 완제품까지, 표준화된 산업 흐름.', 
    steps: [
      { id: 1, title: '수지 배합', desc: 'UPR 수지와 안료를 정밀하게 혼합.', image: "/images/process/step1-mix.webp" }, 
      { id: 2, title: '원심 주조', desc: '실린더 방식의 원심 주조 성형.', image: "/images/process/step2-cast.webp" }, 
      { id: 3, title: '패턴 작업', desc: '마블 등 수지 고유의 패턴 생성.', image: "/images/process/step3-dose.webp" }, 
      { id: 4, title: '절삭 성형', desc: '자동 선반을 이용한 단추 모양 절삭.', image: "/images/process/step4-cut.webp" }, 
      { id: 5, title: '연마 작업', desc: '48시간 동안의 바렐 연마 마감.', image: "/images/process/step5-polish.webp" }
    ] 
  },
  partners: {
    title: '국제 표준 및 환경 기준 준수',
    brandsTitle: '글로벌 일류 브랜드의 신뢰',
    strategicCompliance: '전략적 준수',
    mainTitle: '섬유 안전의',
    mainTitleHighlight: '골드 스탠다드',
    oeko: {
      subtitle: 'Standard 100 인증',
      status: '인증 완료',
      desc: 'OEKO-TEX® Standard 100 인증을 통해 유해 물질이 없으며 글로벌 섬유 안전 기준을 충족합니다.'
    },
    globalCompliance: {
      title: '국제 규격 준수',
      desc: 'REACH & CPSIA 준수'
    },
    auditedQuality: {
      title: '감사된 품질',
      desc: '연간 검증 감사'
    }
  },
  footer: { 
    contactTitle: '공장 연락처', 
    exploreTitle: '회사 정보', 
    links: ['공장 개요', '생산 능력', '지속 가능성', 'OEM/ODM 대응'], 
    newsTitle: '시장 정보', 
    newsDesc: '수지 원료 가격 동향 및 신규 금형 업데이트.', 
    subscribe: '구독하기', 
    rights: 'All rights reserved.', 
    address: '중국 광둥성 둥관시 펑강전 523000' 
  },
  calculator: { 
    title: "견적 엔진", subtitle: "실시간 산출 /// V.2.0", close: "닫기", 
    sectionMaterial: "재질 타입", sectionProcess: "제조 공법", sectionSize: "사이즈 (Ligne)", sectionThickness: "두께 (mm)", sectionQuantity: "주문 수량", sectionServices: "추가 가공", serviceLaser: "레이저 각인", serviceOblique: "사선 가공", serviceOil: "오일 처리", 
    options: { none: "없음", surface: "표면", side: "측면", yes: "있음", no: "없음" }, 
    receipt: { estCost: "예상 견적", currency: "통화: 한화 (₩)", unitPrice: "단가", moqSurcharge: "소량 수수료", basePrice: "기본 단가", thicknessAdj: "두께 조정", obliqueCut: "사선 가공비", laserEngraving: "레이저 비용", oilTreatment: "오일 처리비", moqCharge: "MOQ 가산", savePdf: "견적 PDF 저장", disclaimer: "*시스템 예상치입니다. 최종 사양에 따라 변동될 수 있습니다." }, 
    types: { "磁钮": "마그네틱", "月光": "문라이트", "珠光": "진주광", "混色散花": "믹스컬러", "彩虹钮": "레인보우", "棒花钮": "바 패턴", "尿素钮扣": "유리아" }, 
    processes: { "tube": "봉(튜브) 공법", "punch": "판(펀치) 공법", "mold": "금형 성형", "turned": "선반 가공" } 
  }
};