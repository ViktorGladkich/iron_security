import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

import { FAQ_DATA, type FAQItem } from '../../../data/faq';
import { prefersReducedMotion } from '../../../lib/media';

gsap.registerPlugin(ScrollTrigger);

interface FAQProps {
  onOrderClick?: () => void;
}

export const FAQ: React.FC<FAQProps> = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // ── Cinematic One-Time ScrollTrigger Entrance Animation ──────────────
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      // 1. Мягкое появление верхнего бейджа
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 14,
        filter: 'blur(4px)',
        duration: 0.8,
        ease: 'power2.out',
      })
      // 2. Плавный подъем главного заголовка
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(6px)',
          duration: 0.9,
          ease: 'power2.out',
        },
        '-=0.6'
      )
      // 3. Мягкое проявление описания
      .from(
        descRef.current,
        {
          opacity: 0,
          y: 14,
          filter: 'blur(4px)',
          duration: 0.85,
          ease: 'power2.out',
        },
        '-=0.7'
      )
      // 4. Плавная прорисовка разделительной линии
      .from(
        borderRef.current,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power2.inOut',
        },
        '-=0.65'
      )
      // 5. Нежный, плавный каскад карточек вопросов и ответов
      .from(
        '.faq-card',
        {
          opacity: 0,
          y: 22,
          scale: 0.985,
          rotateX: 3,
          filter: 'blur(5px)',
          stagger: 0.085,
          duration: 0.95,
          ease: 'power2.out',
          clearProps: 'transform,opacity,filter',
        },
        '-=0.6'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div className="relative w-full rounded-[20px] bg-[#0c0e14] border border-blue-500/20 overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-20">
        
        {/* Верхняя неоновая линия-блик */}
        <div className="pointer-events-none absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent z-10" />

        {/* Фоновое атмосферное свечение */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />

        {/* ── Шапка секции на всю ширину ─────────────────────────────────── */}
        <header className="relative z-10 mb-12 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
            <div>
              <span
                ref={badgeRef}
                className="mb-2 block font-mono text-xs font-bold tracking-widest text-blue-400 uppercase sm:text-sm will-change-transform"
              >
                05 // ЧАСТІ ЗАПИТАННЯ & РЕГЛАМЕНТ
              </span>
              <h2
                ref={titleRef}
                className="font-sans text-2xl font-normal tracking-tight text-white uppercase sm:text-3xl md:text-4xl will-change-transform"
              >
                ВІДПОВІДІ НА{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-sky-300 bg-clip-text text-transparent font-medium">
                  КЛЮЧОВІ ПИТАННЯ
                </span>
              </h2>
            </div>

            <div ref={descRef} className="max-w-md will-change-transform">
              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed tracking-tight">
                Регламент виїзду, гарантії повної конфіденційності та практичні стандарти безпеки IRON SECURITY у Києві.
              </p>
            </div>
          </div>

          {/* Разделительная линия с анимацией scaleX */}
          <div ref={borderRef} className="h-px w-full bg-white/10 will-change-transform" />
        </header>

        {/* ── Компактный центрированный аккордеон вопросов и ответов ── */}
        <div className="max-w-4xl mx-auto w-full">
          <div ref={listRef} className="relative z-10 flex flex-col gap-3">
            {FAQ_DATA.map((item: FAQItem) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`faq-card rounded-[16px] border transition-[background,border-color,box-shadow] duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] border-blue-400/80 shadow-[0_12px_35px_rgba(37,99,235,0.45)] ring-1 ring-blue-400/30'
                      : 'bg-gradient-to-r from-[#081d45] via-[#113478] to-[#092257] border-blue-500/35 hover:border-blue-400/60 shadow-[0_4px_20px_rgba(8,29,69,0.35)] hover:shadow-[0_8px_30px_rgba(29,78,216,0.3)]'
                  }`}
                >
                  {/* Кнопка раскрытия вопроса */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-5.5 flex items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      {/* Номер вопроса */}
                      <span
                        className={`font-tactical font-black text-sm px-2.5 py-1 rounded transition-colors duration-300 shrink-0 ${
                          isOpen
                            ? 'bg-white text-[#081d45] shadow-xs'
                            : 'bg-white/15 text-white border border-white/20 shadow-xs group-hover:bg-white group-hover:text-[#081d45]'
                        }`}
                      >
                        {item.number}
                      </span>

                      <div className="flex flex-col gap-0.5 min-w-0">
                        {item.category && (
                          <span
                            className={`font-mono text-[9px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                              isOpen ? 'text-white/80' : 'text-blue-400/90'
                            }`}
                          >
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-['PP_Neue_Montreal'] font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-blue-200 transition-colors duration-200">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    {/* Круглая иконка переключения +/- (всегда белая) */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-[#081d45] border border-white shrink-0 transition-all duration-300 shadow-sm ${
                        isOpen ? 'rotate-45 bg-white text-[#081d45]' : 'group-hover:scale-105'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Раскрывающийся блок ответа (CSS Grid 0fr -> 1fr) */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 pt-0">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent mb-3.5" />
                        <p className="font-sans text-xs sm:text-sm text-blue-50/95 leading-relaxed font-normal">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
