import { DailyPrayerData, PrayerTimeItem } from '../types';

// Convert English numerals to Urdu / Eastern Arabic digits
export function toUrduDigits(num: number | string): string {
  const urduDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (w) => urduDigits[+w]);
}

export function toArabicDigits(num: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (w) => arabicDigits[+w]);
}

const URDU_WEEKDAYS = [
  'اتوار',
  'پیر',
  'منگل',
  'بدھ',
  'جمعرات',
  'جمعۃ المبارک',
  'ہفتہ',
];

const URDU_GREGORIAN_MONTHS = [
  'جنوری',
  'فروری',
  'مارچ',
  'اپریل',
  'مئی',
  'جون',
  'جولائی',
  'اگست',
  'ستمبر',
  'اکتوبر',
  'نومبر',
  'دسمبر',
];

const ARABIC_GREGORIAN_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

const URDU_HIJRI_MONTHS: Record<number, string> = {
  1: 'محرم الحرام',
  2: 'صفر المظفر',
  3: 'ربیع الاول',
  4: 'ربیع الثانی',
  5: 'جمادی الاول',
  6: 'جمادی الثانی',
  7: 'رجب المرجب',
  8: 'شعبان المعظم',
  9: 'رمضان المبارک',
  10: 'شوال المکرم',
  11: 'ذوالقعدۃ الحرام',
  12: 'ذوالحجۃ الحرام',
};

const EN_HIJRI_MONTHS: Record<number, string> = {
  1: 'Muharram',
  2: 'Safar',
  3: 'Rabi-ul-Awwal',
  4: 'Rabi-us-Sani',
  5: 'Jumada al-Awwal',
  6: 'Jumada as-Sani',
  7: 'Rajab',
  8: "Sha'ban",
  9: 'Ramadan',
  10: 'Shawwal',
  11: "Dhu'l-Qa'dah",
  12: "Dhu'l-Hijjah",
};

const AR_HIJRI_MONTHS: Record<number, string> = {
  1: 'المحرم',
  2: 'صفر',
  3: 'ربيع الأول',
  4: 'ربيع الثاني',
  5: 'جمادى الأولى',
  6: 'جمادى الآخرة',
  7: 'رجب',
  8: 'شعبان',
  9: 'رمضان',
  10: 'شوال',
  11: 'ذو القعدة',
  12: 'ذو الحجة',
};

// Format 24h ("04:59") to 12h ("4:59 AM")
export function formatTo12Hour(time24: string): string {
  const [hourStr, minStr] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const min = minStr || '00';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // hour '0' should be '12'
  return `${hour}:${min} ${ampm}`;
}

// Compute dynamic Gregorian dates for today
export function getDynamicGregorianDates(date = new Date()) {
  const dayNameUrdu = URDU_WEEKDAYS[date.getDay()];
  const dayNum = date.getDate();
  const monthNum = date.getMonth();
  const year = date.getFullYear();

  const enDate = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const urDate = `${dayNameUrdu}، ${toUrduDigits(dayNum)} ${URDU_GREGORIAN_MONTHS[monthNum]} ${toUrduDigits(year)}ء`;

  const arabicDayName = date.toLocaleDateString('ar-SA', { weekday: 'long' });
  const arDate = `${arabicDayName}، ${toArabicDigits(dayNum)} ${ARABIC_GREGORIAN_MONTHS[monthNum]} ${toArabicDigits(year)} م`;

  return {
    gregorianDateEn: enDate,
    gregorianDate: urDate,
    gregorianDateAr: arDate,
  };
}

// Fallback algorithm to compute Hijri date locally if internet is unavailable
export function getLocalHijriEstimate(date = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    let day = 1;
    let month = 1;
    let year = 1448;

    for (const p of parts) {
      if (p.type === 'day') day = parseInt(p.value, 10);
      if (p.type === 'month') month = parseInt(p.value, 10);
      if (p.type === 'year') year = parseInt(p.value, 10);
    }

    const monthUr = URDU_HIJRI_MONTHS[month] || 'ربیع الاول';
    const monthEn = EN_HIJRI_MONTHS[month] || 'Rabi-ul-Awwal';
    const monthAr = AR_HIJRI_MONTHS[month] || 'ربيع الأول';

    return {
      hijriDate: `${toUrduDigits(day)} ${monthUr} ${toUrduDigits(year)}ھ`,
      hijriDateEn: `${day} ${monthEn} ${year} AH`,
      hijriDateAr: `${toArabicDigits(day)} ${monthAr} ${toArabicDigits(year)} هـ`,
    };
  } catch {
    return {
      hijriDate: '۲۸ ربیع الاول ۱۴۴۸ھ',
      hijriDateEn: '28 Rabi-ul-Awwal 1448 AH',
      hijriDateAr: '٢٨ ربيع الأول ١٤٤٨ هـ',
    };
  }
}

