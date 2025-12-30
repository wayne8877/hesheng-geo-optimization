
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { X, Activity, ArrowUpRight, ChevronDown } from 'lucide-react';

const Process: React.FC = () => {
  const { t, currentLang } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedMobileIdx, setExpandedMobileIdx] = useState<number>(-1); 
  const isZH = currentLang.code === 'ZH';

  const handleCardClick = (idx: number) => {
    // 检查是否是移动端点击行为 (Tailwind lg: 1024px)
    if (window.innerWidth < 1024) {
      setExpandedMobileIdx(expandedMobileIdx === idx ? -1 : idx);
    } else {
      setActiveStep(idx);
    }
  };

  return (
    <section id="process" className="py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-28">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="flex items-center gap-4 mb-4 md:mb-6"
           >
              <div className="w-8 md:w-12 h-[1px] bg-serenity-gold/30"></div>
              <span className="text-serenity-gold text-[8px] md:text-[9px] font-bold tracking-[0.5em] md:tracking-[0.6em] uppercase">
                {t.process.badge}
              </span>
              <div className="w-8 md:w-12 h-[1px] bg-serenity-gold/30"></div>
           </motion.div>
           
           <h2 className="text-3xl lg:text-5xl font-serif text-white mb-4 md:mb-6 tracking-tight">
              {isZH ? "樹脂鈕扣生產工藝" : "Polyester Resin Process"}
           </h2>
           
           <p className="text-stone-500 font-light max-w-xl mx-auto leading-relaxed text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em]">
              {t.process.subtitle}
           </p>
        </div>

        {/* CARDS GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 lg:gap-8">
          {t.process.steps.map((step, idx) => {
            const isExpanded = expandedMobileIdx === idx;
            
            return (
              <motion.div 
                key={step.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col"
                onClick={() => handleCardClick(idx)}
              >
                {/* 图片预览框 - 网页端强制保持 lg:aspect-[1/2.34] (由 2.6 缩短 10%) */}
                <motion.div 
                  layout
                  className={`relative overflow-hidden bg-[#0A0A0A] rounded-[1px] border border-white/5 shadow-2xl transition-all duration-700 lg:aspect-[1/2.34]
                    ${isExpanded ? 'aspect-[4/5]' : 'aspect-[16/5]'}
                  `}
                >
                  {/* 取景框护角 - 仅在大屏或展开时显示 */}
                  <div className={`absolute bottom-3 left-3 md:bottom-4 md:left-4 w-2 h-2 md:w-3 md:h-3 border-b border-l border-serenity-gold/20 z-20 transition-opacity duration-500 ${!isExpanded ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}></div>
                  <div className={`absolute bottom-3 right-3 md:bottom-4 md:right-4 w-2 h-2 md:w-3 md:h-3 border-b border-r border-serenity-gold/20 z-20 transition-opacity duration-500 ${!isExpanded ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}></div>

                  {/* 核心图片 - 改为常亮 */}
                  <motion.img
                    layout
                    src={step.image}
                    alt={step.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out
                      ${isExpanded ? 'grayscale-0 opacity-70 scale-100' : 'grayscale-0 opacity-60 scale-100 lg:group-hover:opacity-80'}
                    `}
                  />
                  
                  {/* 遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505] opacity-80"></div>

                  {/* 手机端收起状态的提示标签 */}
                  {!isExpanded && (
                    <div className="lg:hidden absolute inset-0 flex items-center justify-between px-5 z-30">
                       <span className="text-white/30 font-mono text-[8px] tracking-widest uppercase">PHASE_0{idx + 1}</span>
                       <ChevronDown size={12} className="text-serenity-gold/40" />
                    </div>
                  )}

                  {/* 桌面端悬停图标 */}
                  <div className="hidden lg:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-40">
                     <div className="w-12 h-12 rounded-full border border-serenity-gold/30 flex items-center justify-center bg-black/40 backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform">
                        <ArrowUpRight size={16} className="text-serenity-gold" />
                     </div>
                  </div>
                </motion.div>

                {/* 文案内容 - 展开时显示 */}
                <motion.div 
                  layout
                  className={`mt-4 md:mt-6 space-y-2 md:space-y-3 px-1 transition-all duration-500 ${!isExpanded ? 'opacity-40 lg:opacity-100 h-0 lg:h-auto overflow-hidden lg:overflow-visible' : 'opacity-100 h-auto pb-4'}`}
                >
                   <h3 className="text-base lg:text-xl font-serif text-white tracking-wide group-hover:text-serenity-gold transition-colors duration-500">
                      {step.title}
                   </h3>
                   <div className="w-4 md:w-6 h-[1px] bg-stone-800 group-hover:w-full group-hover:bg-serenity-gold/20 transition-all duration-700"></div>
                   <p className="text-[8px] md:text-[10px] text-stone-500 leading-relaxed font-light uppercase tracking-[0.2em] md:tracking-[0.25em]">
                      {isZH ? step.desc : step.desc}
                   </p>
                </motion.div>

                {/* 手机端收起时的标题预览 */}
                {!isExpanded && (
                   <div className="lg:hidden mt-1.5 px-1">
                      <h3 className="text-[10px] font-serif text-stone-600 uppercase tracking-widest leading-none">{step.title}</h3>
                   </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DETAIL MODAL (Desktop Only) */}
      <AnimatePresence>
        {activeStep !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[#050505]/98 backdrop-blur-3xl flex items-center justify-center p-6 lg:p-20"
            onClick={() => setActiveStep(null)}
          >
            <button 
              onClick={() => setActiveStep(null)}
              className="absolute top-10 right-10 p-5 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all border border-white/10 z-50 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-20 items-center" onClick={e => e.stopPropagation()}>
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative rounded-[2px] overflow-hidden aspect-[4/5] border border-white/5 shadow-2xl"
                >
                    <img 
                      src={t.process.steps[activeStep].image} 
                      className="w-full h-full object-cover"
                      alt="Process Detail"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </motion.div>

                <div className="space-y-12">
                   <div>
                      <div className="flex items-center gap-4 mb-6">
                        <Activity size={14} className="text-serenity-gold animate-pulse" />
                        <span className="text-stone-500 font-mono text-[9px] tracking-[0.6em] uppercase">
                          INDUSTRIAL_PROTOCOL // V2.0
                        </span>
                      </div>
                      <h2 className="text-5xl lg:text-7xl font-serif text-white mb-8 tracking-tight">
                        {t.process.steps[activeStep].title}
                      </h2>
                      <div className="w-16 h-[1px] bg-serenity-gold"></div>
                   </div>

                   <p className="text-stone-400 text-base lg:text-lg leading-relaxed font-light">
                      {t.process.steps[activeStep].desc}
                   </p>

                   <div className="flex gap-8 pt-6">
                       <button 
                          disabled={activeStep === 0}
                          onClick={() => setActiveStep(activeStep - 1)}
                          className="px-10 py-4 border border-white/10 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/5 disabled:opacity-10 transition-all text-white"
                       >
                          Previous
                       </button>
                       <button 
                          disabled={activeStep === t.process.steps.length - 1}
                          onClick={() => setActiveStep(activeStep + 1)}
                          className="px-12 py-4 bg-serenity-gold text-black rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:scale-105 disabled:opacity-10 transition-all"
                       >
                          Next Step
                       </button>
                   </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Process;
