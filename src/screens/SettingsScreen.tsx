import React, { useState } from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import {
  Settings,
  Languages,
  Moon,
  Sun,
  Type,
  Bell,
  Trash2,
  Info,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface SettingsScreenProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (screen: Screen) => void;
  onShowToast: (msg: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentLanguage,
  onSelectLanguage,
  isDarkMode,
  onToggleDarkMode,
  onNavigate,
  onShowToast,
}) => {
  const t = translations[currentLanguage];

  const [fontScale, setFontScale] = useState(100);
  const [prayerNotifications, setPrayerNotifications] = useState(true);
  const [fatwaNotifications, setFatwaNotifications] = useState(true);

  const languages: Array<{ code: Language; name: string; nativeName: string }> = [
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const handleClearCache = () => {
    localStorage.clear();
    onShowToast(currentLanguage === 'ur' ? 'کیشے اور عارضی ڈیٹا صاف کر دیا گیا۔' : 'Cache and local data cleared.');
  };

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Header */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center gap-2 text-left rtl:text-right">
        <Settings className="w-5 h-5 text-[#D4AF37]" />
        <div>
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {t.settings}
          </h2>
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">
            {currentLanguage === 'ur' ? 'ایپ کی ترجیحات، فونٹ اور اطلاعات' : 'Preferences, theme and notifications'}
          </span>
        </div>
      </section>

      {/* 2. Language Selection */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-[#7a580f] dark:text-[#D1AC5B]" />
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'ایپ کی زبان (Language)' : 'Application Language'}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${
                  isSelected
                    ? 'bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] border-[#D4AF37] shadow-sm'
                    : 'bg-[#f8f9ff] dark:bg-[#061A34]/50 text-[#061A34] dark:text-white border-[#E2E8F0] dark:border-white/5'
                }`}
              >
                <span className="font-bold text-sm">{lang.nativeName}</span>
                <span className="text-[10px] opacity-75">{lang.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Dark Mode / Theme Toggle */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center">
            {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <div className="flex flex-col text-left rtl:text-right">
            <span className="font-bold text-sm text-[#061A34] dark:text-white">
              {currentLanguage === 'ur' ? 'ڈارک موڈ (Dark Theme)' : 'Dark Theme'}
            </span>
            <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">
              {isDarkMode ? 'نائٹ موڈ فعال ہے' : 'لائٹ موڈ فعال ہے'}
            </span>
          </div>
        </div>

        <button
          onClick={onToggleDarkMode}
          className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
            isDarkMode ? 'bg-[#D4AF37]' : 'bg-[#cbd5e1]'
          }`}
          aria-label="Toggle Theme"
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              isDarkMode ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </section>

      {/* 4. Reading Font Size Slider */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-[#7a580f] dark:text-[#D1AC5B]" />
            <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
              {currentLanguage === 'ur' ? 'متن کا سائز (Reading Font Size)' : 'Reading Font Size'}
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-[#7a580f] dark:text-[#D1AC5B]">
            {fontScale}%
          </span>
        </div>

        <input
          type="range"
          min="80"
          max="135"
          step="5"
          value={fontScale}
          onChange={(e) => setFontScale(Number(e.target.value))}
          className="w-full accent-[#061A34] dark:accent-[#D4AF37] cursor-pointer"
        />

        {/* Live Font Preview Box */}
        <div className="p-3 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] border border-[#D4AF37]/20 text-center">
          <p
            className="font-arabic text-[#061A34] dark:text-white leading-relaxed"
            style={{ fontSize: `${(fontScale / 100) * 16}px` }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ — الجواب وبالله التوفيق
          </p>
        </div>
      </section>

      {/* 5. Notification Preferences */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#7a580f] dark:text-[#D1AC5B]" />
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'اطلاعات کی ترجیحات' : 'Notification Preferences'}
          </h3>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-[#E2E8F0] dark:border-white/5 text-xs">
          <span className="text-[#061A34] dark:text-white font-medium">
            {currentLanguage === 'ur' ? 'اوقاتِ نماز کے اعلانات' : 'Prayer times alerts'}
          </span>
          <input
            type="checkbox"
            checked={prayerNotifications}
            onChange={() => setPrayerNotifications(!prayerNotifications)}
            className="accent-[#061A34] dark:accent-[#D4AF37] h-4 w-4 rounded"
          />
        </div>

        <div className="flex items-center justify-between py-1 text-xs">
          <span className="text-[#061A34] dark:text-white font-medium">
            {currentLanguage === 'ur' ? 'نئے فتاویٰ و کتب کا نوٹیفکیشن' : 'New Fatwas & Publications'}
          </span>
          <input
            type="checkbox"
            checked={fatwaNotifications}
            onChange={() => setFatwaNotifications(!fatwaNotifications)}
            className="accent-[#061A34] dark:accent-[#D4AF37] h-4 w-4 rounded"
          />
        </div>
      </section>

      {/* 6. Clear Cache & Storage */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between">
        <div className="flex flex-col text-left rtl:text-right">
          <span className="font-bold text-xs sm:text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'عارضی ڈیٹا اور کیشے' : 'Clear Cached Data'}
          </span>
          <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">
            {currentLanguage === 'ur' ? 'تمام عارضی محفوظات کو صاف کریں' : 'Reset locally stored data'}
          </span>
        </div>

        <button
          onClick={handleClearCache}
          className="h-8 px-3 rounded-lg bg-[#eff4ff] dark:bg-white/10 text-[#BE123C] text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{currentLanguage === 'ur' ? 'صاف کریں' : 'Clear'}</span>
        </button>
      </section>

      {/* 7. Institutional Credits & Version */}
      <section className="rounded-2xl bg-[#eff4ff] dark:bg-[#1A2F54] p-4 text-center border border-[#b9c7e4]/30 flex flex-col items-center gap-1">
        <ShieldCheck className="w-6 h-6 text-[#7a580f] dark:text-[#D1AC5B]" />
        <h4 className="font-bold text-xs sm:text-sm text-[#061A34] dark:text-white">
          دار الإفتاء إرشاد السائلين کراچی
        </h4>
        <p className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">
          ورژن 2.4.0 • مسلکِ اہلِ سنت والجماعت، فقہِ حنفی
        </p>
        <span className="text-[10px] text-[#75777e] dark:text-[#94A3B8] mt-1">
          {t.copyright}
        </span>
      </section>
    </div>
  );
};
