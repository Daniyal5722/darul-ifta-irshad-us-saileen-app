import { Fatwa, Scholar, ServiceItem, Publication, NotificationItem } from '../types';
import { getDefaultPrayerData } from '../services/prayerAndCalendarService';

export const OFFICIAL_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUHYdlVTJB5dX0q9IcNeBYGZSZw5lJFQjQz-6yvhqgCA500_nbfqV12r2MLXLsSywhoLifcrc8hdwLnwUG842MKDwN2OYX5SbPR5b-zeuy_2cFFQI3aBvvjG8xqOGXheA3f9y81AH6-Aq4Q483No_UzpXeVYcjNWNyB4NsIWrtcjf1Qa3FVK04kRylqTyj0HV8AMjzzAtAAg0pFYtBOJpnBRNAYBOce71HrSaZoE6qS3flmL7RwPGhTCPT_Vd_4pcVrJ4';

export const prayerTimesToday = getDefaultPrayerData();

export const mockFatwas: Fatwa[] = [
  {
    id: 'ftw-1446-210',
    fatwaNumber: '1446-210',
    hijriDate: '۱۸ ربیع الاول ۱۴۴۸ھ',
    gregorianDate: 'ستمبر ۲۰۲۶ء',
    title: {
      en: 'Islamic Ruling on Online Cryptocurrency and Digital Asset Trading',
      ur: 'آن لائن کرپٹو اور ڈیجیٹل اسسٹس کے تبادلے کا شرعی حکم',
      ar: 'الحكم الشرعي في تداول العملات الرقمية والأصول المشفرة',
    },
    category: 'transactions',
    categoryName: {
      en: 'Trade & Finance',
      ur: 'معاملات و بیوع',
      ar: 'المعاملات والتجارة',
    },
    summary: {
      en: 'According to Shariah, unstable virtual tokens lacking physical existence or regulatory asset backing involve excessive gharar and speculation, making speculative cryptocurrency trading impermissible.',
      ur: 'شریعتِ مطہرہ کی رو سے مروجہ غیر مستحکم ڈیجیٹل ٹوکنز جن میں حقیقتِ قبض اور مالیت مبہم ہو، ان میں قمار اور غرر کا عنصر غالب پایا جاتا ہے، لہٰذا بطورِ کرنسی ان کی خرید و فروخت جائز نہیں۔',
      ar: 'من الناحية الشرعية، فإن العملات المشفرة المتقلبة التي تفتقر للقبض المعتبر والضمان القانوني يدخلها الغرر والمقامرة، فلا يجوز التعامل بها كوسيط مالي.',
    },
    question: {
      en: 'Respected Muftis, Assalamu Alaikum wa Rahmatullahi wa Barakatuh. Nowadays people invest heavily in digital coins and trading platforms across the internet. Does pure Shariah permit buying, selling, and earning profits on them? Please clarify for heavenly reward.',
      ur: 'محترم مفتیانِ کرام، السلام علیکم ورحمۃ اللہ وبرکاتہ۔ عرض یہ ہے کہ آج کل انٹرنیٹ پر مختلف ڈیجیٹل کوائنز اور ٹریڈنگ پلیٹ فارمز میں سرمایہ کاری کی جاتی ہے، کیا شریعتِ مطہرہ میں اس کی خرید و فروخت اور اس پر نفع حاصل کرنے کی اجازت ہے؟ وضاحت فرما کر ثوابِ دارین حاصل کریں۔ جزاکم اللہ خیراً۔',
      ar: 'حضرات المفتين الكرام، السلام عليكم ورحمة الله وبركاته. يستثمر الكثيرون في العملات الرقمية ومنصات التداول الحديثة، فما هو الحكم الشرعي في شرائها وبيعها والربح منها؟ أفتونا مأجورين.',
    },
    inquirerLocation: {
      en: 'Karachi, Pakistan',
      ur: 'کراچی، پاکستان',
      ar: 'كراتشي، باكستان',
    },
    ruling: {
      en: 'All praise is for Allah, and blessings upon His Messenger. For anything to qualify as valid "Māl" (wealth) in Islamic jurisprudence, it must possess substantial recognized value, permit lawful storage and utility, and remain entirely free from Qimār (gambling) and Gharar (gross uncertainty). Prevailing volatile digital currencies lack statutory guarantee and derive their price swings from speculation without asset anchoring. Unless authorized with tangible asset custody and legal regulatory clearance, engaging in speculative crypto trading must be strictly avoided.',
      ur: 'الجواب وباللہ التوفیق: واضح رہے کہ شریعتِ مطہرہ میں کسی بھی شے کے "مال" اور قابلِ تبادلہ شے قرار پانے کے لیے اس کا حقیقت میں موجود ہونا، معتبر مالیت رکھنا، اور ہر قسم کے قمار (جوا) اور غرر (دھوکہ و ابہام) سے پاک ہونا لازمی شرائط میں سے ہے۔ موجودہ دور میں رائج اکثر ڈیجیٹل کرنسیوں اور ورچوئل ٹوکنز میں قانونی ضمانت کا فقدان ہوتا ہے اور ان کی قیمت محض مصنوعی قیاس آرائیوں (Speculation) پر بڑھتی یا گھٹتی ہے۔ جب تک کسی مروجہ کرپٹو اثاثے کی پشت پناہی کوئی حقیقی معتبر مال نہ کر رہا ہو، اس کا لین دین جوا کے مشابہ اور ممانعت کے زمرے میں آتا ہے۔ خلاصۂ کلام یہ ہے کہ جب تک ریاست یا معتبر مالیاتی اتھارٹی اس کے قانونی ضوابط متعین نہ کرے اور غرر ختم نہ ہو، اس وقت تک مسلمانوں کے لیے ایسی ڈیجیٹل کوائنز کی تجارت سے احتراز لازم ہے۔ وَاللَّهُ تَعَالَى أَعْلَمُ بِالصَّوَابِ۔',
      ar: 'الجواب وبالله التوفيق: من شروط المالية في الفقه الإسلامي ثبوت الصفة المتمولة المعتبرة شرعاً وخلو المعاملة من الغرر والقمار. والعملات الرقمية الحالية قائمة على المضاربات الوهمية والتخمينات دون غطاء حقيقي معتمد. لذا يحرم التعامل بها إلى حين وجود تنظيم شرعي وقانوني يرفع الغرر. والله تعالى أعلم بالصواب.',
    },
    quranicAyah: {
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ مِّنكُمْ',
      reference: 'سورۃ النساء: ۲۹',
      translation: {
        en: 'O you who have believed, do not consume one another\'s wealth unjustly but only in lawful business by mutual consent.',
        ur: 'اے ایمان والو! آپس میں ایک دوسرے کا مال ناحق نہ کھاؤ، سوائے اس کے کہ باہمی رضامندی سے کوئی تجارت ہو۔',
        ar: 'يا أيها الذين آمنوا لا تأكلوا أموالكم بينكم بالباطل إلا أن تكون تجارة عن تراض منكم.',
      },
    },
    citations: [
      {
        book: 'الفتاوى الهندية (فتاویٰ عالمگیری) - کتاب البیوع',
        text: 'البيع مبادلة مال بمال بالتراضي، والمال ما يميل إليه الطبع ويمكن ادخاره لوقت الحاجة...',
        reference: 'جلد ۳، صفحہ ۲',
      },
      {
        book: 'رد المحتار علی الدر المختار (شامی) - باب القمار',
        text: 'لأن القمار من القمر الذي يزداد تارة وينقص أخرى، وسمي القمار قماراً لأن كل واحد من المقامرين ممن يجوز أن يذهب ماله إلى صاحبه...',
        reference: 'جلد ۶، صفحہ ۴۰۳',
      },
    ],
    scholar: {
      name: 'حضرت مولانا مفتی عبد المنان صاحب',
      title: 'بانی و رئیس دارالافتاء و شیخ الحدیث',
    },
    isCertified: true,
    referenceCode: 'FD-9921',
    viewsCount: 12450,
    helpfulCount: 143,
    tags: ['کرپٹو', 'تجارت', 'معاملات', 'ڈیجیٹل کرنسی'],
  },
  {
    id: 'ftw-1445-894',
    fatwaNumber: '1445-894',
    hijriDate: '۲ رمضان المبارک ۱۴۴۷ھ',
    gregorianDate: 'مارچ ۲۰۲۶ء',
    title: {
      en: 'Using Medical Inhalers and Supplemental Oxygen While Fasting',
      ur: 'حالتِ روزہ میں سانس کی تنگی پر میڈیکل انہیلر اور آکسیجن کا استعمال',
      ar: 'حكم استخدام بخاخ الربو والأكسجين أثناء الصيام',
    },
    category: 'worship',
    categoryName: {
      en: 'Worship & Fasting',
      ur: 'عبادات و صوم',
      ar: 'العبادات والصيام',
    },
    summary: {
      en: 'Spraying medicated liquid aerosol into the throat invalidates the fast, necessitating qadha. Pure dry oxygen gas without medicine does not break the fast.',
      ur: 'اگر مریض شدید مجبوری کی حالت میں دوا پر مشتمل اسپرے حلق کے اندر پہنچائے تو روزہ فاسد ہوجائے گا، البتہ محض خالص گیسی آکسیجن جس میں کوئی مائع یا دوا شامل نہ ہو، اس کے سانس کے ذریعے لینے سے روزہ نہیں ٹوٹتا۔',
      ar: 'استعمال البخاخ الدوائي الذي ينفذ منه رذاذ سائل إلى الجوف يفسد الصوم ويوجب القضاء، بخلاف غاز الأكسجين الخالص المجرد من أي دواء فإنه لا يفطر.',
    },
    question: {
      en: 'A chronic asthma patient suffers acute breathlessness during Ramadan fasts. Does using an inhaler or inhaling oxygen break the fast, and what is required as compensation?',
      ur: 'ایک مریض کو دمے کی شدید تکلیف ہے اور روزہ کے دوران سانس اکھڑ جاتی ہے۔ کیا دوا والا انہیلر لینے سے روزہ ٹوٹ جائے گا؟ نیز آکسیجن سلنڈر کا کیا حکم ہے؟',
      ar: 'مريض الربو إذا اشتد عليه ضيق التنفس أثناء نهار رمضان واستعمل البخاخ الطبي أو الأكسجين، هل يبطل صومه؟',
    },
    inquirerLocation: {
      en: 'Karachi, Pakistan',
      ur: 'کراچی، پاکستان',
      ar: 'كراتشي، باكستان',
    },
    ruling: {
      en: 'If medicated aerosol particles enter the throat and reach the digestive tract, the fast is broken according to classical Hanafi jurists, requiring one day of Qadha after recovery without Kaffarah. Pure gas oxygen containing no liquid medicine or moisture does not violate the fast.',
      ur: 'الجواب وباللہ التوفیق: انہیلر میں دوا کے باریک ذرات گیس کی شکل میں حلق میں داخل ہو کر معدے تک پہنچتے ہیں، لہٰذا اس کے استعمال سے روزہ فاسد ہوجاتا ہے اور اس کی قضاء لازم ہوگی۔ البتہ مریض اگر بعد میں بھی قضاء رکھنے کی طاقت نہ پائے تو فدیہ ادا کرے۔ محض خالص آکسیجن گیس جس میں کوئی دوا یا بخارات شامل نہ ہوں، اس سے روزہ نہیں ٹوٹتا۔',
      ar: 'الجواب وبالله التوفيق: بخاخ الربو يحتوي على رذاذ دواء يدخل إلى الحلق، فيفسد الصوم وتجب القضاء دون كفارة. أما الأكسجين النقي دون بخار دواء فلا يفطر.',
    },
    citations: [
      {
        book: 'فتاویٰ قاضی خان - کتاب الصوم',
        text: 'ما دخل في الحلق مما فيه صلاح البدن أو التداوي به يفطر الصائم...',
        reference: 'جلد ۱، صفحہ ۲۰۹',
      },
    ],
    scholar: {
      name: 'مجلسِ افتاء و تحقیق کمیٹی',
      title: 'دارالافتاء ارشاد السائلین',
    },
    isCertified: true,
    referenceCode: 'FD-8940',
    viewsCount: 9800,
    helpfulCount: 312,
    tags: ['روزہ', 'انہیلر', 'طبی مسائل', 'عبادات'],
  },
  {
    id: 'ftw-1445-512',
    fatwaNumber: '1445-512',
    hijriDate: '۱۰ شوال ۱۴۴۶ھ',
    gregorianDate: 'مئی ۲۰۲۵ء',
    title: {
      en: 'Legality of Marriage (Nikah) via Video Call and Social Media',
      ur: 'سوشل میڈیا یا ویڈیو کال پر ایجاب و قبول کی شرعی حیثیت',
      ar: 'حكم عقد النكاح عبر الاتصال المرئي والإنترنت',
    },
    category: 'family',
    categoryName: {
      en: 'Marriage & Family',
      ur: 'عائلی و نکاح',
      ar: 'الأسرة والنكاح',
    },
    summary: {
      en: 'In Hanafi fiqh, physical unity of the contracting session (Ittihad al-Majlis) with two witnesses hearing simultaneously is a prerequisite. Direct video call verbal agreement is void unless a proxy (Wakeel) is legally appointed in the same room as the witnesses.',
      ur: 'نکاح کے درست انعقاد کے لیے عاقدین اور گواہان کی مجلس کا ایک ہونا فقہ حنفی میں لازمی شرط ہے۔ انٹرنیٹ ویڈیو کال پر دونوں مختلف مجالس میں شمار ہوتے ہیں، لہٰذا براہ راست ایجاب و قبول سے نکاح منعقد نہیں ہوتا، البتہ وکیل بنانے کی صورت میں درست ہے۔',
      ar: 'يشترط لصحة عقد النكاح عند الحنفية اتحاد المجلس بين العاقدين والشهود، وعليه لا يصح العقد مباشرة عبر مكالمات الفيديو، والحل الصحيح هو توكيل من ينوب عنه في مجلس العقد.',
    },
    question: {
      en: 'Can a groom residing overseas marry a bride through a live video conference with witnesses watching from their screens?',
      ur: 'ایک نوجوان بیرونِ ملک مقیم ہے اور لڑکی پاکستان میں ہے۔ کیا وہ دونوں واٹس ایپ ویڈیو کال پر گواہوں کے سامنے ایجاب و قبول کر کے نکاح کر سکتے ہیں؟',
      ar: 'هل يصح إجراء عقد النكاح عبر مكالمة فيديو مباشرة بحيث يسمع الشهود الإيجاب والقبول؟',
    },
    inquirerLocation: {
      en: 'Islamabad, Pakistan',
      ur: 'اسلام آباد، پاکستان',
      ar: 'إسلام آباد، باكستان',
    },
    ruling: {
      en: 'A valid marriage requires the contracting parties or their appointed attorneys and two adult Muslim witnesses to physically assemble in a single legal session (Ittihad-ul-Majlis). Virtual presence across internet video does not fulfill this condition. The correct Islamic procedure is for the overseas party to appoint a reliable person as their Wakeel (proxy) in Pakistan to accept on their behalf.',
      ur: 'الجواب وباللہ التوفیق: نکاح کے صحیح ہونے کے لیے ضروری ہے کہ عاقدین (یا ان کے وکلاء) اور گواہان ایک ہی مجلس میں موجود ہوں اور گواہ دونوں کے کلام کو بیک وقت سنیں۔ ویڈیو کال پر مجالس جداگانہ ہوتی ہیں، اس لیے براہِ راست ویڈیو پر نکاح منعقد نہیں ہوگا۔ صحیح طریقہ یہ ہے کہ بیرونِ ملک والا شخص یہاں کسی کو اپنا وکیل مقرر کرے، اور وہ وکیل مجلس میں حاضر ہو کر ایجاب و قبول کرے۔',
      ar: 'الجواب وبالله التوفيق: اتحاد المجلس شرط جوهري لانعقاد النكاح. والاتصال المرئي يعد تعدداً للمجالس. والصواب توكيل وكيل يحضر مجلس العقد مع الشهود الشرعيين.',
    },
    citations: [
      {
        book: 'بدائع الصنائع في ترتيب الشرائع - الإمام الكاساني',
        text: 'ومنها اتحاد المجلس إذا كان العاقدان حاضرين، بأن يكون الإيجاب والقبول في مجلس واحد فلو اختلف المجلس لم ينعقد...',
        reference: 'جلد ۲، صفحہ ۲۳۲',
      },
    ],
    scholar: {
      name: 'حضرت مولانا مفتی عبد المنان صاحب',
      title: 'بانی و سرپرست دارالافتاء',
    },
    isCertified: true,
    referenceCode: 'FD-5120',
    viewsCount: 16200,
    helpfulCount: 420,
    tags: ['نکاح', 'ویڈیو کال', 'عائلی مسائل'],
  },
  {
    id: 'ftw-1445-63',
    fatwaNumber: '1445-63',
    hijriDate: '۱۴ محرم ۱۴۴۵ھ',
    gregorianDate: 'اگست ۲۰۲۳ء',
    title: {
      en: 'Fundamental Principles of Islamic Estate and Inheritance Distribution',
      ur: 'میراث کی شرعی تقسیم کے بنیادی اصول اور حقوقِ متعلقہ',
      ar: 'الأصول الشرعية في توزيع التركة وحقوق الورثة',
    },
    category: 'inheritance',
    categoryName: {
      en: 'Inheritance & Estates',
      ur: 'وراثت و ترکہ',
      ar: 'المواريث والتركات',
    },
    summary: {
      en: 'Before dividing an estate among heirs, four successive rights must be settled: funeral expenses, unpaid debts, valid wills (up to one-third), and then distribution among Quranic sharers and residuaries.',
      ur: 'میت کے ترکہ میں حقوقِ متعلقہ، تجہیز و تکفین، ادائے قرض اور وصیت کے بعد ورثاء میں حصص کا شرعی تناسب متعین کیا جاتا ہے۔ ترکہ کو بغیر تقسیم روکے رکھنا گناہ ہے۔',
      ar: 'تتعلق بتركة الميت أربعة حقوق مرتبة: مؤن التجهيز، قضاء الديون، إنفاذ الوصايا في الثلث، ثم توزيع الباقي على الورثة الشرعيين.',
    },
    question: {
      en: 'Our father passed away leaving commercial property, bank deposits, and debts. How should the estate be prioritized and partitioned?',
      ur: 'ہمارے والد صاحب کا انتقال ہو گیا ہے، ان کے ترکہ میں ایک مکان، نقد رقم اور کچھ قرضے ہیں۔ شرعی رہنمائی فرمائیں کہ تقسیم کا طریقہ کار کیا ہونا چاہیے؟',
      ar: 'توفي والدنا وترك عقاراً وأموالاً وعليه ديون، فكيف تكون أولوية التوزيع بين الورثة وسداد الديون؟',
    },
    inquirerLocation: {
      en: 'Lahore, Pakistan',
      ur: 'لاہور، پاکستان',
      ar: 'لاهور، باكستان',
    },
    ruling: {
      en: 'The deceased\'s estate is first subject to moderate burial expenses. Second, all debts to individuals or financial institutions must be discharged in full. Third, if a valid will exists for non-heirs, it is executed up to one-third of the remainder. Finally, the remaining property is distributed among legitimate heirs according to divine Quranic quotas.',
      ur: 'الجواب وباللہ التوفیق: میت کے کل مال سے سب سے پہلے اس کی تجہیز و تکفین کے جائز اخراجات نکالے جائیں۔ اس کے بعد میت کے ذمہ واجب الاداء تمام قرضے ادا کیے جائیں۔ اگر میت نے کسی غیر وارث کے لیے جائز وصیت کی ہو تو بقیہ مال کے تہائی (1/3) حصے تک وصیت نافذ کی جائے۔ اس کے بعد جو کچھ بچے وہ تمام شرعی ورثاء میں ان کے مقررہ حصوں کے مطابق تقسیم کیا جائے۔',
      ar: 'الجواب وبالله التوفيق: يبدأ أولاً بمؤن تجهيز الميت ثم قضاء الديون، ثم تنفيذ الوصية في حدود الثلث، ثم يقسم الباقي على الورثة حسب الفروض الشرعية.',
    },
    citations: [
      {
        book: 'السراجي في الفرائض - الإمام السجاوندي',
        text: 'يتعلق بتركة الميت حقوق أربعة مرتبة: الأول يبدأ بتكفينه وتجهيزه... ثم تقضى ديونه... ثم تنفذ وصاياه من ثلث ما بقي... ثم يقسم الباقي بين ورثته...',
        reference: 'ص ۳',
      },
    ],
    scholar: {
      name: 'مولانا مفتی محمد فیصل حیات',
      title: 'نائب مفتی و ماہرِ مواریث',
    },
    isCertified: true,
    referenceCode: 'FD-6301',
    viewsCount: 8400,
    helpfulCount: 290,
    tags: ['وراثت', 'ترکہ', 'تقسیم', 'قرض'],
  },
];

