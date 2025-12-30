import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Process from './components/Process';
import Partners from './components/Partners';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './LanguageContext';
import { AnimatePresence } from 'framer-motion';

const Calculator = React.lazy(() => import('./components/Calculator'));

const App: React.FC = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <SEO />
        <div className="min-h-screen font-sans selection:bg-serenity-gold selection:text-white relative">
          <Header />
          
          <main>
            <Hero onOpenCalculator={() => setIsCalculatorOpen(true)} />
            <Stats />
            <ProductGrid />
            <About />
            <Process />
            <Partners />
          </main>
          
          <Footer />

          <AnimatePresence>
            {isCalculatorOpen && (
              <Suspense fallback={null}>
                <Calculator onClose={() => setIsCalculatorOpen(false)} />
              </Suspense>
            )}
          </AnimatePresence>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;