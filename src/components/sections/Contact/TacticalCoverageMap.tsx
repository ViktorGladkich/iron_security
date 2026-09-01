import React, { useState } from 'react';
import { Navigation, Clock, Activity, Target } from 'lucide-react';

interface SectorInfo {
  id: string;
  name: string;
  districts: string;
  responseTime: string;
  unitsCount: number;
  highlightCoordinates: { x: number; y: number };
}

const SECTORS: SectorInfo[] = [
  {
    id: 'all',
    name: 'Всі сектори Києва',
    districts: '10 районів Києва + приміська зона (Конча-Заспа, Козин, Буча, Ірпінь)',
    responseTime: '7–15 хв',
    unitsCount: 14,
    highlightCoordinates: { x: 500, y: 300 },
  },
  {
    id: 'center',
    name: 'Сектор Центр',
    districts: 'Печерський, Шевченківський, Подільський райони',
    responseTime: '5–7 хв',
    unitsCount: 4,
    highlightCoordinates: { x: 480, y: 250 },
  },
  {
    id: 'north',
    name: 'Сектор Північ',
    districts: 'Оболонь, Мінський масив, Виноградар, Поділ',
    responseTime: '6–8 хв',
    unitsCount: 3,
    highlightCoordinates: { x: 440, y: 150 },
  },
  {
    id: 'east',
    name: 'Сектор Лівий Берег',
    districts: 'Дарницький, Дніпровський, Деснянський, Позняки, Осокорки',
    responseTime: '7–10 хв',
    unitsCount: 4,
    highlightCoordinates: { x: 650, y: 280 },
  },
  {
    id: 'south',
    name: 'Сектор Південь & Преміум-зона',
    districts: 'Голосієво, Конча-Заспа, Козин, Обухівський напрямок',
    responseTime: '8–12 хв',
    unitsCount: 3,
    highlightCoordinates: { x: 520, y: 450 },
  },
];

const PATROL_UNITS = [
  { id: 'UNIT 01', sector: 'center', name: 'ГШР-1 // Печерськ', x: 490, y: 240, status: 'Патрулювання', time: '5 хв' },
  { id: 'UNIT 02', sector: 'center', name: 'ГШР-2 // Шевченківський', x: 440, y: 230, status: 'Патрулювання', time: '6 хв' },
  { id: 'UNIT 03', sector: 'north', name: 'ГШР-3 // Оболонь', x: 450, y: 130, status: 'Чергування', time: '6 хв' },
  { id: 'UNIT 04', sector: 'north', name: 'ГШР-4 // Поділ', x: 460, y: 190, status: 'Патрулювання', time: '7 хв' },
  { id: 'UNIT 05', sector: 'east', name: 'ГШР-5 // Позняки', x: 660, y: 320, status: 'Патрулювання', time: '8 хв' },
  { id: 'UNIT 06', sector: 'east', name: 'ГШР-6 // Лівобережна', x: 620, y: 220, status: 'Чергування', time: '7 хв' },
  { id: 'UNIT 07', sector: 'east', name: 'ГШР-7 // Троєщина', x: 620, y: 120, status: 'Патрулювання', time: '9 хв' },
  { id: 'UNIT 08', sector: 'south', name: 'ГШР-8 // Голосієво', x: 460, y: 350, status: 'Патрулювання', time: '7 хв' },
  { id: 'UNIT 09', sector: 'south', name: 'ГШР-9 // Конча-Заспа', x: 540, y: 460, status: 'Оперативний пост', time: '8 хв' },
  { id: 'UNIT 10', sector: 'south', name: 'ГШР-10 // Козин', x: 570, y: 520, status: 'Патрулювання', time: '10 хв' },
  { id: 'UNIT 11', sector: 'center', name: 'ГШР-11 // Лук’янівка', x: 410, y: 210, status: 'Чергування', time: '6 хв' },
  { id: 'UNIT 12', sector: 'north', name: 'ГШР-12 // Виноградар', x: 380, y: 140, status: 'Патрулювання', time: '8 хв' },
  { id: 'UNIT 13', sector: 'east', name: 'ГШР-13 // Осокорки', x: 680, y: 380, status: 'Патрулювання', time: '8 хв' },
  { id: 'UNIT 14', sector: 'south', name: 'ГШР-14 // Теремки', x: 420, y: 410, status: 'Чергування', time: '9 хв' },
];

