import { useCallback, useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

import { hasFinePointer, prefersReducedMotion } from '../../../lib/media';

export interface ParallaxLayer {
  ref: RefObject<HTMLElement | null>;
  /** Амплитуда смещения по X на краю контейнера, px. */
  x: number;
  /** Амплитуда смещения по Y на краю контейнера, px. */
  y: number;
  /** Амплитуда поворота вокруг вертикальной оси, deg. */
  rotationY?: number;
  /** Постоянная времени «догона» курсора, s: больше — ленивее слой. */
  smoothing: number;
}

/** Ниже этого порога слой считается пришедшим на место и перестаёт писать в DOM. */
const SETTLE_PX = 0.01;

interface LayerRuntime {
  amplitude: { x: number; y: number; rotationY: number };
  target: { x: number; y: number; rotationY: number };
  current: { x: number; y: number; rotationY: number };
  set: {
    x: (value: number) => void;
    y: (value: number) => void;
    rotationY?: (value: number) => void;
  };
  tau: number;
}

/**
 * Параллакс слоёв Hero за курсором.
 *
 * Почему это ticker + затухающая интерполяция, а не `gsap.quickTo`.
 * `quickTo` на каждое движение мыши перезапускает твин. Перезапуск происходит
 * в обработчике указателя, то есть в произвольной точке кадра — иногда до
 * рендера GSAP, иногда после. Из-за этого шаг твина за кадр скачет от нуля до
 * полного, и слой мелко трясётся. Здесь вместо этого одна подписка на
 * `gsap.ticker`: ровно одна запись в DOM за кадр, всегда в одной фазе.
 *
 * Второе условие плавности — промоушен слоя. Параллаксные элементы несут
 * `drop-shadow` / `blur`, и без `will-change: transform` браузер каждый кадр
 * заново растрирует фильтр по новым субпиксельным координатам: получается
 * дрожание краёв. Слои, которые двигаются постоянно, промоутятся навсегда
 * (в отличие от интро, где подсказка снимается после завершения).
 *
 * Третье — остановка. Экспоненциальный догон никогда не достигает цели точно,
 * поэтому без порога `SETTLE_PX` слой вечно писал бы микросдвиги и вечно
 * перерисовывался. Дойдя до порога, слой защёлкивается и записи прекращаются.
 */
export const useHeroParallax = (containerRef: RefObject<HTMLElement | null>, layers: ParallaxLayer[]) => {
  // Конфигурация читается только из колбэков — смена массива не должна
  // пересоздавать обработчики указателя.
  const layersRef = useRef(layers);
  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  const runtimeRef = useRef<LayerRuntime[] | null>(null);
  const activeRef = useRef(false);
  const rectRef = useRef<DOMRect | null>(null);
  const tickerRef = useRef<((time: number, deltaMs: number) => void) | null>(null);

  const setTargets = useCallback((nx: number, ny: number) => {
    const runtime = runtimeRef.current;
    if (!runtime) return;

    for (const layer of runtime) {
      layer.target.x = nx * layer.amplitude.x;
      layer.target.y = ny * layer.amplitude.y;
      layer.target.rotationY = nx * layer.amplitude.rotationY;
    }
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!activeRef.current || event.pointerType !== 'mouse') return;

      const container = containerRef.current;
      if (!container) return;

      // Геометрия читается только когда кэш сброшен (resize/scroll),
      // а не на каждое движение указателя.
      const rect = rectRef.current ?? (rectRef.current = container.getBoundingClientRect());
      if (!rect.width || !rect.height) return;

      setTargets(
        (event.clientX - rect.left) / rect.width - 0.5,
        (event.clientY - rect.top) / rect.height - 0.5,
      );
    },
    [containerRef, setTargets],
  );

  const handlePointerLeave = useCallback(() => {
    if (!activeRef.current) return;
    setTargets(0, 0);
  }, [setTargets]);

  /** Включается из `onComplete` интро: до этого твины интро владеют теми же transform. */
  const activate = useCallback(() => {
    if (activeRef.current || !hasFinePointer() || prefersReducedMotion()) return;

    const runtime = layersRef.current.flatMap<LayerRuntime>((layer) => {
      const el = layer.ref.current;
      if (!el) return [];

      // Инициализируем transform-кэш GSAP и промоутим слой в отдельный
      // композиторный слой. `force3D` даёт translate3d, `will-change` —
      // однократную растеризацию фильтров слоя, после которой сдвиг делает GPU.
      gsap.set(el, {
        x: 0,
        y: 0,
        force3D: true,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        // Без перспективы на самом элементе rotationY вырождается
        // в плоское горизонтальное сжатие.
        ...(layer.rotationY ? { rotationY: 0, transformPerspective: 900 } : null),
      });

      return [
        {
          amplitude: { x: layer.x, y: layer.y, rotationY: layer.rotationY ?? 0 },
          target: { x: 0, y: 0, rotationY: 0 },
          current: { x: 0, y: 0, rotationY: 0 },
          set: {
            x: gsap.quickSetter(el, 'x', 'px') as (value: number) => void,
            y: gsap.quickSetter(el, 'y', 'px') as (value: number) => void,
            rotationY: layer.rotationY
              ? (gsap.quickSetter(el, 'rotationY', 'deg') as (value: number) => void)
              : undefined,
          },
          tau: Math.max(layer.smoothing, 0.05) / 3,
        },
      ];
    });

    if (!runtime.length) return;
    runtimeRef.current = runtime;

    const tick = (_time: number, deltaMs: number) => {
      // Ограничение шага спасает от прыжка после возврата из фоновой вкладки.
      const dt = Math.min(deltaMs, 50) / 1000;

      for (const layer of runtime) {
        const k = 1 - Math.exp(-dt / layer.tau);
        const { current, target } = layer;

        const dx = target.x - current.x;
        const dy = target.y - current.y;
        const dr = target.rotationY - current.rotationY;

        // Слой уже на месте — ни одной записи в DOM, ни одной перерисовки.
        if (Math.abs(dx) < SETTLE_PX && Math.abs(dy) < SETTLE_PX && Math.abs(dr) < SETTLE_PX) {
          if (dx || dy || dr) {
            current.x = target.x;
            current.y = target.y;
            current.rotationY = target.rotationY;
            layer.set.x(current.x);
            layer.set.y(current.y);
            layer.set.rotationY?.(current.rotationY);
          }
          continue;
        }

        current.x += dx * k;
        current.y += dy * k;
        current.rotationY += dr * k;

        layer.set.x(current.x);
        layer.set.y(current.y);
        layer.set.rotationY?.(current.rotationY);
      }
    };

    tickerRef.current = tick;
    gsap.ticker.add(tick);
    activeRef.current = true;
  }, []);

  useEffect(() => {
    // Курсорные координаты вьюпортные, поэтому кэш рамки сбрасывают и скролл, и ресайз.
    const invalidateRect = () => {
      rectRef.current = null;
    };

    window.addEventListener('resize', invalidateRect, { passive: true });
    window.addEventListener('scroll', invalidateRect, { passive: true });

    return () => {
      window.removeEventListener('resize', invalidateRect);
      window.removeEventListener('scroll', invalidateRect);
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
      tickerRef.current = null;
      runtimeRef.current = null;
      activeRef.current = false;
    };
  }, []);

  return { activate, handlePointerMove, handlePointerLeave };
};
