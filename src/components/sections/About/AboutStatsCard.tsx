import { forwardRef } from 'react';
import { STATS, ACCENT_GRADIENT } from './about.constants';
import { Button } from '../../common/Button';

interface AboutStatsCardProps {
  onOrderClick?: () => void;
}

export const AboutStatsCard = forwardRef<HTMLDivElement, AboutStatsCardProps>(
  ({ onOrderClick }, ref) => {
    return (
      <div
        ref={ref}
        className="relative z-10 p-6 sm:p-8 lg:p-5 xl:p-6 lg:shrink-0 rounded-2xl bg-white/[0.02] border border-blue-600/40 shadow-[0_10px_30px_rgba(29,78,216,0.15)] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full lg:w-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="about-stat-box">
              <div
                className={`font-tactical font-semibold text-2xl sm:text-3xl lg:text-2xl xl:text-3xl tracking-tight mb-1 flex items-center gap-1 ${
                  stat.accent ? ACCENT_GRADIENT : 'text-white'
                }`}
              >
                <span>{stat.value}</span>
                {stat.suffix && (
                  <span className={`${ACCENT_GRADIENT} font-bold`}>{stat.suffix}</span>
                )}
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 w-full sm:w-auto flex justify-center">
          <Button
            onClick={onOrderClick}
            size="lg"
            variant="primary"
            className="w-full sm:w-[240px] lg:h-[48px]"
          >
            Замовити охорону
          </Button>
        </div>
      </div>
    );
  }
);

AboutStatsCard.displayName = 'AboutStatsCard';
