import React from 'react';
import { Phone } from 'lucide-react';
import { companyInfo } from '../../../data/companyInfo';
import { Button } from '../../common/Button';
import { LetterRoller } from '../../common/LetterRoller';
import { NAV_ITEMS, smoothScrollToSection } from './nav.constants';

interface DesktopNavbarProps {
  isScrolled: boolean;
  activeSection: string;
  onOrderClick?: () => void;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  isScrolled,
  activeSection,
  onOrderClick,
}) => {
  return (
    <header
      className={`hidden lg:block fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-500 py-4 px-8 ${
        isScrolled
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
    >
      {/* Единая премиальная титаново-сапфировая рамка (чистый Tailwind CSS) */}
      <div className="relative max-w-7xl mx-auto h-[54px] flex items-center justify-between pointer-events-auto bg-gradient-to-r from-[#080e1c]/95 via-[#0c1834]/95 to-[#0e1424]/95 border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22),0_0_25px_rgba(37,99,235,0.16)] backdrop-blur-3xl px-6 rounded-[16px] overflow-hidden">
        {/* Верхний световой блик по бокам */}
        <div className="pointer-events-none absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10" />

        {/* 1. Логотип слева */}
        <a
          href="#"
          className="flex items-center gap-2 group cursor-pointer select-none shrink-0 z-20"
        >
          <img
            src="/images/iron_shield_icon.png"
            alt="IRON SECURITY"
            width={137}
            height={160}
            className="h-7.5 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display font-bold text-xs tracking-wider text-white group-hover:text-sky-200 transition-colors leading-none uppercase">
            IRON SECURITY
          </span>
        </a>

        {/* 2. Центральный SVG-вырез — прижат строго к верхнему краю без полос */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] xl:w-[580px] h-[40px] select-none z-10 origin-top">
          <svg
            viewBox="0 0 620 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M 0 0 L 620 0 Q 598 0 590 14 L 568 46 Q 560 58 546 58 L 74 58 Q 60 58 52 46 L 30 14 Q 22 0 0 0 Z"
              fill="#f2f4f7"
            />
          </svg>

          <nav className="absolute inset-0 flex items-center justify-center px-8 xl:px-12 gap-3.5 xl:gap-5.5 text-[11px] xl:text-xs font-medium uppercase tracking-wider pb-0.5 select-none">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => smoothScrollToSection(e, item.href)}
                  className="roller-host relative flex items-center justify-center cursor-pointer whitespace-nowrap"
                >
                  <LetterRoller
                    text={item.label}
                    restClassName={
                      isActive
                        ? 'text-blue-700 font-bold'
                        : 'text-[#0f1115]/85 font-medium'
                    }
                    hoverClassName="text-blue-700 font-bold"
                  />
                </a>
              );
            })}
          </nav>
        </div>

        {/* 3. Контакты и кнопка "Замовити" справа */}
        <div className="flex items-center gap-3 shrink-0 z-20">
          {/* Телефон с белой иконкой */}
          <a
            href={`tel:${companyInfo.phone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2 text-xs font-mono font-medium text-white hover:text-sky-200 transition-colors px-2.5 py-1.5 rounded-[10px] hover:bg-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{companyInfo.phoneDisplay}</span>
          </a>

          {/* Тактический компонент Button */}
          <Button
            variant="primary"
            size="xs"
            chamferSize={8}
            onClick={onOrderClick}
            className="h-[34px] px-4.5 text-[11px]"
          >
            Замовити
          </Button>
        </div>
      </div>
    </header>
  );
};
