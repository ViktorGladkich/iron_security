import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dumbbell, Crosshair, MapPin, Award } from 'lucide-react';
import { advantagesData } from '../../data/companyInfo';
import { Badge } from '../common/Badge';

gsap.registerPlugin(ScrollTrigger);

const icons = [
  <Dumbbell className="w-8 h-8 text-slate-200" key="1" />,
  <Crosshair className="w-8 h-8 text-slate-200" key="2" />,
  <MapPin className="w-8 h-8 text-slate-200" key="3" />,
  <Award className="w-8 h-8 text-slate-200" key="4" />,
];

export const Advantages: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.advantage-card', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="advantages" ref={containerRef} className="py-24 bg-[#08090b] relative border-t border-zinc-900">
      {/* Декоративное сияние */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-slate-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <Badge variant="accent" className="mb-4">
            НАША ВІДМІННІСТЬ ВІД КОНКУРЕНТІВ
          </Badge>
          <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
            ЧОМУ ОБИРАЮТЬ <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-zinc-400">IRON SECURITY</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base">
            Головна наша сила — люди. Фізично сильні, дисципліновані та озброєні професіонали.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantagesData.map((item, index) => (
            <div
              key={item.id}
              className="advantage-card bg-zinc-900/40 border border-zinc-800 p-8 sm:p-10 relative group hover:border-slate-400 hover:bg-zinc-900/70 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-zinc-800 border border-zinc-700 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                  {icons[index]}
                </div>
                {item.metric && (
                  <div className="text-right font-mono">
                    <span className="text-2xl sm:text-3xl font-bold text-white block">
                      {item.metric}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                      {item.metricLabel}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-['Syne'] text-2xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors">
                {item.title}
              </h3>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                {item.subtitle}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Тактический индикатор */}
              <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>VERIFIED STANDARD // UKRAINE</span>
                <span className="w-2 h-2 bg-slate-500 rounded-full group-hover:bg-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
