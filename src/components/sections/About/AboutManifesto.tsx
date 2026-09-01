import { forwardRef } from 'react';
import {
  MANIFESTO_WORDS,
  WORD_INITIAL_STYLE,
  ACCENT_GRADIENT,
} from './about.constants';

export const AboutManifesto = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-16 lg:mb-0 lg:flex-1 lg:min-h-0">
      {/* Ліва колонка: Маніфест із посимвольним скролл-скрабом */}
      <div ref={ref} className="lg:col-span-7">
        <p className="font-normal text-lg sm:text-2xl md:text-3xl lg:text-[26px] xl:text-[30px] leading-[1.32] tracking-tight uppercase">
          {MANIFESTO_WORDS.map((item, index) => (
            <span
              key={`${item.text}-${index}`}
              style={WORD_INITIAL_STYLE}
              className={`about-manifesto-word inline-block mr-[0.28em] last:mr-0 will-change-[opacity,filter] ${
                item.highlight ? `${ACCENT_GRADIENT} font-medium` : 'text-white'
              }`}
            >
              {item.text}
            </span>
          ))}
        </p>
      </div>

      {/* Права колонка: Тактичне 3D відео без обрізання країв */}
      <div className="lg:col-span-5 flex justify-center w-full">
        <div
          style={{
            clipPath:
              'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)',
            WebkitClipPath:
              'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)',
          }}
          className="group relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.4] rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <video
            src="/video/about.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-contain sm:object-cover contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
});

AboutManifesto.displayName = 'AboutManifesto';
