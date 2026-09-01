import { forwardRef } from 'react';

const BRAND_LETTERS = ['I', 'R', 'O', 'N', ' ', 'S', 'E', 'C', 'U', 'R', 'I', 'T', 'Y'] as const;

export const FooterBigBanner = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-16 overflow-hidden py-4 sm:py-6 lg:py-8 my-4 border-y border-white/10 relative select-none">
      <div
        ref={ref}
        className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 select-none leading-none"
      >
        {BRAND_LETTERS.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="footer-letter inline-block font-tactical font-black text-[7.6vw] sm:text-[8.2vw] md:text-[8.8vw] lg:text-[9.2vw] leading-none select-none text-transparent bg-clip-text bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] transform-gpu will-change-transform"
            style={{
              fontFamily: "var(--font-tactical, 'Orbitron', sans-serif)",
              fontWeight: 900,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
});

FooterBigBanner.displayName = 'FooterBigBanner';
