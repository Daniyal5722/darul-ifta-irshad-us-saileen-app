import React from 'react';
import { Screen, Language, NotificationItem } from '../types';
import { translations } from '../data/translations';
import {
  Bell,
  Clock,
  BookOpen,
  Info,
  Check,
  Trash2,
  ChevronLeft,
} from 'lucide-react';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  currentLanguage,
  onNavigate,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Notifications Header */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {t.notifications}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onMarkAllAsRead}
            className="h-8 px-2.5 rounded-lg bg-[#eff4ff] dark:bg-white/10 text-[#061A34] dark:text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
          >
            <Check className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{currentLanguage === 'ur' ? 'سب پڑھیں' : 'Mark Read'}</span>
          </button>
        </div>
      </section>

      {/* 2. Notifications List */}
      <section className="flex flex-col gap-2.5">
        {notifications.length === 0 ? (
          <div className="bg-white dark:bg-[#132544] rounded-2xl p-8 text-center flex flex-col items-center gap-2 border border-[#E2E8F0] dark:border-white/5">
            <Bell className="w-10 h-10 text-[#75777e] opacity-40" />
            <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
              {currentLanguage === 'ur' ? 'کوئی نئی اطلاع موجود نہیں' : 'No notifications'}
            </h3>
            <p className="text-xs text-[#75777e] dark:text-[#94A3B8]">
              {currentLanguage === 'ur' ? 'تمام نئی اعلانات یہاں دکھائی دیں گے۔' : 'All updates will appear here.'}
            </p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onMarkAsRead(item.id);
                if (item.actionScreen) onNavigate(item.actionScreen);
              }}
              className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                item.read
                  ? 'bg-white dark:bg-[#132544] border-[#E2E8F0] dark:border-white/5 opacity-85'
                  : 'bg-[#FBF9F3] dark:bg-[#061A34] border-[#D4AF37]/35 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'prayer'
                      ? 'bg-[#10B981]/15 text-[#10B981]'
                      : item.type === 'fatwa'
                      ? 'bg-[#061A34] text-[#D1AC5B]'
                      : 'bg-[#eff4ff] text-[#061A34]'
                  }`}
                >
                  {item.type === 'prayer' ? (
                    <Clock className="w-4 h-4" />
                  ) : item.type === 'fatwa' ? (
                    <BookOpen className="w-4 h-4" />
                  ) : (
                    <Info className="w-4 h-4" />
                  )}
                </div>

                <div className="flex flex-col text-left rtl:text-right min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-[#061A34] dark:text-white truncate">
                      {item.title[currentLanguage]}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#BE123C] shrink-0" />
                    )}
                  </div>
                  <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed line-clamp-2 mt-0.5">
                    {item.message[currentLanguage]}
                  </p>
                  <span className="text-[10px] text-[#7a580f] dark:text-[#D1AC5B] mt-1">
                    {item.time}
                  </span>
                </div>
              </div>

              <ChevronLeft className="w-4 h-4 text-[#75777e] rtl:rotate-180 shrink-0 self-center" />
            </div>
          ))
        )}
      </section>
    </div>
  );
};