export const mockScholars: Scholar[] = [
  {
    id: 'mufti-abdul-mannan',
    name: {
      en: 'Hazrat Maulana Mufti Abdul Mannan Sahib',
      ur: 'حضرت مولانا مفتی عبد المنان صاحب',
      ar: 'فضيلة الشيخ المفتي عبد المنان',
    },
    title: {
      en: 'Chief Mufti & Patron-in-Chief',
      ur: 'صدر مفتی و سرپرستِ اعلیٰ',
      ar: 'المفتي العام والرئيس الأعلى',
    },
    role: {
      en: 'Founder, Head of Darul Ifta & Sheikh-ul-Hadith',
      ur: 'بانی و رئیس دارالافتاء و شیخ الحدیث',
      ar: 'مؤسس ورئيس دار الإفتاء وشيخ الحديث',
    },
    bio: {
      en: 'Serving the propagation of Islamic sacred sciences, teaching Sahih al-Bukhari, and ratifying thousands of legal rulings for over two decades with scholarly devotion.',
      ur: 'گزشتہ دو دہائیوں سے ترویجِ علومِ شرعیہ، تدریسِ حدیث اور ہزاروں فتاویٰ کی تصدیق و اجراء کے فرائض سرانجام دے رہے ہیں۔',
      ar: 'أمضى أكثر من عقدين في خدمة العلوم الشرعية وتدريس الحديث النبوي الشريف وإصدار الفتاوى المعتمدة.',
    },
    image: '',
    areasOfExpertise: ['فقہ اسلامی', 'تخصص فی الافتاء', 'علوم الحدیث', 'اسلامی مالیات'],
    department: 'دارالافتاء و شیخ الحدیث',
    yearsOfTeaching: 22,
    verifiedFatwas: 25000,
    studentsInIfta: 140,
    isLead: true,
    timings: {
      en: '9:00 AM - 12:00 PM & After Zuhr to Asr (Except Friday)',
      ur: 'صبح ۹ تا ۱۲ اور بعد نمازِ ظہر تا عصر (سوائے جمعۃ المبارک)',
      ar: 'من ٩ صباحاً حتى ١٢ ظهراً وبعد الظهر إلى العصر (عدا الجمعة)',
    },
    phone: '+92 333 2617671',
    whatsapp: '+92 333 2617671',
  },
  {
    id: 'mufti-faisal-hayat',
    name: {
      en: 'Maulana Mufti Muhammad Faisal Hayat',
      ur: 'مولانا مفتی محمد فیصل حیات',
      ar: 'الشيخ المفتي محمد فيصل حياة',
    },
    title: {
      en: 'Deputy Head of Ifta & Research Scholar',
      ur: 'نائب شعبہ افتاء و ریسرچ اسکالر',
      ar: 'نائب قسم الإفتاء والباحث الشرعي',
    },
    role: {
      en: 'Specialist in Financial Transactions & Family Law',
      ur: 'ماہر جدید معاشی و تجارتی مسائل اور عائلی تنازعات',
      ar: 'متخصص في المعاملات المالية الحديثة وقضايا الأسرة',
    },
    bio: {
      en: 'Dedicated to resolving contemporary corporate contracts, Islamic banking inquiries, inheritance partitions, and commercial arbitration according to Hanafi jurisprudence.',
      ur: 'جدید تجارتی و معاشی مسائل، عائلی تنازعات اور بینکنگ سے متعلق سوالات کے تفصیلی جوابات۔',
      ar: 'مختص ببحث المسائل الاقتصادية والنزاعات الأسرية والبيوع المعاصرة وفق الفقه الحنفي المعتمد.',
    },
    image: '',
    areasOfExpertise: ['معاملات مالیہ', 'اسلامی بینکاری', 'وراثت', 'معاہدات'],
    department: 'شعبہ معاملات مالیہ',
    yearsOfTeaching: 12,
    verifiedFatwas: 7800,
    studentsInIfta: 45,
    timings: {
      en: 'Daily: Asr to Maghrib',
      ur: 'روزانہ اوقات: عصر تا مغرب',
      ar: 'يومياً: من العصر إلى المغرب',
    },
    phone: '+92 333 2617671',
    whatsapp: '+92 333 2617671',
  },
  {
    id: 'mufti-dawood',
    name: {
      en: 'Maulana Mufti Dawood',
      ur: 'مولانا مفتی داؤد',
      ar: 'الشيخ المفتي داود',
    },
    title: {
      en: 'Head of Specialization in Fiqh & Online Portal',
      ur: 'نگراں شعبہ تخصص فی الفقہ و فتویٰ آن لائن',
      ar: 'مشرف قسم التخصص الفقهي وبوابة الإفتاء الإلكترونية',
    },
    role: {
      en: 'Supervisor of Daily Worship Inquiries & Global Queries',
      ur: 'روزمرہ عبادات، صوم و صلوٰۃ اور بین الاقوامی استفسارات کے حل کے نگراں',
      ar: 'الإشراف على فتاوى العبادات والاستفسارات الدولية عبر الإنترنت',
    },
    bio: {
      en: 'Supervising direct responses to daily acts of devotion, fasting, prayer, zakat, and international internet consultations.',
      ur: 'روزمرہ عبادات، صوم و صلوٰۃ اور بین الاقوامی آن لائن استفسارات کے براہِ راست تسلی بخش حل۔',
      ar: 'تقديم الحلول الفقهية للعبادات اليومية ومتابعة الفتاوى الإلكترونية الدولية.',
    },
    image: '',
    areasOfExpertise: ['عبادات و صوم', 'زکوٰۃ', 'طہارت', 'آن لائن افتاء'],
    department: 'شعبہ تخصص و آن لائن پورٹل',
    yearsOfTeaching: 9,
    verifiedFatwas: 5400,
    studentsInIfta: 30,
    timings: {
      en: 'Daily: 10:00 AM to 2:00 PM',
      ur: 'صبح ۱۰ تا دوپہر ۲ بجے',
      ar: 'من ١٠ صباحاً حتى ٢ ظهراً',
    },
    phone: '+92 333 2617671',
    whatsapp: '+92 333 2617671',
  },
  {
    id: 'mufti-raihan',
    name: {
      en: 'Maulana Mufti Raihan',
      ur: 'مولانا مفتی ریحان',
      ar: 'الشيخ المفتي ريحان',
    },
    title: {
      en: 'Director of Academics & Publications',
      ur: 'ناظم تعلیمات و نشر و اشاعت',
      ar: 'مدير الشؤون التعليمية والنشر',
    },
    role: {
      en: 'Official Records, Stamped Certificates & Legal Archives',
      ur: 'فتاویٰ کے باضابطہ مہر والے ریکارڈ اور تعلیمی ہم آہنگی',
      ar: 'توثيق سجلات الفتاوى المعتمدة والتنسيق الأكاديمي',
    },
    bio: {
      en: 'Overseeing official Darul Ifta archived registers, certification for court matters, and scholarly printing.',
      ur: 'فتاویٰ کے ریکارڈ، باضابطہ دارالافتاء مہر والی کاپیوں کی ترسیل اور تعلیمی ہم آہنگی۔',
      ar: 'إدارة توثيق الفتاوى وتجهيز النسخ الرسمية للمحاكم والجهات القانونية.',
    },
    image: '',
    areasOfExpertise: ['توثیق فتاویٰ', 'قانونی امور', 'اشاعت', 'تعلیمات'],
    department: 'شعبہ نشر و اشاعت',
    yearsOfTeaching: 11,
    verifiedFatwas: 6200,
    studentsInIfta: 25,
    timings: {
      en: 'Morning: 9:00 AM to 1:00 PM',
      ur: 'صبح ۹ تا دوپہر ۱ بجے',
      ar: 'صباحاً: من ٩ إلى ١ ظهراً',
    },
    phone: '+92 333 2617671',
    whatsapp: '+92 333 2617671',
  },
];

