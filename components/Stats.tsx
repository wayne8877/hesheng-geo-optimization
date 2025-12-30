import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const Stats: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-6 md:grid-cols-5"
        >
          {t.stats.map((stat, index) => {
            // Mobile: Index 0,1,2 span 2 cols each (total 6). Index 3,4 span 3 cols each (total 6).
            const colSpanClass = index < 3 ? 'col-span-2' : 'col-span-3';
            
            // Border logic for mobile grid
            // Right border: index 0,1 (in row 1) and index 3 (in row 2)
            const mobileRightBorder = (index === 0 || index === 1 || index === 3) ? 'border-r' : '';
            // Bottom border: only for the first row (index 0,1,2)
            const mobileBottomBorder = index < 3 ? 'border-b' : '';

            return (
              <motion.div 
                key={index} 
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`group relative py-4 md:py-12 px-2 flex flex-col items-center justify-center border-stone-200 transition-colors duration-500 cursor-default
                  ${colSpanClass}
                  md:col-span-1
                  ${mobileRightBorder}
                  ${mobileBottomBorder}
                  md:border-b-0
                  md:border-r md:last:border-r-0
                  hover:bg-white`}
              >
                {/* Active Indicator Line - Desktop Only */}
                <div className="hidden md:block absolute top-0 left-0 w-full h-[2px] bg-serenity-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <h3 className="text-base md:text-3xl lg:text-4xl font-mono font-medium text-stone-900 mb-0.5 md:mb-3 tracking-tighter group-hover:text-serenity-gold transition-colors duration-300 leading-none">
                  {stat.value}
                </h3>
                <p className="text-stone-400 text-[7px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold group-hover:text-stone-900 transition-colors duration-300 text-center leading-tight">
                  {stat.label}
                </p>

                {/* Decorative Corner */}
                <div className="absolute bottom-1 right-1 w-1 h-1 md:w-2 md:h-2 border-r border-b border-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;