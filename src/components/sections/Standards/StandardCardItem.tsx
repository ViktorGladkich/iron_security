import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { StandardItem } from '../../../data/standards';

interface StandardCardItemProps {
  item: StandardItem;
}

export const StandardCardItem: React.FC<StandardCardItemProps> = ({ item }) => {
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

    // 1. Шторка плавно съезжает вниз
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
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35)_0%,rgba(37,99,235,0.15)_45%,transparent_70%)]"
        />

        <img
          ref={iconRef}
          src={item.image}
          alt={item.title}
          className="standard-3d-icon relative z-10 w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Выдвижная панель */}
      <div
        ref={drawerRef}
        className="absolute bottom-0 left-0 right-0 z-20 will-change-transform pointer-events-none"
      >
        {/* Фирменный ступенчатый SVG-таб с номером карточки */}
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

          <div className="absolute top-0 left-0 h-11 w-[125px] flex items-center pl-5">
            <span
              ref={numberRef}
              className="font-tactical text-2xl font-black text-[#0f1115] tracking-tight"
            >
              {item.number}
            </span>
          </div>
        </div>

        {/* Заголовок и описание */}
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
