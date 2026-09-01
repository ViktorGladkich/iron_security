import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { About } from './About';
import { FAQ } from './FAQ';
import { Reviews } from './Reviews';
import { Services } from './Services';
import { Standards } from './Standards';
import { STACK_ID, STACK_SCRUB_SVH } from './stack.constants';

interface AboutServicesStackProps {
  onOrderClick?: () => void;
}

export const AboutServicesStack: React.FC<AboutServicesStackProps> = ({ onOrderClick }) => {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div id={STACK_ID} ref={stackRef} className="relative">
      <About onOrderClick={onOrderClick} />

      {/* Запас прокрутки: About стоит, текст проявляется, Services ещё не в кадре. */}
      <div aria-hidden className="hidden lg:block" style={{ height: `${STACK_SCRUB_SVH}svh` }} />

      <div className="relative z-10 bg-[#f2f4f7]">
        <Services onOrderClick={onOrderClick} />
        <Standards onOrderClick={onOrderClick} />
        <Reviews />
        <FAQ onOrderClick={onOrderClick} />
      </div>
    </div>
  );
};

export default AboutServicesStack;
