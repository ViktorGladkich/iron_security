import { forwardRef } from 'react';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { companyInfo } from '../../../data/companyInfo';

export const FooterContactsCol = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="lg:col-span-4 will-change-transform">
      <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-5">
        // КОНТАКТИ ШТАБУ
      </h4>
      <ul className="space-y-3.5 text-xs font-mono">
        <li>
          <a
            href={`tel:${companyInfo.phone}`}
            className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-blue-600/30 flex items-center justify-center text-blue-400 transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm tracking-tight font-sans">
              {companyInfo.phoneDisplay}
            </span>
          </a>
        </li>

        <li>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-blue-600/30 flex items-center justify-center text-blue-400 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span>Telegram: @iron_security_hq</span>
          </a>
        </li>

        <li>
          <a
            href={`mailto:${companyInfo.email}`}
            className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-blue-600/30 flex items-center justify-center text-blue-400 transition-colors">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span>{companyInfo.email}</span>
          </a>
        </li>

        <li className="flex items-start gap-2.5 text-zinc-400 pt-1">
          <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 shrink-0">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <span className="leading-snug">{companyInfo.location}</span>
        </li>
      </ul>
    </div>
  );
});

FooterContactsCol.displayName = 'FooterContactsCol';
