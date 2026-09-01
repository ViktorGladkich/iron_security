import { useCallback, useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

import { hasFinePointer, prefersReducedMotion } from '../../../lib/media';
import { SPOTLIGHT_SIZE } from './services.constants';

/** Постоянная времени догона курсора, s. Малая — пятно почти приклеено. */
const TAU = 0.07;
const SETTLE_PX = 0.05;

/**
 * Световое пятно, скользящее за курсором по панели.
 *
 * Та же дисциплина, что и в параллаксе Hero: одна подписка на `gsap.ticker`,
 * одна запись в DOM за кадр, `quickSetter` вместо перезапуска твинов и
 * остановка записей, когда пятно пришло на место. Геометрия панели читается
 * не на каждое событие указателя, а раз в кадр и только пока идёт движение.
 */
export const usePointerSpotlight = (
  hostRef: RefObject<HTMLElement | null>,
  spotRef: RefObject<HTMLElement | null>,
) => {
  const pointerRef = useRef({ clientX: 0, clientY: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  // Пока курсор не двигался, а пятно на месте, тикер не читает геометрию вовсе.
  const busyRef = useRef(false);
  const tickerRef = useRef<((time: number, deltaMs: number) => void) | null>(null);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!activeRef.current || event.pointerType !== 'mouse') return;
      pointerRef.current = { clientX: event.clientX, clientY: event.clientY };
      busyRef.current = true;
    },
    [],
  );

  useEffect(() => {
    const host = hostRef.current;
    const spot = spotRef.current;
    if (!host || !spot || !hasFinePointer() || prefersReducedMotion()) return;

    gsap.set(spot, {
      x: 0,
      y: 0,
      autoAlpha: 0,
      force3D: true,
      willChange: 'transform, opacity',
    });

    const setX = gsap.quickSetter(spot, 'x', 'px') as (value: number) => void;
    const setY = gsap.quickSetter(spot, 'y', 'px') as (value: number) => void;

    const tick = (_time: number, deltaMs: number) => {
      if (!busyRef.current) return;

      const rect = host.getBoundingClientRect();
      const half = SPOTLIGHT_SIZE / 2;

      targetRef.current = {
        x: pointerRef.current.clientX - rect.left - half,
        y: pointerRef.current.clientY - rect.top - half,
      };

      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;
      if (Math.abs(dx) < SETTLE_PX && Math.abs(dy) < SETTLE_PX) {
        busyRef.current = false;
        return;
      }

      const k = 1 - Math.exp(-Math.min(deltaMs, 50) / 1000 / TAU);
      currentRef.current.x += dx * k;
      currentRef.current.y += dy * k;

      setX(currentRef.current.x);
      setY(currentRef.current.y);
    };

    const show = () => gsap.to(spot, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' });
    const hide = () => gsap.to(spot, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' });

    // Первое появление ставим пятно сразу под курсор, без прилёта из угла.
    const prime = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = host.getBoundingClientRect();
      const half = SPOTLIGHT_SIZE / 2;
      currentRef.current = {
        x: event.clientX - rect.left - half,
        y: event.clientY - rect.top - half,
      };
      pointerRef.current = { clientX: event.clientX, clientY: event.clientY };
      busyRef.current = true;
      setX(currentRef.current.x);
      setY(currentRef.current.y);
      show();
    };

    host.addEventListener('pointerenter', prime);
    host.addEventListener('pointerleave', hide);

    tickerRef.current = tick;
    gsap.ticker.add(tick);
    activeRef.current = true;

    return () => {
      host.removeEventListener('pointerenter', prime);
      host.removeEventListener('pointerleave', hide);
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
      gsap.killTweensOf(spot);
      tickerRef.current = null;
      activeRef.current = false;
    };
  }, [hostRef, spotRef]);

  return { handlePointerMove };
};