export const mockServices: ServiceItem[] = [
  {
    id: 'srv-fatwa',
    icon: 'history_edu',
    title: {
      en: 'Fatwa Service',
      ur: 'فتویٰ سروس',
      ar: 'خدمة الإفتاء',
    },
    tag: {
      en: 'Online & Written',
      ur: 'آن لائن و تحریری',
      ar: 'إلكتروني وكتابي',
    },
    description: {
      en: 'Authentic responses to Islamic legal questions, official stamped fatwa certificates, and comprehensive search archive.',
      ur: 'شرعی سوالات کا جواب، باقاعدہ مہر کے ساتھ تحریری تصدیق نامہ اور آن لائن فتاویٰ آرکائیو۔',
      ar: 'إصدار الفتاوى الشرعية الموثوقة مع الأختام الرسمية وبحث الأرشيف الإلكتروني.',
    },
    actionLabel: {
      en: 'Ask Fatwa Now',
      ur: 'فتویٰ طلب کریں',
      ar: 'طلب فتوى الآن',
    },
  },
  {
    id: 'srv-education',
    icon: 'school',
    title: {
      en: 'Islamic Education & Courses',
      ur: 'اسلامی تعلیم و کورسز',
      ar: 'التعليم والعلوم الشرعية',
    },
    tag: {
      en: 'Takhassus fil-Fiqh',
      ur: 'تخصص فی الفقہ',
      ar: 'تخصص في الفقه',
    },
    description: {
      en: 'Advanced specialization in Islamic jurisprudence, Hadith studies, and online educational circles for seekers of knowledge.',
      ur: 'فقہ، حدیث اور آن لائن تربیتی مجالس و علومِ شرعیہ میں باقاعدہ تخصص۔',
      ar: 'دورات فقهية متقدمة وتدريس الحديث الشريف والعلوم الشرعية.',
    },
    actionLabel: {
      en: 'Explore Courses',
      ur: 'کورسز کی تفصیل',
      ar: 'استعراض الدورات',
    },
  },
  {
    id: 'srv-publications',
    icon: 'auto_stories',
    title: {
      en: 'Publications & Printing',
      ur: 'اشاعت و طباعت',
      ar: 'النشر والمطبوعات',
    },
    tag: {
      en: 'Books & Journals',
      ur: 'کتب و رسائل',
      ar: 'كتب ورسائل',
    },
    description: {
      en: 'Scholarly research papers, collected volumes of Fatawa Irshad us Saileen, and seasonal Islamic booklets.',
      ur: 'مفتیان کرام کے تحقیقی مقالات، فتاویٰ کتب و دینی جرائد کی باقاعدہ اشاعت۔',
      ar: 'نشر أبحاث المفتين وموسوعات الفتاوى والمجلات الدورية.',
    },
    actionLabel: {
      en: 'Browse Books',
      ur: 'کتب ملاحظہ فرمائیں',
      ar: 'تصفح الكتب',
    },
  },
  {
    id: 'srv-consultation',
    icon: 'diversity_3',
    title: {
      en: 'Scholarly Advisory & Consultation',
      ur: 'علمی مشاورت',
      ar: 'الاستشارات الشرعية',
    },
    tag: {
      en: 'Direct Guidance',
      ur: 'براہِ راست رہنمائی',
      ar: 'إرشاد مباشر',
    },
    description: {
      en: 'In-person and remote consultation on complex business contracts, family reconciliation, and inheritance partitions.',
      ur: 'معاملات، وراثت، تجارت اور گھریلو نزاعات میں جید مفتیانِ کرام سے شرعی رہنمائی۔',
      ar: 'جلسات استشارية مع كبار المفتين في قضايا الميراث والصلح الأسري والمعاملات.',
    },
    actionLabel: {
      en: 'Book Appointment',
      ur: 'مشاورت کا وقت لیں',
      ar: 'حجز موعد',
    },
  },
];

