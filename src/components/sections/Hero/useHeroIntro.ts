import { useEffect, useRef, type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { waitForCriticalAssets } from '../../../lib/assetsReady';
import { prefersReducedMotion } from '../../../lib/media';
import { ASSETS_TIMEOUT_MS, INTRO_STEPS, PROMOTED_DURING_INTRO } from './hero.choreography';

/**
 * Порог, после которого GSAP считает кадр «залипшим» и не отматывает
 * таймлайн вперёд на пропущенное время.
 *
 * Со штатными (500, 33) длинная задача в 200–400 ms не сглаживается: кадры не
 * рисуются, а следующий тик прыгает сразу к новой позиции — именно так и
 * выглядит «доехало рывком». Со 150 ms любая заминка главного потока делает
 * анимацию чуть длиннее, но не рваной.
 */
const LAG_THRESHOLD_MS = 150;
const LAG_ADJUSTED_FRAME_MS = 33;

/**
 * Кинематографичное появление Hero.
 *
 * Хук отвечает за три вещи и ничего не знает о разметке:
 *  1. Собирает таймлайн по декларативной партитуре (`hero.choreography.ts`).
 *  2. Держит его на паузе, пока шрифты и картинки первого экрана не готовы, —
 *     чтобы длинные задачи декодирования не съедали кадры анимации.
 *  3. Промоутит движущиеся слои на время интро и отпускает после.
 *
 * Партитура принципиально не трогает `filter`: раньше здесь одновременно
 * анимировались `blur` на фрейме во весь экран, `blur` на буквах титула и
 * `brightness` на PNG охранника, и каждый кадр требовал повторной
 * растеризации всего поддерева.
 */
export const useHeroIntro = (scope: RefObject<HTMLElement | null>, onComplete?: () => void) => {
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const finish = () => onCompleteRef.current?.();

      // Уважаем системную настройку: финальное состояние показываем сразу.
      if (prefersReducedMotion()) {
        finish();
        return;
      }

      gsap.ticker.lagSmoothing(LAG_THRESHOLD_MS, LAG_ADJUSTED_FRAME_MS);
      gsap.set(PROMOTED_DURING_INTRO, { willChange: 'transform, opacity' });

      const timeline = gsap.timeline({
        paused: true,
        // immediateRender выставляет стартовые состояния сразу при сборке,
        // поэтому пауза до готовности ассетов не даёт вспышки контента.
        defaults: { immediateRender: true },
        onComplete: () => {
          // Слои интро дальше неподвижны — подсказку снимаем, чтобы не держать
          // их растры в памяти. Параллаксные слои промоутятся отдельно и навсегда.
          gsap.set(PROMOTED_DURING_INTRO, { willChange: 'auto' });
          finish();
        },
      });

      for (const step of INTRO_STEPS) {
        timeline.fromTo(step.target, step.from, step.to, step.at);
      }

      let cancelled = false;
      waitForCriticalAssets(root, ASSETS_TIMEOUT_MS).then(() => {
        if (!cancelled) timeline.play();
      });

      return () => {
        cancelled = true;
      };
    },
    { scope },
  );
};
