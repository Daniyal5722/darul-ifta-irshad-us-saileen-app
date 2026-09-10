import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import { OFFICIAL_LOGO } from '../data/mockData';
import {
  Bell,
  Moon,
  Sun,
  Languages,
  ChevronLeft,
  Bookmark,
  Smartphone,
  Maximize2,
} from 'lucide-react';

interface HeaderProps {
  currentScreen: Screen;
  currentLanguage: Language;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenLanguageModal: () => void;
  onNavigate: (screen: Screen) => void;
  onGoBack: () => void;
  unreadCount?: number;
  isFramed?: boolean;
  onToggleFrame?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  currentLanguage,
  isDarkMode,
  onToggleDarkMode,
  onOpenLanguageModal,
  onNavigate,
  onGoBack,
  unreadCount = 2,
  isFramed = false,
  onToggleFrame,
}) => {
  const t = translations[currentLanguage];
  const isHomeScreen = currentScreen === 'home';

  const screenTitles: Record<Screen, { en: string; ur: string; ar: string }> = {
    home: { en: 'Home', ur: 'ہوم', ar: 'الرئيسية' },
    fatwas: { en: 'Fatwas Archive', ur: 'فتاویٰ آرکائیو', ar: 'أرشيف الفتاوى' },
    'fatwa-detail': { en: 'Fatwa Details', ur: 'تفصیلاتِ فتویٰ', ar: 'تفاصيل الفتوى' },
    ask: { en: 'Ask Fatwa', ur: 'سوال پوچھیں', ar: 'طلب فتوى' },
    'ask-success': { en: 'Submission Received', ur: 'استفتاء موصول', ar: 'تم استلام الفتوى' },
    scholars: { en: 'Scholars Directory', ur: 'علمائے کرام', ar: 'دليل العلماء' },
    'scholar-detail': { en: 'Scholar Profile', ur: 'پروفائل مفتی صاحب', ar: 'ملف العالم' },
    services: { en: 'Services', ur: 'ادارہ جاتی خدمات', ar: 'الخدمات' },
    publications: { en: 'Publications', ur: 'کتب و رسائل', ar: 'المطبوعات' },
    about: { en: 'About Darul Ifta', ur: 'تعارف دار الافتاء', ar: 'عن دار الإفتاء' },
    contact: { en: 'Contact Us', ur: 'رابطہ و پتہ', ar: 'اتصل بنا' },
    donation: { en: 'Support & Donate', ur: 'تعاون فی سبیل اللہ', ar: 'التبرع والدعم' },
    social: { en: 'Social Media', ur: 'سوشل میڈیا چینلز', ar: 'قنوات التواصل' },
    notifications: { en: 'Notifications', ur: 'اطلاعات', ar: 'الإشعارات' },
    settings: { en: 'App Settings', ur: 'ترجیحات و ترتیبات', ar: 'الإعدادات' },
    search: { en: 'Global Search', ur: 'تلاش', ar: 'البحث الشامل' },
    bookmarks: { en: 'Saved Fatwas', ur: 'محفوظ شدہ فتاویٰ', ar: 'الفتاوى المحفوظة' },
  };

  const currentTitle = screenTitles[currentScreen]?.[currentLanguage] || t.appName;

  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 dark:bg-[#061A34]/95 backdrop-blur-xl border-b border-[#E2E8F0] dark:border-white/10 transition-colors">
      <div className="max-w-md mx-auto h-16 px-3 flex items-center justify-between gap-2">
        {/* Left Side: Back button or Logo + Title */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {!isHomeScreen ? (
            <button
              onClick={onGoBack}
              className="w-10 h-10 -ml-1 rounded-xl flex items-center justify-center text-[#061A34] dark:text-white hover:bg-[#eff4ff] dark:hover:bg-white/10 active:scale-95 transition-all shrink-0"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
            </button>
          ) : null}

          <div
            className="flex items-center gap-2 cursor-pointer min-w-0"
            onClick={() => onNavigate('home')}
          >
            <div className="relative shrink-0">
              <img
                src={OFFICIAL_LOGO}
                alt="Darul Ifta Emblem"
                className="h-9 w-auto object-contain rounded-md"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="font-arabic font-bold text-[#061A34] dark:text-white text-base truncate">
                  دار الإفتاء
                </span>
                <span className="text-[11px] font-bold text-[#7a580f] dark:text-[#D1AC5B] truncate">
                  إرشاد السائلين
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[#44474d] dark:text-[#94A3B8] truncate">
                  Karachi
                </span>
                <span className="text-[#c5c6cd] text-[8px]">•</span>
                <span className="text-[11px] text-[#D4AF37] font-semibold truncate uppercase">
                  {currentTitle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Mobile frame toggle */}
          {onToggleFrame && (
            <button
              onClick={onToggleFrame}
              title={isFramed ? 'Full Width' : 'Phone Bezel Frame'}
              className="w-9 h-9 hidden sm:flex items-center justify-center rounded-lg text-[#75777e] dark:text-[#94A3B8] hover:bg-[#eff4ff] dark:hover:bg-white/10 active:scale-95 transition-all"
            >
              {isFramed ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </button>
          )}

          {/* Language Switcher button */}
          <button
            onClick={onOpenLanguageModal}
            className="h-8 px-2 flex items-center gap-1 rounded-lg bg-[#eff4ff] dark:bg-[#132544] text-[#061A34] dark:text-[#D1AC5B] active:scale-95 transition-all text-xs font-semibold border border-[#E2E8F0] dark:border-white/5"
            aria-label="Change Language"
          >
            <Languages className="w-3.5 h-3.5 text-[#7a580f] dark:text-[#D1AC5B]" />
            <span>{currentLanguage === 'ur' ? 'اردو' : currentLanguage === 'ar' ? 'عربي' : 'Eng'}</span>
          </button>

          {/* Saved Bookmarks */}
          <button
            onClick={() => onNavigate('bookmarks')}
            className={`w-9 h-9 flex items-center justify-center rounded-lg active:scale-95 transition-all ${
              currentScreen === 'bookmarks'
                ? 'bg-[#061A34] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-[#061A34]'
                : 'text-[#75777e] dark:text-[#94A3B8] hover:bg-[#eff4ff] dark:hover:bg-white/10'
            }`}
            aria-label="Bookmarks"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Notification Button with badge */}
          <button
            onClick={() => onNavigate('notifications')}
            className={`relative w-9 h-9 flex items-center justify-center rounded-lg active:scale-95 transition-all ${
              currentScreen === 'notifications'
                ? 'bg-[#061A34] text-white dark:bg-white/20'
                : 'text-[#75777e] dark:text-[#94A3B8] hover:bg-[#eff4ff] dark:hover:bg-white/10'
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#BE123C] ring-2 ring-white dark:ring-[#061A34]" />
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-[#75777e] dark:text-[#D1AC5B] hover:bg-[#eff4ff] dark:hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
