import React, { useState, useMemo } from 'react';
import { Screen, Language, Fatwa } from '../types';
import { translations } from '../data/translations';
import { mockFatwas } from '../data/mockData';
import {
  Search,
  X,
  Hash,
  ArrowRight,
  Bookmark,
  Share2,
  Download,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Calendar,
  Layers,
} from 'lucide-react';

interface FatwasScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onSelectFatwa: (fatwa: Fatwa) => void;
  savedFatwaIds: string[];
  onToggleBookmark: (fatwaId: string) => void;
  onShare: (title: string, text: string) => void;
  initialSearchQuery?: string;
}

export const FatwasScreen: React.FC<FatwasScreenProps> = ({
  currentLanguage,
  onNavigate,
  onSelectFatwa,
  savedFatwaIds,
  onToggleBookmark,
  onShare,
  initialSearchQuery = '',
}) => {
  const t = translations[currentLanguage];
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'latest' | 'popular' | 'verified'>('latest');
  const [showNumberDrawer, setShowNumberDrawer] = useState(false);
  const [numberQuery, setNumberQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', label: t.allTopics },
    { id: 'worship', label: t.worship },
    { id: 'transactions', label: t.transactions },
    { id: 'family', label: t.family },
    { id: 'inheritance', label: t.inheritance },
  ];

  const filteredFatwas = useMemo(() => {
    return mockFatwas.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Number search
      if (numberQuery.trim()) {
        if (!item.fatwaNumber.includes(numberQuery.trim())) {
          return false;
        }
      }

      // Text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle =
          item.title.en.toLowerCase().includes(q) ||
          item.title.ur.toLowerCase().includes(q) ||
          item.title.ar.toLowerCase().includes(q);
        const inSummary =
          item.summary.en.toLowerCase().includes(q) ||
          item.summary.ur.toLowerCase().includes(q) ||
          item.summary.ar.toLowerCase().includes(q);
        const inNum = item.fatwaNumber.toLowerCase().includes(q);
        const inTags = item.tags.some((tag) => tag.toLowerCase().includes(q));

        return inTitle || inSummary || inNum || inTags;
      }

      return true;
    });
  }, [selectedCategory, numberQuery, searchQuery]);

  return (
    <div className="flex flex-col gap-3.5 pb-10">
      {/* 1. Search Bar & Numeric Lookup Drawer */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-3.5 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2.5">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full h-12 pr-11 pl-10 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-sm placeholder:text-[#75777e] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 transition-all border border-[#E2E8F0] dark:border-white/10"
          />
          <div className="absolute right-3.5 text-[#75777e] pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 w-7 h-7 flex items-center justify-center rounded-full text-[#75777e] hover:bg-[#eff4ff] dark:hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Numeric Lookup Toggle */}
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-1.5 text-[#7a580f] dark:text-[#D1AC5B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="font-medium">
              {currentLanguage === 'ur'
                ? 'مستند دارالافتاء ریکارڈ و تصدیق شدہ فتاویٰ'
                : 'Verified Scholarly Archive'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowNumberDrawer(!showNumberDrawer)}
            className="flex items-center gap-1 font-semibold text-[#061A34] dark:text-[#D1AC5B] active:scale-95 transition-all"
          >
            <Hash className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.numLookup}</span>
          </button>
        </div>

        {/* Collapsible Number Query Input */}
        {showNumberDrawer && (
          <div className="flex items-center gap-2 pt-1 border-t border-[#E2E8F0] dark:border-white/5 animate-in slide-in-from-top-1">
            <div className="flex-1 flex items-center bg-[#f8f9ff] dark:bg-[#061A34] rounded-xl px-3 py-2 border border-[#E2E8F0] dark:border-white/10">
              <span className="text-xs font-bold text-[#7a580f] dark:text-[#D1AC5B] mr-1.5">
                فتویٰ #
              </span>
              <input
                type="text"
                value={numberQuery}
                onChange={(e) => setNumberQuery(e.target.value)}
                placeholder="مثلاً: 1446-210"
                className="w-full bg-transparent text-sm text-[#061A34] dark:text-white outline-none"
              />
              {numberQuery && (
                <button
                  type="button"
                  onClick={() => setNumberQuery('')}
                  className="text-xs text-[#75777e]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowNumberDrawer(false)}
              className="h-10 px-3 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold active:scale-95 transition-all flex items-center gap-1"
            >
              <span>{t.search}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        )}
      </section>

      {/* 2. Horizontal Scrolling Category Pills */}
      <section className="w-full overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 min-w-max">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`h-8 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] shadow-sm'
                    : 'bg-white dark:bg-[#132544] text-[#75777e] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-white/5 hover:bg-[#eff4ff]'
                }`}
              >
                {cat.id === 'all' && <Layers className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Sorting Controls & Results Count */}
      <section className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs text-[#75777e] dark:text-[#94A3B8]">
          <span className="font-bold text-[#061A34] dark:text-white">{t.totalResults}:</span>
          <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white font-semibold">
            {filteredFatwas.length}
          </span>
        </div>

        <div className="flex items-center bg-white dark:bg-[#132544] rounded-xl p-1 shadow-sm border border-[#E2E8F0] dark:border-white/5 gap-1">
          <button
            type="button"
            onClick={() => setSortOption('latest')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              sortOption === 'latest'
                ? 'bg-[#061A34] text-[#D1AC5B] dark:bg-[#D4AF37] dark:text-[#061A34]'
                : 'text-[#75777e] dark:text-[#94A3B8]'
            }`}
          >
            {t.latest}
          </button>
          <button
            type="button"
            onClick={() => setSortOption('popular')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              sortOption === 'popular'
                ? 'bg-[#061A34] text-[#D1AC5B] dark:bg-[#D4AF37] dark:text-[#061A34]'
                : 'text-[#75777e] dark:text-[#94A3B8]'
            }`}
          >
            {t.popular}
          </button>
        </div>
      </section>

      {/* 4. Rich Fatwa Cards List */}
      <section className="flex flex-col gap-3">
        {filteredFatwas.length === 0 ? (
          <div className="bg-white dark:bg-[#132544] rounded-2xl p-8 text-center flex flex-col items-center gap-3 border border-[#E2E8F0] dark:border-white/5">
            <div className="w-12 h-12 rounded-full bg-[#eff4ff] dark:bg-[#061A34] flex items-center justify-center text-[#75777e]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-[#061A34] dark:text-white">{t.noResults}</h3>
            <p className="text-xs text-[#75777e] dark:text-[#94A3B8] max-w-xs leading-relaxed">
              {currentLanguage === 'ur'
                ? 'آپ نیا شرعی سوال ارسال کر کے مفتیانِ کرام سے جواب حاصل کر سکتے ہیں۔'
                : 'You can submit a new inquiry directly to our Muftis for an authentic ruling.'}
            </p>
            <button
              onClick={() => onNavigate('ask')}
              className="mt-1 px-4 py-2 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold"
            >
              {t.askNewFatwa}
            </button>
          </div>
        ) : (
          filteredFatwas.map((fatwa) => {
            const isSaved = savedFatwaIds.includes(fatwa.id);
            return (
              <article
                key={fatwa.id}
                className="bg-white dark:bg-[#132544] rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-white/5 overflow-hidden flex flex-col transition-all hover:border-[#D4AF37]/40"
              >
                {/* Header Strip */}
                <div className="p-3 pb-2 flex items-center justify-between bg-[#f8f9ff] dark:bg-[#061A34]/50 border-b border-[#E2E8F0] dark:border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] dark:bg-white/10 text-[#7a580f] dark:text-[#D1AC5B] text-[11px] font-bold">
                      {fatwa.categoryName[currentLanguage]}
                    </span>
                    <span className="text-[11px] font-bold text-[#061A34] dark:text-white bg-white dark:bg-[#132544] px-1.5 py-0.5 rounded border border-[#E2E8F0] dark:border-white/10">
                      #{fatwa.fatwaNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#10B981] text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.verified}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  onClick={() => {
                    onSelectFatwa(fatwa);
                    onNavigate('fatwa-detail');
                  }}
                  className="p-3.5 flex flex-col gap-2 cursor-pointer"
                >
                  <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white leading-snug hover:text-[#7a580f] dark:hover:text-[#D1AC5B] transition-colors">
                    {fatwa.title[currentLanguage]}
                  </h3>

                  <div className="p-2.5 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] border border-[#D4AF37]/20 relative">
                    <p className="font-urdu text-xs sm:text-sm text-[#061A34] dark:text-white/90 leading-relaxed line-clamp-3">
                      {fatwa.summary[currentLanguage]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs text-[#75777e] dark:text-[#94A3B8]">
                    <span className="truncate max-w-[180px] font-medium text-[#061A34] dark:text-white">
                      {fatwa.scholar.name}
                    </span>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{fatwa.hijriDate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-3 py-2 bg-[#f8f9ff] dark:bg-[#061A34]/50 border-t border-[#E2E8F0] dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(fatwa.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isSaved
                          ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                          : 'text-[#75777e] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-white/10'
                      }`}
                      aria-label="Bookmark"
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onShare(fatwa.title[currentLanguage], fatwa.summary[currentLanguage])
                      }
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#75777e] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-white/10 transition-all"
                      aria-label="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#75777e] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-white/10 transition-all"
                      aria-label="PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectFatwa(fatwa);
                      onNavigate('fatwa-detail');
                    }}
                    className="h-8 px-3 rounded-lg bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-sm"
                  >
                    <span>{t.readFullFatwa}</span>
                    <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* 5. Didn't Find Fatwa? Ask Question Callout */}
      <section className="rounded-2xl bg-white dark:bg-[#132544] p-3.5 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-3">
        <div className="flex flex-col text-left rtl:text-right min-w-0 flex-1">
          <h4 className="font-bold text-sm text-[#061A34] dark:text-white leading-tight">
            {currentLanguage === 'ur' ? 'کیا مطلوبہ فتویٰ نہیں ملا؟' : 'Looking for a specific ruling?'}
          </h4>
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8] truncate mt-0.5">
            {currentLanguage === 'ur'
              ? 'دارالافتاء کے مفتیانِ کرام سے نیا شرعی سوال پوچھیں'
              : 'Submit your query directly to our Mufti council'}
          </span>
        </div>

        <button
          onClick={() => onNavigate('ask')}
          className="h-9 px-3 rounded-xl bg-[#7a580f] dark:bg-[#D1AC5B] text-white dark:text-[#061A34] text-xs font-semibold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all shadow-sm"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{currentLanguage === 'ur' ? 'استفتاء بھیجیں' : 'Ask Question'}</span>
        </button>
      </section>

      {/* 6. Pagination & Infinite Scroll indicator */}
      <section className="flex flex-col items-center gap-2 pt-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg bg-white dark:bg-[#132544] text-[#061A34] dark:text-white flex items-center justify-center disabled:opacity-40 border border-[#E2E8F0] dark:border-white/5"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
          <span className="w-8 h-8 rounded-lg bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center shadow-sm">
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-8 h-8 rounded-lg bg-white dark:bg-[#132544] text-[#061A34] dark:text-white flex items-center justify-center border border-[#E2E8F0] dark:border-white/5"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </section>
    </div>
  );
};
