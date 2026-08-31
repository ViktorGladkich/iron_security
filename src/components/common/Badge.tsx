import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    default: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
    accent: 'bg-slate-800 text-slate-100 border-slate-500/50 shadow-[0_0_12px_rgba(203,213,225,0.1)]',
    outline: 'bg-transparent text-zinc-400 border-zinc-800',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-widest border backdrop-blur-md ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse shadow-[0_0_8px_#ffffff]" />
      )}
      {children}
    </span>
  );
};
