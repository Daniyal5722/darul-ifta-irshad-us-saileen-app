import React, { useState } from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Share2,
} from 'lucide-react';

interface ContactScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onShowToast: (msg: string) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  currentLanguage,
  onNavigate,
  onShowToast,
}) => {
  const t = translations[currentLanguage];

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      onShowToast(currentLanguage === 'ur' ? 'پیغام موصول ہو گیا، شکریہ۔' : 'Message sent successfully.');
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    }, 600);
  };

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Header Banner */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-1 text-left rtl:text-right">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'رابطہ و ملاقات کے ذرائع' : 'Contact & Visiting Details'}
          </h2>
        </div>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed">
          {currentLanguage === 'ur'
            ? 'دارالافتاء کے مرکزی دفتر کراچی سے فون، واٹس ایپ، ای میل یا بالمشافہ ملاقات کے لیے رابطہ فرمائیں'
            : 'Get in touch with our scholars and administration directly.'}
        </p>
      </section>

      {/* 2. Direct One-Tap Communication Cards */}
      <section className="grid grid-cols-2 gap-2.5">
        {/* Phone Dial */}
        <a
          href="tel:+923017671222"
          className="p-3.5 rounded-2xl bg-white dark:bg-[#132544] shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2 cursor-pointer hover:border-[#D4AF37]/40 active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="text-left rtl:text-right">
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8] block">{t.phone}</span>
            <span className="text-xs font-bold text-[#061A34] dark:text-white tracking-wider block" dir="ltr">
              +92 301 7671222
            </span>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/923017671222"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-white dark:bg-[#132544] shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2 cursor-pointer hover:border-[#D4AF37]/40 active:scale-95 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="text-left rtl:text-right">
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8] block">WhatsApp</span>
            <span className="text-xs font-bold text-[#10B981] block">
              {currentLanguage === 'ur' ? 'براہِ راست چیٹ' : 'Direct Chat'}
            </span>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:ask.darulifta.irshadussaileen@gmail.com"
          className="col-span-2 p-3.5 rounded-2xl bg-white dark:bg-[#132544] shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-3 hover:border-[#D4AF37]/40 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left rtl:text-right min-w-0">
              <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">{t.email}</span>
              <span className="text-xs font-bold text-[#061A34] dark:text-white truncate" dir="ltr">
                ask.darulifta.irshadussaileen@gmail.com
              </span>
            </div>
          </div>
        </a>
      </section>

      {/* 3. Physical Office Address & Visiting Hours */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/20">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left rtl:text-right">
            <span className="text-xs font-bold text-[#061A34] dark:text-white">{t.address}</span>
            <p className="text-xs text-[#75777e] dark:text-[#94A3B8] mt-0.5 leading-relaxed font-urdu">
              المجیب گارڈن A31، کراچی، سندھ، پاکستان
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34]/50 border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#061A34] dark:text-[#D1AC5B]">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLanguage === 'ur' ? 'اوقاتِ مجلس و دفتری ملاقات:' : 'Visiting Hours:'}</span>
          </div>
          <div className="flex justify-between text-[#75777e] dark:text-[#94A3B8] pt-1">
            <span>پیر تا جمعرات:</span>
            <span className="font-semibold text-[#061A34] dark:text-white">۱۰:۰۰ صبح تا ۱:۰۰ دوپہر</span>
          </div>
          <div className="flex justify-between text-[#75777e] dark:text-[#94A3B8]">
            <span>عصر تا مغرب:</span>
            <span className="font-semibold text-[#061A34] dark:text-white">خصوصی شرعی استفسار</span>
          </div>
          <div className="flex justify-between text-[#75777e] dark:text-[#94A3B8]">
            <span>جمعۃ المبارک:</span>
            <span className="font-semibold text-[#BE123C]">تحقیقی تعطیل</span>
          </div>
        </div>
      </section>

      {/* 4. In-App Inquiry Form */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">Direct Message</span>
          <h3 className="font-bold text-sm text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'انتظامیہ کو پیغام ارسال کریں' : 'Send Message to Admin'}
          </h3>
        </div>

        {sentSuccess ? (
          <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-center flex flex-col items-center gap-1.5">
            <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
            <p className="text-xs font-bold text-[#10B981]">
              {currentLanguage === 'ur' ? 'آپ کا پیغام کامیابی سے موصول ہو گیا ہے!' : 'Your message has been sent!'}
            </p>
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8]">
              {currentLanguage === 'ur' ? 'انتظامیہ جلد آپ سے رابطہ کرے گی۔' : 'Our team will contact you soon.'}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder={t.seekerNamePlaceholder}
              className="w-full h-11 px-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-xs outline-none border border-[#E2E8F0] dark:border-white/10"
            />

            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="فون یا واٹس ایپ نمبر (+92...)"
              dir="ltr"
              className="w-full h-11 px-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-xs outline-none border border-[#E2E8F0] dark:border-white/10 text-left font-mono"
            />

            <textarea
              required
              rows={3}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder={currentLanguage === 'ur' ? 'اپنا پیغام یا عمومی استفسار درج فرمائیں...' : 'Your inquiry or message...'}
              className="w-full p-3 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-xs font-urdu outline-none border border-[#E2E8F0] dark:border-white/10 resize-none leading-relaxed"
            />

            <button
              type="submit"
              disabled={isSending}
              className="w-full h-11 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
            >
              {isSending ? (
                <div className="w-4 h-4 border-2 border-white dark:border-[#061A34] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{currentLanguage === 'ur' ? 'پیغام بھیجیں' : 'Send Message'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
