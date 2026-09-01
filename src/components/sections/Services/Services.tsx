import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

import { SERVICE_CARDS } from '../../../data/serviceCards';
import { prefersReducedMotion } from '../../../lib/media';
import { Button } from '../../common/Button';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onOrderClick?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOrderClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const arch = archRef.current;
      const rightCol = rightColRef.current;
      if (!arch || !rightCol || prefersReducedMotion()) return;

      const imgWrappers = gsap.utils.toArray<HTMLElement>('.arch-img-wrapper', rightCol);
      if (!imgWrappers.length) return;

      const mm = gsap.matchMedia();

      // ── Десктопная анимация скролла и масочного раскрытия ──────────────
      mm.add('(min-width: 769px)', () => {
        // Устанавливаем начальное состояние клип-путей
        gsap.set(imgWrappers, {
          clipPath: 'inset(0% 0% 0% 0%)',
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: arch,
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // Каждая верхняя картинка по очереди плавно обрезается снизу вверх, открывая следующую
        imgWrappers.forEach((wrapper, index) => {
          if (index < imgWrappers.length - 1) {
            const innerImg = wrapper.querySelector('img');
            const nextWrapper = imgWrappers[index + 1];
            const nextImg = nextWrapper?.querySelector('img');

            timeline.to(
              wrapper,
              {
                clipPath: 'inset(0% 0% 100% 0%)',
                ease: 'none',
                duration: 1,
              },
              index,
            );

            if (innerImg) {
              timeline.to(
                innerImg,
                {
                  scale: 1.08,
                  ease: 'none',
                  duration: 1,
                },
                index,
              );
            }

            if (nextImg) {
              timeline.fromTo(
                nextImg,
                { scale: 1.06 },
                { scale: 1, ease: 'none', duration: 1 },
                index,
              );
            }
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div className="relative w-full rounded-[20px] bg-[#f2f4f7] px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-14">
        
        {/* ── Шапка секции ─────────────────────────────────────────────── */}
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

        {/* ── Двухколоночный блок (Arch Scroll Layout) ──────────────────── */}
        <div
          ref={archRef}
          className="relative max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16 items-start justify-between"
        >
          {/* Левая колонка: последовательный скролл карточек описания */}
          <div className="w-full md:w-1/2 flex flex-col">
            {SERVICE_CARDS.map((service) => (
              <div
                key={service.id}
                className="min-h-[60vh] md:min-h-[85vh] flex flex-col justify-center py-8 md:py-14 first:pt-0 last:pb-12"
              >
                <div className="max-w-lg">
                  {/* Градиентный бейдж номера и категории (без точки) */}
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600/15 via-blue-500/10 to-indigo-600/15 mb-5">
                    <span className="font-mono text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#0284c7] bg-clip-text text-transparent">
                      {service.number} // {service.tag}
                    </span>
                  </div>

                  {/* Заголовок услуги */}
                  <h3 className="font-['PP_Neue_Montreal'] font-medium text-3xl sm:text-4xl lg:text-[40px] leading-[1.15] text-[#0f1115] uppercase tracking-tight mb-4">
                    {service.title}
                  </h3>

                  {/* Развернутое детальное описание */}
                  <p className="font-sans text-base sm:text-lg text-[#0f1115]/80 leading-relaxed tracking-tight mb-8">
                    {service.shortDesc}
                  </p>

                  {/* Мобильное фото (отображается только на мобильных экранах) */}
                  <div className="relative block md:hidden mb-8 h-[280px] w-full rounded-[20px] overflow-hidden bg-zinc-950 isolate transform-gpu">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                    {/* Фирменный вырез по центру сверху на мобильном фото */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[220px] h-[34px] pointer-events-none">
                      <svg
                        viewBox="0 0 260 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d="M 0 0 L 260 0 Q 248 0 243 10 L 232 30 Q 227 40 216 40 L 44 40 Q 33 40 28 30 L 17 10 Q 12 0 0 0 Z"
                          fill="#f2f4f7"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center gap-2 pb-1 text-[#0f1115] font-mono text-[10px] font-bold tracking-wider uppercase select-none">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{service.tag}</span>
                      </div>
                    </div>

                    {/* Вырез снизу слева для номера и названия карточки (без зазоров слева) */}
                    <div className="absolute bottom-0 left-0 z-20 w-[280px] h-[48px] pointer-events-none">
                      <svg
                        viewBox="0 0 380 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d="M 0 54 L 0 0 L 280 0 Q 302 0 312 20 L 326 40 Q 334 54 350 54 L 380 54 L 0 54 Z"
                          fill="#f2f4f7"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center px-4 gap-2.5 pt-1">
                        <span className="font-tactical text-xl font-black text-blue-600 leading-none">
                          {service.number}
                        </span>
                        <div className="h-4 w-px bg-black/15" />
                        <span className="font-['PP_Neue_Montreal'] font-bold text-xs text-[#0f1115] tracking-tight uppercase truncate">
                          {service.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Кнопка заказа услуги (наш единый компонент Button со срезанными углами и LetterRoller) */}
                  <div>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={onOrderClick}
                      icon={<ArrowUpRight className="w-4 h-4 text-blue-400 group-hover/btn:text-white transition-colors" />}
                      className="bg-[#0f1115] text-white border-0 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                    >
                      Замовити послугу
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Правая колонка: Pinned Sticky сцена со стопкой изображений (только на планшетах и ПК) */}
          <div
            ref={rightColRef}
            className="hidden md:flex w-full md:w-1/2 sticky top-24 lg:top-28 h-[480px] lg:h-[560px] items-center justify-center shrink-0"
          >
            <div className="relative w-full h-[440px] lg:h-[520px] rounded-[20px] overflow-hidden bg-[#0b0f19] isolate transform-gpu">
              {SERVICE_CARDS.map((service, index) => {
                // Порядок слоев: первая карточка поверх всех (z-40), последняя в самом низу (z-10)
                const zIndex = (SERVICE_CARDS.length - index) * 10;

                return (
                  <div
                    key={service.id}
                    className="arch-img-wrapper absolute inset-0 w-full h-full will-change-[clip-path]"
                    style={{ zIndex }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover will-change-transform brightness-95 contrast-105"
                      loading="lazy"
                    />

                    {/* Мягкий тактический градиент поверх фото */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

                    {/* Фирменный трапециевидный SVG-вырез по центру сверху (как в Header) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[220px] sm:w-[260px] h-[36px] sm:h-[40px] pointer-events-none">
                      <svg
                        viewBox="0 0 260 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d="M 0 0 L 260 0 Q 248 0 243 10 L 232 30 Q 227 40 216 40 L 44 40 Q 33 40 28 30 L 17 10 Q 12 0 0 0 Z"
                          fill="#f2f4f7"
                        />
                      </svg>

                      {/* Категория услуги по центру внутри выреза */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 pb-1 text-[#0f1115] font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase select-none">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{service.tag}</span>
                      </div>
                    </div>

                    {/* Фирменный вырез снизу слева для номера и названия карточки (без зазоров слева) */}
                    <div className="absolute bottom-0 left-0 z-30 w-[300px] sm:w-[350px] lg:w-[380px] h-[50px] sm:h-[54px] pointer-events-none">
                      <svg
                        viewBox="0 0 380 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d="M 0 54 L 0 0 L 280 0 Q 302 0 312 20 L 326 40 Q 334 54 350 54 L 380 54 L 0 54 Z"
                          fill="#f2f4f7"
                        />
                      </svg>

                      <div className="absolute inset-0 flex items-center px-5 sm:px-6 gap-3 pt-1">
                        <span className="font-tactical text-2xl sm:text-[26px] font-black text-blue-600 leading-none">
                          {service.number}
                        </span>
                        <div className="h-5 w-px bg-black/15" />
                        <span className="font-['PP_Neue_Montreal'] font-bold text-sm sm:text-base text-[#0f1115] tracking-tight uppercase truncate">
                          {service.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Подвал секции ────────────────────────────────────────────── */}
        <footer className="relative z-10 mt-12 sm:mt-16 pt-8 border-t border-black/10 flex items-center justify-center text-center w-full">
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-[#0f1115]/60 uppercase">
            КИЇВ // 24/7 СИТУАЦІЙНИЙ ЦЕНТР
          </span>
        </footer>

      </div>
    </section>
  );
};
