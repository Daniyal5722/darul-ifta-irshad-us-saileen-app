import React, { useState } from 'react';
import { Screen, Language, Publication } from '../types';
import { translations } from '../data/translations';
import { mockPublications } from '../data/mockData';
import {
  BookMarked,
  Download,
  BookOpen,
  FileText,
  Search,
  CheckCircle2,
  X,
  Share2,
} from 'lucide-react';

interface PublicationsScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onShare: (title: string, text: string) => void;
}

export const PublicationsScreen: React.FC<PublicationsScreenProps> = ({
  currentLanguage,
  onNavigate,
  onShare,
}) => {
  const t = translations[currentLanguage];
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState<Publication | null>(null);

  const filteredBooks = mockPublications.filter((book) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      book.title.ur.toLowerCase().includes(q) ||
      book.title.en.toLowerCase().includes(q) ||
      book.author.ur.toLowerCase().includes(q) ||
      book.author.en.toLowerCase().includes(q) ||
      book.description.ur.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Publications Header */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-1 text-left rtl:text-right">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'علمی و تحقیقی کتب و رسائل' : 'Research Publications & Books'}
          </h2>
        </div>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed">
          {currentLanguage === 'ur'
            ? 'دارالافتاء کے مفتیانِ کرام اور محققین کی تصنیف کردہ کتب، فتاویٰ کے مجموعے اور رسائلِ افتاء'
            : 'Explore downloadable research papers, treatises, and published Fatawa volumes.'}
        </p>

        {/* Search */}
        <div className="relative mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={currentLanguage === 'ur' ? 'کتاب یا مصنف کا نام تلاش کریں...' : 'Search books or authors...'}
            className="w-full h-11 pr-10 pl-4 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-xs outline-none border border-[#E2E8F0] dark:border-white/10"
          />
          <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-[#75777e]" />
        </div>
      </section>

      {/* 2. Publications Grid / List */}
      <section className="flex flex-col gap-3">
        {filteredBooks.map((book) => (
          <article
            key={book.id}
            className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col sm:flex-row gap-3.5 transition-all hover:border-[#D4AF37]/40"
          >
            {/* Book Spine / Cover Preview */}
            <div className="w-20 h-28 rounded-xl bg-gradient-to-br from-[#061A34] to-[#132544] text-[#D1AC5B] p-2 flex flex-col justify-between shrink-0 shadow-md border border-[#D4AF37]/30 self-center sm:self-start">
              <div className="text-[9px] font-bold tracking-tight text-white/70">
                دارالافتاء کراچی
              </div>
              <p className="font-urdu font-bold text-xs text-center text-[#FBF9F3] leading-tight line-clamp-3">
                {book.title.ur}
              </p>
              <div className="text-[8px] text-right text-white/50">{book.pages} صفحات</div>
            </div>

            {/* Book Details */}
            <div className="flex flex-col justify-between flex-1 text-left rtl:text-right min-w-0">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] dark:bg-white/10 text-[#7a580f] dark:text-[#D1AC5B]">
                    {book.fileSize} • {book.category}
                  </span>
                  <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">
                    {book.pages} صفحات
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white leading-snug">
                  {book.title[currentLanguage]}
                </h3>

                <span className="text-xs text-[#7a580f] dark:text-[#D1AC5B] font-semibold">
                  مؤلف: {book.author[currentLanguage]}
                </span>

                <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed line-clamp-2 mt-0.5">
                  {book.description[currentLanguage]}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-[#E2E8F0] dark:border-white/5 mt-2">
                <button
                  onClick={() => setReadingBook(book)}
                  className="flex-1 h-9 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'ur' ? 'آن لائن مطالعہ' : 'Read Online'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="h-9 px-3 rounded-xl bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={() => onShare(book.title[currentLanguage], book.description[currentLanguage])}
                  className="w-9 h-9 rounded-xl bg-[#eff4ff] dark:bg-white/10 text-[#75777e] dark:text-white flex items-center justify-center active:scale-95 transition-all"
                  aria-label="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 3. In-App Book Reader Modal */}
      {readingBook && (
        <div className="fixed inset-0 z-50 bg-[#061A34]/80 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="w-full max-w-lg bg-white dark:bg-[#132544] rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto border border-[#D4AF37]/30">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] dark:border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white truncate max-w-xs">
                  {readingBook.title[currentLanguage]}
                </h3>
              </div>
              <button
                onClick={() => setReadingBook(null)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] dark:bg-white/10 flex items-center justify-center text-[#75777e] dark:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] border border-[#D4AF37]/20 text-left rtl:text-right">
              <p className="font-arabic font-bold text-sm text-[#7a580f] dark:text-[#D1AC5B] text-center mb-2">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <h4 className="font-bold text-sm text-[#061A34] dark:text-white mb-1">
                مقدمۂ کتاب و تعارف:
              </h4>
              <p className="font-urdu text-xs sm:text-sm text-[#061A34] dark:text-white/90 leading-loose">
                {readingBook.description[currentLanguage]}
              </p>
              <div className="mt-3 pt-2 border-t border-[#D4AF37]/20 text-xs text-[#75777e] dark:text-[#94A3B8]">
                مؤلف: {readingBook.author} • کل صفحات: {readingBook.pages} • ادارۂ اشاعت: مکتبہ ارشا السائلین کراچی
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 h-11 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>مکمل نسخہ ڈاؤن لوڈ کریں ({readingBook.fileSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
