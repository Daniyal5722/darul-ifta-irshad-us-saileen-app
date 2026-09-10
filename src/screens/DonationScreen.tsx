import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import { meezanBankAccount } from '../data/mockData';
import {
  HeartHandshake,
  Copy,
  CheckCircle2,
  Building,
  Quote,
  MessageCircle,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface DonationScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onCopyText: (text: string, label: string) => void;
}

export const DonationScreen: React.FC<DonationScreenProps> = ({
  currentLanguage,
  onNavigate,
  onCopyText,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Spiritual Heritage Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] p-5 text-white shadow-lg border border-[#D4AF37]/35 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#D1AC5B] text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.sadaqahJariyah}</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white font-medium">
            میزان بینک لمیٹڈ
          </span>
        </div>

        <h2 className="font-bold text-lg sm:text-xl text-[#FBF9F3] leading-snug">
          {t.supportDawah}
        </h2>

        <p className="font-urdu text-xs sm:text-sm text-[#94A3B8] leading-relaxed text-left rtl:text-right">
          {t.supportDawahDesc}
        </p>

        <div className="mt-1 pt-2 border-t border-white/10 flex items-center gap-1 text-[#10B981] text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>۱۰۰٪ امانت و دیانت داری سے شرعی مقاصد میں خرچ</span>
        </div>
      </section>

      {/* 2. Prophetic Hadith on Continuous Charity */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-[#7a580f] dark:text-[#D1AC5B]">
          <Quote className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">{t.propheticHadith}</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] border border-[#D4AF37]/20 text-center">
          <p className="font-arabic text-sm sm:text-base text-[#061A34] dark:text-white font-bold leading-loose">
            إِذَا مَاتَ الْإِنْسَانُ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ
          </p>
          <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8] block mt-1">
            [صحیح مسلم: 1631]
          </span>
        </div>

        <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] text-right leading-relaxed">
          ترجمہ: جب انسان کا انتقال ہو جاتا ہے تو اس کے اعمال کا سلسلہ بند ہو جاتا ہے سوائے تین چیزوں کے: صدقہ جاریہ، وہ علم جس سے فائدہ اٹھایا جا رہا ہو، یا نیک اولاد جو اس کے لیے دعا کرے۔
        </p>
      </section>

      {/* 3. Official Meezan Bank Account Card */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-md border border-[#D4AF37]/40 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] dark:border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#75777e] dark:text-[#94A3B8] block">
                {t.officialBankAccount}
              </span>
              <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
                {meezanBankAccount.bankName}
              </h3>
            </div>
          </div>
          <CreditCard className="w-5 h-5 text-[#D4AF37]" />
        </div>

        {/* Account Title */}
        <div className="p-3 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34]/50 border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-col text-left rtl:text-right min-w-0">
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">{t.accountTitle}</span>
            <span className="font-bold text-xs sm:text-sm text-[#061A34] dark:text-white truncate">
              {meezanBankAccount.accountTitle}
            </span>
          </div>
          <button
            onClick={() => onCopyText(meezanBankAccount.accountTitle, t.accountTitle)}
            className="h-8 px-2.5 rounded-lg bg-white dark:bg-white/10 text-[#061A34] dark:text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-xs shrink-0"
          >
            <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.copyAccount}</span>
          </button>
        </div>

        {/* Account Number */}
        <div className="p-3 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34]/50 border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-col text-left rtl:text-right min-w-0">
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">{t.accountNumber}</span>
            <span className="font-mono font-bold text-sm text-[#061A34] dark:text-[#D1AC5B] tracking-wider" dir="ltr">
              {meezanBankAccount.accountNumber}
            </span>
          </div>
          <button
            onClick={() => onCopyText(meezanBankAccount.accountNumber, t.accountNumber)}
            className="h-8 px-2.5 rounded-lg bg-white dark:bg-white/10 text-[#061A34] dark:text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-xs shrink-0"
          >
            <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.copyAccount}</span>
          </button>
        </div>

        {/* IBAN */}
        <div className="p-3 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34]/50 border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-col text-left rtl:text-right min-w-0">
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">{t.iban}</span>
            <span className="font-mono font-bold text-xs text-[#061A34] dark:text-[#D1AC5B] tracking-wider truncate" dir="ltr">
              {meezanBankAccount.iban}
            </span>
          </div>
          <button
            onClick={() => onCopyText(meezanBankAccount.iban, t.iban)}
            className="h-8 px-2.5 rounded-lg bg-white dark:bg-white/10 text-[#061A34] dark:text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-xs shrink-0"
          >
            <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.copyAccount}</span>
          </button>
        </div>

        <div className="text-[11px] text-[#75777e] dark:text-[#94A3B8] text-center pt-1">
          برانچ: {meezanBankAccount.branch}
        </div>
      </section>

      {/* 4. Receipt Notification & WhatsApp Dispatch */}
      <section className="bg-[#eff4ff] dark:bg-[#1A2F54] rounded-2xl p-4 border border-[#b9c7e4]/30 flex flex-col items-center text-center gap-2.5">
        <MessageCircle className="w-7 h-7 text-[#10B981]" />
        <h4 className="font-bold text-sm text-[#061A34] dark:text-white">
          {t.sendReceiptViaWhatsapp}
        </h4>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] max-w-xs leading-normal">
          {t.receiptInstructions}
        </p>
        <a
          href="https://wa.me/923017671222?text=السلام%20علیکم،%20دارالافتاء%20کے%20لیے%20تعاون%20کی%20رسید%20منسلک%20ہے۔"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 w-full h-11 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{currentLanguage === 'ur' ? 'واٹس ایپ پر رسید ارسال کریں' : 'Send Receipt via WhatsApp'}</span>
        </a>
      </section>
    </div>
  );
};
