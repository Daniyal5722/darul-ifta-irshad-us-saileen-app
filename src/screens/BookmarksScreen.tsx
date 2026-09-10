import React from 'react';
import { Screen, Language, Fatwa } from '../types';
import { translations } from '../data/translations';
import { mockFatwas } from '../data/mockData';
import {
  Bookmark,
  BookOpen,
  Trash2,
  ChevronLeft,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface BookmarksScreenProps {
  savedFatwaIds: string[];
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onSelectFatwa: (fatwa: Fatwa) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  savedFatwaIds,
  currentLanguage,
  onNavigate,
  onSelectFatwa,
  onRemoveBookmark,
}) => {
  const t = translations[currentLanguage];

  const savedFatwas = mockFatwas.filter((item) => savedFatwaIds.includes(item.id));

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Header */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {t.bookmarks}
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white text-xs font-bold">
          {savedFatwas.length} {currentLanguage === 'ur' ? 'فتاویٰ' : 'Fatwas'}
        </span>
      </section>

      {/* 2. List or Empty State */}
      <section className="flex flex-col gap-2.5">
        {savedFatwas.length === 0 ? (
          <div className="bg-white dark:bg-[#132544] rounded-2xl p-8 text-center flex flex-col items-center gap-3 border border-[#E2E8F0] dark:border-white/5">
            <Bookmark className="w-12 h-12 text-[#75777e] opacity-30" />
            <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
              {currentLanguage === 'ur' ? 'کوئی محفوظ شدہ فتویٰ نہیں' : 'No saved rulings yet'}
            </h3>
            <p className="text-xs text-[#75777e] dark:text-[#94A3B8] max-w-xs leading-relaxed">
              {currentLanguage === 'ur'
                ? 'فتاویٰ آرکائیو میں سے کسی بھی فتوے کے ساتھ دیے گئے بک مارک آئیکن کو دبا کر محفوظ کر سکتے ہیں۔'
                : 'Bookmark any fatwa from the archive to quickly access it offline or later.'}
            </p>
            <button
              onClick={() => onNavigate('fatwas')}
              className="mt-1 px-4 py-2 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold"
            >
              {t.fatwas}
            </button>
          </div>
        ) : (
          savedFatwas.map((fatwa) => (
            <article
              key={fatwa.id}
              className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#7a580f] dark:text-[#D1AC5B] bg-[#eff4ff] dark:bg-[#061A34] px-2 py-0.5 rounded-full">
                  #{fatwa.fatwaNumber} • {fatwa.categoryName[currentLanguage]}
                </span>
                <button
                  onClick={() => onRemoveBookmark(fatwa.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[#BE123C] hover:bg-[#BE123C]/10 active:scale-95 transition-all"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3
                onClick={() => {
                  onSelectFatwa(fatwa);
                  onNavigate('fatwa-detail');
                }}
                className="font-bold text-sm text-[#061A34] dark:text-white leading-snug cursor-pointer hover:text-[#7a580f] dark:hover:text-[#D1AC5B]"
              >
                {fatwa.title[currentLanguage]}
              </h3>

              <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed line-clamp-2">
                {fatwa.summary[currentLanguage]}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] dark:border-white/5 text-xs text-[#75777e] dark:text-[#94A3B8]">
                <span>{fatwa.scholar.name}</span>
                <button
                  onClick={() => {
                    onSelectFatwa(fatwa);
                    onNavigate('fatwa-detail');
                  }}
                  className="text-xs font-bold text-[#061A34] dark:text-[#D1AC5B] flex items-center gap-1"
                >
                  <span>{t.readFullFatwa}</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};
