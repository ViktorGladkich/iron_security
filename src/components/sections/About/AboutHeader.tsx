import React from 'react';

export const AboutHeader: React.FC = () => {
  return (
    <div className="relative z-10 flex items-center justify-between pb-4 sm:pb-6 mb-8 sm:mb-16 lg:mb-0 lg:pb-4 lg:shrink-0 border-b border-white/10">
      <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-semibold">
        01 // ПРО КОМПАНІЮ
      </span>
      <span className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">
        IRON SECURITY
      </span>
    </div>
  );
};
