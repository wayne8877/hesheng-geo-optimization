
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const Header: React.FC = () => {
  const { currentLang, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const getFlagUrl = (code: string) => `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-700 border-b ${
        isScrolled 
          ? 'bg-[#050505]/95 backdrop-blur-2xl shadow-2xl border-white/5 py-3' 
          : 'bg-transparent border-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-3 md:gap-4 group relative z-50">
          <div className="relative w-8 h-8 md:w-11 md:h-11 flex items-center justify-center">
             <img 
               src="/images/brand/hs-logo.webp" 
               alt="HESHENG Logo" 
               className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(201,169,97,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(201,169,97,0.5)] transition-all duration-500"
             />
          </div>

          <div className="flex flex-col justify-center">
             <span className="text-lg md:text-2xl font-bold tracking-[0.1em] md:tracking-[0.15em] font-serif text-white leading-none mb-[1px] group-hover:text-[#C9A961] transition-colors duration-500">
               HESHENG
             </span>
             <span className="text-[7px] md:text-[10px] font-sans font-medium tracking-[0.3em] md:tracking-[0.35em] text-stone-500 uppercase pl-[1px] group-hover:text-stone-300 transition-colors duration-500">
               BUTTON FACTORY
             </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {t.nav.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs font-medium text-white/70 hover:text-white transition-colors tracking-[0.15em] uppercase relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-serenity-gold group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-white/70 hover:text-serenity-gold transition-colors hover:scale-110 duration-300">
            <Search size={18} />
          </button>
          
          <div className="h-4 w-[1px] bg-white/10"></div>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-3 text-xs font-bold text-white/90 hover:text-serenity-gold transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 hover:border-serenity-gold/50 min-w-[100px] justify-center"
            >
              <img 
                src={getFlagUrl(currentLang.flag)} 
                alt={currentLang.label}
                className="w-5 h-auto rounded-sm shadow-md border border-white/10"
              />
              <span className="uppercase tracking-widest">{currentLang.code}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-48 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10 z-50"
                  onMouseLeave={() => setIsLangOpen(false)}
                >
                   <div className="bg-gradient-to-r from-serenity-gold to-[#a18545] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <img src={getFlagUrl(currentLang.flag)} className="w-6 h-auto rounded-sm" />
                         <span className="text-white font-bold text-sm">{currentLang.label}</span>
                      </div>
                   </div>
                   <div className="bg-[#121212] py-2">
                    {LANGUAGES.filter(l => l.code !== currentLang.code).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                        className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/5 group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={getFlagUrl(lang.flag)} className="w-5 h-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                          <span className="text-sm text-stone-400 group-hover:text-white transition-colors">{lang.label}</span>
                        </div>
                      </button>
                    ))}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-serenity-gold p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 md:hidden overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col p-8 gap-6">
              {t.nav.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-white/80 text-lg font-serif tracking-widest hover:text-serenity-gold transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-[1px] bg-white/5 w-full my-2"></div>
              <div className="grid grid-cols-3 gap-3">
                 {LANGUAGES.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-sm border transition-all ${currentLang.code === lang.code ? 'border-serenity-gold bg-serenity-gold/10' : 'border-white/5 bg-white/5'}`}
                    >
                       <img src={getFlagUrl(lang.flag)} className="w-6 h-auto rounded-[1px]" />
                       <span className="text-[8px] text-white uppercase font-bold tracking-widest">{lang.code}</span>
                    </button>
                 ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
