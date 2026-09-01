import React, { Suspense, lazy, useCallback, useState } from 'react';

import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { useInView } from './hooks/useInView';

/**
 * Секции ниже первого экрана грузятся отдельными чанками.
 *
 * Стек About + Services тянет ScrollTrigger, Flip, автоплей-видео на 2 МБ и
 * четыре фотографии. Смонтированный вместе с Hero, он отбирал кадры у
 * вступительной анимации: инициализация видеодекодера и замеры ScrollTrigger —
 * длинные задачи в главном потоке, а таймлайн GSAP в это время не рисуется и
 * потом навёрстывает пропущенное рывком. Обе секции появляются вместе, поэтому
 * лежат в одном чанке.
 */
const AboutServicesStack = lazy(() => import('./components/sections/AboutServicesStack'));
const ContactModal = lazy(() =>
  import('./components/sections/ContactModal').then((m) => ({ default: m.ContactModal })),
);

/** Резерв высоты под ленивые секции, чтобы их появление не дёргало вёрстку. */
const SectionPlaceholder = <div className="min-h-[80vh]" aria-hidden />;

export const App: React.FC = () => {
  const [isOrderOpen, setOrderOpen] = useState(false);
  const [isHeroSettled, setHeroSettled] = useState(false);

  // Второй триггер на случай, если пользователь доскроллил раньше, чем
  // доиграло вступление: секции не должны ждать анимацию, которой не видно.
  const { ref: contentSlotRef, inView: contentInView } = useInView<HTMLDivElement>();

  const openOrder = useCallback(() => setOrderOpen(true), []);
  const closeOrder = useCallback(() => setOrderOpen(false), []);
  const settleHero = useCallback(() => setHeroSettled(true), []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f4f7] text-[#0f1115] selection:bg-black selection:text-white">
      <main className="flex-1">
        <Hero onOrderClick={openOrder} onIntroComplete={settleHero} />

        <div ref={contentSlotRef}>
          {isHeroSettled || contentInView ? (
            <Suspense fallback={SectionPlaceholder}>
              <AboutServicesStack onOrderClick={openOrder} />
            </Suspense>
          ) : (
            SectionPlaceholder
          )}
        </div>
      </main>

      <Footer />

      {isOrderOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen onClose={closeOrder} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
