import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { ShieldCheck, Layers, TestTube, Cpu, Activity, Ruler } from 'lucide-react';

const About: React.FC = () => {
  const { currentLang } = useLanguage();
  
  const slides = [
    {
      id: "lab1",
      label: "COLOR LAB",
      subLabel: "SPECTRAL TECH",
      image: "/images/about/lab-1.webp",
      narrative: {
          EN: { title: "Spectral", highlight: "Precision", desc: "Our DataColor Spectrophotometer Lab ensures absolute color consistency (Delta E < 0.5) across every batch through a three-stage verification process." },
          ZH: { title: "光譜級", highlight: "精準對色", desc: "建立專業色彩檢測手段，制定嚴格的批次色差管控標準（ΔE ＜ 0.5），通過原料預檢、製程抽檢、成品全檢的三級把關，從源頭消除色差隱患，滿足客戶對產品外觀一致性的基礎需求。" }
      },
      techSpec: {
          icon: TestTube,
          bigValue: "< 0.5",
          label: currentLang.code === 'ZH' ? "Delta-E 色差精度" : "Delta-E Accuracy",
          details: [
            { k: "DEVICE", v: "DataColor® 800" },
            { k: "TOLERANCE", v: "ΔE < 0.5" },
            { k: "LIGHT SRC", v: "D65 / TL84 / UV" }
          ]
      }
    },
    {
      id: "lab2",
      label: "CNC CENTER",
      subLabel: "RAPID MOLDING",
      image: "/images/about/lab-2.webp",
      narrative: {
          EN: { title: "In-House", highlight: "Engineering", desc: "Self-operated CNC Center enables ultra-fast prototyping within 24-48 hours. Developing 200+ new precision molds monthly." },
          ZH: { title: "自營", highlight: "模具工程", desc: "自有 CNC 模具中心支持 24-48 小時極速打樣。月均獨立開發 200 套以上新模具，以精密模具技術確保每顆鈕扣的設計還原度。" }
      },
      techSpec: {
          icon: Layers,
          bigValue: "24-48H",
          label: currentLang.code === 'ZH' ? "打樣響應週期" : "Ultra Prototyping",
          details: [
            { k: "LEAD TIME", v: "24-48 Hours" },
            { k: "OUTPUT", v: "200+ Sets / Mo" },
            { k: "PRECISION", v: "±0.01mm" }
          ]
      }
    },
    {
      id: "lab3",
      label: "STRESS RELIEF",
      subLabel: "DIMENSION STABLE",
      image: "/images/about/lab-3.webp",
      narrative: {
          EN: { title: "Eliminating", highlight: "Deformation", desc: "Internal stress in resin can cause warping after washing. We insist on a 168-hour release period to ensure micron-level flatness under extreme heat or dry cleaning." },
          ZH: { title: "消除隱性", highlight: "形變風險", desc: "樹脂固化後內部存在「分子應力」，急於加工會導致成品在洗滌後發生細微扭曲。我們堅持 168 小時的靜置釋放，確保鈕扣在面對極端高溫整燙後，依然保持幾何平整度，從根本杜绝崩裂風險。" }
      },
      techSpec: {
          icon: Ruler,
          bigValue: "0.05mm",
          label: currentLang.code === 'ZH' ? "幾何平整度公差" : "Flatness Tolerance",
          details: [
            { k: "METHOD", v: "Stress Dissipation" },
            { k: "STABILITY", v: "Δ < 0.05mm" },
            { k: "DURATION", v: "168 Hours" }
          ]
      }
    },
    {
      id: "lab4",
      label: "QUALITY CTRL",
      subLabel: "COMPLIANCE",
      image: "/images/about/lab-4.webp",
      narrative: {
          EN: { title: "Rigorous", highlight: "Standards", desc: "100% manual and visual inspection. Precision tension testing up to 150N for high-intensity workwear compliance." },
          ZH: { title: "嚴苛", highlight: "品控標準", desc: "堅持 100% 人工+視覺全檢。針對高強度工裝提供 ≥ 150N 拉力測試，滿足全球化合規與安全性，保護品牌免受品質糾紛困擾。" }
      },
      techSpec: {
          icon: ShieldCheck,
          bigValue: "≥ 150N",
          label: currentLang.code === 'ZH' ? "拉力測試指標" : "Tension Standards",
          details: [
            { k: "STRENGTH", v: "70N - 150N+" },
            { k: "INSPECTION", v: "100% Manual" },
            { k: "CERTIFIED", v: "GRS / OEKO-TEX" }
          ]
      }
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const langKey = currentLang.code === 'ZH' ? 'ZH' : 'EN';
  const activeSlide = slides[currentIndex];
  const activeNarrative = activeSlide.narrative[langKey] || activeSlide.narrative['EN'];

  return (
    <section id="about" className="relative min-h-screen bg-[#020202] text-white flex flex-col py-24 overflow-hidden">
      
      {/* 沉浸式背景 */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={activeSlide.image} 
              alt="Factory Industrial Scene" 
              className="w-full h-full object-cover grayscale brightness-50"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]"></div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(201,169,97,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,97,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-center relative z-10">
        
        {/* HUD 状态栏 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6 border-b border-white/5 pb-10">
            <div className="flex items-center gap-6">
               <div className="p-3.5 bg-[#C9A961]/10 rounded-sm border border-[#C9A961]/30">
                  <Cpu size={22} className="text-[#C9A961]" />
               </div>
               <div>
                  <h2 className="text-[10px] font-bold tracking-[0.6em] uppercase text-white/80">HESHENG INDUSTRIAL CORE</h2>
                  <p className="text-[9px] text-stone-600 font-mono tracking-[0.2em] mt-1">MODULE_SYNC: ACTIVE_READY</p>
               </div>
            </div>
            
            <div className="flex items-center gap-4 px-5 py-2 bg-white/5 border border-white/5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] font-mono text-stone-500 tracking-widest uppercase">System Operational</span>
            </div>
        </div>

        {/* 核心展示区 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* 左侧：描述 */}
            <div className="lg:col-span-7 space-y-12">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`content-${activeSlide.id}`}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-[#C9A961] font-mono text-sm tracking-[0.3em]">PROT_NODE_0{currentIndex + 1}</span>
                            <div className="h-[1px] w-16 bg-[#C9A961]/30"></div>
                        </div>
                        <h3 className="text-5xl md:text-7xl font-serif leading-tight mb-10 tracking-tight">
                            {activeNarrative.title} <br/>
                            <span className="text-[#C9A961] italic font-light">{activeNarrative.highlight}</span>
                        </h3>
                        <p className="text-stone-400 text-lg md:text-xl leading-relaxed font-light max-w-xl border-l border-[#C9A961]/20 pl-10">
                            {activeNarrative.desc}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 右侧：HUD 数据卡片 */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`hud-${activeSlide.id}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-sm bg-black/40 backdrop-blur-3xl border border-white/10 p-10 rounded-sm relative shadow-2xl overflow-hidden"
                    >
                        {/* 装饰角 */}
                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#C9A961]/30"></div>
                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#C9A961]/30"></div>
                        
                        <div className="space-y-10">
                            <div className="flex justify-between items-end border-b border-white/5 pb-8">
                                <div>
                                    <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold mb-3 block">{activeSlide.techSpec.label}</span>
                                    <span className="text-6xl font-bold tracking-tighter text-white font-mono">{activeSlide.techSpec.bigValue}</span>
                                </div>
                                <div className="text-right">
                                    <activeSlide.techSpec.icon size={36} className="text-[#C9A961] opacity-60 mb-2" />
                                </div>
                            </div>

                            <div className="space-y-5">
                                {activeSlide.techSpec.details.map((detail, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-[10px] font-mono tracking-widest group/item">
                                        <span className="text-stone-600 uppercase group-hover/item:text-stone-400 transition-colors">{detail.k}</span>
                                        <span className="text-stone-300 font-bold">{detail.v}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 flex flex-col gap-4 border-t border-white/5">
                                <div className="flex items-center gap-4 opacity-40">
                                   <Activity size={12} className="text-[#C9A961] animate-pulse" />
                                   <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-[#C9A961]">Monitoring Real-time Stability...</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ x: "-100%" }}
                                      animate={{ x: "100%" }}
                                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                      className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#C9A961]/40 to-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* 底部：精简选择器 */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {slides.map((slide, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`group relative text-left py-6 px-8 transition-all duration-500 rounded-sm overflow-hidden border
                        ${currentIndex === idx 
                            ? 'bg-white/5 border-[#C9A961] shadow-[0_0_40px_rgba(201,169,97,0.1)]' 
                            : 'bg-transparent border-white/5 hover:border-white/10'}`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-mono ${currentIndex === idx ? 'text-[#C9A961]' : 'text-stone-700'}`}>NODE_0{idx + 1}</span>
                        <div className={`w-1 h-1 rounded-full ${currentIndex === idx ? 'bg-[#C9A961]' : 'bg-stone-800'}`}></div>
                    </div>
                    <span className={`text-xs font-bold tracking-[0.25em] uppercase block ${currentIndex === idx ? 'text-white' : 'text-stone-600'}`}>
                        {slide.label}
                    </span>
                    
                    {currentIndex === idx && (
                        <motion.div 
                            className="absolute bottom-0 left-0 h-[2px] bg-[#C9A961]"
                            layoutId="activeTabUnderline"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default About;