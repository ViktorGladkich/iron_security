import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ContactSuccessScreenProps {
  ticketId: string;
  firstName: string;
  lastName: string;
  phone: string;
  onReset: () => void;
}

export const ContactSuccessScreen: React.FC<ContactSuccessScreenProps> = ({
  ticketId,
  firstName,
  lastName,
  phone,
  onReset,
}) => {
  return (
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
        onClick={onReset}
        className="text-xs font-mono font-bold uppercase tracking-wider text-white hover:text-blue-200 underline underline-offset-4 cursor-pointer"
      >
        ← Надіслати ще один запит
      </button>
    </div>
  );
};
