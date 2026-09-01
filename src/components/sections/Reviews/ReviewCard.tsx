import React from 'react';
import { type ExtendedReviewItem, CARD_RADIAL_GRADIENTS } from './types';

interface ReviewCardProps {
  item: ExtendedReviewItem;
  isActive: boolean;
  onSelect: () => void;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  item,
  isActive,
  onSelect,
  className,
}) => {
  const radialGrad = CARD_RADIAL_GRADIENTS[item.gradientClass] || CARD_RADIAL_GRADIENTS.c1;

  return (
    <div
      onClick={onSelect}
      className={
        className ||
        'w-[84vw] max-w-[340px] sm:max-w-none sm:w-[380px] lg:w-[420px] xl:w-[460px] shrink-0 cursor-pointer'
      }
    >
      <article
        style={{
          background:
            'linear-gradient(155deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.03) 34%, rgba(255,255,255,0) 62%), linear-gradient(200deg, #123a86 0%, #0d2a63 45%, #0a1f4d 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,.42), inset 0 22px 46px -26px rgba(255,255,255,.25), 0 20px 45px -15px rgba(8,29,69,0.22), 0 10px 20px -10px rgba(0,0,0,0.08)',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          transform: 'translateZ(0)',
        }}
        className={`group relative min-h-[260px] sm:min-h-[280px] lg:h-[380px] sm:lg:h-[400px] p-6 sm:p-8 rounded-[24px] border flex flex-col justify-between overflow-hidden isolate select-none transition-[border-color,box-shadow] duration-500 ${
          isActive ? 'border-white/35 ring-1 ring-white/20' : 'border-white/[0.18] hover:border-white/30'
        }`}
      >
        {/* 1. Світна пляма — Luminous Gradient (::before) */}
        <div
          className="pointer-events-none absolute inset-0 -z-20 transform-gpu group-hover:scale-105 transition-transform duration-700"
          style={{
            background: radialGrad,
            filter: 'blur(35px) saturate(170%)',
          }}
        />

        {/* 2. Ребриста поверхня скла (::after) */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.02) 25%, rgba(255,255,255,0) 50%, rgba(255,255,255,.02) 75%, rgba(255,255,255,.18) 100%)',
            backgroundSize: '34px 100%',
          }}
        />

        {/* ── Верхній ряд: Пілюлі тегів ────────────────────────── */}
        <div className="relative z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-auto">
          <span className="px-3 py-1 rounded-full border border-white/[0.42] text-[10px] sm:text-[11px] font-semibold tracking-wider text-white whitespace-nowrap">
            {item.pill1}
          </span>
          <span className="px-3 py-1 rounded-full border border-white/20 bg-white/[0.14] text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/80 whitespace-nowrap">
            {item.pill2}
          </span>
        </div>

        {/* ── Текст цитати відгуку ─────────────────────────────── */}
        <blockquote className="relative z-10 my-4 sm:my-5 font-sans text-sm sm:text-base lg:text-[18px] font-medium leading-[1.44] tracking-tight text-white max-w-[34ch]">
          {item.quote}
        </blockquote>

        {/* ── Автор відгуку ────────────────────────────────────── */}
        <div className="relative z-10 mt-auto pt-3 sm:pt-4 border-t border-white/20 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
          <span className="font-['PP_Neue_Montreal'] text-sm sm:text-[14.5px] font-bold tracking-tight text-white">
            {item.name}
          </span>
          <span className="font-sans text-xs sm:text-[13px] text-white/60">
            {item.role}
          </span>
        </div>
      </article>
    </div>
  );
};
