import React, { Suspense, lazy, useCallback, useState } from 'react';

import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { useInView } from './hooks/useInView';

/**
 * Секции ниже первого экрана грузятся отдельными чанками.
 *
 * About тянет ScrollTrigger и автоплей-видео на 2 МБ. Смонтированный вместе с
 * Hero, он отбирал кадры у вступительной анимации: инициализация видеодекодера
 * и замеры ScrollTrigger — это длинные задачи в главном потоке, а таймлайн
 * GSAP в это время не рисуется и потом навёрстывает пропущенное рывком.
 */
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })));
const ContactModal = lazy(() =>
  import('./components/sections/ContactModal').then((m) => ({ default: m.ContactModal })),
);

/** Резерв высоты под ленивую секцию, чтобы её появление не дёргало вёрстку. */
const SectionPlaceholder = <div className="min-h-[80vh]" aria-hidden />;

export const App: React.FC = () => {
  const [isOrderOpen, setOrderOpen] = useState(false);
  const [isHeroSettled, setHeroSettled] = useState(false);

  // Второй триггер на случай, если пользователь доскроллил раньше, чем
  // доиграло вступление: секция не должна ждать анимацию, которой не видно.
  const { ref: aboutSlotRef, inView: aboutInView } = useInView<HTMLDivElement>();

  const openOrder = useCallback(() => setOrderOpen(true), []);
  const closeOrder = useCallback(() => setOrderOpen(false), []);
  const settleHero = useCallback(() => setHeroSettled(true), []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f4f7] text-[#0f1115] selection:bg-black selection:text-white">
      <main className="flex-1">
        <Hero onOrderClick={openOrder} onIntroComplete={settleHero} />

        <div ref={aboutSlotRef}>
          {isHeroSettled || aboutInView ? (
            <Suspense fallback={SectionPlaceholder}>
              <About onOrderClick={openOrder} />
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
