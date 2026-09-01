import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Button } from '../common/Button';
import {
  STACK_ID,
  STACK_SCRUB_SVH,
  STACK_STICKY_TOP_PX,
  TEXT_LEAD_IN,
  TEXT_SETTLED_AT,
} from './stack.constants';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoWord {
  text: string;
  /** Слово-акцент, окрашенное фирменным градиентом. */
  highlight?: boolean;
}

interface AboutStat {
  value: string;
  /** Знак после числа: он всегда акцентный, даже если само число белое. */
  suffix?: string;
  label: string;
  /** Значение целиком окрашено градиентом. */
  accent?: boolean;
}

const MANIFESTO_WORDS: ManifestoWord[] = [
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

const STATS: AboutStat[] = [
  { value: '500', suffix: '+', label: "Об'єктів у Києві" },
  { value: '< 10 хв', label: 'Середній час прибуття', accent: true },
  { value: '100', suffix: '%', label: 'Озброєний штат' },
  { value: '24/7', label: 'Ситуаційний центр' },
];

const ACCENT_GRADIENT = 'bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent';

/**
 * Непроявленное слово.
 *
 * Состояние задано прямо в разметке, а не только стартовым кадром твина.
 * Секция грузится отдельным чанком, и до его исполнения слова иначе успевали
 * показаться полностью — а потом скачком уходили в начало анимации.
 * Значения совпадают с `WORDS_FROM`, поэтому старта твина не видно.
 */
const WORD_INITIAL_STYLE: React.CSSProperties = {
  opacity: 0.18,
  filter: 'blur(4px)',
  transform: 'translateY(4px)',
};

const WORDS_FROM = { opacity: 0.18, filter: 'blur(4px)', y: 4 };

const WORDS_TO = {
  opacity: 1,
  filter: 'blur(0px)',
  y: 0,
  stagger: 0.03,
  ease: 'none' as const,
  // Стартовый кадр выставляем сразу при создании твина, в какой бы момент
  // прокрутки ни смонтировалась секция.
  immediateRender: true,
};

interface AboutProps {
  onOrderClick?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOrderClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>('.about-manifesto-word');
      const mm = gsap.matchMedia();

      // Десктоп: прогресс считаем по треку — секция залипает, и её собственная
      // позиция во вьюпорте перестаёт быть шкалой прокрутки.
      //
      // Скраб идёт в два отрезка. Первый — подъезд: слова начинают проявляться,
      // когда секция только показалась снизу. Второй — уже на залипшей секции,
      // до отметки TEXT_SETTLED_AT от запаса стека. Остаток запаса — пауза
      // перед тем, как Services поедет поверх.
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(words, WORDS_FROM, {
          ...WORDS_TO,
          scrollTrigger: {
            trigger: document.getElementById(STACK_ID) ?? sectionRef.current,
            start: `top ${TEXT_LEAD_IN * 100}%`,
            end: () => {
              const frame = window.innerHeight;
              const approach = frame * TEXT_LEAD_IN - STACK_STICKY_TOP_PX;
              const pinned = frame * (STACK_SCRUB_SVH / 100) * TEXT_SETTLED_AT;
              return `+=${approach + pinned}`;
            },
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });
      });

      // Мобильные: стека нет, секция едет обычным потоком — скраб по самому тексту.
      mm.add('(max-width: 1023.98px)', () => {
        gsap.fromTo(words, WORDS_FROM, {
          ...WORDS_TO,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 0.35,
          },
        });
      });

      gsap.fromTo(
        '.about-stat-box',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-[15px] pb-[15px] flex items-center justify-center lg:sticky lg:top-[15px] lg:z-0"
    >
      <div className="relative w-full rounded-[20px] bg-black border border-white/10 overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-9 xl:py-11 lg:h-[calc(100svh-30px)] lg:flex lg:flex-col">
        {/* 1. Верхний информационный бар */}
        <div className="relative z-10 flex items-center justify-between pb-6 mb-12 sm:mb-16 lg:mb-0 lg:pb-4 lg:shrink-0 border-b border-white/10">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-blue-400 font-semibold">
            01 // ПРО КОМПАНІЮ
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-zinc-500 uppercase tracking-widest">
            IRON SECURITY
          </span>
        </div>

        {/* 2. Манифест со скролл-скрабом слева, видео справа */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-0 lg:flex-1 lg:min-h-0">
          <div ref={manifestoRef} className="lg:col-span-7">
            <p className="font-normal text-xl sm:text-2xl md:text-3xl lg:text-[26px] xl:text-[30px] leading-[1.3] tracking-tight uppercase">
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

          <div className="lg:col-span-5 flex justify-center">
            <div
              style={{
                clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)',
                WebkitClipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)',
              }}
              className="group relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.4] lg:max-h-full rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <video
                src="/video/about.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. Матрица цифр и CTA */}
        <div
          ref={statsRef}
          className="relative z-10 p-6 sm:p-8 lg:p-5 xl:p-6 lg:shrink-0 rounded-2xl bg-white/[0.02] border border-blue-600/40 shadow-[0_10px_30px_rgba(29,78,216,0.15)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="about-stat-box">
                <div
                  className={`font-tactical font-semibold text-2xl sm:text-3xl lg:text-2xl xl:text-3xl tracking-tight mb-1 flex items-center gap-1 ${
                    stat.accent ? ACCENT_GRADIENT : 'text-white'
                  }`}
                >
                  <span>{stat.value}</span>
                  {stat.suffix && <span className={`${ACCENT_GRADIENT} font-bold`}>{stat.suffix}</span>}
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="shrink-0 w-full sm:w-auto flex justify-center">
            <Button onClick={onOrderClick} size="lg" variant="primary" className="w-full sm:w-[240px] lg:h-[48px]">
              Замовити охорону
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
