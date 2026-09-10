import React, { useState } from 'react';
import { Screen, Language, Scholar } from '../types';
import { translations } from '../data/translations';
import { mockScholars, SCHOLAR_PORTRAIT } from '../data/mockData';
import {
  GraduationCap,
  Award,
  BookOpen,
  MessageCircle,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

interface ScholarsScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onSelectScholar: (scholar: Scholar) => void;
}

export const ScholarsScreen: React.FC<ScholarsScreenProps> = ({
  currentLanguage,
  onNavigate,
  onSelectScholar,
}) => {
  const t = translations[currentLanguage];
  const [selectedDept, setSelectedDept] = useState('all');

  const leadScholar = mockScholars.find((s) => s.isLead) || mockScholars[0];
  const facultyScholars = mockScholars.filter((s) => !s.isLead);

  const depts = [
    { id: 'all', label: t.allTopics },
    { id: 'ifta', label: currentLanguage === 'ur' ? 'افتاء و حدیث' : 'Ifta & Hadith' },
    { id: 'trade', label: currentLanguage === 'ur' ? 'معاملات و تجارت' : 'Islamic Finance' },
    { id: 'family', label: currentLanguage === 'ur' ? 'خاندانی قوانین' : 'Family Law' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Header Banner */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-1 text-left rtl:text-right">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'دارالافتاء کے علمائے کرام و اساتذہ' : 'Scholars & Faculty Directory'}
          </h2>
        </div>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed">
          {currentLanguage === 'ur'
            ? 'جامعہ کے اساتذہ، مفتیانِ کرام اور محققین کی تفصیلی علمی سوانح و خدمات'
            : 'Explore the credentials and published rulings of our esteemed faculty.'}
        </p>
      </section>

      {/* 2. Lead Scholar Spotlight Card */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] p-4 text-white shadow-lg border border-[#D4AF37]/35 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#061A34] text-xs font-bold shadow-sm">
            {t.leadScholar}
          </span>
          <div className="flex items-center gap-1 text-[#10B981] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>تصدیق شدہ مفتی اعظم</span>
          </div>
        </div>

        <div className="flex gap-3.5 items-center flex-row-reverse rtl:flex-row">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 p-0.5 shrink-0 border-2 border-[#D4AF37] shadow-md">
            <img
              src={SCHOLAR_PORTRAIT}
              alt={leadScholar.name[currentLanguage]}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div className="flex flex-col min-w-0 flex-1 text-left rtl:text-right">
            <h3 className="font-bold text-base sm:text-lg text-[#FBF9F3] leading-tight">
              {leadScholar.name[currentLanguage]}
            </h3>
            <span className="text-xs text-[#D1AC5B] font-semibold mt-0.5">
              {leadScholar.title[currentLanguage]}
            </span>
            <p className="text-xs text-[#94A3B8] mt-1 leading-snug line-clamp-2 font-urdu">
              {leadScholar.bio[currentLanguage]}
            </p>
          </div>
        </div>

        {/* Scholar Achievement Statistics */}
        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10 text-center">
          <div className="bg-white/5 rounded-xl py-2 px-1">
            <span className="text-xs font-bold text-[#D1AC5B] block">۲۵,۰۰۰+</span>
            <span className="text-[10px] text-[#94A3B8] block">فتاویٰ جاری</span>
          </div>
          <div className="bg-white/5 rounded-xl py-2 px-1">
            <span className="text-xs font-bold text-[#D1AC5B] block">۲۲+ سال</span>
            <span className="text-[10px] text-[#94A3B8] block">تدریس حدیث</span>
          </div>
          <div className="bg-white/5 rounded-xl py-2 px-1">
            <span className="text-xs font-bold text-[#D1AC5B] block">۱۴۰+</span>
            <span className="text-[10px] text-[#94A3B8] block">فضلائے افتاء</span>
          </div>
        </div>

        {/* Lead Scholar Direct Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => {
              onSelectScholar(leadScholar);
              onNavigate('scholar-detail');
            }}
            className="flex-1 h-10 rounded-xl bg-[#D4AF37] text-[#061A34] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
          >
            <Award className="w-4 h-4" />
            <span>{currentLanguage === 'ur' ? 'مکمل علمی سوانح' : 'View Profile'}</span>
          </button>

          <a
            href="https://wa.me/923332617671"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 h-10 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#10B981]" />
            <span>{currentLanguage === 'ur' ? 'براہِ راست رابطہ' : 'WhatsApp'}</span>
          </a>
        </div>
      </section>

      {/* 3. Department Filter Pills */}
      <section className="w-full overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {depts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDept(d.id)}
              className={`h-8 px-3.5 rounded-full text-xs font-semibold transition-all ${
                selectedDept === d.id
                  ? 'bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] shadow-sm'
                  : 'bg-white dark:bg-[#132544] text-[#75777e] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-white/5'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Faculty Scholars List */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
            <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
              {currentLanguage === 'ur' ? 'ارکانِ دارالافتاء و اساتذہ کرام' : 'Darul Ifta Faculty'}
            </h3>
          </div>
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">
            {facultyScholars.length} {currentLanguage === 'ur' ? 'ارکان' : 'Members'}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {facultyScholars.map((scholar) => (
            <article
              key={scholar.id}
              onClick={() => {
                onSelectScholar(scholar);
                onNavigate('scholar-detail');
              }}
              className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2.5 cursor-pointer hover:border-[#D4AF37]/40 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#061A34] dark:text-white truncate">
                  {scholar.name[currentLanguage]}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eff4ff] dark:bg-white/10 text-[#7a580f] dark:text-[#D1AC5B] font-semibold shrink-0">
                  {scholar.role[currentLanguage]}
                </span>
              </div>

              <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed line-clamp-2 text-left rtl:text-right">
                {scholar.bio[currentLanguage]}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] dark:border-white/5 text-xs text-[#75777e] dark:text-[#94A3B8]">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{scholar.verifiedFatwas} {currentLanguage === 'ur' ? 'فتاویٰ کی توثیق' : 'Fatwas'}</span>
                </div>

                <div className="flex items-center gap-0.5 text-[#061A34] dark:text-[#D1AC5B] font-bold">
                  <span>{currentLanguage === 'ur' ? 'پروفائل دیکھیں' : 'View Profile'}</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
