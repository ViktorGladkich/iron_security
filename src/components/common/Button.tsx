import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: string | React.ReactNode;
  icon?: React.ReactNode;
  chamferSize?: number;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  chamferSize = 12,
  className = '',
  ...props
}) => {
  const isStringText = typeof children === 'string';

  const sizeStyles = {
    sm: 'h-[38px] px-5 text-[11px]',
    md: 'h-[48px] px-7 text-xs',
    lg: 'h-[54px] px-9 text-sm',
  };

  const fillStyles = {
    primary: {
      bg: 'bg-[#f2f4f7] text-[#0f1115]',
      fill: 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7]',
      textInitial: 'text-[#0f1115]',
      textHover: 'text-white font-bold',
    },
    secondary: {
      bg: 'bg-[#0f1115] text-white border border-white/10',
      fill: 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7]',
      textInitial: 'text-white',
      textHover: 'text-white font-bold',
    },
    glass: {
      bg: 'bg-white/15 text-white',
      fill: 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7]',
      textInitial: 'text-white',
      textHover: 'text-white font-bold',
    },
    outline: {
      bg: 'bg-transparent text-white border border-white/30',
      fill: 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7]',
      textInitial: 'text-white',
      textHover: 'text-white font-bold',
    },
  };

  const currentFill = fillStyles[variant];

  // Dual-chamfer тактический срез с поддержкой WebKit префикса для моментального рендеринга
  const clipPathStyle = {
    clipPath: `polygon(${chamferSize}px 0%, 100% 0%, 100% calc(100% - ${chamferSize}px), calc(100% - ${chamferSize}px) 100%, 0% 100%, 0% ${chamferSize}px)`,
    WebkitClipPath: `polygon(${chamferSize}px 0%, 100% 0%, 100% calc(100% - ${chamferSize}px), calc(100% - ${chamferSize}px) 100%, 0% 100%, 0% ${chamferSize}px)`,
  };

  return (
    <button
      style={clipPathStyle}
      className={`group relative inline-flex items-center justify-center font-['PP_Neue_Montreal'] font-bold uppercase tracking-wider overflow-hidden cursor-pointer select-none transition-shadow duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.35)] ${sizeStyles[size]} ${currentFill.bg} ${className}`}
      {...props}
    >
      {/* 1. Анимированный слой наполнения кнопки цветом (Sliding Color Fill) */}
      <span
        className={`absolute inset-0 z-0 ${currentFill.fill} -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] pointer-events-none`}
      />

      {/* 2. Каскадный посимвольный роллер текста (Awwwards Staggered Letter Wave) */}
      {isStringText ? (
        <span className="relative z-10 flex items-center justify-center">
          <span className="invisible select-none whitespace-pre">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
            {(children as string).split('').map((char, index) => (
              <span key={index} className="relative inline-block overflow-hidden h-[1.3em]">
                {/* Исходная буква */}
                <span
                  className={`inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full ${currentFill.textInitial}`}
                  style={{ transitionDelay: `${index * 14}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
                {/* Новая контрастная буква, выезжающая снизу */}
                <span
                  className={`absolute inset-0 inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-y-full group-hover:translate-y-0 ${currentFill.textHover}`}
                  style={{ transitionDelay: `${index * 14}ms` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </span>
            ))}
          </span>
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  );
};


