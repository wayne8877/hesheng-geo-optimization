import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, Search, Filter, ScanEye, Layers, Hash, ArrowUpRight, MessageSquare, ShieldCheck, Activity } from 'lucide-react';
import { FULL_CATALOG } from '../data/catalog';
import { Product } from '../types';
import { useLanguage } from '../LanguageContext';

interface ProductArchiveProps {
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const ProductArchive: React.FC<ProductArchiveProps> = ({ onClose, onSelectProduct }) => {
  const { currentLang, t } = useLanguage();
  const s = t.sampleRoom; 
  const isZH = currentLang.code === 'ZH';
  
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleContactRedirect = () => {
    onClose();
    setTimeout(() => {
      const footerContact = document.getElementById('contact'); 
      if (footerContact) {
        footerContact.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const catalog = useMemo(() => {
    // 基础筛选
    const filtered = FULL_CATALOG.filter(p => {
      const matchesCategory = activeCategoryKey === 'All' || p.category === s.categories[activeCategoryKey] || p.category === activeCategoryKey;
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // 如果是中文，尝试从字典映射标题（这里展示解耦后的字典用法）
    if (!isZH) return filtered;

    return filtered.map(p => {
        // 可以在这里插入更复杂的本地化处理逻辑，但数据源已保持纯净
        return { ...p }; 
    });
  }, [activeCategoryKey, searchTerm, s, isZH]);

  const categories = useMemo(() => {
    return [
      { id: 'All', label: s.allCategory },
      ...Object.keys(s.categories).map(key => ({ id: key, label: s.categories[key] }))
    ];
  }, [s]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-[#050505] text-white flex flex-col"
    >
      <div className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-6">
               <div className="w-12 h-12 border border-[#C9A961]/30 rounded-full flex items-center justify-center text-[#C9A961]">
                  <Layers size={20} />
               </div>
               <div>
                  <h2 className="text-base font-bold tracking-[0.3em] uppercase">{s.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-stone-600 font-mono uppercase tracking-widest">Database Sync</span>
                      <span className="text-stone-800">|</span>
                      <p className="text-[10px] text-stone-500 font-mono uppercase tracking-widest">
                          {catalog.length} ITEMS ARCHIVE
                      </p>
                  </div>
               </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
              <div className="relative group min-w-[300px]">
                 <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-[#C9A961] transition-colors" />
                 <input 
                   type="text"
                   placeholder={s.searchPlaceholder}
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-[#C9A961] focus:bg-white/10 transition-all font-mono"
                 />
              </div>
              <button 
                onClick={onClose}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold tracking-widest text-stone-400 hover:text-white transition-all"
              >
                 {s.exitLabel} <X size={16} />
              </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategoryKey(cat.id)}
                    className={`shrink-0 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border transition-all
                        ${activeCategoryKey === cat.id 
                            ? 'bg-[#C9A961] text-black border-[#C9A961]' 
                            : 'bg-transparent border-white/10 text-stone-600 hover:border-white/20 hover:text-stone-300'}`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
                <AnimatePresence mode='popLayout'>
                    {catalog.map((product, idx) => (
                        <motion.div 
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: (idx % 24) * 0.01 }}
                            className="group cursor-pointer flex flex-col items-center"
                            onClick={() => onSelectProduct(product)}
                        >
                            <div className="relative w-full aspect-square rounded-full transition-all duration-700 transform md:group-hover:-translate-y-2">
                                <div className="absolute inset-0 rounded-full bg-[#111] shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:group-hover:shadow-[0_20px_40px_rgba(201,169,97,0.2)] transition-all"></div>
                                <div className="w-full h-full rounded-full overflow-hidden relative border border-white/5 group-hover:border-[#C9A961]/40 transition-colors bg-[#111]">
                                    <img 
                                      src={product.image} 
                                      alt={product.id} 
                                      loading="lazy" 
                                      className="w-full h-full object-cover transition-all duration-1000 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 relative z-10" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] z-30">
                                         <div className="w-10 h-10 rounded-full border border-[#C9A961] flex items-center justify-center text-[#C9A961] bg-black/50 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                                           <ScanEye size={18} />
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 text-center w-full">
                                <div className="flex items-center justify-center gap-1.5 transition-all duration-500 opacity-40 group-hover:opacity-100">
                                    <Hash size={9} className="text-[#C9A961]" />
                                    <span className="text-[11px] text-white font-mono font-bold tracking-[0.2em] uppercase">{product.id}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {catalog.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 mt-16 mb-24"
                      >
                         <div className="relative group/card" onMouseMove={handleMouseMove}>
                            <motion.div 
                              className="pointer-events-none absolute -inset-px rounded-sm opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-10"
                              style={{
                                background: useTransform(
                                  [mouseX, mouseY],
                                  ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(201, 169, 97, 0.15), transparent 80%)`
                                ),
                              }}
                            />
                            <button 
                              onClick={handleContactRedirect}
                              className="w-full bg-[#080808] border border-white/5 group-hover/card:border-[#C9A961]/30 py-20 px-8 flex flex-col items-center text-center relative transition-all duration-700 overflow-hidden"
                            >
                               <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                               <div className="mb-10 w-20 h-20 rounded-full border border-white/5 flex items-center justify-center text-stone-700 group-hover/card:text-[#C9A961] group-hover/card:border-[#C9A961]/40 transition-all duration-700">
                                  <MessageSquare size={28} />
                               </div>
                               <div className="flex flex-col items-center gap-2 mb-6">
                                  <p className="max-w-xl text-stone-400 text-xs md:text-sm leading-relaxed uppercase tracking-[0.15em] font-light">
                                     {s.contactPrompt}
                                  </p>
                               </div>
                               <div className="flex items-center gap-4">
                                     <span className="text-[11px] font-bold tracking-[0.5em] text-white group-hover/card:text-[#C9A961] transition-colors uppercase">
                                        {s.contactAction}
                                     </span>
                                     <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/card:translate-x-2 group-hover/card:bg-[#C9A961] group-hover/card:text-black transition-all duration-500">
                                        <ArrowUpRight size={16} />
                                     </div>
                               </div>
                            </button>
                         </div>
                      </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {catalog.length === 0 && (
                <div className="py-40 flex flex-col items-center text-stone-800">
                    <Filter size={48} strokeWidth={1} className="mb-6 opacity-10" />
                    <p className="text-[10px] tracking-[0.5em] uppercase font-mono">{s.noResults}</p>
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductArchive;