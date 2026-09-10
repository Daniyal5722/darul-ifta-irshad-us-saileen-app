import React from 'react';
import { Language } from '../types';
import { Check, Globe, X } from 'lucide-react';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  const languages: Array<{ code: Language; name: string; nativeName: string; dir: 'ltr' | 'rtl' }> = [
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
    { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#061A34]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="w-full max-w-md bg-white dark:bg-[#132544] rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200 border border-[#E2E8F0] dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-[#E2E8F0] dark:bg-white/20 rounded-full mx-auto sm:hidden" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#061A34] dark:text-white text-base">Select Language / زبان کا انتخاب</h3>
              <p className="text-xs text-[#75777e] dark:text-[#94A3B8]">Choose your preferred reading language</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] dark:bg-white/10 flex items-center justify-center text-[#75777e] dark:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl flex items-center justify-between border transition-all ${
                  isSelected
                    ? 'bg-[#061A34] text-white border-[#D4AF37] shadow-md dark:bg-[#061A34]'
                    : 'bg-[#f8f9ff] dark:bg-[#1A2F54] text-[#0b1c30] dark:text-white border-[#E2E8F0] dark:border-white/5 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#061A34]'
                        : 'bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </div>
                  <div className="text-left">
                    <span className="font-semibold block leading-tight">{lang.nativeName}</span>
                    <span className="text-xs opacity-70 block">{lang.name}</span>
                  </div>
                </div>

                {isSelected && <Check className="w-5 h-5 text-[#D4AF37]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
