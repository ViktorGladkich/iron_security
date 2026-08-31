import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Header } from '../layout/Header';

interface HeroProps {
  onOrderClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const operativeRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Высокопроизводительный параллакс без дерганий и конфликтов через gsap.quickTo
  const xOperative = useRef<((value: number) => void) | null>(null);
  const yOperative = useRef<((value: number) => void) | null>(null);
  const rotYOperative = useRef<((value: number) => void) | null>(null);
  const xTitle = useRef<((value: number) => void) | null>(null);
  const yTitle = useRef<((value: number) => void) | null>(null);
  const xGlow = useRef<((value: number) => void) | null>(null);
  const yGlow = useRef<((value: number) => void) | null>(null);

  useGSAP(
    () => {
      if (operativeRef.current) {
        xOperative.current = gsap.quickTo(operativeRef.current, 'x', { duration: 0.8, ease: 'power2.out' });
        yOperative.current = gsap.quickTo(operativeRef.current, 'y', { duration: 0.8, ease: 'power2.out' });
        rotYOperative.current = gsap.quickTo(operativeRef.current, 'rotationY', { duration: 0.8, ease: 'power2.out' });
      }
      if (titleRef.current) {
        xTitle.current = gsap.quickTo(titleRef.current, 'x', { duration: 1.1, ease: 'power2.out' });
        yTitle.current = gsap.quickTo(titleRef.current, 'y', { duration: 1.1, ease: 'power2.out' });
      }
      if (glowRef.current) {
        xGlow.current = gsap.quickTo(glowRef.current, 'x', { duration: 1.3, ease: 'power2.out' });
        yGlow.current = gsap.quickTo(glowRef.current, 'y', { duration: 1.3, ease: 'power2.out' });
      }
    },
    { scope: heroRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Плавное обновление без создания сотен конфликтующих твинов
    xOperative.current?.(x * 30);
    yOperative.current?.(y * 18);
    rotYOperative.current?.(x * 6);

    xTitle.current?.(-x * 20);
    yTitle.current?.(-y * 12);

    xGlow.current?.(x * 50);
    yGlow.current?.(y * 30);
  };

  const handleMouseLeave = () => {
    xOperative.current?.(0);
    yOperative.current?.(0);
    rotYOperative.current?.(0);

    xTitle.current?.(0);
    yTitle.current?.(0);

    xGlow.current?.(0);
    yGlow.current?.(0);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Начальные стили для избежания FOUC
      gsap.set('.hero-frame-container', { transformPerspective: 1200 });

      // 1. Появление фрейма: кинематографичное раскрытие с легким 3D-наклоном
      tl.fromTo(
        '.hero-frame-container',
        {
          scale: 0.88,
          opacity: 0,
          rotateX: 6,
          filter: 'blur(16px)',
        },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'expo.out',
        }
      )
        // 2. Вспышка синего кобальтового света из центра фрейма
        .fromTo(
          '.hero-sapphire-glow',
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 0.5, duration: 1.6, ease: 'power2.out' },
          '-=1.2'
        )
        // 3. Вылет гигантских букв IRON по одной из тумана с легкой перспективой
        .fromTo(
          '.hero-giant-title span',
          {
            y: 120,
            opacity: 0,
            scale: 0.8,
            filter: 'blur(12px)',
          },
          {
            y: 0,
            opacity: 0.42,
            scale: 1,
            filter: 'blur(0px)',
            stagger: 0.08,
            duration: 1.3,
            ease: 'power4.out',
            clearProps: 'transform',
          },
          '-=1.2'
        )
        // 4. Охранник возвышается снизу (Dramatic Hero Rise)
        .fromTo(
          '.hero-character-img',
          {
            y: 160,
            scale: 0.82,
            opacity: 0,
            filter: 'brightness(0.3) contrast(1.4)',
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: 'brightness(1) contrast(1.05)',
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=1.1'
        )
        // 5. Врезка верхнего SVG-выреза меню (Header Cutout) - скользит сверху вниз как замок
        .fromTo(
          '.header-cutout-nav',
          {
            y: -70,
            opacity: 0,
            scaleY: 0.4,
          },
          {
            y: 0,
            opacity: 1,
            scaleY: 1,
            duration: 1.0,
            ease: 'expo.out',
          },
          '-=1.0'
        )
        // 6. Выезд логотипа и телефонного блока Header
        .fromTo(
          ['.header-logo-elem', '.header-right-elem'],
          {
            y: -25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        // 7. Врезка правого нижнего SVG-выреза со статистикой (въезжает снизу-справа)
        .fromTo(
          '.hero-bottom-stats',
          {
            x: 80,
            y: 40,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power4.out',
          },
          '-=0.9'
        )
        // 8. Появление цифр статистики с небольшим отскоком
        .fromTo(
          '.hero-stat-item',
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        )
        // 9. Левый блок оффера (заголовок, описание, кнопка)
        .fromTo(
          ['.hero-offer-title', '.hero-offer-desc', '.hero-offer-btn'],
          {
            x: -40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            stagger: 0.09,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'transform',
          },
          '-=0.8'
        )
        // 10. Правая стеклянная карточка
        .fromTo(
          '.hero-badge-item',
          {
            scale: 0.7,
            opacity: 0,
            x: 30,
          },
          {
            scale: 1,
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
            clearProps: 'transform',
          },
          '-=0.7'
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full p-[15px] flex items-center justify-center overflow-hidden"
    >
      {/* Главный контейнер Hero: идеально вписывается в экран ноутбука без скролла */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hero-frame-container relative w-full h-[calc(100svh-30px)] max-h-[860px] min-h-[540px] rounded-[20px] overflow-hidden bg-[#04060b] select-none cursor-default will-change-transform"
        style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
      >
        
        {/* ========================================================================= */}
        {/* 1. ЖИВОЙ СИНИЙ ГРАДИЕНТ УРОВНЯ AWWWARDS, ДВИЖУЩИЙСЯ К ПРАВОМУ НИЖНЕМУ УГЛУ */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Базовый глубокий ночной сапфир */}
          <div className="absolute inset-0 bg-[#030611]" />

          {/* Первичный фоновый градиент с вектором в нижний правый угол */}
          <div className="hero-living-gradient-base absolute inset-[-30%] bg-[radial-gradient(ellipse_75%_55%_at_65%_65%,#0e326e_0%,#081d45_35%,#030712_80%)] opacity-80" />

          {/* Живой направленный синий луч/поток, текущий из центра к правой карточке */}
          <div className="hero-living-stream absolute top-[30%] left-[20%] w-[120%] h-[100%] bg-[radial-gradient(ellipse_60%_40%_at_70%_75%,rgba(37,99,235,0.45)_0%,rgba(2,132,199,0.25)_35%,transparent_70%)] blur-[80px] mix-blend-screen" />

          {/* Пульсирующее свечение прямо под карточкой и SVG-вырезом в правом нижнем углу */}
          <div className="hero-corner-glow absolute -bottom-20 -right-20 w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,#1d4ed8_0%,#0284c7_30%,#0f172a_65%,transparent_100%)] opacity-55 blur-[85px] mix-blend-screen" />

          {/* Динамический сине-кобальтовый ореол подсветки за персонажем */}
          <div
            ref={glowRef}
            className="hero-sapphire-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] sm:h-[550px] bg-[radial-gradient(circle_at_center,#1e40af_0%,#172554_45%,transparent_80%)] opacity-40 blur-[90px] rounded-full mix-blend-screen"
          />

          {/* Тонкая сетка / атмосфера виньетки */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-[#020409]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020409]/85 via-transparent to-[#020409]/85" />
        </div>

        {/* ========================================================================= */}
        {/* 2. HEADER КОМПОНЕНТ С SVG-ВЫРЕЗОМ, ЛОГОТИПОМ И МЕНЮ ВЕРХУ ФРЕЙМА        */}
        {/* ========================================================================= */}
        <Header onOrderClick={onOrderClick} />

        {/* ========================================================================= */}
        {/* 3. ГИГАНТСКИЙ ТАКТИЧЕСКИЙ ЗАГОЛОВОК НА ФОНЕ ("IRON")                      */}
        {/*    Буквы расставлены по всей ширине как 'ZODIAC' на референсе             */}
        {/* ========================================================================= */}
        <div
          ref={titleRef}
          className="absolute top-[8%] sm:top-[10%] inset-x-0 z-10 px-4 sm:px-8 pointer-events-none select-none"
        >
          <div className="hero-giant-title w-full grid grid-cols-4 text-center items-center text-white/40 font-tactical font-black leading-none text-[52px] sm:text-[90px] md:text-[120px] lg:text-[150px] xl:text-[170px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]">
            <span className="text-left pl-1 sm:pl-2">I</span>
            <span className="text-center -ml-4 sm:-ml-8">R</span>
            <span className="text-center ml-4 sm:ml-8">O</span>
            <span className="text-right pr-1 sm:pr-2">N</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. ОПЕРАТИВНИК IRON SECURITY С ПАРАЛЛАКС-ЭФФЕКТОМ (human_hero_security)   */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-15 flex items-end justify-center pointer-events-none">
          <img
            ref={operativeRef}
            src="/images/human_hero_security_cropped.png"
            alt="IRON SECURITY Operative"
            className="hero-character-img h-[84%] sm:h-[90%] max-h-[750px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter contrast-105 brightness-100"
          />
        </div>

        {/* ========================================================================= */}
        {/* 5. ЛЕВЫЙ БЛОК ТЕКСТА И КНОПКА (ВЫРОВНЕН ПО ВЫСОТЕ С КАРТОЧКОЙ СПРАВА)     */}
        {/* ========================================================================= */}
        <div className="hero-offer-content absolute left-5 sm:left-8 bottom-28 sm:bottom-32 z-20 max-w-[320px] sm:max-w-[340px]">
          {/* Заголовок оффера с ключевыми словами для SEO Києва */}
          <h1 className="hero-offer-title font-['PP_Neue_Montreal'] font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight uppercase leading-[1.05] mb-2 sm:mb-3">
            ПРОФЕСІЙНА <br />
            <span className="bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent">
              ОХОРОНА
            </span> У КИЄВІ
          </h1>

          <p className="hero-offer-desc text-[11px] sm:text-xs md:text-[13px] text-zinc-300 font-sans leading-relaxed mb-4 sm:mb-5">
            Ліцензована безпека найвищого рангу: персональний захист, супровід та охорона бізнесу. Екіпажі спортсменів з навичками поводження зі зброєю. Прибуття до 10 хвилин.
          </p>

          {/* Кнопка: тактический dual-chamfer с динамическим заполнением цветом и посимвольным роллером */}
          <button
            onClick={onOrderClick}
            style={{
              clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
              WebkitClipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
            }}
            className="hero-offer-btn group relative flex items-center justify-center w-[215px] h-[48px] px-6 bg-[#f2f4f7] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] transition-shadow duration-300 cursor-pointer pointer-events-auto select-none"
          >
            {/* 1. Анимированный слой заполнения глубоким сапфировым градиентом фона Hero */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] pointer-events-none" />

            {/* 2. Посимвольный каскадный роллер текста (Awwwards Staggered Letter Wave) */}
            <span className="relative z-10 flex items-center justify-center font-['PP_Neue_Montreal'] font-bold text-[11px] sm:text-xs uppercase tracking-wider">
              {/* Невидимый текст для сохранения геометрии */}
              <span className="invisible whitespace-pre">ЗАМОВИТИ ОХОРОНУ</span>

              {/* Буквы с последовательным смещением по времени */}
              <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
                {'ЗАМОВИТИ ОХОРОНУ'.split('').map((char, index) => (
                  <span key={index} className="relative inline-block overflow-hidden h-[1.3em]">
                    {/* 1. Исходная буква уезжает вверх */}
                    <span
                      className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full text-[#0f1115]"
                      style={{ transitionDelay: `${index * 14}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                    {/* 2. Новая буква выезжает снизу в чистом белом цвете на синем фоне */}
                    <span
                      className="absolute inset-0 inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-y-full group-hover:translate-y-0 text-white font-bold"
                      style={{ transitionDelay: `${index * 14}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  </span>
                ))}
              </span>
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 6. ПРАВАЯ КАРТОЧКА: СИТУАЦИОННЫЙ ЦЕНТР В МОНОХРОМНОМ ГЛАССМОРФИЗМЕ         */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex hero-badge-item group absolute right-6 sm:right-8 bottom-28 sm:bottom-32 z-20 w-[365px] sm:w-[380px] h-[170px] pointer-events-auto transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.02]">
          {/* Фоновая SVG-форма со скошенным вырезом и монохромным матовым стеклом */}
          <div className="absolute inset-0 z-0 backdrop-blur-2xl">
            <svg
              viewBox="0 0 380 170"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Монохромный градиент для тонкого стеклянного бордера с эффектом преломления */}
                <linearGradient id="glassBorder" x1="0" y1="0" x2="380" y2="170" gradientUnits="userSpaceOnUse">
                  <stop stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="0.3" stopColor="rgba(255, 255, 255, 0.15)" />
                  <stop offset="0.7" stopColor="rgba(255, 255, 255, 0.05)" />
                  <stop offset="1" stopColor="rgba(255, 255, 255, 0.35)" />
                </linearGradient>

                {/* Глубокое многослойное матовое стекло */}
                <linearGradient id="glassBg" x1="0" y1="0" x2="0" y2="170" gradientUnits="userSpaceOnUse">
                  <stop stopColor="rgba(255, 255, 255, 0.12)" />
                  <stop offset="0.4" stopColor="rgba(15, 20, 30, 0.55)" />
                  <stop offset="1" stopColor="rgba(4, 6, 10, 0.85)" />
                </linearGradient>

                {/* Световой блик по верхней грани стекла */}
                <linearGradient id="topSheen" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="transparent" />
                  <stop offset="0.5" stopColor="rgba(255, 255, 255, 0.4)" />
                  <stop offset="1" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Полупрозрачная подложка со скошенным вырезом снизу карточки */}
              <path
                d="M 16 0 
                   L 364 0 
                   A 16 16 0 0 1 380 16 
                   L 380 100 
                   Q 380 114 368 126 
                   L 326 160 
                   Q 314 170 298 170 
                   L 16 170 
                   A 16 16 0 0 1 0 154 
                   L 0 16 
                   A 16 16 0 0 1 16 0 Z"
                fill="url(#glassBg)"
                stroke="url(#glassBorder)"
                strokeWidth="1.2"
              />

              {/* Верхняя светящаяся линия скола стекла */}
              <line x1="24" y1="1" x2="356" y2="1" stroke="url(#topSheen)" strokeWidth="1" />
            </svg>
          </div>

          {/* Внутреннее мягкое свечение при наведении */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.08] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Контент карточки с комфортными отступами со всех сторон и выравниванием по верхнему краю */}
          <div className="relative z-10 w-full h-full p-5 sm:p-6 flex items-start justify-between gap-4">
            {/* Левая текстовая колонка */}
            <div className="flex-1 pr-1 flex flex-col justify-between h-full">
              <div>
                <div className="mb-2">
                  <h3 className="font-['Orbitron'] font-bold text-xs sm:text-[13px] text-white tracking-wider uppercase leading-none">
                    ВІДЕОМОНІТОРИНГ 24/7
                  </h3>
                </div>
                <p className="text-[11px] sm:text-[11.5px] text-zinc-300 font-sans leading-relaxed line-clamp-3">
                  Безперервний відеоконтроль об'єктів у реальному часі, інтелектуальне виявлення загроз та миттєвий виїзд екіпажу.
                </p>
              </div>

              {/* Кнопка в карточке: тактический dual-chamfer в едином цвете с Hero (светлый титан, без бордера) */}
              <button
                onClick={onOrderClick}
                style={{
                  clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)',
                  WebkitClipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)',
                }}
                className="group/cardbtn relative flex items-center justify-center w-[180px] h-[38px] px-4 bg-[#f2f4f7] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.45)] transition-shadow duration-300 cursor-pointer pointer-events-auto select-none mt-2"
              >
                {/* 1. Анимированный слой наполнения глубоким сапфировым градиентом фона Hero */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] -translate-x-full group-hover/cardbtn:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] pointer-events-none" />

                {/* 2. Каскадный посимвольный роллер текста */}
                <span className="relative z-10 flex items-center justify-center font-['PP_Neue_Montreal'] font-bold text-[10px] uppercase tracking-wider">
                  <span className="invisible whitespace-pre">ЦЕНТРАЛЬНИЙ ПУЛЬТ</span>
                  <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
                    {'ЦЕНТРАЛЬНИЙ ПУЛЬТ'.split('').map((char, index) => (
                      <span key={index} className="relative inline-block overflow-hidden h-[1.3em]">
                        <span
                          className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/cardbtn:-translate-y-full text-[#0f1115]"
                          style={{ transitionDelay: `${index * 14}ms` }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                        <span
                          className="absolute inset-0 inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-y-full group-hover/cardbtn:translate-y-0 text-white font-bold"
                          style={{ transitionDelay: `${index * 14}ms` }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </div>

            {/* Правая часть: изображение, начинающееся ровно на уровне с заголовком */}
            <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/25 shrink-0 bg-black/60 shadow-[0_10px_25px_rgba(0,0,0,0.6)] group-hover:border-white/40 transition-colors duration-300 mr-1 mt-0">
              <img
                src="/images/camera_guard.png"
                alt="Оператор відеоспостереження IRON SECURITY"
                className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. SVG PATH - ПРАВЫЙ НИЖНИЙ ВЫРЕЗ СО СТАТИСТИКОЙ                           */}
        {/*    Плавные скругленные углы скоса и бесшовное прилегание к фрейму          */}
        {/* ========================================================================= */}
        <div className="hero-bottom-stats absolute bottom-0 right-0 z-30 w-[430px] sm:w-[540px] h-[82px] sm:h-[90px]">
          <svg
            viewBox="0 0 540 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Скошенный угол: плавное скругление внутреннего верхнего угла R=24px и нижнего перехода */}
            <path
              d="M 540 0 
                 L 110 0 
                 Q 85 0 70 20 
                 L 24 74 
                 Q 10 90 0 90 
                 L 540 90 
                 Z"
              fill="#f2f4f7"
            />
          </svg>
          {/* Деликатная вогнутая дуга для скругления самого темного внутреннего угла над вырезом */}
          <div className="absolute top-[-24px] right-0 w-[24px] h-[24px] pointer-events-none overflow-hidden">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M24 0 V24 H0 A24 24 0 0 0 24 0 Z" fill="#f2f4f7" />
            </svg>
          </div>

          {/* 3 Метрики внутри выреза с достаточным запасом места */}
          <div className="absolute inset-0 flex items-center justify-end pr-7 sm:pr-12 gap-6 sm:gap-9 text-black">
            <div className="hero-stat-item text-left shrink-0">
              <div className="font-['Orbitron'] font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-black">
                100%
              </div>
              <div className="font-['PP_Neue_Montreal'] text-[10px] text-zinc-600 uppercase tracking-wider mt-1 whitespace-nowrap">
                спортсмени
              </div>
            </div>

            <div className="w-[1px] h-7 bg-zinc-300 shrink-0" />

            <div className="hero-stat-item text-left shrink-0">
              <div className="font-['Orbitron'] font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-black">
                A+
              </div>
              <div className="font-['PP_Neue_Montreal'] text-[10px] text-zinc-600 uppercase tracking-wider mt-1 whitespace-nowrap">
                збройний клас
              </div>
            </div>

            <div className="w-[1px] h-7 bg-zinc-300 shrink-0" />

            <div className="hero-stat-item text-left shrink-0">
              <div className="font-['Orbitron'] font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-black">
                &lt;10 ХВ
              </div>
              <div className="font-['PP_Neue_Montreal'] text-[10px] text-zinc-600 uppercase tracking-wider mt-1 whitespace-nowrap">
                прибуття в києві
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
