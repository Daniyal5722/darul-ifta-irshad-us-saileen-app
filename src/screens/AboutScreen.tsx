import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import { OFFICIAL_LOGO } from '../data/mockData';
import {
  Info,
  ShieldCheck,
  Award,
  CheckCircle2,
  Compass,
  BookOpen,
  Users,
  MapPin,
} from 'lucide-react';

interface AboutScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] p-5 text-white shadow-lg border border-[#D4AF37]/35 flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-white/10 p-2 flex items-center justify-center border border-[#D4AF37]/30 shadow-md">
          <img
            src={OFFICIAL_LOGO}
            alt="Emblem"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <div>
          <span className="text-xs font-bold text-[#D1AC5B] uppercase tracking-wider block mb-1">
            مرکزی ادارہ • کراچی، پاکستان
          </span>
          <h2 className="font-arabic font-bold text-xl sm:text-2xl text-white">
            دار الإفتاء إرشاد السائلين
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            Darul Ifta Irshad us Saileen Karachi
          </p>
        </div>

        <div className="w-full pt-3 border-t border-white/10 flex items-center justify-around text-xs text-[#D1AC5B]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>مسلکِ اہلِ سنت</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>فقہِ حنفی</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>اعتدال و تحقیق</span>
          </span>
        </div>
      </section>

      {/* 2. Institutional Introduction */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
          <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'تعارف و پس منظر' : 'Introduction & Heritage'}
          </h3>
        </div>
        <p className="font-urdu text-xs sm:text-sm text-[#0b1c30] dark:text-white/90 leading-loose text-left rtl:text-right">
          دار الإفتاء إرشاد السائلين کراچی ایک معتبر دینی و فقہی ادارہ ہے جو حضرت مولانا مفتی عبد المنان صاحب دامت برکاتہم العالیہ کی زیرِ سرپرستی و ادارت عوام الناس، تجارتی حلقوں اور ملکی و بین الاقوامی سائلین کو قرآن و سنت اور فقہ حنفی کی روشنی میں مستند شرعی رہنمائی فراہم کر رہا ہے۔
        </p>
      </section>

      {/* 3. Core Pillars / Methodology */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'اصول و منہجِ افتاء' : 'Scholarly Methodology'}
          </h3>
        </div>

        <div className="flex flex-col gap-2.5 text-xs text-[#061A34] dark:text-white">
          {[
            {
              title: 'قرآن و سنت کی اتباع',
              desc: 'ہر مسئلے میں بنیادی مرجع کتاب اللہ اور سنتِ رسول ﷺ کی قطعی نصوص ہیں۔',
            },
            {
              title: 'ائمۂ احناف کی فقہی روایت',
              desc: 'امامِ اعظم ابو حنیفہؒ اور فقہائے احناف کے معتبر فتاویٰ (فتاویٰ عالمگیری، رد المحتار، المبسوط) کی روشنی میں احکام کا استخراج۔',
            },
            {
              title: 'اعتدال و شریعت کی آسانی',
              desc: 'افراط و تفریط، غلو اور بے جا سختی سے اجتناب اور شرعی رخصتوں کے دائرے میں رہ کر رہنمائی۔',
            },
            {
              title: 'جدید معاملات و معیشت کا گہرا فہم',
              desc: 'جدید بینکاری، ڈیجیٹل مالیات، ای کامرس اور سائنسی پیش رفت کا جدید تقاضوں کے مطابق شرعی تجزیہ۔',
            },
            {
              title: 'رازداری اور امانتِ افتاء',
              desc: 'سائلین کی شناخت، خاندانی تنازعات اور ذاتی معاملات کی مکمل شرعی حفاظت و رازداری۔',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34]/50 border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-1 text-left rtl:text-right"
            >
              <span className="font-bold text-[#7a580f] dark:text-[#D1AC5B]">{item.title}</span>
              <p className="text-[#75777e] dark:text-[#94A3B8] leading-relaxed font-urdu">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Leadership Quote Card */}
      <section className="rounded-2xl bg-[#FBF9F3] dark:bg-[#132544] p-4 text-center border border-[#D4AF37]/30 flex flex-col items-center gap-2">
        <div className="w-14 h-14 rounded-full bg-[#061A34] border-2 border-[#D4AF37] shadow-sm flex flex-col items-center justify-center p-1">
          <BookOpen className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <p className="font-urdu text-xs sm:text-sm text-[#061A34] dark:text-white leading-relaxed italic">
          "ہماری اولین کوشش یہ ہے کہ ہر مسلمان کو اس کی انفرادی، معاشی اور معاشرتی زندگی میں رضائے الٰہی کے مطابق زندگی گزارنے کا صحیح طریقہ میسر آئے۔"
        </p>
        <span className="text-xs font-bold text-[#7a580f] dark:text-[#D1AC5B]">
          — حضرت مولانا مفتی عبد المنان صاحب (رئیس دارالافتاء)
        </span>
      </section>

      {/* 5. Address & Location */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'مرکزی پتہ و دفتری رابطہ' : 'Headquarters & Location'}
          </h3>
        </div>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed">
          المجیب گارڈن A31، کراچی، سندھ، پاکستان
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="mt-1 w-full h-10 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <span>{t.contact}</span>
        </button>
      </section>
    </div>
  );
};
