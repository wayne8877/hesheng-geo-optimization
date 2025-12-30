
import React, { useState, useMemo } from 'react';
import { Mail, MapPin, Phone, ArrowUp, Copy, Check, Globe, Clock, BarChart3, Package, Send, ArrowRight, X as CloseIcon } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const SocialIcon = ({ path, viewBox = "0 0 24 24", className = "w-5 h-5" }: { path: string, viewBox?: string, className?: string }) => (
  <svg viewBox={viewBox} className={`${className} fill-current transition-transform duration-500`} xmlns="http://www.w3.org/2000/svg">
    <path d={path} />
  </svg>
);

const ICONS = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  facebook: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18.77c.02 1.44-.43 2.87-1.31 3.99-1.28 1.63-3.35 2.5-5.39 2.25-2.02-.24-3.84-1.63-4.71-3.46-.86-1.81-.73-4.04.34-5.74 1.05-1.68 2.96-2.63 4.93-2.52.46.03.92.11 1.36.25v4.13c-.34-.14-.7-.22-1.07-.22-1.01-.02-2.01.52-2.5 1.4-.49.88-.38 2.01.27 2.78.65.77 1.74 1.05 2.68.73.94-.32 1.56-1.22 1.56-2.22V.02z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
};

const FallingParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 14,
      size: Math.random() * 4 + 1.2,
      opacity: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 80
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-[#C9A961] rounded-full"
          style={{ 
            left: p.left, 
            width: p.size, 
            height: p.size, 
            top: -20,
            opacity: p.opacity,
            filter: 'blur(1px)'
          }}
          animate={{ 
            y: ['0vh', '110vh'],
            x: [0, p.drift],
            opacity: [p.opacity, p.opacity, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  const { t, currentLang } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showWhatsAppQR, setShowWhatsAppQR] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleCopy = (e: React.MouseEvent, text: string, fieldName: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const isZH = currentLang.code === 'ZH';

  const factoryMetrics = [
    { label: isZH ? "打樣週期" : "SAMPLING", value: "3-5 Days", icon: Clock },
    { label: isZH ? "大貨交期" : "LEAD TIME", value: "7-12 Days", icon: Package },
    { label: isZH ? "月產能" : "CAPACITY", value: "50M+ Pcs", icon: BarChart3 },
  ];

  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* WhatsApp QR Code Modal */}
      <AnimatePresence>
        {showWhatsAppQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6"
            onClick={() => setShowWhatsAppQR(false)}
          >
            <div className="relative max-w-md w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="relative bg-white p-8 rounded-sm shadow-2xl"
              >
                <img
                  src="/images/qr/whatsapp-qr.webp"
                  alt="WhatsApp QR Code"
                  className="w-full h-auto"
                />
                <div className="mt-6 text-center">
                  <p className="text-stone-900 font-bold text-sm mb-2">Scan to Chat on WhatsApp</p>
                  <p className="text-stone-600 text-xs">+86 138 7598 8877</p>
                </div>
              </motion.div>
              <button
                onClick={() => setShowWhatsAppQR(false)}
                className="mt-6 flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <CloseIcon size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-xs tracking-widest uppercase">{isZH ? "關閉" : "Close"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景纹理与光影 */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#C9A961]/5 blur-[150px] rounded-full pointer-events-none"></div>

      {/* 第一层：巨幕口号 */}
      <div className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <span className="text-[#C9A961] text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block">
              {isZH ? "卓越源於細節" : "PRECISION IN EVERY LIGNE"}
            </span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
              {isZH ? "塑造全球服飾的" : "Shaping Global"} <br/>
              <span className="text-stone-500 italic font-light">{isZH ? "核心質感" : "Fashion Details."}</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-end"
          >
            <div className="w-24 h-[1px] bg-white/10 mb-6"></div>
            <p className="text-right text-[10px] text-stone-500 font-mono tracking-widest uppercase leading-loose">
              18 Years of Industrial Mastery<br/>
              Guangdong • China
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 第二层：主导航网格 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* A. 核心联系方式 - 添加精准跳转锚点 id="contact" */}
          <div id="contact" className="md:col-span-4 space-y-12 scroll-mt-32">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">{t.footer.contactTitle}</h4>
              <div className="grid gap-px bg-white/5 border border-white/5">
                {[
                  { id: 'site', label: 'SITE', icon: MapPin, value: t.footer.address },
                  { id: 'direct', label: 'DIRECT', icon: Phone, value: '+86 138 7598 8877' },
                  { id: 'mail', label: 'MAIL', icon: Mail, value: 'wayne.liu86@gmail.com' }
                ].map((item) => (
                  <button 
                    key={item.id} 
                    onClick={(e) => handleCopy(e, item.value, item.id)}
                    className="group flex items-center justify-between p-6 bg-[#050505] hover:bg-white/[0.02] transition-colors text-left relative overflow-hidden"
                  >
                    <div className="flex gap-5 items-center">
                       <item.icon size={16} className="text-stone-600 group-hover:text-[#C9A961] transition-colors" />
                       <div>
                          <span className="text-[8px] font-mono text-stone-700 tracking-widest block mb-1">{item.label}</span>
                          <span className="text-sm font-light text-stone-300 group-hover:text-white transition-colors">{item.value}</span>
                       </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {copiedField === item.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-stone-500" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* B. 公司链接 */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">{t.footer.exploreTitle}</h4>
            <ul className="space-y-5">
              {t.footer.links.map(link => (
                <li key={link} className="group flex items-center gap-3 cursor-pointer">
                  <div className="w-0 h-[1px] bg-[#C9A961] group-hover:w-4 transition-all duration-300"></div>
                  <span className="text-sm text-stone-400 group-hover:text-white transition-colors">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* C. 工业规格数据 */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">{isZH ? "交付規格" : "SPECIFICATIONS"}</h4>
            <div className="space-y-10">
              {factoryMetrics.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center gap-3 text-stone-600 mb-2">
                    <item.icon size={12} />
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase">{item.label}</span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="text-2xl font-mono text-white tracking-tighter group-hover:text-[#C9A961] transition-colors duration-500">
                      {item.value}
                    </span>
                    <div className="flex-grow h-[1px] bg-white/5 mb-2 relative overflow-hidden">
                       <motion.div 
                         initial={{ x: '-100%' }}
                         whileInView={{ x: '100%' }}
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A961]/20 to-transparent"
                       />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D. 社交与连接 */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">{isZH ? "社交媒體" : "CHANNELS"}</h4>
            <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden">
              {[
                { type: 'icon', content: ICONS.instagram, url: 'https://www.instagram.com/heshengbotton?igsh=MW16cmVwdWo5Z2Nx&utm_source=qr', isExternal: true },
                { type: 'text', content: '小紅書', url: 'https://xhslink.com/m/7UEjAya4AHA', isExternal: true },
                { type: 'icon', content: ICONS.facebook, url: 'https://www.facebook.com/share/1SpQURxmqS/?mibextid=wwXIfr', isExternal: true },
                { type: 'icon', content: ICONS.x, url: 'https://x.com/liwi32650928?s=21&t=AhN9Zs9MMwSwbvmvIg3Q-w', isExternal: true },
                { type: 'icon', content: ICONS.tiktok, url: 'https://www.tiktok.com/@wayne.liu8877?_r=1&_t=ZS-92Hq8e6WAQq', isExternal: true },
                { type: 'icon', content: ICONS.whatsapp, url: '#', isExternal: false }
              ].map((item, i) => (
                item.isExternal ? (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square flex items-center justify-center bg-[#050505] text-stone-600 hover:text-white hover:bg-[#C9A961]/5 transition-all group"
                  >
                    {item.type === 'icon' ? (
                      <SocialIcon path={item.content as string} className="w-5 h-5 group-hover:scale-110" />
                    ) : (
                      <span
                        style={{ fontFamily: "'FZZhengHei-M02S', 'FZ Zheng Kai', 'STKaiti', 'KaiTi', serif" }}
                        className="text-[12px] font-bold group-hover:scale-105 transition-transform"
                      >
                        {item.content}
                      </span>
                    )}
                  </a>
                ) : (
                  <button
                    key={i}
                    onClick={() => setShowWhatsAppQR(true)}
                    className="aspect-square flex items-center justify-center bg-[#050505] text-stone-600 hover:text-white hover:bg-[#C9A961]/5 transition-all group"
                  >
                    <SocialIcon path={item.content as string} className="w-5 h-5 group-hover:scale-110" />
                  </button>
                )
              ))}
            </div>
          </div>
        </div>

        {/* 底部署名区域 */}
        <div className="pt-48 pb-12 flex flex-col items-center gap-16 relative">
          
          {/* 水印与粒子特效 */}
          <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-center -translate-y-1/2 select-none pointer-events-none">
            <FallingParticles />
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative flex items-center justify-center"
            >
                {/* 装饰性光晕 */}
                <div className="absolute inset-0 bg-[#C9A961]/5 blur-[120px] rounded-full scale-150"></div>
                
                {/* HS:BUTTON 水印 */}
                <motion.span 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[15vw] font-serif font-bold tracking-tighter whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-stone-200 via-stone-500/40 to-transparent"
                  style={{ 
                    WebkitTextStroke: '0.6px rgba(255,255,255,0.2)',
                    opacity: 0.2 
                  }}
                >
                  HS:BUTTON
                </motion.span>
            </motion.div>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
             
             {/* 左侧 brand 标识 */}
             <div className="flex flex-col items-center md:items-start group">
                <span className="text-lg md:text-xl font-serif font-bold tracking-[0.3em] uppercase mb-3">
                  HESHENG FACTORY
                </span>
                <div className="flex items-center gap-3">
                   <div className="w-6 h-[1px] bg-[#C9A961]"></div>
                   <p className="text-[9px] text-stone-500 font-mono tracking-[0.4em] uppercase">
                     Polyester Resin Specialist
                   </p>
                </div>
             </div>

             {/* 中间版权 */}
             <div className="flex flex-col items-center text-center">
                <p className="text-[10px] text-stone-500 font-mono tracking-[0.2em] uppercase mb-4">
                  © 2025 HESHENG MFG. CO., LTD. ALL RIGHTS RESERVED.
                </p>
                <div className="flex items-center gap-4 text-stone-700 text-[8px] font-mono tracking-[0.3em] uppercase">
                   <span className="hover:text-stone-400 cursor-pointer transition-colors">Privacy</span>
                   <span className="w-1 h-1 bg-stone-900 rounded-full"></span>
                   <span className="hover:text-stone-400 cursor-pointer transition-colors">Terms of Trade</span>
                   <span className="w-1 h-1 bg-stone-900 rounded-full"></span>
                   <span className="hover:text-stone-400 cursor-pointer transition-colors">Compliance</span>
                </div>
             </div>

             {/* 右侧交互 */}
             <div className="flex items-center gap-10">
                <button 
                  onClick={scrollToTop}
                  className="group flex items-center gap-6 text-stone-500 hover:text-white transition-all"
                >
                   <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Back To Top</span>
                   <div className="w-12 h-12 border border-stone-800 rounded-full flex items-center justify-center group-hover:border-[#C9A961] group-hover:bg-[#C9A961]/5 transition-all duration-500">
                     <ArrowUp size={16} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform" />
                   </div>
                </button>
             </div>

          </div>

          {/* 状态指示 */}
          <div className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[9px] font-mono tracking-[0.3em] text-white uppercase font-bold">Factory Online • GD, CN</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
