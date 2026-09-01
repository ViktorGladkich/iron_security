import React, { forwardRef } from 'react';
import { Send, Lock } from 'lucide-react';
import { LetterRoller } from '../../common/LetterRoller';
import { ContactSuccessScreen } from './ContactSuccessScreen';
import { SERVICE_OPTIONS } from './types';

interface ContactFormCardProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  company: string;
  setCompany: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  comment: string;
  setComment: (val: string) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  ticketId: string;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export const ContactFormCard = forwardRef<HTMLDivElement, ContactFormCardProps>(
  (
    {
      selectedService,
      setSelectedService,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      company,
      setCompany,
      phone,
      setPhone,
      email,
      setEmail,
      comment,
      setComment,
      isSubmitting,
      isSubmitted,
      ticketId,
      onSubmit,
      onReset,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="lg:col-span-7 flex flex-col will-change-transform">
        <div
          style={{
            background:
              'linear-gradient(155deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.03) 34%, rgba(255,255,255,0) 62%), linear-gradient(200deg, #123a86 0%, #0d2a63 45%, #0a1f4d 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,.42), inset 0 22px 46px -26px rgba(255,255,255,.25), 0 20px 40px -20px rgba(0,0,0,0.5)',
          }}
          className="relative h-full p-8 sm:p-10 md:p-11 rounded-[26px] border border-white/25 flex flex-col justify-between overflow-hidden isolate select-none transition-[border-color,box-shadow] duration-500 hover:border-white/40"
        >
          {/* Світна пляма — Luminous Gradient */}
          <div
            className="pointer-events-none absolute -inset-[20%] -z-20 transform-gpu group-hover:scale-105 transition-transform duration-700"
            style={{
              background:
                'radial-gradient(46% 52% at 74% 30%, #3b82f6 0%, rgba(59,130,246,0) 68%), radial-gradient(40% 44% at 88% 62%, #1e5fd6 0%, rgba(30,95,214,0) 70%), radial-gradient(34% 38% at 62% 18%, #67e8f9 0%, rgba(103,232,249,0) 72%)',
              filter: 'blur(50px) saturate(170%)',
            }}
          />

          {/* Ребриста поверхня скла */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.04) 20%, rgba(0,0,0,.30) 50%, rgba(255,255,255,.04) 80%, rgba(255,255,255,.20) 100%)',
              backgroundSize: '34px 100%',
            }}
          />

          {isSubmitted ? (
            <ContactSuccessScreen
              ticketId={ticketId}
              firstName={firstName}
              lastName={lastName}
              phone={phone}
              onReset={onReset}
            />
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col justify-between h-full gap-5">
              {/* 01: Выбор услуги */}
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

              {/* 02: Поля ввода информации */}
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

                {/* Ряд 4: Описание задачи */}
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

              {/* Кнопка отправки */}
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
    );
  }
);

ContactFormCard.displayName = 'ContactFormCard';
