import React from 'react';

import { Button } from '../../../common/Button';
import { hx } from '../hero.constants';

interface HeroOfferProps {
  onOrderClick?: () => void;
}

/** Левый блок: главный заголовок страницы, оффер и основной CTA. */
export const HeroOffer: React.FC<HeroOfferProps> = ({ onOrderClick }) => (
  <div className="absolute left-4 sm:left-8 bottom-6 sm:bottom-28 md:bottom-32 z-20 max-w-[calc(100%-32px)] sm:max-w-[340px] select-none">
    <h1 className={`${hx.offerItem} font-sans font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-tight uppercase leading-[1.05] mb-2 sm:mb-3 will-change-transform`}>
      ПРОФЕСІЙНА <br />
      <span className="bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent">
        ОХОРОНА
      </span>{' '}
      У КИЄВІ
    </h1>

    <p className={`${hx.offerItem} text-[11px] sm:text-xs md:text-[13px] text-zinc-300 leading-relaxed mb-4 sm:mb-5 will-change-transform line-clamp-3 sm:line-clamp-none`}>
      Ліцензована безпека найвищого рангу: персональний захист, супровід та охорона бізнесу.
      Екіпажі спортсменів з навичками поводження зі зброєю. Прибуття до 10 хвилин.
    </p>

    <div className={`${hx.offerItem} will-change-transform w-full sm:w-auto`}>
      <Button
        onClick={onOrderClick}
        size="md"
        chamferSize={12}
        className="w-full sm:w-[215px] px-6 shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)]"
      >
        ЗАМОВИТИ ОХОРОНУ
      </Button>
    </div>
  </div>
);
