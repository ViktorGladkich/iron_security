import React, { forwardRef } from 'react';
import { LetterRoller } from '../../common/LetterRoller';

const TacticalArrowUp: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M8 13.5V2.5M8 2.5L3.5 7M8 2.5L12.5 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface FooterTopCutoutProps {
  onScrollToTop: () => void;
}

export const FooterTopCutout = forwardRef<HTMLDivElement, FooterTopCutoutProps>(
  ({ onScrollToTop }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[440px] sm:w-[540px] md:w-[580px] h-[48px] sm:h-[54px] pointer-events-auto origin-top z-20 will-change-transform"
      >
        <svg
          viewBox="0 0 620 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 0 0 L 620 0 Q 598 0 590 14 L 568 46 Q 560 58 546 58 L 74 58 Q 60 58 52 46 L 30 14 Q 22 0 0 0 Z"
            fill="#f2f4f7"
          />
        </svg>

        <button
          type="button"
          onClick={onScrollToTop}
          className="roller-host group/top absolute inset-0 flex items-center justify-center gap-2.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#0f1115] hover:text-blue-700 cursor-pointer transition-colors pb-1"
        >
          <TacticalArrowUp className="w-3.5 h-3.5 text-[#0f1115] group-hover/top:text-blue-700 transition-all duration-300 transform group-hover/top:-translate-y-1" />
          <LetterRoller
            text="ПОВЕРНУТИСЯ ВГОРУ"
            restClassName="text-[#0f1115] font-bold"
            hoverClassName="text-blue-700 font-bold"
          />
          <TacticalArrowUp className="w-3.5 h-3.5 text-[#0f1115] group-hover/top:text-blue-700 transition-all duration-300 transform group-hover/top:-translate-y-1" />
        </button>
      </div>
    );
  }
);

FooterTopCutout.displayName = 'FooterTopCutout';
