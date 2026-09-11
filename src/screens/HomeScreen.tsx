import React, { useState, useEffect, useCallback } from 'react';
import { Screen, Language, Fatwa, DailyPrayerData } from '../types';
import { translations } from '../data/translations';
import { mockFatwas, mockServices } from '../data/mockData';
import {
  fetchLiveKarachiPrayerTimes,
  getDefaultPrayerData,
  determineActivePrayer,
} from '../services/prayerAndCalendarService';
import {
  Search,
  PhoneCall,
  Edit3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Heart,
  Quote,
  Clock,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Sunrise,
  Wifi,
  BookOpen,
} from 'lucide-react';

interface HomeScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onSelectFatwa: (fatwa: Fatwa) => void;
  onSearchTopic: (query: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentLanguage,
  onNavigate,
  onSelectFatwa,
  onSearchTopic,
}) => {
  const t = translations[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');
  const [prayerData, setPrayerData] = useState<DailyPrayerData>(() => getDefaultPrayerData());
  const [isRefreshingPrayer, setIsRefreshingPrayer] = useState(false);
  const [refreshSuccessText, setRefreshSuccessText] = useState<string | null>(null);

  // Fetch online prayer times & auto-sync dates
  const loadPrayerTimes = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshingPrayer(true);
    try {
      const data = await fetchLiveKarachiPrayerTimes();
      setPrayerData(data);
      if (isManual) {
        setRefreshSuccessText(
          currentLanguage === 'ur'
            ? 'انٹرنیٹ سے اوقات اپڈیٹ ہوگئے'
            : currentLanguage === 'ar'
            ? 'تم تحديث الأوقات عبر الإنترنت'
            : 'Prayer times updated via Internet'
        );
        setTimeout(() => setRefreshSuccessText(null), 3000);
      }
    } catch (err) {
      console.warn('Error refreshing prayer times:', err);
    } finally {
      if (isManual) setIsRefreshingPrayer(false);
    }
  }, [currentLanguage]);

  useEffect(() => {
    // Initial fetch from internet
    loadPrayerTimes(false);

    // Auto check every minute to update active prayer & date transition
    const interval = setInterval(() => {
      setPrayerData((prev) => {
        const activeName = determineActivePrayer(prev.times);
        return {
          ...prev,
          times: prev.times.map((item) => ({
            ...item,
            current: item.nameEn === activeName,
          })),
        };
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [loadPrayerTimes]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchTopic(searchQuery.trim());
      onNavigate('fatwas');
    }
  };

  const sunriseItem = prayerData.times.find((t) => t.nameEn === 'Sunrise');

  return (
    <div className="flex flex-col gap-4 pb-10">
      {/* 1. Islamic Calendar & Live Karachi Prayer Times Card */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5">
        {/* Top Header: Islamic Calendar title + Live Internet Status + Refresh Button */}
        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-[#061A34] dark:text-[#D1AC5B]">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.islamicCalendar}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                prayerData.isOnline
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                  : 'bg-[#eff4ff] dark:bg-white/10 text-[#7a580f] dark:text-[#D1AC5B]'
              }`}
              title="طریقہ کار: جامعہ العلوم الاسلامیہ بنوری ٹاؤن کراچی (حنفی)"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  prayerData.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className="text-[11px]">
                {prayerData.isOnline
                  ? currentLanguage === 'ur'
                    ? 'انٹرنیٹ لائیو اوقات'
                    : currentLanguage === 'ar'
                    ? 'أوقات متصلة بالإنترنت'
                    : 'Online Timings'
                  : t.karachiTime}
              </span>
            </div>

            {/* Manual Internet Namaz Check Button */}
            <button
              onClick={() => loadPrayerTimes(true)}
              disabled={isRefreshingPrayer}
              aria-label="Check Namaz Time via Internet"
              title={
                currentLanguage === 'ur'
                  ? 'انٹرنیٹ سے نماز کے تازہ اوقات حاصل کریں'
                  : 'Check latest prayer times via Internet'
              }
              className="p-1 rounded-lg bg-[#eff4ff] hover:bg-[#e0eaff] dark:bg-white/10 dark:hover:bg-white/15 text-[#061A34] dark:text-[#D1AC5B] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshingPrayer ? 'animate-spin text-[#D4AF37]' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Dynamic Dates Display (Auto-changing Islamic & Gregorian) */}
        <div className="flex items-baseline justify-between pt-0.5 border-b border-[#E2E8F0] dark:border-white/5 pb-2.5">
          <span className="font-arabic font-bold text-[#061A34] dark:text-white text-lg">
            {currentLanguage === 'en'
              ? prayerData.hijriDateEn
              : currentLanguage === 'ar'
              ? prayerData.hijriDateAr
              : prayerData.hijriDate}
          </span>
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">
            {currentLanguage === 'en'
              ? prayerData.gregorianDateEn
              : currentLanguage === 'ar'
              ? prayerData.gregorianDateAr
              : prayerData.gregorianDate}
          </span>
        </div>

        {/* 5 Daily Prayer Times Grid */}
        <div className="grid grid-cols-5 gap-1.5 pt-3">
          {prayerData.times
            .filter((time) => time.nameEn !== 'Sunrise')
            .map((item) => (
              <div
                key={item.nameEn}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                  item.current
                    ? 'bg-[#061A34] text-white dark:bg-[#D4AF37] dark:text-[#061A34] shadow-sm ring-2 ring-[#D4AF37]/40'
                    : 'bg-[#eff4ff] dark:bg-[#061A34]/50 text-[#061A34] dark:text-white'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-[11px] opacity-85 leading-none mb-1 font-medium">
                    {currentLanguage === 'ur'
                      ? item.nameUr
                      : currentLanguage === 'ar'
                      ? item.nameAr
                      : item.nameEn}
                  </span>
                  {item.current && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] dark:bg-[#061A34] -mt-1" />
                  )}
                </div>
                <span className="text-xs font-bold leading-none">
                  {item.time.replace(/ (AM|PM)/, '')}
                </span>
                <span className="text-[9px] opacity-65 mt-0.5">
                  {item.time.includes('AM') ? 'AM' : 'PM'}
                </span>
              </div>
            ))}
        </div>

        {/* Sunrise & Calculation Source Strip */}
        <div className="mt-2.5 pt-2 border-t border-[#E2E8F0]/60 dark:border-white/5 flex items-center justify-between text-[11px] text-[#75777e] dark:text-[#94A3B8]">
          {sunriseItem && (
            <div className="flex items-center gap-1">
              <Sunrise className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {currentLanguage === 'ur'
                  ? `طلوعِ آفتاب: ${sunriseItem.time}`
                  : currentLanguage === 'ar'
                  ? `الشروق: ${sunriseItem.time}`
                  : `Sunrise: ${sunriseItem.time}`}
              </span>
            </div>
          )}

          <span className="text-[10px] text-[#7a580f] dark:text-[#D1AC5B] truncate max-w-[200px]">
            {refreshSuccessText ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold animate-pulse">
                ✓ {refreshSuccessText}
              </span>
            ) : (
              currentLanguage === 'ur'
                ? 'معیار: جامعہ بنوری ٹاؤن (حنفی)'
                : 'Method: Banuri Town (Hanafi)'
            )}
          </span>
        </div>
      </section>

      {/* 2. Hero Dark Navy Banner: Prominent "Online Fatwa" CTA & Direct Call */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] text-white p-5 shadow-lg border border-[#D4AF37]/25">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[#D1AC5B] text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>دار الإفتاء إرشاد السائلين کراچی</span>
            </div>
            <span className="text-[11px] text-[#94A3B8]">Karachi, PK</span>
          </div>

          <p className="font-urdu text-base sm:text-lg text-[#FBF9F3] leading-relaxed text-right rtl:text-right ltr:text-left">
            {t.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('ask')}
              className="h-12 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#D1AC5B] text-[#061A34] font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>{t.onlineFatwaCTA}</span>
            </button>

            <a
              href="tel:+923332617671"
              className="h-12 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/10 active:scale-98 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#D1AC5B]" />
              <span>{t.urgentCall}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Global Fatwa Search Box with Instant Topic Pills */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full h-12 pr-11 pl-20 bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white rounded-xl text-sm outline-none placeholder:text-[#75777e] focus:ring-2 focus:ring-[#D4AF37]/40 transition-all border border-[#E2E8F0] dark:border-white/10"
          />
          <div className="absolute right-3.5 text-[#75777e] pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <button
            type="submit"
            className="absolute left-1.5 h-9 px-3 rounded-lg bg-[#061A34] text-white text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm dark:bg-[#D4AF37] dark:text-[#061A34]"
          >
            <span>{t.search}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </form>

        {/* Quick Topic Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8] shrink-0 font-medium">
            {currentLanguage === 'ur' ? 'اہم عنوانات:' : 'Key Topics:'}
          </span>
          {[
            { label: t.worship, query: 'عبادات' },
            { label: currentLanguage === 'ur' ? 'زکوٰۃ و صدقات' : 'Zakat', query: 'زکوٰۃ' },
            { label: t.transactions, query: 'تجارت' },
            { label: t.family, query: 'نکاح' },
            { label: t.inheritance, query: 'وراثت' },
          ].map((topic) => (
            <button
              key={topic.query}
              type="button"
              onClick={() => {
                onSearchTopic(topic.query);
                onNavigate('fatwas');
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-white text-xs hover:bg-[#D4AF37]/20 transition-all border border-[#E2E8F0] dark:border-white/5"
            >
              {topic.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Core Services Grid (Fatwa, Education, Publications, Advisory) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#D4AF37]" />
            <h2 className="font-bold text-[#061A34] dark:text-white text-base">
              {currentLanguage === 'ur' ? 'خدماتِ دارالافتاء' : t.services}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs text-[#7a580f] dark:text-[#D1AC5B] font-semibold flex items-center gap-0.5"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {mockServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onNavigate('services')}
              className="bg-white dark:bg-[#132544] rounded-2xl p-3.5 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col justify-between min-h-[135px] cursor-pointer hover:border-[#D4AF37]/40 active:scale-98 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="text-left rtl:text-right">
                <h3 className="font-bold text-sm text-[#061A34] dark:text-white mb-0.5 leading-snug">
                  {srv.title[currentLanguage]}
                </h3>
                <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-tight line-clamp-2">
                  {srv.description[currentLanguage]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Lead Scholar Spotlight Card */}
      <section className="rounded-2xl bg-[#FBF9F3] dark:bg-[#132544] text-[#061A34] dark:text-white p-4 shadow-sm border border-[#D4AF37]/30 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#7a580f] dark:text-[#D1AC5B] text-[11px] font-bold">
            {t.leadScholar}
          </span>
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">
            {currentLanguage === 'ur' ? 'علمی رہنمائی کے امین' : 'Academic Leadership'}
          </span>
        </div>

        <div className="flex gap-3 items-center flex-row-reverse rtl:flex-row mb-3">
          <div className="w-16 h-16 shrink-0 rounded-full bg-[#061A34] shadow-md border-2 border-[#D4AF37] flex flex-col items-center justify-center p-1">
            <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            <span className="text-[9px] text-[#D1AC5B] font-bold font-urdu leading-none mt-0.5">رئیس</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1 text-left rtl:text-right">
            <h3 className="font-bold text-base text-[#061A34] dark:text-white leading-tight truncate">
              حضرت مولانا مفتی عبد المنان صاحب
            </h3>
            <p className="text-xs text-[#7a580f] dark:text-[#D1AC5B] font-semibold mt-0.5">
              Hazrat Maulana Mufti Abdul Mannan Sahib
            </p>
            <p className="text-xs text-[#75777e] dark:text-[#94A3B8] mt-1 leading-snug line-clamp-2">
              بانی و رئیس دارالافتاء و شیخ الحدیث، جامعہ کے سینئر استاد الحدیث و مفتی
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('scholars')}
          className="w-full h-10 px-3 rounded-xl bg-[#061A34] hover:bg-[#132544] dark:bg-[#D4AF37] dark:hover:bg-[#D1AC5B] text-white dark:text-[#061A34] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
        >
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] dark:text-[#061A34]" />
          <span>{t.viewProfileAndFatwas}</span>
        </button>
      </section>

      {/* 6. Recent & Featured Fatwas */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#10B981]" />
            <h2 className="font-bold text-[#061A34] dark:text-white text-base">{t.recentFatwas}</h2>
          </div>
          <button
            onClick={() => onNavigate('fatwas')}
            className="text-xs text-[#7a580f] dark:text-[#D1AC5B] font-semibold flex items-center gap-0.5"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {mockFatwas.slice(0, 3).map((fatwa) => (
            <article
              key={fatwa.id}
              onClick={() => {
                onSelectFatwa(fatwa);
                onNavigate('fatwa-detail');
              }}
              className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2 cursor-pointer hover:border-[#D4AF37]/40 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] text-[11px] font-semibold">
                  {fatwa.categoryName[currentLanguage]}
                </span>
                <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">
                  #{fatwa.fatwaNumber}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#061A34] dark:text-white leading-snug">
                {fatwa.title[currentLanguage]}
              </h3>

              <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed line-clamp-2">
                {fatwa.summary[currentLanguage]}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0] dark:border-white/5 mt-1">
                <div className="flex items-center gap-1 text-[#10B981] text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.certifiedFatwaBoard}</span>
                </div>
                <div className="text-xs text-[#061A34] dark:text-[#D1AC5B] font-bold flex items-center gap-1">
                  <span>{t.readFullFatwa}</span>
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Prophetic Hadith Banner */}
      <section className="rounded-2xl bg-white dark:bg-[#132544] p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#D4AF37]">
            <Quote className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.propheticHadith}</span>
          </div>
          <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">صحیح البخاری</span>
        </div>

        <div className="p-3 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] text-center border border-[#D4AF37]/20">
          <p className="font-arabic text-base sm:text-lg text-[#061A34] dark:text-[#D1AC5B] font-semibold leading-relaxed">
            مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ
          </p>
        </div>

        <p className="font-urdu text-xs sm:text-sm text-[#061A34] dark:text-white/90 text-right leading-relaxed">
          ترجمہ: اللہ تعالیٰ جس کے ساتھ بھلائی کا ارادہ فرماتا ہے، اُسے دین کی گہری سمجھ اور فقہ عطا فرما دیتا ہے۔
        </p>
      </section>

      {/* 8. Sadaqah Jariyah Support Card */}
      <section className="rounded-2xl bg-[#eff4ff] dark:bg-[#1A2F54] p-4 shadow-sm border border-[#b9c7e4]/30 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#061A34] dark:text-[#D1AC5B] uppercase">
            {t.sadaqahJariyah}
          </span>
          <Heart className="w-4 h-4 text-[#D4AF37]" />
        </div>

        <div className="text-left rtl:text-right">
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">{t.supportDawah}</h3>
          <p className="text-xs text-[#75777e] dark:text-[#94A3B8] mt-1 leading-normal">
            {t.supportDawahDesc}
          </p>
        </div>

        <button
          onClick={() => onNavigate('donation')}
          className="mt-1 w-full h-11 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 text-[#D4AF37] dark:text-[#061A34]" />
          <span>{t.donateOnline}</span>
        </button>
      </section>

      {/* 9. Contact Summary Card */}
      <section className="rounded-2xl bg-white dark:bg-[#132544] p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#061A34] dark:text-[#D1AC5B] uppercase">
            {t.contactInfo}
          </span>
          <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">Karachi Center</span>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          <a
            href="tel:+923332617671"
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#061A34] dark:text-white"
          >
            <span className="font-bold tracking-wider" dir="ltr">
              +92 333 2617671
            </span>
            <span className="text-[#75777e] dark:text-[#94A3B8] font-medium">{t.phone}</span>
          </a>

          <a
            href="mailto:ask.darulifta.irshadussaileen@gmail.com"
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#061A34] dark:text-white"
          >
            <span className="font-medium truncate max-w-[200px]" dir="ltr">
              ask.darulifta.irshadussaileen@gmail.com
            </span>
            <span className="text-[#75777e] dark:text-[#94A3B8] font-medium shrink-0">
              {t.email}
            </span>
          </a>

          <div className="p-2.5 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#061A34] dark:text-white flex items-start justify-between">
            <span className="text-[#75777e] dark:text-[#94A3B8] leading-snug">
              Al Mujeeb Garden A31, Karachi, Pakistan
            </span>
            <span className="text-[#75777e] dark:text-[#94A3B8] font-medium shrink-0 ml-2">
              {t.address}
            </span>
          </div>
        </div>

        <p className="text-[10px] text-center text-[#75777e] dark:text-[#94A3B8] pt-1">
          {t.copyright}
        </p>
      </section>
    </div>
  );
};
