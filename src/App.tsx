import React from 'react';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f2f4f7] text-[#0f1115] font-sans selection:bg-black selection:text-white">
      {/* 1. Главная Hero-секция с встроенным Header вырезом */}
      <main className="flex-1 flex flex-col items-center justify-center p-0">
        <Hero />
        {/* 2. Секция «Про фірму» с кинетическим скролл-манифестом и матрицей стандартов */}
        <About />
      </main>

      {/* 3. Футер */}
      <Footer />
    </div>
  );
};

export default App;
