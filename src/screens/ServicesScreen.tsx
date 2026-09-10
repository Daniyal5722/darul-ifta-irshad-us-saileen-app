import React from 'react';
import { Screen, Language } from '../types';
import { translations } from '../data/translations';
import { mockServices } from '../data/mockData';
import {
  Layers,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';

interface ServicesScreenProps {
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="flex flex-col gap-4 pb-12">
      {/* 1. Services Header Banner */}
      <section className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-1 text-left rtl:text-right">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="font-bold text-base text-[#061A34] dark:text-white">
            {currentLanguage === 'ur' ? 'دارالافتاء کے مرکزی شعبہ جات و خدمات' : 'Departments & Services'}
          </h2>
        </div>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] leading-relaxed">
          {currentLanguage === 'ur'
            ? 'امت مسلمہ کی دینی رہنمائی، علمی تربیت اور فکری اصلاح کے لیے قائم کردہ شعبہ جات'
            : 'Explore our specialized religious advisory, academic research, and community arbitration services.'}
        </p>
      </section>

      {/* 2. Detailed Service Cards */}
      <section className="flex flex-col gap-3.5">
        {mockServices.map((service, index) => (
          <article
            key={service.id}
            className="bg-white dark:bg-[#132544] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-white/5 flex flex-col gap-3 transition-all hover:border-[#D4AF37]/40"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eff4ff] dark:bg-[#061A34] text-[#061A34] dark:text-[#D1AC5B] flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex flex-col text-left rtl:text-right">
                  <h3 className="font-bold text-sm sm:text-base text-[#061A34] dark:text-white">
                    {service.title[currentLanguage]}
                  </h3>
                  <span className="text-xs text-[#7a580f] dark:text-[#D1AC5B]">
                    {service.tag[currentLanguage]}
                  </span>
                </div>
              </div>
            </div>

            <p className="font-urdu text-xs sm:text-sm text-[#75777e] dark:text-[#94A3B8] leading-relaxed text-left rtl:text-right">
              {service.description[currentLanguage]}
            </p>

            <div className="pt-2 border-t border-[#E2E8F0] dark:border-white/5 flex items-center justify-between">
              <button
                onClick={() => {
                  if (service.id.includes('fatwa')) {
                    onNavigate('ask');
                  } else if (service.id.includes('publication')) {
                    onNavigate('publications');
                  } else if (service.id.includes('education')) {
                    onNavigate('scholars');
                  } else {
                    onNavigate('contact');
                  }
                }}
                className="h-9 px-4 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
              >
                <span>{service.actionLabel[currentLanguage]}</span>
                <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>

              <span className="text-[11px] text-[#10B981] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>فعال و جاری</span>
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* 3. Inquiry Assistance Callout */}
      <section className="rounded-2xl bg-[#FBF9F3] dark:bg-[#132544] p-4 text-center border border-[#D4AF37]/30 flex flex-col items-center gap-2">
        <Sparkles className="w-6 h-6 text-[#D4AF37]" />
        <h4 className="font-bold text-sm text-[#061A34] dark:text-white">
          {currentLanguage === 'ur' ? 'کسی شعبے سے متعلق خصوصی استفسار؟' : 'Need Specialized Assistance?'}
        </h4>
        <p className="text-xs text-[#75777e] dark:text-[#94A3B8] max-w-xs leading-relaxed">
          {currentLanguage === 'ur'
            ? 'جامعہ کے انتظامی دفتر یا ناظمِ دارالافتاء سے براہِ راست رابطہ کے لیے فون یا واٹس ایپ کا انتخاب فرمائیں۔'
            : 'Get in touch with our administration office for queries regarding departments.'}
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="mt-1 px-4 py-2 rounded-xl bg-[#061A34] dark:bg-[#D4AF37] text-white dark:text-[#061A34] text-xs font-bold"
        >
          {t.contact}
        </button>
      </section>
    </div>
  );
};
