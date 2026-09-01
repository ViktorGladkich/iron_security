import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Lock } from 'lucide-react';

import { prefersReducedMotion } from '../../../lib/media';
import { LetterRoller } from '../../common/LetterRoller';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_OPTIONS = [
  'Особиста охорона',
  'Охорона об’єктів',
  'Супровід бізнесу',
  'ГШР / Сигналізація',
  'Аудит безпеки',
] as const;

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLDivElement>(null);
  const rightFormRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<string>(SERVICE_OPTIONS[0]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [ticketId, setTicketId] = useState('8492');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    // Имитация быстрой отправки в CRM
    setTimeout(() => {
      setTicketId(String(Math.floor(1000 + Math.random() * 9000)));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  // ── GSAP ScrollTrigger Entrance Animation ──────────────────────────────
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      // 1. Появление шапки
      tl.from([badgeRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      })
      // 2. Линия-разделитель
      .from(
        borderRef.current,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'transform',
        },
        '-=0.45'
      )
      // 3. Левое видео (About Video)
      .from(
        leftVideoRef.current,
        {
          opacity: 0,
          x: -30,
          scale: 0.97,
          filter: 'blur(8px)',
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
        },
        '-=0.45'
      )
      // 4. Правая форма (Luminous Frosted Glass)
      .from(
        rightFormRef.current,
        {
          opacity: 0,
          x: 30,
          scale: 0.97,
          filter: 'blur(8px)',
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
        },
        '-=0.75'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div className="relative w-full rounded-[20px] bg-[#f2f4f7] overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-20">
        
        {/* ── Шапка секции на всю ширину ─────────────────────────────────── */}
        <header className="relative z-10 mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
            <div>
              <span
                ref={badgeRef}
                className="mb-2 block font-mono text-xs font-bold tracking-widest text-blue-600 uppercase sm:text-sm will-change-transform"
              >
                06 // ЗВ'ЯЗОК & ОПЕРАТИВНИЙ РОЗРАХУНОК
              </span>
              <h2
                ref={titleRef}
                className="font-sans text-2xl font-normal tracking-tight text-[#0f1115] uppercase sm:text-3xl md:text-4xl will-change-transform"
              >
                ОТРИМАЙТЕ РОЗРАХУНОК{' '}
                <span className="bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] bg-clip-text text-transparent font-medium">
                  БЕЗПЕКИ ОБ’ЄКТА
                </span>
              </h2>
            </div>

            <div ref={descRef} className="max-w-md will-change-transform">
              <p className="font-sans text-sm sm:text-base text-[#0f1115]/75 leading-relaxed tracking-tight">
                Прямий канал зв’язку з черговою частиною. Оцінка ризиків, підбір контуру охорони та виїзд старшого офіцера безпеки по Києву протягом 24 годин.
              </p>
            </div>
          </div>

          {/* Разделительная линия */}
          <div ref={borderRef} className="h-px w-full bg-black/10 will-change-transform" />
        </header>

        {/* ── Контент: Слева Видео About + Справа Luminous Glass Форма ── */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* 1. Левый блок: ТОЛЬКО ВИДЕО ABOUT ──────────────────────────── */}
          <div ref={leftVideoRef} className="lg:col-span-5 flex flex-col will-change-transform">
            <div className="relative h-full min-h-[400px] sm:min-h-[480px] lg:min-h-full rounded-[26px] overflow-hidden bg-black border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group isolate">
              
              {/* Чистое видео About */}
              <video
                src="/video/about.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
            </div>
          </div>

          {/* 2. Правый блок: Форма с фоном как у карточек в отзывах ─────── */}
          <div ref={rightFormRef} className="lg:col-span-7 flex flex-col will-change-transform">
            <div
              style={{
                background:
                  'linear-gradient(155deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.03) 34%, rgba(255,255,255,0) 62%), linear-gradient(200deg, #123a86 0%, #0d2a63 45%, #0a1f4d 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,.42), inset 0 22px 46px -26px rgba(255,255,255,.25), 0 20px 40px -20px rgba(0,0,0,0.5)',
              }}
              className="relative h-full p-8 sm:p-10 md:p-11 rounded-[26px] border border-white/25 flex flex-col justify-between overflow-hidden isolate select-none transition-[border-color,box-shadow] duration-500 hover:border-white/40"
            >
              {/* Світна пляма — Luminous Gradient (::before) */}
              <div
                className="pointer-events-none absolute -inset-[20%] -z-20 transform-gpu group-hover:scale-105 transition-transform duration-700"
                style={{
                  background:
                    'radial-gradient(46% 52% at 74% 30%, #3b82f6 0%, rgba(59,130,246,0) 68%), radial-gradient(40% 44% at 88% 62%, #1e5fd6 0%, rgba(30,95,214,0) 70%), radial-gradient(34% 38% at 62% 18%, #67e8f9 0%, rgba(103,232,249,0) 72%)',
                  filter: 'blur(50px) saturate(170%)',
                }}
              />

              {/* Ребриста поверхня скла (::after) */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.04) 20%, rgba(0,0,0,.30) 50%, rgba(255,255,255,.04) 80%, rgba(255,255,255,.20) 100%)',
                  backgroundSize: '34px 100%',
                }}
              />

              {isSubmitted ? (
                /* ── Экран успешной отправки заявки ───────────────────── */
                <div className="my-auto py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white text-[#081d45] flex items-center justify-center mb-6 shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-200 uppercase mb-2">
                    ЗАПИТ УСПІШНО ЗАРЕЄСТРОВАНО // № IS-{ticketId}
                  </span>
                  <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-3">
                    ДЯКУЄМО, {firstName ? `${firstName.toUpperCase()} ${lastName.toUpperCase()}`.trim() : 'ЗАМОВНИКУ'}!
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white/80 max-w-md mb-8 leading-relaxed">
                    Черговий офіцер безпеки IRON SECURITY зв’яжеться з вами за номером <strong className="text-white">{phone}</strong> для узгодження деталей.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFirstName('');
                      setLastName('');
                      setCompany('');
                      setPhone('');
                      setEmail('');
                      setComment('');
                    }}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-blue-200 underline underline-offset-4 cursor-pointer"
                  >
                    ← Надіслати ще один запит
                  </button>
                </div>
              ) : (
                /* ── Интерактивная форма ─────────────────────────────── */
                <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full gap-5">
                  
                  {/* Выбор услуги (тактические пилюли) */}
                  <div>
                    <label className="block font-mono text-xs font-bold tracking-wider text-white/70 uppercase mb-2.5">
                      01 // ОБЕРІТЬ НАПРЯМОК ОХОРОНИ:
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {SERVICE_OPTIONS.map((service) => {
                        const isSelected = selectedService === service;
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium tracking-tight transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-white text-[#081d45] shadow-lg font-bold'
                                : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Поля ввода информации */}
                  <div className="space-y-3">
                    <label className="block font-mono text-xs font-bold tracking-wider text-white/70 uppercase">
                      02 // КОНТАКТНІ ДАНІ ТА ОПИС ЗАВДАННЯ:
                    </label>
                    
                    {/* Ряд 1: Имя * и Фамилия * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Ім’я *"
                          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-sm text-white placeholder-white/50 transition-colors font-medium"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Прізвище *"
                          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-sm text-white placeholder-white/50 transition-colors font-medium"
                        />
                      </div>
                    </div>

                    {/* Ряд 2: Телефон * и Фирма (опционально) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Номер телефону *"
                          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-sm text-white placeholder-white/50 transition-colors font-medium"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Назва компанії (опціонально)"
                          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-sm text-white placeholder-white/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Ряд 3: Email */}
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Електронна пошта (для отримання кошторису та договору)"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-sm text-white placeholder-white/50 transition-colors"
                      />
                    </div>

                    {/* Ряд 4: Текстовое описание / комментарий к задаче */}
                    <div>
                      <textarea
                        rows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Опишіть ваше завдання: район Києва, специфіка об'єкта або терміновість (за бажанням)..."
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-sm text-white placeholder-white/50 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Кнопка отправки (изначально светлая, при hover плавно становится черной) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                        WebkitClipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)',
                      }}
                      className="roller-host group/btn relative w-full h-14 bg-[#f2f4f7] text-[#0f1115] font-sans font-bold uppercase tracking-wider text-sm transition-all duration-300 overflow-hidden cursor-pointer select-none shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center gap-2.5 isolate active:scale-[0.99]"
                    >
                      {/* Въезжающий чёрный слой при наведении */}
                      <span className="absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] bg-[#0f1115]" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-2.5">
                        <LetterRoller
                          text={isSubmitting ? 'ВІДПРАВКА ЗАПИТУ...' : 'НАДІСЛАТИ ЗАПИТ ЧЕРГОВОМУ'}
                          className="font-bold tracking-wider"
                          restClassName="text-[#0f1115]"
                          hoverClassName="text-white"
                        />
                        <Send className="w-4 h-4 text-[#0f1115] group-hover/btn:text-white transition-all duration-300 transform group-hover/btn:translate-x-1 shrink-0" />
                      </span>
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-white/60 text-center">
                      <Lock className="w-3.5 h-3.5 text-blue-300" />
                      <span>Дані захищені. Повна конфіденційність та дотримання NDA.</span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