// Determine which prayer is currently active based on current time
export function determineActivePrayer(times: { nameEn: string; rawTime?: string; time: string }[]): string {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const parseMinutes = (t: string) => {
    // Check if rawTime exists like "16:57"
    if (t.includes(':') && !t.includes('AM') && !t.includes('PM')) {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    }
    // Parse 12h format like "4:59 AM" or "12:29 PM"
    const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const isPM = match[3].toUpperCase() === 'PM';
      if (isPM && h !== 12) h += 12;
      if (!isPM && h === 12) h = 0;
      return h * 60 + m;
    }
    return 0;
  };

  const fajr = parseMinutes(times.find((t) => t.nameEn === 'Fajr')?.rawTime || times.find((t) => t.nameEn === 'Fajr')?.time || '04:59');
  const sunrise = parseMinutes(times.find((t) => t.nameEn === 'Sunrise')?.rawTime || times.find((t) => t.nameEn === 'Sunrise')?.time || '06:16');
  const dhuhr = parseMinutes(times.find((t) => t.nameEn === 'Dhuhr')?.rawTime || times.find((t) => t.nameEn === 'Dhuhr')?.time || '12:29');
  const asr = parseMinutes(times.find((t) => t.nameEn === 'Asr')?.rawTime || times.find((t) => t.nameEn === 'Asr')?.time || '16:57');
  const maghrib = parseMinutes(times.find((t) => t.nameEn === 'Maghrib')?.rawTime || times.find((t) => t.nameEn === 'Maghrib')?.time || '18:41');
  const isha = parseMinutes(times.find((t) => t.nameEn === 'Isha')?.rawTime || times.find((t) => t.nameEn === 'Isha')?.time || '19:58');

  if (currentMinutes >= fajr && currentMinutes < sunrise) return 'Fajr';
  if (currentMinutes >= sunrise && currentMinutes < dhuhr) return 'Sunrise';
  if (currentMinutes >= dhuhr && currentMinutes < asr) return 'Dhuhr';
  if (currentMinutes >= asr && currentMinutes < maghrib) return 'Asr';
  if (currentMinutes >= maghrib && currentMinutes < isha) return 'Maghrib';
  return 'Isha';
}

// Fallback static prayer times for Karachi (Hanafi, Banuri Town calculation)
const FALLBACK_PRAYER_TIMES: PrayerTimeItem[] = [
  { nameEn: 'Fajr', nameUr: 'فجر', nameAr: 'الفجر', time: '4:59 AM', rawTime: '04:59' },
  { nameEn: 'Sunrise', nameUr: 'طلوع', nameAr: 'الشروق', time: '6:16 AM', rawTime: '06:16' },
  { nameEn: 'Dhuhr', nameUr: 'ظہر', nameAr: 'الظهر', time: '12:29 PM', rawTime: '12:29' },
  { nameEn: 'Asr', nameUr: 'عصر', nameAr: 'العصر', time: '4:57 PM', rawTime: '16:57' },
  { nameEn: 'Maghrib', nameUr: 'مغرب', nameAr: 'المغرب', time: '6:41 PM', rawTime: '18:41' },
  { nameEn: 'Isha', nameUr: 'عشاء', nameAr: 'العشاء', time: '7:58 PM', rawTime: '19:58' },
];

export function getDefaultPrayerData(): DailyPrayerData {
  const greg = getDynamicGregorianDates();
  const hijri = getLocalHijriEstimate();
  const activePrayer = determineActivePrayer(FALLBACK_PRAYER_TIMES);

  const times = FALLBACK_PRAYER_TIMES.map((t) => ({
    ...t,
    current: t.nameEn === activePrayer,
  }));

  return {
    ...greg,
    ...hijri,
    times,
    isOnline: false,
    sourceMethod: 'جامعہ العلوم الاسلامیہ بنوری ٹاؤن، کراچی',
  };
}

