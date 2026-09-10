import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import {
  Share2,
  CheckCircle2,
  ExternalLink,
  Youtube,
  MessageCircle,
  ShieldAlert,
  Radio,
} from 'lucide-react';

interface SocialMediaScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
}

export const SocialMediaScreen: React.FC<SocialMediaScreenProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const t = translations[currentLanguage];

  const channels = [
    {
      name: 'یوٹیوب آفیشل چینل (@MuftiFaisalHayat)',
      nameEn: 'YouTube Official Channel (@MuftiFaisalHayat)',
      desc: 'حضرت مولانا مفتی فیصل حیات صاحب کے تفصیلی خطابات، بیانات اور فتاویٰ کی ویڈیوز۔',
      followers: '۵۰,۰۰۰+ سبسکرائبرز',
      icon: Youtube,
      color: '#BE123C',
      link: 'https://www.youtube.com/@MuftiFaisalHayat',
      badge: 'ویریفائیڈ چینل',
    },
    {
      name: 'واٹس ایپ آفیشل چینل',
      nameEn: 'WhatsApp Official Channel',
      desc: 'روزانہ کا منتخب شرعی فتویٰ، اوقاتِ نماز اور دارالافتاء کے اہم اعلانات۔',
      followers: '۲۵,۰۰۰+ فالوورز',
      icon: MessageCircle,
      color: '#10B981',
      link: 'https://whatsapp.com/channel/0029VaCc5dK7T8bclVGHu20Q',
      badge: 'ڈیلی اپڈیٹس',
    },
    {
      name: 'فیس بک آفیشل پیج',
      nameEn: 'Facebook Official Page',
      desc: 'مستند تحریری فتاویٰ کے پوسٹرز اور ادارتی خبر نامہ۔',
      followers: '۳۵,۰۰۰+ فالوورز',
      icon: Radio,
      color: '#1E40AF',
      link: 'https://facebook.com',
      badge: 'آفیشل پیج',
    },
  ];

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Header Banner */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-1 text-left rtl:text-right">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'آفیشل سوشل میڈیا نیٹ ورکس' : 'Official Social Channels'}
          </h2>
        </div>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed">
          {currentLanguage === 'ur'
            ? 'دارالافتاء ارشا السائلین کراچی کے مصدقہ اور مستند ڈیجیٹل ذرائع'
            : 'Stay connected with authentic lectures and daily rulings.'}
        </p>
      </section>

      {/* 2. Channels List */}
      <section className="flex flex-col gap-3">
        {channels.map((channel, idx) => {
          const Icon = channel.icon;
          return (
            <article
              key={idx}
              className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2.5 transition-all hover:border-[#D4AF37]/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
                    style={{ backgroundColor: channel.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col text-left rtl:text-right">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white">
                        {currentLanguage === 'en' ? channel.nameEn : channel.name}
                      </h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    </div>
                    <span className="text-xs text-[#7a580f] dark:text-[#D1AC5B] font-semibold">
                      {channel.followers}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] dark:bg-white/10 text-[#7a580f] dark:text-[#D1AC5B]">
                  {channel.badge}
                </span>
              </div>

              <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed text-left rtl:text-right">
                {channel.desc}
              </p>

              <div className="pt-2 border-t border-[#E2E8F0] dark:border-white/5 flex justify-end">
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-3 rounded-lg bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shadow-sm"
                >
                  <span>{currentLanguage === 'ur' ? 'چینل جوائن کریں' : 'Join Channel'}</span>
                  <ExternalLink className="w-3 h-3 rtl:rotate-180" />
                </a>
              </div>
            </article>
          );
        })}
      </section>

      {/* 3. Anti-Impersonation Warning */}
      <section className="bg-[#FBF9F3] dark:bg-[#132544] rounded-2xl p-4 border border-[#D4AF37]/30 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#BE123C] shrink-0 mt-0.5" />
        <div className="flex flex-col text-left rtl:text-right">
          <h4 className="font-bold text-xs sm:text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'جعلی و غیر مصدقہ اکاؤنٹس سے ہوشیار رہیں' : 'Warning: Unofficial Accounts'}
          </h4>
          <p className="font-urdu text-xs text-[#75777e] dark:text-[#94A3B8] mt-1 leading-relaxed">
            دارالافتاء کے نام سے منسوب فتاویٰ صرف ہمارے تصدیق شدہ پلیٹ فارمز اور آفیشل مہر والے دستاویزات ہی مستند سمجھے جائیں گے۔
          </p>
        </div>
      </section>
    </div>
  );
};
