import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import { OFFICIAL_LOGO } from '../data/mockData';
import {
  X,
  Layers,
  BookMarked,
  HeartHandshake,
  PhoneCall,
  Info,
  Share2,
  Settings,
  ChevronRight,
  Bookmark,
  ShieldCheck,
} from 'lucide-react';

interface MoreMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
}

export const MoreMenuSheet: React.FC<MoreMenuSheetProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onNavigate,
}) => {
  if (!isOpen) return null;
  const t = translations[currentLanguage];

  const menuItems = [
    {
      screen: 'services' as Screen,
      title: t.services,
      subtitle: currentLanguage === 'ur' ? 'ادارہ جاتی شعبہ جات' : 'Departments & Services',
      icon: Layers,
      badge: currentLanguage === 'ur' ? '۴ شعبہ جات' : '4 Core Services',
    },
    {
      screen: 'publications' as Screen,
      title: t.publications,
      subtitle: currentLanguage === 'ur' ? 'کتب، رسائل و مضامین' : 'Books, Journals & PDFs',
      icon: BookMarked,
      badge: currentLanguage === 'ur' ? 'مفت پی ڈی ایف' : 'Free PDFs',
    },
    {
      screen: 'donation' as Screen,
      title: t.donation,
      subtitle: currentLanguage === 'ur' ? 'میزان بینک اکاؤنٹ' : 'Meezan Bank Contribution',
      icon: HeartHandshake,
      badge: currentLanguage === 'ur' ? 'صدقہ جاریہ' : 'Sadaqah Jariyah',
    },
    {
      screen: 'contact' as Screen,
      title: t.contact,
      subtitle: currentLanguage === 'ur' ? 'کال، واٹس ایپ و پتہ' : 'Phone, WhatsApp & Office',
      icon: PhoneCall,
      badge: currentLanguage === 'ur' ? 'کراچی مرکز' : 'Karachi HQ',
    },
    {
      screen: 'about' as Screen,
      title: t.about,
      subtitle: currentLanguage === 'ur' ? 'منہج، مقاصد و سرپرستی' : 'Methodology & Leadership',
      icon: Info,
      badge: currentLanguage === 'ur' ? 'اہل سنت والجماعت' : 'Hanafi Fiqh',
    },
    {
      screen: 'social' as Screen,
      title: t.socialMedia,
      subtitle: currentLanguage === 'ur' ? 'آفیشل چینلز و نیٹ ورکس' : 'Official Verified Channels',
      icon: Share2,
      badge: currentLanguage === 'ur' ? 'یوٹیوب و واٹس ایپ' : 'YouTube & WhatsApp',
    },
    {
      screen: 'bookmarks' as Screen,
      title: t.bookmarks,
      subtitle: currentLanguage === 'ur' ? 'محفوظ کردہ فتاویٰ' : 'Your Saved Rulings',
      icon: Bookmark,
      badge: undefined,
    },
    {
      screen: 'settings' as Screen,
      title: t.settings,
      subtitle: currentLanguage === 'ur' ? 'زبان، نائٹ موڈ و فونٹ' : 'Language, Night Mode & Font',
      icon: Settings,
      badge: undefined,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#061A34]/60 backdrop-blur-sm flex items-end justify-center p-0"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#f8f9ff] dark:bg-[#061A34] rounded-t-3xl max-h-[85vh] overflow-y-auto flex flex-col p-4 shadow-2xl border-t border-[#E2E8F0] dark:border-white/10 animate-in slide-in-from-bottom duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-12 h-1.5 bg-[#cbd5e1] dark:bg-white/20 rounded-full mx-auto mb-3" />

        {/* Institution Brand Header in More Menu */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] p-4 text-white shadow-md mb-4 border border-[#D4AF37]/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-white/10 p-1 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                <img
                  src={OFFICIAL_LOGO}
                  alt="Emblem"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[10px] text-[#D1AC5B] uppercase font-bold tracking-wider">
                    مرکزی دار الافتاء کراچی
                  </span>
                </div>
                <h3 className="font-arabic font-bold text-lg text-white leading-snug truncate">
                  دار الإفتاء إرشاد السائلين
                </h3>
                <p className="text-xs text-[#94A3B8] truncate">
                  Al Mujeeb Garden A31, Karachi, Pakistan
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-[#D1AC5B]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>منظور شدہ ادارہ • مسلکِ اہلِ سنت</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#94A3B8]">
              Ver 2.4.0
            </span>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex flex-col gap-2 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.screen}
                onClick={() => {
                  onNavigate(item.screen);
                  onClose();
                }}
                className="w-full p-3 rounded-xl bg-white dark:bg-[#132544] hover:bg-[#eff4ff] dark:hover:bg-[#1A2F54] border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-3 text-left transition-all active:scale-[0.99] shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0 text-left rtl:text-right">
                    <span className="text-sm font-semibold text-[#061A34] dark:text-white leading-snug truncate">
                      {item.title}
                    </span>
                    <span className="text-xs text-[#75777e] dark:text-[#94A3B8] truncate">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] dark:bg-white/10 text-[#7a580f] dark:text-[#D1AC5B]">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#c5c6cd] rtl:rotate-180" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
