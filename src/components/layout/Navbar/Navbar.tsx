import React, { useState, useEffect } from 'react';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileMenu } from './MobileMenu';
import { NAV_ITEMS } from './nav.constants';

interface NavbarProps {
  onOrderClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Точное отслеживание скролла (ScrollSpy) с учётом sticky/pinned секций
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      const viewportThreshold = window.innerHeight * 0.4;
      let currentActive = '';

      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const section = document.getElementById(NAV_ITEMS[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Если верх секции вошел в верхние 40% экрана, а низ ещё виден в кадре
          if (rect.top <= viewportThreshold && rect.bottom > 80) {
            currentActive = NAV_ITEMS[i].id;
          }
        }
      }

      // Если находимся в самом верху (Hero)
      if (scrollY < 180) {
        currentActive = '';
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Мобильное меню (< 1024px) */}
      <MobileMenu onOrderClick={onOrderClick} activeSection={activeSection} />

      {/* Десктопное плавающее меню при скролле (≥ 1024px) */}
      <DesktopNavbar
        isScrolled={isScrolled}
        activeSection={activeSection}
        onOrderClick={onOrderClick}
      />
    </>
  );
};
