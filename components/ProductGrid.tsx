import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { Sparkles, ScanEye, X, Move, ZoomIn, ZoomOut, Maximize, ArrowUpRight, Grid3X3 } from 'lucide-react';
import { Product } from '../types';
import ProductArchive from './ProductArchive';

const ProductInspectionViewer: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const scale = useMotionValue(1);
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 30 });

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const current = scale.get();
    const delta = -e.deltaY * 0.002; 
    const newScale = Math.min(Math.max(current + delta, 1), 3);
    scale.set(newScale);
    if (!hasInteracted) setHasInteracted(true);
  };

  const adjustZoom = (amount: number) => {
    const current = scale.get();
    const newScale = Math.min(Math.max(current + amount, 1), 3);
    scale.set(newScale);
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-50">
         <div className="flex flex-col">
            <h3 className="text-white font-serif text-2xl md:text-3xl drop-shadow-lg">{product.title}</h3>
            <div className="flex items-center gap-2 text-[#C9A961]">
                <Maximize size={12} />
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Deep Inspection Mode</span>
            </div>
         </div>
         <button 
           onClick={onClose}
           className="pointer-events-auto p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors group border border-white/5"
         >
            <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
         </button>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50" onClick={(e) => e.stopPropagation()}>
         <button onClick={() => adjustZoom(0.5)} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#C9A961] hover:text-black transition-colors border border-white/10"><ZoomIn size={20} /></button>
         <div className="w-[1px] h-8 bg-white/20 mx-auto"></div>
         <button onClick={() => adjustZoom(-0.5)} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#C9A961] hover:text-black transition-colors border border-white/10"><ZoomOut size={20} /></button>
      </div>

      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing" onClick={(e) => e.stopPropagation()} onWheel={handleWheel} onPointerDown={() => !hasInteracted && setHasInteracted(true)}>
         <AnimatePresence>
            {!hasInteracted && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-[20%] z-40 flex flex-col items-center gap-3 pointer-events-none">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 flex items-center justify-center animate-pulse"><ZoomIn size={18} className="text-white" /></div>
                        <span className="text-white/60 text-[9px] tracking-widest uppercase">Scroll to Zoom</span>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border border-white/20 bg-black/50 flex items-center justify-center"><Move size={18} className="text-white" /></div>
                        <span className="text-white/60 text-[9px] tracking-widest uppercase">Drag to Pan</span>
                    </div>
                </div>
            </motion.div>
            )}
         </AnimatePresence>

         <motion.div drag dragConstraints={containerRef} dragElastic={0.1} style={{ scale: smoothScale }} className="relative w-[80%] max-w-xl aspect-square">
             <div className="w-full h-full rounded-full shadow-2xl relative overflow-hidden bg-[#E0E0E0]">
                  <img src={product.image} width="800" height="800" alt={`${product.title} - High Resolution Inspection`} className="w-full h-full object-cover" draggable={false} />
                  <div className="absolute inset-0 rounded-full border-[2px] border-white/20 pointer-events-none z-10"></div>
                  <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none z-10"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10 mix-blend-multiply"></div>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-20"></div>
             </div>
             <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-black/50 blur-[40px] rounded-[100%] -z-10 pointer-events-none"></div>
         </motion.div>
      </div>
    </motion.div>
  );
};

