import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../common/Button';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onOrderClick?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOrderClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Слова манифеста с акцентами для кинетического проявления при скролле
  const manifestoWords = [
    { text: 'IRON', highlight: true },
    { text: 'SECURITY', highlight: true },
    { text: '—' },
    { text: 'це' },
    { text: 'еталон' },
    { text: 'силової' },
    { text: 'безпеки' },
    { text: 'та' },
    { text: 'персонального' },
    { text: 'захисту' },
    { text: 'в' },
    { text: 'Києві.', highlight: true },
    { text: 'Ми' },
    { text: 'поєднуємо' },
    { text: 'дисципліну' },
    { text: 'професійного' },
    { text: 'спорту,' },
    { text: 'тактичні' },
    { text: 'навички' },
    { text: 'поводження' },
    { text: 'зі' },
    { text: 'зброєю' },
    { text: 'та' },
    { text: 'цілодобовий' },
    { text: 'ситуаційний' },
    { text: 'відеомоніторинг' },
    { text: 'для' },
    { text: 'безкомпромісного' },
    { text: 'захисту' },
    { text: 'вашого' },
    { text: 'бізнесу' },
    { text: 'та' },
    { text: 'родини.', highlight: true },
  ];

  useGSAP(
    () => {
      // 1. Пословный скролл-скраб манифеста (Word-by-Word Kinetic Reveal with Blur & Opacity)
      const words = gsap.utils.toArray<HTMLElement>('.about-manifesto-word');
      
      gsap.fromTo(
        words,
        {
          opacity: 0.18,
          filter: 'blur(4px)',
          y: 4,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 0.35,
          },
        }
      );

      // 2. Анимация цифр статистики со снятием трансформаций
      if (statsRef.current) {
        gsap.fromTo(
          '.about-stat-box',
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-[15px] pb-[15px] flex items-center justify-center select-none"
    >
      {/* Главный фрейм секции с монолитным черным фоном и радиусом 20px */}
      <div className="relative w-full rounded-[20px] bg-black border border-white/10 overflow-hidden px-6 sm:px-10 md:px-14 lg:px-20 py-16 sm:py-20 md:py-24 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        
        {/* 1. Верхний информационный бар */}
        <div className="relative z-10 flex items-center justify-between pb-6 mb-12 sm:mb-16 border-b border-white/10">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-semibold">
            01 // ПРО КОМПАНІЮ
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-widest">
            IRON SECURITY
          </span>
        </div>

        {/* 2. ДВУХКОЛОНОЧНЫЙ ГРИД: Текст манифеста слева, Видео about.mp4 справа */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          {/* Левая колонка: Кинетический манифест со скролл-скрабом */}
          <div ref={manifestoRef} className="lg:col-span-7">
            <p className="font-['PP_Neue_Montreal'] font-normal text-xl sm:text-2xl md:text-3xl lg:text-[30px] xl:text-[34px] leading-[1.3] tracking-tight uppercase">
              {manifestoWords.map((item, index) => (
                <span
                  key={index}
                  className={`about-manifesto-word inline-block transition-all duration-200 mr-[0.28em] last:mr-0 will-change-[opacity,filter] ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent font-medium'
                      : 'text-white'
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </p>
          </div>

          {/* Правая колонка: Видео about.mp4 без рамок и бейджей */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              style={{
                clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)',
                WebkitClipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)',
              }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.8] rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] group"
            >
              {/* Автоплей видео */}
              <video
                src="/video/about.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />

              {/* Градиентное затемнение по краям */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4. МАТРИЦА ЦИФР И CTA-КНОПКА */}
        <div
          ref={statsRef}
          className="relative z-10 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-blue-600/40 shadow-[0_10px_30px_rgba(29,78,216,0.15)] flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* 4 факта в ряд */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-auto">
            <div className="about-stat-box">
              <div className="font-['Orbitron'] font-semibold text-2xl sm:text-3xl text-white tracking-tight mb-1 flex items-center gap-1">
                <span>500</span>
                <span className="bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent font-bold">+</span>
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400">
                Об'єктів у Києві
              </div>
            </div>

            <div className="about-stat-box">
              <div className="font-['Orbitron'] font-semibold text-2xl sm:text-3xl bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent tracking-tight mb-1">
                &lt; 10 хв
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400">
                Середній час прибуття
              </div>
            </div>

            <div className="about-stat-box">
              <div className="font-['Orbitron'] font-semibold text-2xl sm:text-3xl text-white tracking-tight mb-1 flex items-center gap-1">
                <span>100</span>
                <span className="bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent font-bold">%</span>
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400">
                Озброєний штат
              </div>
            </div>

            <div className="about-stat-box">
              <div className="font-['Orbitron'] font-semibold text-2xl sm:text-3xl text-white tracking-tight mb-1 flex items-center gap-1">
                <span>24/7</span>
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400">
                Ситуаційний центр
              </div>
            </div>
          </div>

          {/* Интерактивная кнопка в фирменном стиле */}
          <div className="shrink-0 w-full sm:w-auto flex justify-center">
            <Button
              onClick={onOrderClick}
              size="lg"
              variant="primary"
              className="w-full sm:w-[240px]"
            >
              Замовити охорону
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
