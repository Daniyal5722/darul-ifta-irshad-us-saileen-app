import React, { useState } from 'react';
import { Screen, Language, Fatwa } from '../types';
import { translations } from '../data/translations';
import { mockFatwas } from '../data/mockData';
import {
  CheckCircle2,
  Bookmark,
  Printer,
  Share2,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  ChevronLeft,
  Send,
  Lock,
  Award,
} from 'lucide-react';

interface FatwaDetailScreenProps {
  fatwa: Fatwa;
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onSelectFatwa: (fatwa: Fatwa) => void;
  isSaved: boolean;
  onToggleBookmark: (fatwaId: string) => void;
  onShare: (title: string, text: string) => void;
}

export const FatwaDetailScreen: React.FC<FatwaDetailScreenProps> = ({
  fatwa,
  currentLanguage,
  onNavigate,
  onSelectFatwa,
  isSaved,
  onToggleBookmark,
  onShare,
}) => {
  const t = translations[currentLanguage];
  const [fontScale, setFontScale] = useState(100);
  const [helpfulVoted, setHelpfulVoted] = useState<'yes' | 'no' | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(fatwa.helpfulCount);

  const handleVote = (type: 'yes' | 'no') => {
    if (!helpfulVoted) {
      setHelpfulVoted(type);
      if (type === 'yes') {
        setHelpfulCount((prev) => prev + 1);
      }
    }
  };

  const handleIncreaseFont = () => {
    if (fontScale < 135) setFontScale((prev) => prev + 10);
  };

  const handleDecreaseFont = () => {
    if (fontScale > 85) setFontScale((prev) => prev - 10);
  };

  const relatedFatwas = mockFatwas.filter((item) => item.id !== fatwa.id).slice(0, 3);

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Scholarly Context Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] p-4 text-white shadow-md border border-[#D4AF37]/30">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#D4AF37]/10 pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10 mb-2">
          <div className="flex items-center gap-1.5 text-[#D1AC5B] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLanguage === 'ur' ? 'مصدقہ شرعی فتویٰ' : 'Certified Shariah Fatwa'}</span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-medium">
            {fatwa.categoryName[currentLanguage]}
          </span>
        </div>

        <div className="mt-1 flex flex-col gap-1 relative z-10 text-left rtl:text-right">
          <div className="flex items-baseline justify-between">
            <h2 className="font-bold text-lg text-[#D1AC5B] tracking-tight">
              {currentLanguage === 'ur' ? `فتویٰ نمبر: ${fatwa.fatwaNumber}` : `Fatwa #${fatwa.fatwaNumber}`}
            </h2>
            <span className="text-xs text-[#94A3B8]">دار الإفتاء إرشاد السائلين</span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            {currentLanguage === 'ur'
              ? `تاریخِ اجراء: ${fatwa.hijriDate} / ${fatwa.gregorianDate}`
              : `Date: ${fatwa.hijriDate} / ${fatwa.gregorianDate}`}
          </p>
        </div>
      </section>

      {/* 2. Reading Controls (A- / A+ / Bookmark / PDF / Share) */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-2.5 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleDecreaseFont}
            className="w-8 h-8 rounded-lg bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-white flex items-center justify-center text-xs font-bold active:scale-95 transition-all"
            aria-label="Decrease Font"
          >
            A-
          </button>
          <span className="text-xs font-mono px-1 text-[#75777e] dark:text-[#94A3B8]">
            {fontScale}%
          </span>
          <button
            type="button"
            onClick={handleIncreaseFont}
            className="w-8 h-8 rounded-lg bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-white flex items-center justify-center text-xs font-bold active:scale-95 transition-all"
            aria-label="Increase Font"
          >
            A+
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onToggleBookmark(fatwa.id)}
            className={`h-8 px-2.5 rounded-lg flex items-center gap-1 text-xs font-medium active:scale-95 transition-all ${
              isSaved
                ? 'bg-[#D4AF37]/20 text-[#7a580f] dark:text-[#D1AC5B]'
                : 'bg-[#FBF9F3] dark:bg-white/10 text-[#75777e] dark:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-[#D4AF37]' : ''}`} />
            <span>{isSaved ? t.bookmarkSaved : t.save}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="h-8 px-2.5 rounded-lg bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-medium flex items-center gap-1 active:scale-95 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.pdfDownload}</span>
          </button>

          <button
            type="button"
            onClick={() => onShare(fatwa.title[currentLanguage], fatwa.summary[currentLanguage])}
            className="w-8 h-8 rounded-lg bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white flex items-center justify-center active:scale-95 transition-all"
            aria-label="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Supervisory Scholar Endorsement Ribbon */}
      <section className="bg-[#FBF9F3] dark:bg-[#132544] rounded-2xl p-3.5 border border-[#D4AF37]/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#061A34] text-[#D1AC5B] flex items-center justify-center shrink-0 shadow-sm">
            <Award className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col min-w-0 text-left rtl:text-right">
            <span className="text-[11px] text-[#7a580f] dark:text-[#D1AC5B]">
              {currentLanguage === 'ur' ? 'زیرِ نگرانی و تصدیق:' : 'Supervised & Ratified by:'}
            </span>
            <span className="font-bold text-sm text-[#061A34] dark:text-white truncate">
              {fatwa.scholar.name}
            </span>
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8] truncate">
              {fatwa.scholar.title}
            </span>
          </div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping shrink-0" />
      </section>

      {/* 4. Inquirer's Question Card */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
            <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white">
              {currentLanguage === 'ur' ? 'سائل کا سوال' : "Seeker's Question"}
            </h3>
          </div>
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">
            {fatwa.inquirerLocation[currentLanguage]}
          </span>
        </div>

        <div className="bg-[#f8f9ff] dark:bg-[#061A34]/60 rounded-xl p-3.5 border border-[#E2E8F0] dark:border-white/5">
          <p
            className="font-urdu text-sm sm:text-base leading-relaxed text-[#0b1c30] dark:text-white/90 text-left rtl:text-right"
            style={{ fontSize: `${fontScale}%` }}
          >
            {fatwa.question[currentLanguage]}
          </p>
        </div>
      </section>

      {/* 5. Main Ruling Section (الجواب وباللہ التوفیق) */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-5 shadow-md border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-4">
        {/* Basmalah & Praises */}
        <div className="text-center pb-2 border-b border-[#E2E8F0] dark:border-white/5">
          <p className="font-arabic text-base sm:text-lg text-[#7a580f] dark:text-[#D1AC5B] font-bold leading-relaxed">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-arabic text-sm text-[#061A34] dark:text-white/80 mt-0.5">
            حامداً ومصلیاً ومسلماً
          </p>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-2 opacity-60 rounded-full" />
        </div>

        {/* Dynamic Ruling Text */}
        <div
          className="flex flex-col gap-3.5 text-[#0b1c30] dark:text-white font-urdu leading-loose text-left rtl:text-right transition-all"
          style={{ fontSize: `${fontScale}%` }}
        >
          <p className="font-bold text-[#061A34] dark:text-[#D1AC5B] text-base">
            {currentLanguage === 'ur'
              ? 'الجواب وباللہ التوفیق:'
              : currentLanguage === 'ar'
              ? 'الجواب وبالله التوفيق:'
              : 'Answer with Divine Guidance:'}
          </p>

          <p className="leading-loose">{fatwa.ruling[currentLanguage]}</p>

          {/* Quranic Ayah Card if present */}
          {fatwa.quranicAyah && (
            <div className="rounded-2xl bg-[#FBF9F3] dark:bg-[#061A34] p-4 text-center border border-[#D4AF37]/30 my-1">
              <div className="flex items-center justify-center gap-1.5 text-[#D4AF37] mb-1.5 text-xs font-bold uppercase">
                <BookOpen className="w-4 h-4" />
                <span>{currentLanguage === 'ur' ? 'فرمانِ باری تعالیٰ' : 'Divine Decree'}</span>
              </div>
              <p className="font-arabic text-base sm:text-lg text-[#061A34] dark:text-white font-bold leading-loose">
                {fatwa.quranicAyah.arabic}
              </p>
              <span className="block mt-1 text-xs text-[#7a580f] dark:text-[#D1AC5B] font-bold">
                [{fatwa.quranicAyah.reference}]
              </span>
              <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
                {fatwa.quranicAyah.translation[currentLanguage]}
              </p>
            </div>
          )}

          {/* Scholarly Citations Panel */}
          {fatwa.citations && fatwa.citations.length > 0 && (
            <div className="rounded-xl bg-[#eff4ff] dark:bg-[#061A34]/50 p-3.5 text-left rtl:text-right border border-[#b9c7e4]/30 my-1">
              <h4 className="font-bold text-xs text-[#061A34] dark:text-[#D1AC5B] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currentLanguage === 'ur' ? 'فقہی حوالہ جات و نصوص:' : 'Scholarly Citations & Jurisprudence:'}</span>
              </h4>
              <div className="flex flex-col gap-2">
                {fatwa.citations.map((cite, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-[#132544] border border-[#E2E8F0] dark:border-white/5 text-xs">
                    <p className="font-bold text-[#061A34] dark:text-white">{cite.book}</p>
                    <p className="italic text-[#75777e] dark:text-[#94A3B8] mt-0.5 font-arabic">"{cite.text}"</p>
                    <span className="text-[11px] text-[#7a580f] dark:text-[#D1AC5B] font-semibold mt-1 block">
                      {cite.reference}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-center font-bold text-[#7a580f] dark:text-[#D1AC5B] text-sm pt-2">
            وَاللَّهُ تَعَالَى أَعْلَمُ بِالصَّوَابِ
          </p>
        </div>

        {/* 6. Official Authentication Stamp & Mufti Signature Script */}
        <div className="mt-4 pt-4 bg-[#FBF9F3] dark:bg-[#061A34] rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-[#D4AF37]/40 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white dark:bg-[#132544] flex items-center justify-center text-[#D4AF37] shadow-md mb-2 border-2 border-[#D4AF37]">
            <Award className="w-8 h-8" />
          </div>

          <p className="text-xs font-bold text-[#061A34] dark:text-white">
            دار الإفتاء جامعہ إرشاد السائلین
          </p>
          <p className="text-[11px] text-[#7a580f] dark:text-[#D1AC5B]">
            کراچی، پاکستان — رجسٹرڈ نمبر: {fatwa.referenceCode}
          </p>

          <div className="my-2 py-1 px-4 rounded-lg bg-white/70 dark:bg-white/10 border border-[#D4AF37]/30">
            <span className="font-arabic font-bold text-sm text-[#061A34] dark:text-[#D1AC5B]">
              العَبدُ المُفتِی عَبد الحَنَان عُفِيَ عَنْه
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#10B981] text-[11px] font-bold mt-0.5">
            <Lock className="w-3.5 h-3.5" />
            <span>تصدیق شدہ ڈیجیٹل ریکارڈ</span>
          </div>
        </div>
      </section>

      {/* 7. Helpful Feedback Voting */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-3.5 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-2">
        <span className="font-bold text-xs sm:text-sm text-[#061A34] dark:text-white">
          {t.wasFatwaHelpful}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleVote('yes')}
            disabled={helpfulVoted !== null}
            className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
              helpfulVoted === 'yes'
                ? 'bg-[#10B981] text-white shadow-sm'
                : 'bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>
              {t.yes} ({helpfulCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleVote('no')}
            disabled={helpfulVoted !== null}
            className={`h-8 px-3 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
              helpfulVoted === 'no'
                ? 'bg-[#BE123C] text-white shadow-sm'
                : 'bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>{t.no}</span>
          </button>
        </div>
      </section>

      {/* 8. Related Fatwas */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-bold text-sm text-[#061A34] dark:text-white">{t.relatedFatwas}</h3>
          </div>
          <span className="text-xs text-[#7a580f] dark:text-[#D1AC5B] font-medium">
            {currentLanguage === 'ur' ? 'مزید مطالعہ' : 'Explore'}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {relatedFatwas.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectFatwa(item)}
              className="bg-white dark:bg-[#132544] rounded-xl p-3 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-3 cursor-pointer hover:border-[#D4AF37]/40 active:scale-98 transition-all"
            >
              <div className="flex flex-col min-w-0 text-left rtl:text-right flex-1">
                <span className="text-[10px] text-[#7a580f] dark:text-[#D1AC5B] font-semibold">
                  فتویٰ #{item.fatwaNumber}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-[#061A34] dark:text-white truncate">
                  {item.title[currentLanguage]}
                </h4>
                <span className="text-[10px] text-[#75777e] dark:text-[#94A3B8]">
                  {item.hijriDate}
                </span>
              </div>
              <ChevronLeft className="w-4 h-4 text-[#75777e] rtl:rotate-180 shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* 9. Floating Bottom Action: Inquire New Fatwa */}
      <section className="bg-[#eff4ff] dark:bg-[#1A2F54] rounded-2xl p-4 text-center border border-[#b9c7e4]/30 flex flex-col items-center gap-2">
        <HelpCircle className="w-6 h-6 text-[#061A34] dark:text-[#D1AC5B]" />
        <h4 className="font-bold text-sm text-[#061A34] dark:text-white">{t.haveFiqhQuestion}</h4>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] max-w-xs leading-normal">
          {t.haveFiqhQuestionDesc}
        </p>
        <button
          onClick={() => onNavigate('ask')}
          className="mt-1 px-5 py-2.5 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
        >
          <span>{t.askNewFatwa}</span>
          <Send className="w-3.5 h-3.5 rtl:rotate-180" />
        </button>
      </section>
    </div>
  );
};