const ProductGrid: React.FC = () => {
  const { t, currentLang } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <section id="products" className="py-24 bg-[#E0E0E0] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-stone-300 pb-8">
            <div className="max-w-2xl">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[#C9A961] font-bold tracking-[0.2em] text-xs uppercase block mb-3">
                    {t.productSection.badge}
                </motion.span>
                <motion.h2 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl font-serif text-[#0F0F0F] mb-4">
                    {t.productSection.title}
                </motion.h2>
                <p className="text-stone-500 font-light text-sm leading-relaxed max-w-lg">
                    {t.productSection.subtitle}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
          {t.products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group cursor-pointer flex flex-col items-center"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative w-full aspect-square rounded-full z-10 transition-all duration-500 transform group-hover:-translate-y-2">
                 <div className="absolute inset-0 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.1)] group-hover:shadow-[0_25px_50px_rgba(201,169,97,0.4),0_10px_20px_rgba(0,0,0,0.1)] transition-shadow duration-500"></div>
                 <div className="w-full h-full rounded-full overflow-hidden relative bg-stone-100 isolate ring-1 ring-black/5">
                     <img src={product.image} width="300" height="300" alt={`${product.title} - ${product.category}`} loading="lazy" className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-3" />
                     <div className="absolute inset-0 rounded-full border-[1.5px] border-white/40 pointer-events-none z-20"></div>
                     <div className="absolute top-0 left-0 right-0 h-[50%] bg-gradient-to-b from-white/30 to-transparent opacity-90 pointer-events-none z-20"></div>
                     <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-20 mix-blend-multiply"></div>
                     <div className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[40%] h-[20%] bg-white/50 blur-[6px] rounded-[100%] pointer-events-none z-20"></div>
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 backdrop-blur-[2px]">
                         <div className="text-white flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                             <div className="w-10 h-10 rounded-full border border-[#C9A961] flex items-center justify-center text-[#C9A961] bg-black/20 hover:scale-110 transition-transform"><ScanEye size={18} /></div>
                             <span className="text-[10px] font-bold tracking-widest uppercase text-[#C9A961]">Inspect</span>
                         </div>
                     </div>
                 </div>
                 <div className="absolute top-0 right-0 z-40 translate-x-1 -translate-y-1 pointer-events-none">
                    {product.isNew && <div className="w-10 h-10 bg-[#0F0F0F] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#E0E0E0]"><Sparkles size={14} /></div>}
                    {product.isHot && !product.isNew && <div className="w-10 h-10 bg-[#C9A961] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#E0E0E0]"><span className="text-[10px] font-bold">HOT</span></div>}
                 </div>
              </div>
              <div className="mt-6 text-center w-full px-2">
                  <h3 className="text-sm font-bold text-[#0F0F0F] mb-1 group-hover:text-[#C9A961] transition-colors font-serif tracking-wide">{product.title}</h3>
                  <p className="text-stone-400 text-[10px] uppercase tracking-widest">{product.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
           initial={{ opacity: 0 }} 
           whileInView={{ opacity: 1 }} 
           className="mt-20 flex justify-center"
        >
           <button 
             onClick={() => setIsArchiveOpen(true)}
             className="group relative flex flex-col items-center gap-4 py-8 px-12 transition-all duration-500"
           >
               <div className="w-16 h-16 rounded-full border border-stone-300 flex items-center justify-center text-stone-400 group-hover:border-[#C9A961] group-hover:text-[#C9A961] group-hover:bg-white transition-all duration-500 relative">
                   <Grid3X3 size={24} className="relative z-10" />
                   <div className="absolute inset-0 rounded-full bg-[#C9A961]/10 scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
               </div>
               
               <div className="flex flex-col items-center gap-1">
                   <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0F0F0F]">
                      {currentLang.code === 'ZH' ? '進入數位化樣板間' : 'ENTER DIGITAL SAMPLE ROOM'}
                   </span>
                   <span className="text-[10px] text-stone-400 font-mono tracking-widest flex items-center gap-2">
                      {currentLang.code === 'ZH' ? '瀏覽 200+ 歷史款式' : 'BROWSE 200+ ARCHIVE MODELS'}
                      <ArrowUpRight size={10} />
                   </span>
               </div>
           </button>
        </motion.div>

      </div>

      <AnimatePresence>
         {selectedProduct && <ProductInspectionViewer product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </AnimatePresence>

      <AnimatePresence>
         {isArchiveOpen && (
            <ProductArchive 
                onClose={() => setIsArchiveOpen(false)} 
                onSelectProduct={(p) => {
                    setSelectedProduct(p);
                }} 
            />
         )}
      </AnimatePresence>

    </section>
  );
};

export default ProductGrid;