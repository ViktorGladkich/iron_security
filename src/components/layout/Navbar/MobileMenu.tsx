import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { companyInfo } from '../../../data/companyInfo';
import { prefersReducedMotion } from '../../../lib/media';
import { NAV_ITEMS, smoothScrollToSection } from './nav.constants';

interface MobileMenuProps {
  onOrderClick?: () => void;
  activeSection?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(() => prefersReducedMotion());

  // Плавное появление мобильного бара синхронно с интро Hero
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Блокировка скролла страницы при открытом мобильном меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    smoothScrollToSection(e, href);
  };

  return (
    <div className="lg:hidden">
      {/* ── Затемняющий фон при открытом меню ─────────────────────────── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[80] bg-black/75 backdrop-blur-md transition-opacity duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* ── Единый фиксированный контейнер с гарантированным зазором (gap) ── */}
      <div className="fixed top-6 inset-x-6 sm:inset-x-8 sm:max-w-[360px] z-[90] flex flex-col gap-3.5 select-none pointer-events-none">
        
        {/* ── 1. Верхняя панель (с плавной анимацией появления при загрузке) ── */}
        <div
          style={{
            transition:
              'transform 900ms cubic-bezier(0.19, 1, 0.22, 1), opacity 750ms ease',
            transform: isMounted ? 'translateY(0)' : 'translateY(-24px)',
            opacity: isMounted ? 1 : 0,
          }}
          className="pointer-events-auto relative w-full rounded-[20px] bg-gradient-to-r from-[#080e1c]/95 via-[#0c1834]/95 to-[#0e1424]/95 shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22),0_0_25px_rgba(37,99,235,0.16)] backdrop-blur-3xl p-3 sm:p-3.5 flex items-center justify-between overflow-hidden will-change-transform"
        >
          {/* Блик по верхней грани */}
          <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

          {/* Логотип */}
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-1.5 py-0.5 group cursor-pointer"
          >
            <img
              src="/images/iron_shield_icon.png"
              alt="IRON SECURITY"
              width={137}
              height={160}
              className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            />
            <span className="font-display font-bold text-xs tracking-wider text-white uppercase leading-none">
              IRON SECURITY
            </span>
          </a>

          {/* Кнопка с кинетической трансформацией (2 длинные линии, без фона, бордера и тени) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isOpen}
            className="group relative w-11 h-10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform shrink-0"
          >
            {/* Кинетические 2 удлинённые линии: шелковистый морфинг в крестик */}
            <div className="relative w-8 h-3.5 flex flex-col justify-between items-center pointer-events-none">
              <span
                className={`block h-[2px] w-8 bg-white rounded-full transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] transform origin-center ${
                  isOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-8 bg-white rounded-full transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] transform origin-center ${
                  isOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* ── 2. Выпадающая панель меню (чистый Tailwind CSS, без бордеров) ── */}
        <div
          style={{
            clipPath: isOpen
              ? 'inset(0% 0% 0% 0% round 24px)'
              : 'inset(0% 0% 100% 0% round 24px)',
            WebkitClipPath: isOpen
              ? 'inset(0% 0% 0% 0% round 24px)'
              : 'inset(0% 0% 100% 0% round 24px)',
            transition:
              'clip-path 850ms cubic-bezier(0.19, 1, 0.22, 1), -webkit-clip-path 850ms cubic-bezier(0.19, 1, 0.22, 1), opacity 600ms ease, transform 850ms cubic-bezier(0.19, 1, 0.22, 1)',
            transform: isOpen ? 'translateY(0)' : 'translateY(-14px)',
            opacity: isOpen ? 1 : 0,
          }}
          className={`pointer-events-auto relative w-full ${
            isOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <div className="relative w-full rounded-[24px] bg-gradient-to-r from-[#080e1c]/95 via-[#0c1834]/95 to-[#0e1424]/95 shadow-[0_30px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.22),0_0_30px_rgba(37,99,235,0.16)] backdrop-blur-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
            {/* Блик по верхней грани */}
            <div className="pointer-events-none absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />

            {/* Список разделов */}
            <nav className="relative z-10 flex flex-col gap-2.5 py-1">
              {NAV_ITEMS.map((link, idx) => (
                <div key={link.id} className="overflow-hidden py-0.5">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{
                      transitionDelay: isOpen ? `${120 + idx * 45}ms` : '0ms',
                    }}
                    className={`group block cursor-pointer transition-all duration-750 ease-[cubic-bezier(0.19,1,0.22,1)] transform ${
                      isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    } active:translate-x-1.5`}
                  >
                    <span className="block font-display text-[28px] xs:text-[32px] sm:text-[36px] font-medium tracking-tight text-white group-hover:text-sky-300 transition-colors leading-[92%]">
                      {link.label}
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            {/* Нижняя юридическая информация */}
            <div
              style={{
                transitionDelay: isOpen ? '400ms' : '0ms',
              }}
              className={`relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-col gap-1.5 text-[13px] text-white/70 font-sans transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <a
                href={`tel:${companyInfo.phone.replace(/[^+\d]/g, '')}`}
                className="hover:text-white transition-colors font-mono text-xs mb-1 text-white font-medium flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{companyInfo.phoneDisplay} • 24/7</span>
              </a>
              <span className="hover:text-white transition-colors cursor-pointer text-xs text-white/60">
                Terms & Conditions
              </span>
              <span className="hover:text-white transition-colors cursor-pointer text-xs text-white/60">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
