import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../common/Button';

interface CenterpieceCardItemProps {
  onOrderClick?: () => void;
}

export const CenterpieceCardItem: React.FC<CenterpieceCardItemProps> = ({ onOrderClick }) => {
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

  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    if (isOpen) {
      handleMouseLeave();
      setIsOpen(false);
    } else {
      handleMouseEnter();
      setIsOpen(true);
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggle}
      className="group relative flex flex-col h-[320px] sm:h-[370px] rounded-[20px] bg-[#0c0e14] border border-blue-400/50 hover:border-blue-300 overflow-hidden shadow-[0_0_45px_rgba(59,130,246,0.35),0_20px_45px_rgba(0,0,0,0.6)] hover:shadow-[0_0_75px_rgba(59,130,246,0.65),0_25px_50px_rgba(0,0,0,0.85)] transition-[border-color,box-shadow] duration-500 isolate transform-gpu select-none cursor-pointer"
    >
      {/* Верхняя неоновая линия-блик */}
      <div className="pointer-events-none absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-300 to-transparent z-10" />

      {/* Фоновый блок */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#14224c] via-[#0c1228] to-[#070912] flex items-center justify-center p-6 pb-12">
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.45)_0%,rgba(37,99,235,0.2)_45%,transparent_70%)]"
        />

        <img
          ref={iconRef}
          src="/images/card-company-logo.png"
          alt="IRON SECURITY Logo"
          className="standard-3d-icon relative z-10 w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Выдвижная панель */}
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

        {/* Нижняя часть карточки */}
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
