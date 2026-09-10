import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import { CheckCircle2, Copy, Home, BookOpen, ShieldCheck } from 'lucide-react';

interface QuestionSubmittedScreenProps {
  referenceNumber: string;
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onCopyReference: (ref: string) => void;
}

export const QuestionSubmittedScreen: React.FC<QuestionSubmittedScreenProps> = ({
  referenceNumber,
  currentLanguage,
  onNavigate,
  onCopyReference,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center animate-in zoom-in-95 duration-200">
      <div className="w-20 h-20 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mb-4 shadow-sm border border-[#10B981]/20">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <h2 className="font-bold text-xl text-[#061A34] dark:text-white leading-snug">
        {t.submissionSuccessTitle}
      </h2>

      {/* Reference Number Box */}
      <div className="mt-4 p-3 rounded-2xl bg-white dark:bg-[#132544] border border-[#D4AF37]/30 shadow-sm flex items-center justify-between gap-3 w-full max-w-xs">
        <div className="flex flex-col text-left rtl:text-right">
          <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">{t.referenceNumber}</span>
          <span className="font-mono font-bold text-sm text-[#061A34] dark:text-[#D1AC5B]">
            {referenceNumber}
          </span>
        </div>
        <button
          onClick={() => onCopyReference(referenceNumber)}
          className="h-8 px-2.5 rounded-lg bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
        >
          <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{t.copyAccount}</span>
        </button>
      </div>

      <p className="mt-4 text-xs sm:text-sm text-[#75777e] dark:text-[#94A3B8] max-w-sm leading-relaxed">
        {t.submissionSuccessDesc}
      </p>

      {/* Trust Seal Note */}
      <div className="mt-6 p-3 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] border border-[#D4AF37]/20 flex items-center gap-2 text-xs text-[#7a580f] dark:text-[#D1AC5B] max-w-xs">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span className="text-left rtl:text-right leading-tight">
          دارالافتاء کا علمی و شرعی منہج: مسلکِ اہلِ سنت والجماعت اور فقہ حنفی۔
        </span>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-2.5 w-full max-w-xs">
        <button
          onClick={() => onNavigate('home')}
          className="w-full h-12 rounded-xl bg-[#061A34] hover:bg-[#132544] dark:bg-[#D4AF37] dark:hover:bg-[#D1AC5B] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <button
          onClick={() => onNavigate('fatwas')}
          className="w-full h-12 rounded-xl bg-white dark:bg-[#132544] text-[#061A34] dark:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-[#E2E8F0] dark:border-white/10 active:scale-95 transition-all hover:bg-[#eff4ff]"
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.fatwas}</span>
        </button>
      </div>
    </div>
  );
};
