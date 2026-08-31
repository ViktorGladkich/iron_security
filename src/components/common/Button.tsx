import React from 'react';

import { cn } from '../../lib/cn';
import { LetterRoller } from './LetterRoller';

type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  /** Размер тактического среза углов, px. */
  chamferSize?: number;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  xs: 'h-[38px] px-4 text-[10px]',
  sm: 'h-[38px] px-5 text-[11px]',
  md: 'h-[48px] px-7 text-[11px] sm:text-xs',
  lg: 'h-[54px] px-9 text-sm',
};

const VARIANT_STYLES: Record<ButtonVariant, { surface: string; rest: string; hover: string }> = {
  primary: { surface: 'bg-[#f2f4f7]', rest: 'text-[#0f1115]', hover: 'text-white font-bold' },
  secondary: { surface: 'bg-[#0f1115] border border-white/10', rest: 'text-white', hover: 'text-white font-bold' },
  glass: { surface: 'bg-white/15', rest: 'text-white', hover: 'text-white font-bold' },
  outline: { surface: 'bg-transparent border border-white/30', rest: 'text-white', hover: 'text-white font-bold' },
};

const FILL_GRADIENT = 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7]';

const chamferPolygon = (size: number) =>
  `polygon(${size}px 0%, 100% 0%, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0% 100%, 0% ${size}px)`;

/**
 * Тактическая кнопка со срезанными углами: при наведении фон заливается
 * сапфировым градиентом, а подпись перекатывается по буквам.
 *
 * Классы склеиваются через `cn`, поэтому переданный `className` детерминированно
 * перебивает пресеты размера и варианта, а не зависит от порядка в бандле.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  chamferSize = 12,
  className,
  type = 'button',
  ...props
}) => {
  const palette = VARIANT_STYLES[variant];
  const clip = chamferPolygon(chamferSize);

  return (
    <button
      type={type}
      style={{ clipPath: clip, WebkitClipPath: clip }}
      className={cn(
        'roller-host group relative inline-flex items-center justify-center gap-2',
        'font-sans font-bold uppercase tracking-wider overflow-hidden cursor-pointer select-none',
        'shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.35)]',
        'transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400',
        SIZE_STYLES[size],
        palette.surface,
        palette.rest,
        className,
      )}
      {...props}
    >
      {/* Слой заливки, въезжающий слева направо */}
      <span
        className={cn(
          'absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover:translate-x-0',
          'transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]',
          FILL_GRADIENT,
        )}
      />

      {icon && <span className="relative z-10 flex items-center">{icon}</span>}

      <span className="relative z-10 flex items-center justify-center">
        {typeof children === 'string' ? (
          <LetterRoller text={children} restClassName={palette.rest} hoverClassName={palette.hover} />
        ) : (
          children
        )}
      </span>
    </button>
  );
};
