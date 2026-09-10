import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import {
  Compass,
  BookOpen,
  PenSquare,
  GraduationCap,
  Menu,
} from 'lucide-react';

interface BottomNavProps {
  currentScreen: Screen;
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onOpenMoreMenu: () => void;
  isMoreMenuOpen: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  currentLanguage,
  onNavigate,
  onOpenMoreMenu,
  isMoreMenuOpen,
}) => {
  const t = translations[currentLanguage];

  const navItems = [
    {
      id: 'home' as Screen,
      label: t.home,
      icon: Compass,
      isActive: currentScreen === 'home',
    },
    {
      id: 'fatwas' as Screen,
      label: t.fatwas,
      icon: BookOpen,
      isActive: currentScreen === 'fatwas' || currentScreen === 'fatwa-detail',
    },
    // center item is ask button handled separately
    {
      id: 'scholars' as Screen,
      label: t.scholars,
      icon: GraduationCap,
      isActive: currentScreen === 'scholars' || currentScreen === 'scholar-detail',
    },
    {
      id: 'more' as const,
      label: t.more,
      icon: Menu,
      isActive:
        isMoreMenuOpen ||
        ['services', 'publications', 'about', 'contact', 'donation', 'social', 'settings'].includes(
          currentScreen
        ),
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 bg-white/95 dark:bg-[#061A34]/95 backdrop-blur-xl border-t border-[#E2E8F0] dark:border-white/10 shadow-[0_-4px_20px_rgba(6,26,52,0.06)] pb-safe transition-colors">
      <div className="max-w-md mx-auto h-16 px-2 flex justify-around items-center relative">
        {/* Tab 1: Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all active:scale-95 ${
            navItems[0].isActive
              ? 'text-[#061A34] dark:text-[#D1AC5B] font-bold'
              : 'text-[#75777e] dark:text-[#94A3B8] font-medium'
          }`}
          aria-label={navItems[0].label}
        >
          <Compass className={`w-5 h-5 ${navItems[0].isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] leading-none">{navItems[0].label}</span>
        </button>

        {/* Tab 2: Fatwa */}
        <button
          onClick={() => onNavigate('fatwas')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all active:scale-95 ${
            navItems[1].isActive
              ? 'text-[#061A34] dark:text-[#D1AC5B] font-bold'
              : 'text-[#75777e] dark:text-[#94A3B8] font-medium'
          }`}
          aria-label={navItems[1].label}
        >
          <BookOpen className={`w-5 h-5 ${navItems[1].isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] leading-none">{navItems[1].label}</span>
        </button>

        {/* Center Floating Action Button: Ask Question */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={() => onNavigate('ask')}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(6,26,52,0.35)] active:scale-95 transition-all border-2 ${
              currentScreen === 'ask' || currentScreen === 'ask-success'
                ? 'bg-[#D4AF37] text-[#061A34] border-white dark:border-[#061A34]'
                : 'bg-[#061A34] dark:bg-[#132544] text-[#D4AF37] border-white/20'
            }`}
            aria-label={t.askQuestion}
          >
            <PenSquare className="w-6 h-6" />
          </button>
          <span className="text-[10px] font-bold text-[#061A34] dark:text-[#D1AC5B] mt-1 text-center whitespace-nowrap">
            {t.askQuestion}
          </span>
        </div>

        {/* Tab 4: Scholars */}
        <button
          onClick={() => onNavigate('scholars')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all active:scale-95 ${
            navItems[2].isActive
              ? 'text-[#061A34] dark:text-[#D1AC5B] font-bold'
              : 'text-[#75777e] dark:text-[#94A3B8] font-medium'
          }`}
          aria-label={navItems[2].label}
        >
          <GraduationCap
            className={`w-5 h-5 ${navItems[2].isActive ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span className="text-[11px] leading-none">{navItems[2].label}</span>
        </button>

        {/* Tab 5: More Menu */}
        <button
          onClick={onOpenMoreMenu}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all active:scale-95 ${
            navItems[3].isActive
              ? 'text-[#061A34] dark:text-[#D1AC5B] font-bold'
              : 'text-[#75777e] dark:text-[#94A3B8] font-medium'
          }`}
          aria-label={navItems[3].label}
        >
          <Menu className={`w-5 h-5 ${navItems[3].isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] leading-none">{navItems[3].label}</span>
        </button>
      </div>
    </nav>
  );
};