export const TacticalCoverageMap: React.FC = () => {
  const [activeSector, setActiveSector] = useState<string>('all');
  const [hoveredUnit, setHoveredUnit] = useState<typeof PATROL_UNITS[0] | null>(null);

  const currentSectorData = SECTORS.find((s) => s.id === activeSector) || SECTORS[0];

  return (
    <div className="relative w-full rounded-[26px] bg-[#0c0e14] border border-blue-500/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-white p-6 sm:p-8 md:p-10 select-none">
      
      {/* Верхний неоновый луч-блик */}
      <div className="pointer-events-none absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent z-10" />

      {/* Фоновое атмосферное радиальное свечение */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.12)_0%,transparent_70%)]" />

      {/* ── Шапка карты с тактическими статусами ──────────────────────── */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] font-mono font-semibold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TELEMETRY
            </span>
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
              GPS 50°27'00" N 30°31'24" E
            </span>
          </div>
          <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
            ОПЕРАТИВНА ДИСЛОКАЦІЯ ГРУП ШВИДКОГО РЕАГУВАННЯ (ГШР)
          </h3>
        </div>

        {/* Метрики */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-zinc-300">14 ЕКІПАЖІВ 24/7</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-300">ПРИБУТТЯ: 7–15 ХВ</span>
          </div>
        </div>
      </div>

      {/* ── Кнопки выбора секторов (Секторный фильтр) ─────────────────── */}
      <div className="relative z-10 flex flex-wrap gap-2 py-5">
        {SECTORS.map((sector) => {
          const isActive = activeSector === sector.id;
          return (
            <button
              key={sector.id}
              type="button"
              onClick={() => setActiveSector(sector.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-tight transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] border border-blue-400/50 font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
              }`}
            >
              {sector.name}
            </button>
          );
        })}
      </div>

      {/* ── Интерактивная тактическая SVG-карта Киева ──────────────────── */}
      <div className="relative z-10 w-full h-[360px] sm:h-[440px] md:h-[480px] rounded-2xl bg-[#090b10] border border-white/10 overflow-hidden isolate">
        
        {/* Координатная тактическая сетка */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Радарный сканирующий луч вокруг штаба */}
        <div className="absolute left-[480px] top-[240px] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] pointer-events-none opacity-25">
          <div className="w-full h-full rounded-full border border-blue-500/30 animate-[spin_12s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.25)_60deg,transparent_65deg)]" />
          <div className="absolute inset-12 rounded-full border border-blue-400/20" />
          <div className="absolute inset-28 rounded-full border border-blue-400/20" />
        </div>

        {/* Векторные элементы Киева (Река Днепр, мосты, магистрали) */}
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Стилизованное русло Днепра */}
          <path
            d="M 520,-20 Q 510,80 500,160 T 490,250 T 520,330 T 540,420 T 560,520 T 580,620"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="32"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          {/* Внутренняя водная жила */}
          <path
            d="M 520,-20 Q 510,80 500,160 T 490,250 T 520,330 T 540,420 T 560,520 T 580,620"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="6"
            strokeOpacity="0.5"
            strokeDasharray="6 4"
          />

          {/* Мосты Киева (Северный, Метро, Патона, Дарницкий, Южный) */}
          <line x1="470" y1="140" x2="550" y2="150" stroke="#94a3b8" strokeWidth="2.5" strokeOpacity="0.6" />
          <line x1="460" y1="230" x2="540" y2="240" stroke="#94a3b8" strokeWidth="2.5" strokeOpacity="0.6" />
          <line x1="470" y1="280" x2="560" y2="290" stroke="#94a3b8" strokeWidth="2.5" strokeOpacity="0.6" />
          <line x1="490" y1="340" x2="570" y2="350" stroke="#94a3b8" strokeWidth="2.5" strokeOpacity="0.6" />

          {/* Главные транспортные кольца и артерии */}
          <circle cx="480" cy="240" r="160" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 6" strokeOpacity="0.5" />
          <circle cx="480" cy="240" r="280" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Секторные зоны (подсветка при выборе) */}
          {activeSector === 'center' && (
            <polygon points="400,180 520,180 540,280 440,300" fill="#3b82f6" fillOpacity="0.12" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 2" />
          )}
          {activeSector === 'north' && (
            <polygon points="360,90 520,90 520,180 380,180" fill="#3b82f6" fillOpacity="0.12" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 2" />
          )}
          {activeSector === 'east' && (
            <polygon points="560,90 750,110 750,420 560,380" fill="#3b82f6" fillOpacity="0.12" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 2" />
          )}
          {activeSector === 'south' && (
            <polygon points="420,320 580,320 620,560 440,560" fill="#3b82f6" fillOpacity="0.12" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 2" />
          )}

          {/* Центральный командный пункт IRON SECURITY (Хрещатик, 22) */}
          <g className="cursor-pointer">
            <circle cx="480" cy="240" r="14" fill="#1d4ed8" fillOpacity="0.3" className="animate-ping" />
            <circle cx="480" cy="240" r="8" fill="#ffffff" />
            <circle cx="480" cy="240" r="4" fill="#081d45" />
            <text x="496" y="244" fill="#ffffff" fontSize="11" fontFamily="Orbitron, monospace" fontWeight="bold" letterSpacing="1">
              IRON HQ // КИЇВ
            </text>
          </g>
        </svg>

        {/* ── Интерактивные точки патрульных экипажей (HTML Overlay) ── */}
        <div className="absolute inset-0 pointer-events-none">
          {PATROL_UNITS.map((unit) => {
            const isSectorMatch = activeSector === 'all' || activeSector === unit.sector;
            const leftPercent = (unit.x / 1000) * 100;
            const topPercent = (unit.y / 600) * 100;

            return (
              <div
                key={unit.id}
                style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                onMouseEnter={() => setHoveredUnit(unit)}
                onMouseLeave={() => setHoveredUnit(null)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group transition-all duration-300 ${
                  isSectorMatch ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                }`}
              >
                {/* Пульсирующий ореол экипажа */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-6 h-6 rounded-full bg-blue-400/30 animate-ping" />
                  <span className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-[0_0_10px_#60a5fa] group-hover:scale-125 transition-transform" />
                  
                  {/* Метка позывного */}
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 border border-white/20 text-[9px] font-mono text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                    {unit.name} ({unit.time})
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Карточка выбранного экипажа при наведении (HUD Tooltip) ── */}
        {hoveredUnit && (
          <div className="absolute bottom-4 right-4 z-40 p-4 rounded-xl bg-black/90 border border-blue-400/40 shadow-2xl backdrop-blur-md max-w-xs animate-in fade-in duration-200 pointer-events-none">
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-mono text-xs font-bold text-blue-400">{hoveredUnit.id}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                {hoveredUnit.status}
              </span>
            </div>
            <div className="font-sans text-sm font-semibold text-white mb-1">{hoveredUnit.name}</div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Час підльоту: <strong className="text-white">{hoveredUnit.time}</strong></span>
            </div>
          </div>
        )}

      </div>

      {/* ── Нижняя информационная панель выбранного сектора ───────────── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Охоплення сектора</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-0.5 line-clamp-2">
              {currentSectorData.districts}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Норматив прибуття</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
              {currentSectorData.responseTime} по місту
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Екіпажів у секторі</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
              {currentSectorData.unitsCount} активних груп ГШР
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