// Online Namaz Time fetcher using Aladhan API for Karachi (Hanafi calculation)
export async function fetchLiveKarachiPrayerTimes(): Promise<DailyPrayerData> {
  const greg = getDynamicGregorianDates();
  const localHijri = getLocalHijriEstimate();

  const today = new Date();
  const cacheKey = `darulifta_prayer_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  // Check cached data for today first
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached) as DailyPrayerData;
      const currentActive = determineActivePrayer(parsed.times);
      return {
        ...parsed,
        ...greg, // ensure gregorian is updated
        times: parsed.times.map((t) => ({
          ...t,
          current: t.nameEn === currentActive,
        })),
      };
    }
  } catch (e) {
    console.warn('Could not read prayer cache', e);
  }

  try {
    // Aladhan API: method=1 (University of Islamic Sciences, Karachi), school=1 (Hanafi)
    const res = await fetch(
      'https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=1&school=1',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }

    const json = await res.json();
    if (json && json.data && json.data.timings) {
      const timings = json.data.timings;
      const apiHijri = json.data.date?.hijri;

      // Extract Hijri date from API
      let hijriDate = localHijri.hijriDate;
      let hijriDateEn = localHijri.hijriDateEn;
      let hijriDateAr = localHijri.hijriDateAr;

      if (apiHijri) {
        const day = parseInt(apiHijri.day, 10);
        const monthNum = parseInt(apiHijri.month?.number, 10);
        const year = parseInt(apiHijri.year, 10);

        const mUr = URDU_HIJRI_MONTHS[monthNum] || apiHijri.month?.ar || 'ربیع الاول';
        const mEn = EN_HIJRI_MONTHS[monthNum] || apiHijri.month?.en || 'Rabi-ul-Awwal';
        const mAr = AR_HIJRI_MONTHS[monthNum] || apiHijri.month?.ar || 'ربيع الأول';

        hijriDate = `${toUrduDigits(day)} ${mUr} ${toUrduDigits(year)}ھ`;
        hijriDateEn = `${day} ${mEn} ${year} AH`;
        hijriDateAr = `${toArabicDigits(day)} ${mAr} ${toArabicDigits(year)} هـ`;
      }

      // Build prayer times list
      const rawTimes: PrayerTimeItem[] = [
        {
          nameEn: 'Fajr',
          nameUr: 'فجر',
          nameAr: 'الفجر',
          time: formatTo12Hour(timings.Fajr),
          rawTime: timings.Fajr,
        },
        {
          nameEn: 'Sunrise',
          nameUr: 'طلوع',
          nameAr: 'الشروق',
          time: formatTo12Hour(timings.Sunrise),
          rawTime: timings.Sunrise,
        },
        {
          nameEn: 'Dhuhr',
          nameUr: 'ظہر',
          nameAr: 'الظهر',
          time: formatTo12Hour(timings.Dhuhr),
          rawTime: timings.Dhuhr,
        },
        {
          nameEn: 'Asr',
          nameUr: 'عصر',
          nameAr: 'العصر',
          time: formatTo12Hour(timings.Asr),
          rawTime: timings.Asr,
        },
        {
          nameEn: 'Maghrib',
          nameUr: 'مغرب',
          nameAr: 'المغرب',
          time: formatTo12Hour(timings.Maghrib),
          rawTime: timings.Maghrib,
        },
        {
          nameEn: 'Isha',
          nameUr: 'عشاء',
          nameAr: 'العشاء',
          time: formatTo12Hour(timings.Isha),
          rawTime: timings.Isha,
        },
      ];

      const activePrayer = determineActivePrayer(rawTimes);
      const times = rawTimes.map((t) => ({
        ...t,
        current: t.nameEn === activePrayer,
      }));

      const nowTimeStr = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const result: DailyPrayerData = {
        ...greg,
        hijriDate,
        hijriDateEn,
        hijriDateAr,
        times,
        isOnline: true,
        lastUpdated: nowTimeStr,
        sourceMethod: 'جامعہ العلوم الاسلامیہ علامہ بنوری ٹاؤن کراچی (حنفی)',
      };

      try {
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch {
        // ignore storage errors
      }

      return result;
    }
  } catch (err) {
    console.warn('Aladhan prayer fetch failed, using calculated default', err);
  }

  return getDefaultPrayerData();
}
