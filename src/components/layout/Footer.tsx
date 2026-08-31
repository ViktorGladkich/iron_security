import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

import { companyInfo } from '../../data/companyInfo';

export const Footer: React.FC = () => {
  return (
    <footer id="contacts" className="relative w-full px-[15px] pb-[15px] pt-4 text-zinc-400">
      <div className="rounded-[20px] overflow-hidden bg-[#0a0c12] border border-white/10 py-12 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src="/images/iron_shield_icon.png"
                alt="IRON SECURITY"
                className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
              />
              <span className="font-display font-medium text-xl tracking-wider text-zinc-300">
                IRON SECURITY
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
              Провідна ліцензована охоронна компанія у Києві. Комплексна безпека: фізична охорона обʼєктів, персональний захист перших осіб, супровід бізнесу та мобільні групи швидкого реагування.
            </p>
            <div className="font-mono text-xs text-blue-400">
              ЛІЦЕНЗОВАНА ОХОРОННА ДІЯЛЬНІСТЬ // М. КИЇВ // 24/7
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Навігація
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Послуги безпеки</a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-white transition-colors">Наші переваги</a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-white transition-colors">Дислокація в Києві</a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-white transition-colors">Контакти чергової частини</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Зв'язок 24/7
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-slate-400" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors">
                  {companyInfo.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{companyInfo.location}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-4">
          <div>
            © {new Date().getFullYear()} IRON SECURITY. Всі права захищено.
          </div>
          <div className="flex items-center gap-6">
            <span>КОНФІДЕНЦІЙНІСТЬ</span>
            <span>БЕЗПЕКА 24/7</span>
            <span>КИЇВ</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
};
