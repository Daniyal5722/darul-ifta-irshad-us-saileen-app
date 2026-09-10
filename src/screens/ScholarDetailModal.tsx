import React from 'react';
import { Screen, Language, Scholar } from '../types';
import { translations } from '../data/translations';
import { SCHOLAR_PORTRAIT } from '../data/mockData';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Clock,
  MessageCircle,
  CheckCircle2,
  ChevronLeft,
  Mail,
  Building,
} from 'lucide-react';

interface ScholarDetailModalProps {
  scholar: Scholar;
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onGoBack: () => void;
}

export const ScholarDetailModal: React.FC<ScholarDetailModalProps> = ({
  scholar,
  currentLanguage,
  onNavigate,
  onGoBack,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Scholar Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] p-5 text-white shadow-lg border border-[#D4AF37]/35 flex flex-col items-center text-center gap-3">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10 p-1 border-2 border-[#D4AF37] shadow-lg">
          <img
            src={scholar.isLead ? SCHOLAR_PORTRAIT : SCHOLAR_PORTRAIT}
            alt={scholar.name[currentLanguage]}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-[#10B981] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>تصدیق شدہ مفتی • دارالافتاء کراچی</span>
          </div>
          <h2 className="font-bold text-lg sm:text-xl text-[#FBF9F3]">{scholar.name[currentLanguage]}</h2>
          <span className="text-xs text-[#D1AC5B] font-semibold">{scholar.title[currentLanguage]}</span>
          <span className="text-[11px] text-[#94A3B8]">{scholar.role[currentLanguage]}</span>
        </div>

        {/* Quick Stats */}
        <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="bg-white/5 rounded-xl py-2">
            <span className="text-sm font-bold text-[#D1AC5B] block">{scholar.verifiedFatwas}+</span>
            <span className="text-[10px] text-[#94A3B8] block">فتاویٰ کی تصدیق و اجراء</span>
          </div>
          <div className="bg-white/5 rounded-xl py-2">
            <span className="text-sm font-bold text-[#D1AC5B] block">اہل سنت والجماعت</span>
            <span className="text-[10px] text-[#94A3B8] block">منہج و فقہِ حنفی</span>
          </div>
        </div>
      </section>

      {/* 2. Full Biography */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'سوانح حیات و علمی خدمات' : 'Biography & Scholarly Profile'}
          </h3>
        </div>
        <p className="font-urdu text-xs sm:text-sm text-[#0b1c30] dark:text-white/90 leading-relaxed text-left rtl:text-right">
          {scholar.bio[currentLanguage]}
        </p>
      </section>

      {/* 3. Areas of Expertise / Specialization */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'شعبہ جاتِ تخصص' : 'Areas of Expertise'}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            'تخصص فی الفقہ والافتاء (Hanafi Jurisprudence)',
            'تدریس کتبِ حدیث (Bukhari & Muslim)',
            'معاملات و مالیاتی امور (Islamic Commercial Contracts)',
            'عائلی و خاندانی تنازعات (Family Dispute Arbitration)',
            'میراث و ترکہ کی تقسیم (Inheritance Distribution)',
          ].map((item, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-[#f8f9ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] text-xs font-semibold border border-[#E2E8F0] dark:border-white/10"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* 4. Consultation & Office Timings */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'اوقاتِ ملاقات و مجلسِ افتاء' : 'Consultation Hours'}
          </h3>
        </div>

        <div className="p-3 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] border border-[#D4AF37]/20 flex flex-col gap-1.5 text-xs text-[#061A34] dark:text-white">
          <div className="flex justify-between items-center">
            <span className="font-bold">پیر تا جمعرات:</span>
            <span>صبح ۱۰:۰۰ بجے تا ۱:۰۰ بجے دوپہر</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">بعد نمازِ عصر:</span>
            <span>عصر تا مغرب (خصوصی شرعی مشاورت)</span>
          </div>
          <div className="flex justify-between items-center text-[#75777e] dark:text-[#94A3B8] pt-1 border-t border-[#D4AF37]/20">
            <span>مقام:</span>
            <span>المجیب گارڈن A31، کراچی</span>
          </div>
        </div>
      </section>

      {/* 5. Direct Question Submission for this Scholar */}
      <section className="flex flex-col gap-2 pt-1">
        <button
          onClick={() => onNavigate('ask')}
          className="w-full h-12 rounded-xl bg-[#061A34] hover:bg-[#132544] dark:bg-[#D4AF37] dark:hover:bg-[#D1AC5B] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
        >
          <BookOpen className="w-4 h-4" />
          <span>{currentLanguage === 'ur' ? 'حضرت مفتی صاحب سے سوال پوچھیں' : 'Submit Question to Scholar'}</span>
        </button>

        <a
          href="https://wa.me/923017671222"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 rounded-xl bg-white dark:bg-[#132544] text-[#061A34] dark:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-[#E2E8F0] dark:border-white/10 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-[#10B981]" />
          <span>{currentLanguage === 'ur' ? 'واٹس ایپ پر رابطہ کریں' : 'WhatsApp Inquiry'}</span>
        </a>
      </section>
    </div>
  );
};
