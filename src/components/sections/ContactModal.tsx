import React, { useState } from 'react';
import { X, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { servicesData } from '../../data/services';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceId?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultServiceId,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: defaultServiceId || 'personal-security',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация отправки формы
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d0f14] border border-zinc-700 p-6 sm:p-8 shadow-2xl">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-zinc-800 border border-slate-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-['Syne'] font-bold text-lg text-white uppercase tracking-wider">
              ЗАМОВИТИ ОХОРОНУ
            </h3>
            <p className="text-xs font-mono text-zinc-400">IRON SECURITY // КИЇВ 24/7</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="font-['Syne'] text-xl font-bold text-white uppercase">
              Запит прийнято
            </h4>
            <p className="text-sm text-zinc-400 max-w-xs mx-auto">
              Черговий офіцер звʼяжеться з вами протягом 3-5 хвилин для узгодження деталей.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Ваше ім'я / Компанія
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Олександр"
                className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-slate-300 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Контактний телефон
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+380 (__) ___-__-__"
                className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-slate-300 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Послуга
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white focus:outline-none focus:border-slate-300 transition-colors"
              >
                {servicesData.map((s) => (
                  <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Короткі деталі (локація, дата, специфіка)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Охорона офісу на Печерську, 2 пости..."
                className="w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-slate-300 transition-colors resize-none"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
              Надіслати запит черговому
            </Button>

            <p className="text-[11px] font-mono text-zinc-400 text-center">
              Гарантія 100% конфіденційності та захисту даних
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
