import React, { useState, useEffect } from 'react';
import { Screen, Language, Fatwa, Scholar, NotificationItem } from './types';
import { translations } from './data/translations';
import { mockFatwas, mockScholars, mockNotifications } from './data/mockData';

// Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MoreMenuSheet } from './components/MoreMenuSheet';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { Toast } from './components/Toast';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { FatwasScreen } from './screens/FatwasScreen';
import { FatwaDetailScreen } from './screens/FatwaDetailScreen';
import { AskQuestionScreen } from './screens/AskQuestionScreen';
import { QuestionSubmittedScreen } from './screens/QuestionSubmittedScreen';
import { ScholarsScreen } from './screens/ScholarsScreen';
import { ScholarDetailModal } from './screens/ScholarDetailModal';
import { ServicesScreen } from './screens/ServicesScreen';
import { PublicationsScreen } from './screens/PublicationsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ContactScreen } from './screens/ContactScreen';
import { DonationScreen } from './screens/DonationScreen';
import { SocialMediaScreen } from './screens/SocialMediaScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { BookmarksScreen } from './screens/BookmarksScreen';

export default function App() {
  // 1. Language state (defaults to Urdu as primary language for Darul Ifta Karachi)
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('darulifta_lang');
    return (saved as Language) || 'ur';
  });

  // 2. Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darulifta_theme');
    return saved === 'dark';
  });

  // 3. Screen navigation state & history stack
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [navHistory, setNavHistory] = useState<Screen[]>(['home']);

  // 4. Modal and Drawer states
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isFramed, setIsFramed] = useState(false);

  // 5. Selected entities for detail screens
  const [selectedFatwa, setSelectedFatwa] = useState<Fatwa>(mockFatwas[0]);
  const [selectedScholar, setSelectedScholar] = useState<Scholar>(mockScholars[0]);
  const [submittedRefNumber, setSubmittedRefNumber] = useState<string>('FTW-2026-8849');
  const [searchTopicQuery, setSearchTopicQuery] = useState<string>('');

  // 6. Saved Bookmarks (local storage persisted)
  const [savedFatwaIds, setSavedFatwaIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('darulifta_bookmarks');
      return saved ? JSON.parse(saved) : ['fatwa-1', 'fatwa-4'];
    } catch {
      return ['fatwa-1', 'fatwa-4'];
    }
  });

  // 7. Notifications list state
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // 8. Toast notification state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  // Trigger toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  // Sync RTL / LTR direction and document title whenever language updates
  useEffect(() => {
    const dir = currentLanguage === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLanguage;
    localStorage.setItem('darulifta_lang', currentLanguage);

    const t = translations[currentLanguage];
    document.title = `${t.appName} — ${t.tagline}`;
  }, [currentLanguage]);

  // Sync dark theme class on HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darulifta_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darulifta_theme', 'light');
    }
  }, [isDarkMode]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('darulifta_bookmarks', JSON.stringify(savedFatwaIds));
  }, [savedFatwaIds]);

  // Navigation handlers
  const handleNavigate = (screen: Screen) => {
    if (screen !== currentScreen) {
      setNavHistory((prev) => [...prev, screen]);
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoBack = () => {
    if (navHistory.length > 1) {
      const updated = [...navHistory];
      updated.pop(); // remove current
      const prevScreen = updated[updated.length - 1];
      setNavHistory(updated);
      setCurrentScreen(prevScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentScreen('home');
    }
  };

  // Bookmark toggler
  const handleToggleBookmark = (fatwaId: string) => {
    if (savedFatwaIds.includes(fatwaId)) {
      setSavedFatwaIds((prev) => prev.filter((id) => id !== fatwaId));
      showToast(
        currentLanguage === 'ur'
          ? 'فتویٰ محفوظات سے ہٹا دیا گیا۔'
          : 'Fatwa removed from bookmarks.',
        'info'
      );
    } else {
      setSavedFatwaIds((prev) => [...prev, fatwaId]);
      showToast(
        currentLanguage === 'ur'
          ? 'فتویٰ کامیابی سے محفوظ کر لیا گیا۔'
          : 'Fatwa saved to bookmarks.',
        'success'
      );
    }
  };

  // Copy helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(
      currentLanguage === 'ur'
        ? `${label} کاپی کر لیا گیا`
        : `${label} copied to clipboard`,
      'success'
    );
  };

  // Share helper
  const handleShare = (title: string, text: string) => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${title}\n\n${text}\n\nدار الإفتاء إرشاد السائلين کراچی`);
      showToast(
        currentLanguage === 'ur'
          ? 'متن کلپ بورڈ پر کاپی ہو گیا!'
          : 'Content copied to clipboard!',
        'success'
      );
    }
  };

  // Notifications actions
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    showToast(
      currentLanguage === 'ur' ? 'تمام اطلاعات پڑھ لی گئیں۔' : 'All notifications marked as read.'
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    showToast(currentLanguage === 'ur' ? 'اطلاعات صاف کر دی گئیں۔' : 'Notifications cleared.');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#f3f6fb] dark:bg-[#061A34] text-[#0b1c30] dark:text-[#f8f9ff] font-sans antialiased transition-colors duration-200">
      {/* Outer framing wrapper: allows comfortable mobile view on wide desktop monitors or phone simulation */}
      <div className={`mx-auto transition-all ${isFramed ? 'py-6 px-3' : 'p-0'}`}>
        <div
          className={`mx-auto bg-[#f8f9ff] dark:bg-[#0c1e38] transition-all relative ${
            isFramed
              ? 'max-w-[420px] rounded-[36px] shadow-[0_20px_50px_rgba(6,26,52,0.35)] border-[8px] border-[#061A34] dark:border-[#132544] overflow-hidden min-h-[840px]'
              : 'max-w-md min-h-screen shadow-lg'
          }`}
        >
          {/* Top Header */}
          <Header
            currentScreen={currentScreen}
            currentLanguage={currentLanguage}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
            unreadCount={unreadCount}
            isFramed={isFramed}
            onToggleFrame={() => setIsFramed(!isFramed)}
          />

          {/* Main Scrollable Viewport */}
          <main className="pt-20 px-3.5 pb-24 min-h-screen">
            {currentScreen === 'home' && (
              <HomeScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onSelectFatwa={(fatwa) => setSelectedFatwa(fatwa)}
                onSearchTopic={(query) => setSearchTopicQuery(query)}
              />
            )}

            {currentScreen === 'fatwas' && (
              <FatwasScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onSelectFatwa={(fatwa) => setSelectedFatwa(fatwa)}
                savedFatwaIds={savedFatwaIds}
                onToggleBookmark={handleToggleBookmark}
                onShare={handleShare}
                initialSearchQuery={searchTopicQuery}
              />
            )}

            {currentScreen === 'fatwa-detail' && (
              <FatwaDetailScreen
                fatwa={selectedFatwa}
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onSelectFatwa={(fatwa) => setSelectedFatwa(fatwa)}
                isSaved={savedFatwaIds.includes(selectedFatwa.id)}
                onToggleBookmark={handleToggleBookmark}
                onShare={handleShare}
              />
            )}

            {currentScreen === 'ask' && (
              <AskQuestionScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onSubmitSuccess={(refNum) => setSubmittedRefNumber(refNum)}
              />
            )}

            {currentScreen === 'ask-success' && (
              <QuestionSubmittedScreen
                referenceNumber={submittedRefNumber}
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onCopyReference={(ref) => handleCopyText(ref, 'Reference Number')}
              />
            )}

            {currentScreen === 'scholars' && (
              <ScholarsScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onSelectScholar={(scholar) => setSelectedScholar(scholar)}
              />
            )}

            {currentScreen === 'scholar-detail' && (
              <ScholarDetailModal
                scholar={selectedScholar}
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onGoBack={handleGoBack}
              />
            )}

            {currentScreen === 'services' && (
              <ServicesScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'publications' && (
              <PublicationsScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onShare={handleShare}
              />
            )}

            {currentScreen === 'about' && (
              <AboutScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'contact' && (
              <ContactScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onShowToast={showToast}
              />
            )}

            {currentScreen === 'donation' && (
              <DonationScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onCopyText={handleCopyText}
              />
            )}

            {currentScreen === 'social' && (
              <SocialMediaScreen
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'notifications' && (
              <NotificationsScreen
                notifications={notifications}
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAllNotifications}
              />
            )}

            {currentScreen === 'bookmarks' && (
              <BookmarksScreen
                savedFatwaIds={savedFatwaIds}
                currentLanguage={currentLanguage}
                onNavigate={handleNavigate}
                onSelectFatwa={(fatwa) => setSelectedFatwa(fatwa)}
                onRemoveBookmark={handleToggleBookmark}
              />
            )}

            {currentScreen === 'settings' && (
              <SettingsScreen
                currentLanguage={currentLanguage}
                onSelectLanguage={(lang) => setCurrentLanguage(lang)}
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                onNavigate={handleNavigate}
                onShowToast={showToast}
              />
            )}
          </main>

          {/* Bottom Navigation */}
          <BottomNav
            currentScreen={currentScreen}
            currentLanguage={currentLanguage}
            onNavigate={handleNavigate}
            onOpenMoreMenu={() => setIsMoreMenuOpen(true)}
            isMoreMenuOpen={isMoreMenuOpen}
          />

          {/* More Menu Drawer Bottom Sheet */}
          <MoreMenuSheet
            isOpen={isMoreMenuOpen}
            onClose={() => setIsMoreMenuOpen(false)}
            currentLanguage={currentLanguage}
            onNavigate={handleNavigate}
          />

          {/* Language Selection Modal */}
          <LanguageSelectorModal
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            currentLanguage={currentLanguage}
            onSelectLanguage={(lang) => setCurrentLanguage(lang)}
          />

          {/* Floating Toast Notification */}
          <Toast message={toastMessage} isVisible={toastVisible} type={toastType} />
        </div>
      </div>
    </div>
  );
}
