import React from 'react';

export const ServicesHeader: React.FC = () => {
  return (
    <header className="relative z-10 mb-12 sm:mb-16">
      <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-blue-700 uppercase sm:text-sm">
        02 // ПОСЛУГИ БЕЗПЕКИ
      </span>
      <h2 className="font-sans text-2xl font-normal tracking-tight text-[#0f1115] uppercase sm:text-3xl md:text-4xl">
        КОМПЛЕКСНІ ПОСЛУГИ{' '}
        <span className="bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#0284c7] bg-clip-text text-transparent font-medium">
          БЕЗПЕКИ
        </span>
      </h2>
    </header>
  );
};
