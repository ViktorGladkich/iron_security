import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const counterObj = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Быстрый тактический счетчик 0 -> 100%
      tl.to(counterObj, {
        value: 100,
        duration: 1.3,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(counterObj.value).toString().padStart(3, '0');
          }
        },
      })
        // 2. Пульсация щита и тактических линий
        .to('.preloader-center-content', {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        }, '-=0.4')
        // 3. Вылет элементов загрузчика
        .to('.preloader-item', {
          y: -25,
          opacity: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power2.in',
        })
        // 4. Кинематографичное раскрытие створок (Curtain Split) вверх и вниз
        .to('.preloader-curtain-top', {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
        }, 'curtain')
        .to('.preloader-curtain-bottom', {
          yPercent: 100,
          duration: 0.9,
          ease: 'expo.inOut',
        }, 'curtain')
        // 5. Полное скрытие оверлея
        .set(preloaderRef.current, {
          display: 'none',
        });
    },
    { scope: preloaderRef }
  );

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 pointer-events-auto select-none overflow-hidden"
    >
      {/* Верхняя шторка */}
      <div className="preloader-curtain-top absolute top-0 left-0 w-full h-1/2 bg-[#06080d] border-b border-blue-500/20" />
      
      {/* Нижняя шторка */}
      <div className="preloader-curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#06080d] border-t border-blue-500/20" />

      {/* Центральный блок контента прелоадера */}
      <div className="preloader-center-content absolute inset-0 flex flex-col items-center justify-center z-10">
        
        {/* Тактический логотип-щит */}
        <div className="preloader-item relative mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center p-3.5 shadow-[0_0_50px_rgba(37,99,235,0.3)] backdrop-blur-xl">
            <img
              src="/images/iron_shield_icon.png"
              alt="IRON SECURITY"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
          </span>
        </div>

        {/* Название бренда */}
        <div className="preloader-item text-center mb-6">
          <h1 className="font-['Syncopate'] text-lg sm:text-2xl font-bold tracking-[0.35em] text-white uppercase">
            IRON <span className="text-blue-400 font-light">SECURITY</span>
          </h1>
          <p className="font-mono text-[10px] sm:text-xs text-zinc-400 tracking-[0.25em] uppercase mt-1">
            KYIV SPECIAL DIVISION // SYSTEM ONLINE
          </p>
        </div>

        {/* Цифровой счетчик инициализации */}
        <div className="preloader-item flex items-baseline gap-2 font-mono text-blue-400 text-3xl sm:text-4xl font-bold tracking-tight">
          <span ref={counterRef}>000</span>
          <span className="text-base text-zinc-500">%</span>
        </div>

        {/* Прогресс-бар полоска */}
        <div className="preloader-item w-48 sm:w-64 h-[2px] bg-zinc-800 rounded-full mt-4 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-blue-600 via-sky-400 to-white animate-pulse" />
        </div>

      </div>
    </div>
  );
};