export const mockPublications: Publication[] = [
  {
    id: 'pub-1',
    title: {
      en: 'Fatawa Irshad Al-Saileen (Volume 1)',
      ur: 'فتاویٰ ارشاد السائلین (جلد اول: کتاب الایمان و العبادات)',
      ar: 'فتاوى إرشاد السائلين (المجلد الأول: كتاب الإيمان والعبادات)',
    },
    author: {
      en: 'Hazrat Maulana Mufti Abdul Mannan Sahib',
      ur: 'حضرت مولانا مفتی عبد المنان صاحب مدظلہ',
      ar: 'فضيلة الشيخ المفتي عبد المنان',
    },
    category: 'Fiqh',
    pages: 640,
    fileSize: '18.4 MB',
    coverColor: '#061A34',
    description: {
      en: 'Comprehensive collection of verified fatwas on faith, purification, prayers, fasting, and funeral rites according to classical Hanafi doctrine.',
      ur: 'ایمان، طہارت، صلوٰۃ، روزہ اور جنائز سے متعلق سینکڑوں مستند و مدلل فتاویٰ کا عظیم علمی مجموعہ۔',
      ar: 'موسوعة فقهية شاملة تتضمن مئات الفتاوى المعتمدة في الطهارة والصلاة والصيام والجنائز.',
    },
  },
  {
    id: 'pub-2',
    title: {
      en: 'Contemporary Financial Issues & Islamic Banking',
      ur: 'جدید معاشی مسائل اور اسلامی بینکاری کی شرعی حیثیت',
      ar: 'المسائل المالية المعاصرة وموقف الشريعة من الصيرفة',
    },
    author: {
      en: 'Maulana Mufti Muhammad Faisal Hayat',
      ur: 'مولانا مفتی محمد فیصل حیات',
      ar: 'الشيخ المفتي محمد فيصل حياة',
    },
    category: 'Finance',
    pages: 380,
    fileSize: '9.2 MB',
    coverColor: '#132544',
    description: {
      en: 'In-depth research on stock trading, cryptocurrencies, sukuk, forex, and modern commercial partnerships.',
      ur: 'اسٹاک ایکسچینج، ڈیجیٹل کرنسیوں، مضاربت اور جدید بینکنگ پراڈکٹس پر مدلل تحقیقی مقالہ۔',
      ar: 'دراسة تأصيلية حول الأسهم والتشفير الرقمي والمنتجات المصرفية المعاصرة.',
    },
  },
  {
    id: 'pub-3',
    title: {
      en: 'A Simple Guide to Islamic Inheritance & Estate Distribution',
      ur: 'آسان میراث: تقسیمِ ترکہ کے قواعد و ضوابط',
      ar: 'الميراث الميسر: أحكام تقسيم التركات في الفقه الإسلامي',
    },
    author: {
      en: 'Darul Ifta Research Bureau',
      ur: 'دارالافتاء ریسرچ بیورو',
      ar: 'هيئة البحوث بدار الإفتاء',
    },
    category: 'Inheritance',
    pages: 210,
    fileSize: '5.8 MB',
    coverColor: '#7a580f',
    description: {
      en: 'Step-by-step practical manual with solved modern cases and inheritance math tables.',
      ur: 'عام فہم انداز میں ترکہ کی تقسیم، حقوق، اور وارثوں کے حصص کے آسان حسابی خاکے۔',
      ar: 'دليل مبسط لحساب المواريث والمسائل العملية المعاصرة مع جداول الفروض.',
    },
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: {
      en: 'Maghrib Prayer Time in Karachi',
      ur: 'کراچی: نمازِ مغرب کا وقت',
      ar: 'وقت صلاة المغرب في كراتشي',
    },
    message: {
      en: 'Maghrib adhan time has set in (6:32 PM). May Allah accept your worship.',
      ur: 'کراچی میں نمازِ مغرب کا وقت (6:32 PM) ہو چکا ہے۔',
      ar: 'حان الآن موعد أذان المغرب في كراتشي (٦:٣٢ م).',
    },
    time: '15m ago',
    type: 'prayer',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: {
      en: 'New Verified Fatwa Released',
      ur: 'نیا مصدقہ فتویٰ جاری کیا گیا',
      ar: 'صدور فتوى معتمدة جديدة',
    },
    message: {
      en: 'Ruling # 1446-210 regarding digital currencies and crypto trading has been published.',
      ur: 'ڈیجیٹل کرنسی اور آن لائن ٹریڈنگ کے شرعی حکم سے متعلق فتویٰ نمبر 1446-210 شائع ہو گیا ہے۔',
      ar: 'تم نشر الفتوى رقم 1446-210 الخاصة بحكم التعامل بالعملات المشفرة.',
    },
    time: '2h ago',
    type: 'fatwa',
    isRead: false,
  },
  {
    id: 'notif-3',
    title: {
      en: 'Scholarly Consultation Announcement',
      ur: 'علمی و شرعی مشاورت کی نشست',
      ar: 'موعد الاستشارات الشرعية',
    },
    message: {
      en: 'Daily evening consultation by Mufti Muhammad Faisal Hayat will commence after Asr.',
      ur: 'عصر کے بعد مفتی محمد فیصل حیات صاحب بالمشافہ اور فون پر استفسارات کے لیے دستیاب ہوں گے۔',
      ar: 'جلسة الاستشارات الشرعية مع المفتي فيصل حياة تبدأ بعد صلاة العصر.',
    },
    time: '1d ago',
    type: 'announcement',
    isRead: true,
  },
];

export const meezanBankAccount = {
  bankName: 'Meezan Bank Limited',
  accountTitle: 'FAISAL HAYAT',
  accountNumber: '0183-0100450333',
  iban: 'PK56MEZN0001830100450333',
  branch: 'Meezan Bank Karachi, Sindh, Pakistan',
};

