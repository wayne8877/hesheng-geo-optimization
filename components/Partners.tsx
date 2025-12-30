
import React, { useState } from 'react';
import { BRAND_LOGOS } from '../constants';
import { useLanguage } from '../LanguageContext';
import { ShieldCheck, Globe, Maximize2, Activity, Shield } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

const Partners: React.FC = () => {
  const { currentLang, t } = useLanguage();
  const isZH = currentLang.code === 'ZH';
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Mouse tracking for the technical grid background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax and spotlight
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  // Parallax offsets for the background grid
  const gridX = useTransform(smoothX, [0, 1000], [5, -5]);
  const gridY = useTransform(smoothY, [0, 1000], [5, -5]);

  // Spotlight gradient mask
  const spotlight = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(201, 169, 97, 0.15), transparent 80%)`
  );

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const complianceItem = {
    id: "OEKO",
    title: "OEKO-TEX®",
    subtitle: t.partners.oeko?.subtitle || "Standard 100 Certification",
    image: "/images/partners/oeko.webp",
    ref: "CERT // 01",
    status: t.partners.oeko?.status || "VERIFIED",
    desc: t.partners.oeko?.desc || "OEKO-TEX® Standard 100 certified, ensuring products are free from harmful substances and meet global safety standards for textiles."
  };

  const marqueeLogos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section id="partners" className="bg-[#020202] text-white overflow-hidden relative border-t border-white/5 py-24 md:py-32">
      {/* 核心发光背景层 */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#C9A961]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <AnimatePresence>
        {selectedCert && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6 cursor-zoom-out" onClick={() => setSelectedCert(null)}>
                <div className="relative max-w-3xl w-full flex flex-col items-center">
                   <motion.img initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} src={selectedCert} alt="Certificate Preview" className="max-w-full max-h-[85vh] object-contain shadow-2xl bg-white p-2 rounded-sm" onClick={(e) => e.stopPropagation()}/>
                   <div className="mt-8 flex items-center gap-4 text-stone-500">
                        <span className="h-[1px] w-12 bg-white/20"></span>
                        <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-white/40">Tap anywhere to close</p>
                        <span className="h-[1px] w-12 bg-white/20"></span>
                   </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
         <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
             
             {/* 左侧文字介绍 */}
             <div className="lg:col-span-5 relative">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="px-3 py-1 border border-[#C9A961]/30 bg-[#C9A961]/5 rounded-[2px] backdrop-blur-sm">
                            <span className="text-[#C9A961] text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                                {t.partners.strategicCompliance || "STRATEGIC COMPLIANCE"}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-[1.1]">
                        {t.partners.mainTitle || "The Gold Standard"}<br/><span className="text-stone-400">{t.partners.mainTitleHighlight || "in Textile Safety."}</span>
                    </h2>
                    
                    <p className="text-stone-400 text-sm leading-7 font-light mb-10 max-w-md border-l-2 border-[#C9A961]/50 pl-6">
                        {complianceItem.desc}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="group">
                             <div className="flex items-center gap-3 mb-2">
                                 <Globe size={16} className="text-[#C9A961]" />
                                 <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.1em]">{t.partners.globalCompliance?.title || "GLOBAL COMPLIANCE"}</h4>
                             </div>
                             <div className="h-[1px] w-full bg-white/10 mb-2"></div>
                             <p className="text-[10px] text-stone-500 font-mono">{t.partners.globalCompliance?.desc || "REACH & CPSIA Compliant"}</p>
                        </div>
                        <div className="group">
                             <div className="flex items-center gap-3 mb-2">
                                 <Shield size={16} className="text-[#C9A961]" />
                                 <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.1em]">{t.partners.auditedQuality?.title || "AUDITED QUALITY"}</h4>
                             </div>
                             <div className="h-[1px] w-full bg-white/10 mb-2"></div>
                             <p className="text-[10px] text-stone-500 font-mono">{t.partners.auditedQuality?.desc || "Yearly Verified Audit"}</p>
                        </div>
                    </div>
                </motion.div>
             </div>

             {/* 右侧交互式格栅区域 */}
             <div 
               className="lg:col-span-7 w-full relative flex justify-center py-20"
               onMouseMove={handleMouseMove}
             >
                {/* 动态 HUD 背景格栅 */}
                <motion.div 
                  style={{ x: gridX, y: gridY }}
                  className="absolute -inset-4 z-0 pointer-events-none"
                >
                    {/* 基础静态格栅线 */}
                    <div className="absolute inset-0 border border-white/5 rounded-sm opacity-20"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    
                    {/* 随鼠标跟随的高亮遮罩层 */}
                    <motion.div 
                      className="absolute inset-0 bg-[linear-gradient(rgba(201,169,97,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(201,169,97,0.15)_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ maskImage: spotlight, WebkitMaskImage: spotlight }}
                    />

                    {/* 周期性扫描线 */}
                    <motion.div 
                      animate={{ top: ['-10%', '110%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A961]/20 to-transparent shadow-[0_0_15px_rgba(201,169,97,0.1)] z-10"
                    />
                </motion.div>

                {/* 证书展示卡片 */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  whileInView={{ opacity: 1, scale: 1 }} 
                  className="relative z-10 w-full max-w-sm group" 
                  onClick={() => setSelectedCert(complianceItem.image)}
                >
                    {/* HUD 锁定角标 */}
                    <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-[#C9A961]/20 group-hover:border-[#C9A961] group-hover:translate-x-2 group-hover:translate-y-2 transition-all duration-500"></div>
                    <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-[#C9A961]/20 group-hover:border-[#C9A961] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-500"></div>

                    <div className="relative bg-[#080808] border border-white/10 hover:border-[#C9A961]/40 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col rounded-sm shadow-2xl">
                        {/* 顶部状态栏 */}
                        <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-[#0A0A0A]">
                            <div className="flex items-center gap-3">
                                <Shield size={12} className="text-[#C9A961]" />
                                <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest group-hover:text-[#C9A961] transition-colors">{complianceItem.ref}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[8px] font-mono text-green-500 uppercase tracking-widest">{complianceItem.status}</span>
                                <Maximize2 size={10} className="text-stone-600 group-hover:text-white transition-colors ml-1" />
                            </div>
                        </div>

                        {/* 图片展示区 */}
                        <div className="relative w-full aspect-square bg-[#050505] flex items-center justify-center p-8">
                             {/* 动态装饰纹理 */}
                             <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#C9A961_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                             
                             <div className="relative w-full h-full bg-white shadow-inner p-1 transition-transform duration-700 group-hover:scale-[1.05]">
                                <div className="w-full h-full border border-stone-100 bg-white">
                                    <img src={complianceItem.image} alt={complianceItem.title} className="w-full h-full object-contain p-4"/>
                                </div>
                                {/* 玻璃光泽反光 */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                             </div>
                        </div>

                        {/* 底部文案 */}
                        <div className="px-6 py-6 border-t border-white/5 bg-[#080808] relative">
                            <h3 className="text-white font-serif text-lg tracking-wide group-hover:text-[#C9A961] transition-colors">{complianceItem.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-[8px] text-stone-500 uppercase tracking-[0.3em] font-mono">{complianceItem.subtitle}</p>
                                <div className="h-[1px] flex-grow bg-white/5"></div>
                                <Activity size={10} className="text-stone-700 group-hover:text-[#C9A961] transition-colors" />
                            </div>
                        </div>
                    </div>
                </motion.div>
             </div>
         </div>
      </div>

      {/* 品牌墙部分保持不变 */}
      <div className="relative border-t border-white/5 pt-16">
        <div className="flex justify-center mb-20">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A961] via-[#E2C686] to-[#C9A961] text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-center flex items-center gap-6">
               <span className="w-12 h-[1px] bg-[#C9A961]/50"></span>
               {t.partners.brandsTitle || "TRUSTED BY GLOBAL TIER-1 BRANDS"}
               <span className="w-12 h-[1px] bg-[#C9A961]/50"></span>
            </span>
        </div>

        <div className="flex flex-col gap-16 relative pb-8 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none"></div>

            <div className="flex select-none opacity-60 hover:opacity-90 transition-opacity duration-700">
                <motion.div className="flex items-center gap-20 min-w-full py-4" animate={{ x: ["-50%", "0%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 90 }}>
                    {marqueeLogos.map((logo, i) => (
                        <div key={`row1-${i}`} className="shrink-0 w-40 h-20 flex items-center justify-center filter grayscale brightness-[1] contrast-100 hover:brightness-110 hover:grayscale-0 transition-all duration-300 px-2">
                            <img src={logo} alt="Brand" loading="lazy" className="w-full h-full object-contain" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
