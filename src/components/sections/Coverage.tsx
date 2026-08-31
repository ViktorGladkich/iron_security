import React from 'react';
import { Clock, Phone, ShieldCheck, Navigation } from 'lucide-react';

import { companyInfo } from '../../data/companyInfo';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface CoverageProps {
  onOrderClick?: () => void;
}

export const Coverage: React.FC<CoverageProps> = ({ onOrderClick }) => {
  return (
    <section id="coverage" className="py-24 bg-[#0a0c10] relative border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-zinc-900 via-[#0f1218] to-zinc-950 border border-zinc-800 p-8 sm:p-14 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <Badge variant="accent" dot className="mb-4">
                ГОЛОВНА ЛОКАЦІЯ
              </Badge>

              <h2 className="font-['Syne'] text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight mb-6">
                МІСТО КИЇВ ТА <br />
                <span className="text-zinc-400 font-light">КИЇВСЬКА ОБЛАСТЬ</span>
              </h2>

              <p className="text-zinc-300 text-base leading-relaxed mb-8 max-w-xl">
                Основне місце дислокації та чергування підрозділів IRON SECURITY — столиця України. 
                Наші мобільні групи швидкого реагування розподілені по ключових районах для мінімального часу прибуття.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-zinc-950/60 border border-zinc-850">
                  <Clock className="w-5 h-5 text-slate-300" />
                  <div>
                    <div className="font-mono text-xs text-zinc-400">РЕЖИМ РОБОТИ</div>
                    <div className="font-semibold text-sm text-white">24/7 Без вихідних</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-zinc-950/60 border border-zinc-850">
                  <Navigation className="w-5 h-5 text-slate-300" />
                  <div>
                    <div className="font-mono text-xs text-zinc-400">ЗОНА ДІЇ</div>
                    <div className="font-semibold text-sm text-white">Усі райони Києва</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" variant="primary" onClick={onOrderClick}>
                  Терміновий виклик
                </Button>
                <a href={`tel:${companyInfo.phone}`}>
                  <Button size="lg" variant="secondary" icon={<Phone className="w-4 h-4" />}>
                    {companyInfo.phoneDisplay}
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-zinc-800 bg-[#08090b] p-6 relative">
                {/* Стилизованная тактическая карта-схема */}
                <div className="aspect-square bg-zinc-950 border border-zinc-850 relative flex items-center justify-center overflow-hidden">
                  {/* Радарная сетка */}
                  <div className="absolute inset-0 border border-slate-700/20 rounded-full scale-75 animate-pulse" />
                  <div className="absolute inset-0 border border-slate-700/20 rounded-full scale-50" />
                  <div className="absolute w-full h-[1px] bg-slate-800" />
                  <div className="absolute h-full w-[1px] bg-slate-800" />

                  {/* Центральная точка Киев */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_#ffffff]">
                      <div className="w-2 h-2 bg-black rounded-full" />
                    </div>
                    <span className="font-mono font-bold text-xs text-white uppercase mt-2 tracking-widest">
                      KYIV HQ
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      50°27'00" N 30°31'24" E
                    </span>
                  </div>

                  {/* Спутники-патрули */}
                  <div className="absolute top-1/4 left-1/3 flex items-center gap-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-ping" />
                    <span className="text-[9px] font-mono text-zinc-400">UNIT 01</span>
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 flex items-center gap-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-ping" />
                    <span className="text-[9px] font-mono text-zinc-400">UNIT 02</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    МОБІЛЬНІ ЕКІПАЖІ АКТИВНІ
                  </span>
                  <span>KYIV AREA</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
