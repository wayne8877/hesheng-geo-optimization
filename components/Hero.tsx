
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onOpenCalculator: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenCalculator }) => {
  const { t } = useLanguage();

  return (
    <section 
      id="home" 
      className="relative h-screen h-[100dvh] min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#020202]"
    >
      {/* 1. Cinematic Background - 采用高性能 WebP 格式 */}
      <motion.div 
        animate={{ scale: [1.0, 1.05] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ 
             backgroundImage: 'url("/images/hero/hero-bg.webp")',
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,#000000_100%)]"></div>
        <div className="absolute inset-0 bg-[#C9A961]/5 mix-blend-overlay"></div>
      </motion.div>

      {/* 2. Texture Overlays */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>

      {/* 3. Technical Lines Decor - 工业精密线条感 */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <div className="absolute top-0 left-8 md:left-12 w-[1px] h-full bg-white/5"></div>
        <div className="absolute top-0 right-8 md:right-12 w-[1px] h-full bg-white/5"></div>
      </div>

      {/* 4. Main Content Container - 视觉重心上移提升品质度 */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col items-center text-center -mt-20 md:mt-0">
        
        {/* Top Tag - 极简铭牌设计 */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="mb-8 md:mb-14 flex flex-col items-center gap-4"
        >
           <div className="h-10 md:h-20 w-[1px] bg-gradient-to-b from-transparent via-[#C9A961]/40 to-transparent"></div>
           <span className="text-[#C9A961] text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-bold border border-[#C9A961]/20 px-4 py-1 bg-black/40 backdrop-blur-sm rounded-[1px]">
             {t.hero.est}
           </span>
        </motion.div>

        {/* Massive Typography - 强化对比与锋利度 */}
        <div className="relative mb-10 md:mb-16">
          <motion.h1 
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
              className="font-serif font-bold leading-[0.82] tracking-tight text-[3rem] sm:text-7xl md:text-[8.5rem]"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent" 
                  style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.15)' }}>
              {t.hero.titleStart}
            </span>
            <span className="block mt-1 md:mt-[-0.08em] text-transparent bg-clip-text bg-gradient-to-r from-[#FDFCFB] via-[#C9A961] to-[#FDFCFB] drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#C9A961]/5 blur-[140px] -z-10 rounded-full"></div>
        </div>

        {/* Elegant Subtitle - 使用 whitespace-pre-line 响应 \n 换行 */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-[10px] md:text-[15px] text-stone-500 max-w-[280px] md:max-w-2xl mx-auto leading-relaxed md:leading-loose font-light tracking-[0.08em] mb-14 md:mb-20 mix-blend-lighten whitespace-pre-line"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Single Action - 极致纯净的单一交互点 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <button 
            onClick={onOpenCalculator}
            className="group relative w-56 md:w-72 h-12 md:h-16 bg-[#C9A961] overflow-hidden rounded-[1px] transition-all duration-700 hover:shadow-[0_0_60px_rgba(201,169,97,0.3)]"
          >
            <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"></div>
            <span className="relative z-10 flex items-center justify-center gap-4 text-[#050505] font-bold text-[10px] md:text-[13px] tracking-[0.4em] uppercase h-full w-full">
              {t.hero.ctaPrimary}
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-20"
      >
          <div className="flex flex-col items-center gap-4 opacity-15">
              <span className="text-[8px] md:text-[10px] text-white uppercase tracking-[0.6em] font-light">Explore</span>
              <div className="w-[1px] h-10 md:h-24 bg-gradient-to-b from-white to-transparent"></div>
          </div>
      </motion.div>
    </section>
  );
};

export default Hero;
