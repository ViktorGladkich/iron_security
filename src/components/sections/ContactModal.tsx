import React, { useState, useEffect } from 'react';
import { X, Lock, Send } from 'lucide-react';
import { Button } from '../common/Button';
import { SERVICE_OPTIONS } from './Contact/types';
import { ContactSuccessScreen } from './Contact/ContactSuccessScreen';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultService = SERVICE_OPTIONS[0],
}) => {
  const [selectedService, setSelectedService] = useState<string>(defaultService);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Надёжная блокировка скролла страницы при открытом модальном окне
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedTicket = `IRN-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setCompany('');
    setEmail('');
    setComment('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Замовити охорону"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 bg-slate-950/80 backdrop-blur-xl overscroll-contain touch-none overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Карточка модального окна — компактная ширина (max-w-[530px]) без полосы прокрутки */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(155deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.03) 34%, rgba(255,255,255,0) 62%), linear-gradient(200deg, #123a86 0%, #0d2a63 45%, #0a1f4d 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,.42), inset 0 22px 46px -26px rgba(255,255,255,.25), 0 30px 70px rgba(0,0,0,0.7)',
        }}
        className="touch-auto relative w-full max-w-[530px] p-5 sm:p-7 md:p-8 rounded-[24px] border border-white/25 flex flex-col justify-between overflow-hidden isolate select-none transition-all duration-500 my-auto"
      >
        {/* Luminous Glow — світна пляма */}
        <div
          className="pointer-events-none absolute -inset-[20%] -z-20 transform-gpu"
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

        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрити вікно"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* Экран успешной отправки */
          <ContactSuccessScreen
            ticketId={ticketId}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            onReset={handleReset}
          />
        ) : (
          /* Форма заявки */
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-3.5">
            {/* Лаконичный заголовок */}
            <div className="pr-8">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wider leading-tight">
                ЗАМОВИТИ ОХОРОНУ
              </h3>
            </div>

            {/* 01: Выбор направления охраны */}
            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-white/70 uppercase mb-1.5">
                01 // ОБЕРІТЬ НАПРЯМОК ОХОРОНИ:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SERVICE_OPTIONS.map((service) => {
                  const isSelected = selectedService === service;
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#0a1f4d] font-bold shadow-[0_4px_12px_rgba(255,255,255,0.35)] scale-[1.02]'
                          : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 02: Полный набор полей ввода */}
            <div className="space-y-2 sm:space-y-2.5">
              <label className="block font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-white/70 uppercase">
                02 // КОНТАКТНІ ДАНІ ТА ОПИС:
              </label>

              {/* Ряд 1: Имя * и Фамилия * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ім’я *"
                    className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-xs sm:text-[13px] text-white placeholder-white/50 transition-colors font-medium"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Прізвище *"
                    className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-xs sm:text-[13px] text-white placeholder-white/50 transition-colors font-medium"
                  />
                </div>
              </div>

              {/* Ряд 2: Номер телефона * и Название компании */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Номер телефону *"
                    className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-xs sm:text-[13px] text-white placeholder-white/50 transition-colors font-medium font-mono"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Назва компанії (опціонально)"
                    className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-xs sm:text-[13px] text-white placeholder-white/50 transition-colors font-medium"
                  />
                </div>
              </div>

              {/* Ряд 3: Email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Електронна пошта (для отримання кошторису)"
                  className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-xs sm:text-[13px] text-white placeholder-white/50 transition-colors font-medium"
                />
              </div>

              {/* Ряд 4: Описание задачи / Локация */}
              <div>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Опишіть ваше завдання: район Києва, специфіка об'єкта або терміновість..."
                  className="w-full px-3 py-1.5 rounded-xl bg-black/30 border border-white/20 focus:border-white focus:bg-black/40 focus:outline-none text-xs sm:text-[13px] text-white placeholder-white/50 transition-colors resize-none font-medium"
                />
              </div>
            </div>

            {/* Кнопка отправки */}
            <div className="pt-0.5">
              <Button
                type="submit"
                variant="primary"
                size="md"
                chamferSize={10}
                disabled={isSubmitting}
                icon={<Send className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="w-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)] h-11 sm:h-12"
              >
                {isSubmitting ? 'ВІДПРАВКА ЗАПИТУ...' : 'НАДІСЛАТИ ЗАПИТ ЧЕРГОВОМУ'}
              </Button>
            </div>

            {/* Нижняя плашка конфиденциальности */}
            <div className="flex items-center justify-center text-[10px] sm:text-[11px] font-mono text-blue-200/70">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-blue-300" />
                100% Конфіденційність та захист персональних даних
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
