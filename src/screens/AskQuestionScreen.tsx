import React, { useState } from 'react';
import { Screen, Language, AskQuestionFormState } from '../types';
import { translations } from '../data/translations';
import {
  ShieldCheck,
  Lock,
  Lightbulb,
  Paperclip,
  User,
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  AlertCircle,
  Check,
} from 'lucide-react';

interface AskQuestionScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onSubmitSuccess: (refNumber: string) => void;
}

export const AskQuestionScreen: React.FC<AskQuestionScreenProps> = ({
  currentLanguage,
  onNavigate,
  onSubmitSuccess,
}) => {
  const t = translations[currentLanguage];

  const [formData, setFormData] = useState<AskQuestionFormState>({
    title: '',
    category: 'عبادات',
    questionDetails: '',
    inquirerName: '',
    inquirerPhone: '',
    inquirerEmail: '',
    inquirerCity: 'کراچی، پاکستان',
    attachedFileName: '',
    confidentialityAccepted: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    { id: 'عبادات', labelEn: 'Worship (Ibadat)', labelUr: 'عبادات (Worship)', labelAr: 'العبادات' },
    { id: 'معاملات و تجارت', labelEn: 'Trade & Finance', labelUr: 'معاملات و تجارت', labelAr: 'المعاملات والتجارة' },
    { id: 'نکاح و طلاق', labelEn: 'Marriage & Family', labelUr: 'نکاح و طلاق', labelAr: 'الأسرة والنكاح' },
    { id: 'حقوق و فرائض', labelEn: 'Rights & Duties', labelUr: 'حقوق و فرائض', labelAr: 'الحقوق والواجبات' },
    { id: 'وراثت و ترکہ', labelEn: 'Inheritance', labelUr: 'وراثت و ترکہ', labelAr: 'المواريث والتركات' },
    { id: 'دیگر مسائل', labelEn: 'Miscellaneous', labelUr: 'دیگر مسائل', labelAr: 'مسائل متفرقة' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, attachedFileName: e.target.files![0].name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.title.trim()) {
      setErrorMsg(currentLanguage === 'ur' ? 'براہ کرم سوال کا عنوان درج فرمائیں۔' : 'Please enter question summary.');
      return;
    }

    if (formData.questionDetails.trim().length < 30) {
      setErrorMsg(
        currentLanguage === 'ur'
          ? 'براہ کرم مسئلے کی تفصیل کم از کم ۳۰ حروف میں تحریر فرمائیں۔'
          : 'Please enter at least 30 characters describing your query.'
      );
      return;
    }

    if (!formData.inquirerPhone.trim()) {
      setErrorMsg(
        currentLanguage === 'ur'
          ? 'براہ کرم واٹس ایپ یا فون نمبر درج فرمائیں۔'
          : 'Please enter your WhatsApp or phone number.'
      );
      return;
    }

    if (!formData.confidentialityAccepted) {
      setErrorMsg(
        currentLanguage === 'ur'
          ? 'براہ کرم رازداری کے اقرار نامے پر نشان لگائیں۔'
          : 'Please accept the confidentiality pledge.'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = `FTW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      onSubmitSuccess(randomRef);
      onNavigate('ask-success');
    }, 800);
  };

  return (
    <div className="flex flex-col gap-3.5 pb-12">
      {/* 1. Reassurance & Spiritual Heritage Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#061A34] via-[#132544] to-[#0e1c32] p-4 text-white shadow-md border border-[#D4AF37]/30">
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#D1AC5B]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-[#D1AC5B] uppercase tracking-wider">
              {currentLanguage === 'ur' ? 'تصدیق شدہ شرعی رہنمائی' : 'Verified Shariah Guidance'}
            </span>
            <span className="text-xs text-[#94A3B8]">• Darul Ifta Verification</span>
          </div>

          <p className="font-urdu text-xs sm:text-sm text-[#FBF9F3] leading-relaxed text-right rtl:text-right ltr:text-left">
            تمام سوالات جید مفتیانِ کرام کی زیرِ نگرانی قرآن و سنت کی روشنی میں تصدیق کے بعد تحریری شکل میں جاری کیے جاتے ہیں۔
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1 text-[#10B981]">
              <Lock className="w-3.5 h-3.5" />
              <span>100% رازداری کی ضمانت</span>
            </span>
            <span className="text-[#D1AC5B]">کراچی، پاکستان</span>
          </div>
        </div>
      </section>

      {/* Error alert if any */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-[#BE123C]/10 border border-[#BE123C]/30 text-[#BE123C] text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* 1. Question Title */}
        <div className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">{t.questionSummary}</span>
            <label className="text-xs font-bold text-[#061A34] dark:text-white">
              عنوان / خلاصۂ سوال <span className="text-[#BE123C]">*</span>
            </label>
          </div>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder={t.questionSummaryPlaceholder}
            className="w-full h-12 px-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-sm outline-none border border-[#E2E8F0] dark:border-white/10 focus:ring-2 focus:ring-[#D4AF37]/40 transition-all text-left rtl:text-right"
          />
        </div>

        {/* 2. Category Selector Chips */}
        <div className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">{t.selectTopic}</span>
            <label className="text-xs font-bold text-[#061A34] dark:text-white">
              شرعی شعبہ منتخب کریں <span className="text-[#BE123C]">*</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {categories.map((cat) => {
              const isSelected = formData.category === cat.id;
              const label = currentLanguage === 'en' ? cat.labelEn : currentLanguage === 'ar' ? cat.labelAr : cat.labelUr;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] border-[#D4AF37] shadow-sm'
                      : 'bg-[#f8f9ff] dark:bg-[#061A34]/50 text-[#061A34] dark:text-white border-[#E2E8F0] dark:border-white/5'
                  }`}
                >
                  <span className="truncate">{label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Detailed Question */}
        <div className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">{t.detailedQuestion}</span>
            <label className="text-xs font-bold text-[#061A34] dark:text-white">
              تفصیلی سوال <span className="text-[#BE123C]">*</span>
            </label>
          </div>

          {/* Guidance tip */}
          <div className="p-2.5 rounded-xl bg-[#FBF9F3] dark:bg-[#061A34] border border-[#D4AF37]/20 flex items-start gap-2 text-xs text-[#7a580f] dark:text-[#D1AC5B]">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-snug">
              مسئلے کی پوری تفصیل، فریقین کی صورتحال، معاہدے کی شقیں اور ضروری پس منظر واضح انداز میں تحریر فرمائیں۔
            </p>
          </div>

          <textarea
            required
            rows={5}
            value={formData.questionDetails}
            onChange={(e) => setFormData({ ...formData, questionDetails: e.target.value })}
            placeholder={t.detailedQuestionPlaceholder}
            className="w-full p-3.5 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-sm font-urdu outline-none border border-[#E2E8F0] dark:border-white/10 focus:ring-2 focus:ring-[#D4AF37]/40 leading-relaxed text-left rtl:text-right resize-none"
          />

          <div className="flex items-center justify-between text-[11px] text-[#75777e] dark:text-[#94A3B8]">
            <span>{formData.questionDetails.length} {t.charCount}</span>
            <span>{t.minCharRequirement}</span>
          </div>
        </div>

        {/* 4. Attach Evidence / Deeds */}
        <div className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">Evidence (Optional)</span>
            <label className="text-xs font-bold text-[#061A34] dark:text-white">
              {t.attachEvidence}
            </label>
          </div>

          <label className="relative flex flex-col items-center justify-center p-4 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34]/50 border-2 border-dashed border-[#cbd5e1] dark:border-white/10 cursor-pointer hover:border-[#D4AF37] transition-all">
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#132544] flex items-center justify-center text-[#061A34] dark:text-[#D1AC5B] shadow-sm mb-1">
              <Paperclip className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#061A34] dark:text-white text-center">
              {formData.attachedFileName ? (
                <span className="text-[#10B981] font-bold">{formData.attachedFileName}</span>
              ) : (
                t.attachEvidenceDesc
              )}
            </span>
          </label>
        </div>

        {/* 5. Seeker Contact Details */}
        <div className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-white/5">
            <span className="text-xs text-[#75777e] dark:text-[#94A3B8]">{t.seekerDetails}</span>
            <h3 className="text-xs font-bold text-[#061A34] dark:text-white">
              سائل کی معلومات برائے رابطہ
            </h3>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#10B981]">{t.optional}</span>
              <label className="font-semibold text-[#061A34] dark:text-white">{t.seekerName}</label>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                value={formData.inquirerName}
                onChange={(e) => setFormData({ ...formData, inquirerName: e.target.value })}
                placeholder={t.seekerNamePlaceholder}
                className="w-full h-11 px-3 pl-9 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-sm outline-none border border-[#E2E8F0] dark:border-white/10"
              />
              <User className="w-4 h-4 absolute left-3 text-[#75777e]" />
            </div>
          </div>

          {/* WhatsApp / Phone */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#BE123C]">*</span>
              <label className="font-semibold text-[#061A34] dark:text-white">
                {t.whatsappNumber}
              </label>
            </div>
            <div className="relative flex items-center">
              <input
                type="tel"
                required
                value={formData.inquirerPhone}
                onChange={(e) => setFormData({ ...formData, inquirerPhone: e.target.value })}
                placeholder="+92 300 1234567"
                dir="ltr"
                className="w-full h-11 px-3 pl-9 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-sm outline-none border border-[#E2E8F0] dark:border-white/10 text-left font-mono"
              />
              <Phone className="w-4 h-4 absolute left-3 text-[#10B981]" />
            </div>
            <span className="text-[10px] text-[#75777e] dark:text-[#94A3B8] text-right rtl:text-right ltr:text-left">
              {t.whatsappNote}
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#75777e]">{t.optional}</span>
              <label className="font-semibold text-[#061A34] dark:text-white">{t.seekerEmail}</label>
            </div>
            <div className="relative flex items-center">
              <input
                type="email"
                value={formData.inquirerEmail}
                onChange={(e) => setFormData({ ...formData, inquirerEmail: e.target.value })}
                placeholder="fatwa.seeker@example.com"
                dir="ltr"
                className="w-full h-11 px-3 pl-9 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-sm outline-none border border-[#E2E8F0] dark:border-white/10 text-left font-mono"
              />
              <Mail className="w-4 h-4 absolute left-3 text-[#75777e]" />
            </div>
          </div>

          {/* City / Country */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#BE123C]">*</span>
              <label className="font-semibold text-[#061A34] dark:text-white">{t.cityCountry}</label>
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                required
                value={formData.inquirerCity}
                onChange={(e) => setFormData({ ...formData, inquirerCity: e.target.value })}
                className="w-full h-11 px-3 pl-9 rounded-xl bg-[#f8f9ff] dark:bg-[#061A34] text-[#0b1c30] dark:text-white text-sm outline-none border border-[#E2E8F0] dark:border-white/10"
              />
              <MapPin className="w-4 h-4 absolute left-3 text-[#75777e]" />
            </div>
          </div>
        </div>

        {/* 6. Confidentiality Pledge Checkbox */}
        <div
          onClick={() =>
            setFormData({
              ...formData,
              confidentialityAccepted: !formData.confidentialityAccepted,
            })
          }
          className="bg-[#FBF9F3] dark:bg-[#132544] rounded-2xl p-3.5 border border-[#D4AF37]/30 flex items-start gap-2.5 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={formData.confidentialityAccepted}
            onChange={() => {}}
            className="mt-0.5 h-4 w-4 rounded text-[#061A34] dark:text-[#D4AF37] accent-[#061A34] shrink-0"
          />
          <p className="text-xs text-[#061A34] dark:text-white leading-relaxed text-left rtl:text-right">
            {t.confidentialityPledge}
          </p>
        </div>

        {/* 7. Submit Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-2xl bg-[#061A34] hover:bg-[#132544] dark:bg-[#D4AF37] dark:hover:bg-[#D1AC5B] text-white dark:text-[#061A34] font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all disabled:opacity-75"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white dark:border-[#061A34] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>{t.submitQuestion}</span>
            </>
          )}
        </button>

        {/* 8. Urgent WhatsApp Shortcut */}
        <div className="rounded-2xl bg-white dark:bg-[#132544] p-3.5 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex items-center justify-between gap-3">
          <a
            href="https://wa.me/923017671222"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <div className="flex flex-col text-left rtl:text-right flex-1 min-w-0">
            <span className="text-xs font-bold text-[#061A34] dark:text-white">
              {currentLanguage === 'ur' ? 'فوری یا ہنگامی شرعی مسئلہ؟' : 'Urgent Religious Inquiry?'}
            </span>
            <span className="text-[11px] text-[#75777e] dark:text-[#94A3B8] truncate">
              {t.urgentIssueNote}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
