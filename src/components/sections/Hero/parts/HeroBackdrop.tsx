import React from 'react';

import { hx } from '../hero.constants';

interface HeroBackdropProps {
  /** Ореол за персонажем — единственный слой фона, участвующий в параллаксе. */
  glowRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Живой сапфировый фон фрейма.
 *
 * Слои статичны: анимируется только `glowRef`, поэтому дорогие `blur-[80..90px]`
 * и `mix-blend-screen` растрируются один раз и дальше живут как готовая текстура.
 */
export const HeroBackdrop: React.FC<HeroBackdropProps> = ({ glowRef }) => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Базовый глубокий ночной сапфир */}
    <div className="absolute inset-0 bg-[#030611]" />

    {/* Первичный градиент с вектором в правый нижний угол */}
    <div className="absolute inset-[-30%] bg-[radial-gradient(ellipse_75%_55%_at_65%_65%,#0e326e_0%,#081d45_35%,#030712_80%)] opacity-80" />

    {/* Направленный синий поток из центра к правой карточке */}
    <div className="absolute top-[30%] left-[20%] w-[120%] h-full bg-[radial-gradient(ellipse_60%_40%_at_70%_75%,rgba(37,99,235,0.45)_0%,rgba(2,132,199,0.25)_35%,transparent_70%)] blur-[80px] mix-blend-screen" />

    {/* Свечение под карточкой и вырезом статистики */}
    <div className="absolute -bottom-20 -right-20 w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,#1d4ed8_0%,#0284c7_30%,#0f172a_65%,transparent_100%)] opacity-55 blur-[85px] mix-blend-screen" />

    {/*
      Ореол за персонажем.
      Центрирование вынесено на обёртку: GSAP парсит `-translate-x-1/2` в
      пиксели и при первом же кадре параллакса «телепортировал» бы свечение
      на половину его ширины вправо.
    */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[400px] sm:h-[550px]">
      <div
        ref={glowRef}
        className={`${hx.glow} w-full h-full rounded-full bg-[radial-gradient(circle_at_center,#1e40af_0%,#172554_45%,transparent_80%)] opacity-50 blur-[90px] mix-blend-screen`}
      />
    </div>

    {/* Атмосферная виньетка */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-[#020409]/60" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#020409]/85 via-transparent to-[#020409]/85" />
  </div>
);
