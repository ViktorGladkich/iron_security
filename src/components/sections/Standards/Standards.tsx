import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

import { STANDARDS_DATA, type StandardItem } from '../../../data/standards';
import { prefersReducedMotion } from '../../../lib/media';
import { Button } from '../../common/Button';

gsap.registerPlugin(ScrollTrigger);

interface StandardsProps {
  onOrderClick?: () => void;
}

interface StandardCardItemProps {
  item: StandardItem;
}

const StandardCardItem: React.FC<StandardCardItemProps> = ({ item }) => {
  const cardRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Инициализация точной высоты контента и стартовых позиций GSAP для шторки
  useEffect(() => {
    const contentEl = contentRef.current;
    const drawerEl = drawerRef.current;
    if (!contentEl || !drawerEl) return;

    const contentH = contentEl.offsetHeight;

    const ctx = gsap.context(() => {
      // Исходное положение: шторка сдвинута вниз ровно на высоту блока текста
      gsap.set(drawerEl, { y: contentH });
      gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 12 });
      gsap.set(glowRef.current, { opacity: 0.6, scale: 1 });
    }, cardRef);

    const handleResize = () => {
      if (contentRef.current && drawerRef.current) {
        if (!cardRef.current?.matches(':hover')) {
          gsap.set(drawerRef.current, { y: contentRef.current.offsetHeight });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    // 1. Плавный подъем шторки наверх
    gsap.to(drawerRef.current, {
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    // 2. 3D Иконка плавно приподнимается вверх и слегка масштабируется
    gsap.to(iconRef.current, {
      y: -24,
      scale: 1.08,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // 3. Радиальное свечение разгорается
    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.25,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // 4. Каскадное проявление заголовка и описания
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      delay: 0.08,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.14,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // 5. Акцент номера
    gsap.to(numberRef.current, { color: '#2563eb', duration: 0.3, overwrite: 'auto' });
  };

  const handleMouseLeave = () => {
    const contentH = contentRef.current ? contentRef.current.offsetHeight : 120;

    // 1. Шторка плавно съезжает вниз, оставляя видимым только таб
    gsap.to(drawerRef.current, {
      y: contentH,
      duration: 0.45,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });

    // 2. Иконка возвращается в центр
    gsap.to(iconRef.current, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // 3. Свечение возвращается к нормальному
    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // 4. Текст скрывается
    gsap.to([titleRef.current, descRef.current], {
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
    });

    // 5. Возврат цвета номера
    gsap.to(numberRef.current, { color: '#0f1115', duration: 0.3, overwrite: 'auto' });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-[340px] sm:h-[370px] rounded-[20px] bg-[#0c0e14] border border-blue-500/35 hover:border-blue-400/80 overflow-hidden shadow-[0_0_35px_rgba(37,99,235,0.25),0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_65px_rgba(59,130,246,0.55),0_20px_45px_rgba(0,0,0,0.8)] transition-[border-color,box-shadow] duration-500 isolate transform-gpu select-none"
    >
      {/* Верхняя неоновая линия-блик */}
      <div className="pointer-events-none absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/70 to-transparent z-10" />

      {/* Фоновый блок: 3D иконка на глубоком сапфировом градиенте */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#111a38] via-[#0b1022] to-[#070912] flex items-center justify-center p-6 pb-12">
        {/* Фоновое радиальное свечение */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35)_0%,rgba(37,99,235,0.15)_45%,transparent_70%)]"
        />
        
        {/* 3D Иконка */}
        <img
          ref={iconRef}
          src={item.image}
          alt={item.title}
          className="standard-3d-icon relative z-10 w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Выдвижная панель: в спокойном состоянии виден только таб с номером (44px), при наведении плавно выезжает описание */}
      <div
        ref={drawerRef}
        className="absolute bottom-0 left-0 right-0 z-20 will-change-transform pointer-events-none"
      >
        {/* Фирменный ступенчатый SVG-таб с номером карточки (виден всегда) */}
        <div className="relative w-full h-11">
          <svg
            viewBox="0 0 320 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M 0 0 L 125 0 Q 140 0 148 14 L 160 32 Q 168 44 184 44 L 320 44 L 320 44 L 0 44 Z"
              fill="#f2f4f7"
            />
          </svg>

          {/* Большой номер карточки (01, 02, 03, 04) в приподнятом табе */}
          <div className="absolute top-0 left-0 h-11 w-[125px] flex items-center pl-5">
            <span
              ref={numberRef}
              className="font-tactical text-2xl font-black text-[#0f1115] tracking-tight"
            >
              {item.number}
            </span>
          </div>
        </div>

        {/* Нижняя часть карточки: Заголовок и описание на светлом фоне #f2f4f7 (выезжает при ховере) */}
        <div ref={contentRef} className="px-5 pb-6 pt-2 bg-[#f2f4f7]">
          <h3
            ref={titleRef}
            className="font-['PP_Neue_Montreal'] font-bold text-base sm:text-lg text-[#0f1115] mb-2 tracking-tight"
          >
            {item.title}
          </h3>
          <p
            ref={descRef}
            className="font-sans text-xs sm:text-sm text-[#0f1115]/75 leading-relaxed"
          >
            {item.desc}
          </p>
        </div>
      </div>
    </article>
  );
};

interface CenterpieceCardItemProps {
  onOrderClick?: () => void;
}

const CenterpieceCardItem: React.FC<CenterpieceCardItemProps> = ({ onOrderClick }) => {
  const cardRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  // Инициализация стартовых позиций для центральной карточки
  useEffect(() => {
    const contentEl = contentRef.current;
    const drawerEl = drawerRef.current;
    if (!contentEl || !drawerEl) return;

    const contentH = contentEl.offsetHeight;

    const ctx = gsap.context(() => {
      gsap.set(drawerEl, { y: contentH });
      gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 12 });
      gsap.set(glowRef.current, { opacity: 0.8, scale: 1 });
    }, cardRef);

    const handleResize = () => {
      if (contentRef.current && drawerRef.current) {
        if (!cardRef.current?.matches(':hover')) {
          gsap.set(drawerRef.current, { y: contentRef.current.offsetHeight });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    gsap.to(drawerRef.current, {
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    gsap.to(iconRef.current, {
      y: -24,
      scale: 1.08,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.3,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      delay: 0.08,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.14,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(badgeRef.current, { color: '#2563eb', duration: 0.3, overwrite: 'auto' });
  };

  const handleMouseLeave = () => {
    const contentH = contentRef.current ? contentRef.current.offsetHeight : 120;

    gsap.to(drawerRef.current, {
      y: contentH,
      duration: 0.45,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });

    gsap.to(iconRef.current, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to(glowRef.current, {
      opacity: 0.8,
      scale: 1,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to([titleRef.current, descRef.current], {
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
    });

    gsap.to(badgeRef.current, { color: '#0f1115', duration: 0.3, overwrite: 'auto' });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col h-[340px] sm:h-[370px] rounded-[20px] bg-[#0c0e14] border border-blue-400/50 hover:border-blue-300 overflow-hidden shadow-[0_0_45px_rgba(59,130,246,0.35),0_20px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_0_75px_rgba(59,130,246,0.65),0_25px_50px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow] duration-500 isolate transform-gpu select-none"
    >
      {/* Верхняя неоновая линия-блик */}
      <div className="pointer-events-none absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-300 to-transparent z-10" />

      {/* Фоновый блок: 3D иконка логотипа на глубоком сапфировом градиенте */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#14224c] via-[#0c1228] to-[#070912] flex items-center justify-center p-6 pb-12">
        {/* Фоновое радиальное свечение */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.45)_0%,rgba(37,99,235,0.2)_45%,transparent_70%)]"
        />
        
        {/* 3D Иконка логотипа компании */}
        <img
          ref={iconRef}
          src="/images/card-company-logo.png"
          alt="IRON SECURITY Logo"
          className="standard-3d-icon relative z-10 w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Выдвижная панель: в спокойном состоянии виден таб с логотипом/названием, при наведении выезжает описание и кнопка */}
      <div
        ref={drawerRef}
        className="absolute bottom-0 left-0 right-0 z-20 will-change-transform"
      >
        {/* Фирменный симметричный центрированный SVG-таб */}
        <div className="relative w-full h-11 pointer-events-none">
          <svg
            viewBox="0 0 320 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M 0 44 L 52 44 Q 68 44 76 30 L 88 10 Q 94 0 108 0 L 212 0 Q 226 0 232 10 L 244 30 Q 252 44 268 44 L 320 44 L 320 44 L 0 44 Z"
              fill="#f2f4f7"
            />
          </svg>

          {/* Лейбл по центру внутри таба */}
          <div className="absolute inset-0 flex items-center justify-center gap-1.5 pb-0.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span
              ref={badgeRef}
              className="font-tactical text-xs font-black text-[#0f1115] tracking-wider uppercase"
            >
              IRON SQUAD
            </span>
          </div>
        </div>

        {/* Нижняя часть карточки: Заголовок, описание и кнопка заказа */}
        <div ref={contentRef} className="px-5 pb-5 pt-2 bg-[#f2f4f7]">
          <h3
            ref={titleRef}
            className="font-['PP_Neue_Montreal'] font-bold text-base sm:text-lg text-[#0f1115] mb-1.5 tracking-tight"
          >
            Елітний стандарт
          </h3>
          <p
            ref={descRef}
            className="font-sans text-xs text-[#0f1115]/75 leading-relaxed mb-3"
          >
            100% матеріальна та юридична відповідальність за договором.
          </p>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOrderClick}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="w-full justify-center text-xs py-2"
          >
            Підібрати охорону
          </Button>
        </div>
      </div>
    </article>
  );
};

export const Standards: React.FC<StandardsProps> = ({ onOrderClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerTagRef = useRef<HTMLSpanElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // ── Fast, Smooth, One-Time Awwwards Entrance Animation (Optimized) ──
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true, // Срабатывает ровно 1 раз для максимальной производительности
          toggleActions: 'play none none none',
        },
      });

      // 1. Шапка: быстрое и плавное проявление заголовков
      tl.from([headerTagRef.current, headerTitleRef.current, headerDescRef.current], {
        opacity: 0,
        y: 24,
        filter: 'blur(8px)',
        stagger: 0.08,
        duration: 0.55,
        ease: 'power3.out',
      })
      // 2. Быстрый и плавный орбитальный сход 5 карточек (Diamond X-Pattern)
      .from(card1Ref.current, {
        x: -80,
        y: -50,
        rotation: -4,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '-=0.35')
      .from(card2Ref.current, {
        x: 80,
        y: -50,
        rotation: 4,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '<+=0.06')
      .from(centerRef.current, {
        scale: 0.76,
        y: 35,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.7,
        ease: 'power3.out',
      }, '<+=0.06')
      .from(card3Ref.current, {
        x: -80,
        y: 50,
        rotation: 3,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '<+=0.06')
      .from(card4Ref.current, {
        x: 80,
        y: 50,
        rotation: -3,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '<+=0.06')
      // 3. Мгновенная посадка 3D-иконок
      .from('.standard-3d-icon', {
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.2)',
      }, '-=0.5');
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="standards"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div
        ref={containerRef}
        className="relative w-full rounded-[20px] bg-black border border-white/10 overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-16"
      >
        
        {/* Фоновые сапфировые градиентные свечения */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-700/10 blur-[120px]" />

        {/* ── Шапка секции ─────────────────────────────────────────────── */}
        <header className="relative z-10 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span
              ref={headerTagRef}
              className="mb-2 block font-mono text-xs font-bold tracking-widest text-blue-400 uppercase sm:text-sm will-change-transform"
            >
              03 // КАДРОВИЙ СТАНДАРТ
            </span>
            <h2
              ref={headerTitleRef}
              className="font-sans text-2xl font-normal tracking-tight text-white uppercase sm:text-3xl md:text-4xl will-change-transform"
            >
              ЕТАЛОННИЙ ВІДБІР ТА{' '}
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#93c5fd] bg-clip-text text-transparent font-medium">
                ПІДГОТОВКА
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p
              ref={headerDescRef}
              className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed tracking-tight will-change-transform"
            >
              Ми не наймаємо випадкових людей. Кожен боєць IRON SECURITY проходить 4 рівні кваліфікаційного відбору та регулярні атестації.
            </p>
          </div>
        </header>

        {/* ── Сетка 3x3 по схеме (Frame 1, Frame 2, Frame 6, Frame 7, Frame 8) ── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center max-w-6xl mx-auto mb-12 sm:mb-16">
          
          {/* Frame 1: Верх-Лево (01 // Спортивний склад) */}
          <div ref={card1Ref} className="lg:col-start-1 lg:row-start-1 will-change-transform">
            <StandardCardItem item={STANDARDS_DATA[0]} />
          </div>

          {/* Frame 2: Верх-Право (02 // Вогнева підготовка) */}
          <div ref={card2Ref} className="lg:col-start-3 lg:row-start-1 will-change-transform">
            <StandardCardItem item={STANDARDS_DATA[1]} />
          </div>

          {/* Frame 6: Центр (Центральная карточка с 3D-логотипом IRON SECURITY) */}
          <div ref={centerRef} className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 will-change-transform">
            <CenterpieceCardItem onOrderClick={onOrderClick} />
          </div>

          {/* Frame 7: Низ-Лево (03 // Тактична медицина) */}
          <div ref={card3Ref} className="lg:col-start-1 lg:row-start-3 will-change-transform">
            <StandardCardItem item={STANDARDS_DATA[2]} />
          </div>

          {/* Frame 8: Низ-Право (04 // Бекграунд-чек & NDA) */}
          <div ref={card4Ref} className="lg:col-start-3 lg:row-start-3 will-change-transform">
            <StandardCardItem item={STANDARDS_DATA[3]} />
          </div>

        </div>

        {/* ── Подвал секции ────────────────────────────────────────────── */}
        <footer className="relative z-10 mt-12 sm:mt-16 pt-8 border-t border-white/10 flex items-center justify-center text-center w-full">
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            ЛІЦЕНЗІЯ МВС УКРАЇНИ // КИЇВ 24/7
          </span>
        </footer>

      </div>
    </section>
  );
};
