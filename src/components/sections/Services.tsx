import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserCheck, ShieldAlert, Building2, Briefcase, Users, ArrowUpRight } from 'lucide-react';
import { servicesData } from '../../data/services';
import { Badge } from '../common/Badge';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  'personal-security': <UserCheck className="w-6 h-6 text-slate-300" />,
  'escort': <ShieldAlert className="w-6 h-6 text-slate-300" />,
  'object-security': <Building2 className="w-6 h-6 text-slate-300" />,
  'business-security': <Briefcase className="w-6 h-6 text-slate-300" />,
  'event-security': <Users className="w-6 h-6 text-slate-300" />,
};

interface ServicesProps {
  onSelectService?: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="services" ref={containerRef} className="py-24 bg-[#0a0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="mb-16">
          <Badge variant="accent" className="mb-4">
            НАПРЯМКИ ДІЯЛЬНОСТІ
          </Badge>
          <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
            КОМПЛЕКСНІ ПОСЛУГИ <span className="text-zinc-400">БЕЗПЕКИ</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base">
            Професійний супровід та захист будь-якої складності в межах Києва та області.
          </p>
        </div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              onClick={() => onSelectService?.(service.id)}
              className="service-card group bg-zinc-900/40 border border-zinc-800/80 p-8 rounded-none relative flex flex-col justify-between hover:border-slate-400 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer"
            >
              {/* Тактические углы */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-700 group-hover:border-white transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-700 group-hover:border-white transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-zinc-800/80 border border-zinc-700 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                    {iconMap[service.id]}
                  </div>
                  <span className="font-mono text-xs text-zinc-400 group-hover:text-slate-200">
                    0{index + 1}
                  </span>
                </div>

                <Badge variant="outline" className="mb-3 text-[10px]">
                  {service.tag}
                </Badge>

                <h3 className="font-['Syne'] text-xl font-bold text-white mb-3 group-hover:text-slate-100 transition-colors">
                  {service.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <ul className="space-y-2 border-t border-zinc-800/60 pt-4 mb-6">
                  {service.features.map((feat, i) => (
                    <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                      <span className="w-1 h-1 bg-slate-400" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-300 group-hover:text-white pt-4 border-t border-zinc-800">
                <span>ДЕТАЛЬНІШЕ</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
