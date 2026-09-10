export type Language = 'en' | 'ur' | 'ar';

export type Screen =
  | 'home'
  | 'fatwas'
  | 'fatwa-detail'
  | 'ask'
  | 'ask-success'
  | 'scholars'
  | 'scholar-detail'
  | 'services'
  | 'publications'
  | 'about'
  | 'contact'
  | 'donation'
  | 'social'
  | 'notifications'
  | 'settings'
  | 'search'
  | 'bookmarks';

export interface Fatwa {
  id: string;
  fatwaNumber: string;
  hijriDate: string;
  gregorianDate: string;
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  category: string;
  categoryName: {
    en: string;
    ur: string;
    ar: string;
  };
  summary: {
    en: string;
    ur: string;
    ar: string;
  };
  question: {
    en: string;
    ur: string;
    ar: string;
  };
  inquirerLocation: {
    en: string;
    ur: string;
    ar: string;
  };
  ruling: {
    en: string;
    ur: string;
    ar: string;
  };
  quranicAyah?: {
    arabic: string;
    reference: string;
    translation: {
      en: string;
      ur: string;
      ar: string;
    };
  };
  citations: Array<{
    book: string;
    text: string;
    reference: string;
  }>;
  scholar: {
    name: string;
    title: string;
  };
  isCertified: boolean;
  referenceCode: string;
  viewsCount: number;
  helpfulCount: number;
  tags: string[];
}

export interface Scholar {
  id: string;
  name: {
    en: string;
    ur: string;
    ar: string;
  };
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  role: {
    en: string;
    ur: string;
    ar: string;
  };
  bio: {
    en: string;
    ur: string;
    ar: string;
  };
  image: string;
  areasOfExpertise: string[];
  department: string;
  yearsOfTeaching: number;
  verifiedFatwas: number;
  studentsInIfta: number;
  timings: {
    en: string;
    ur: string;
    ar: string;
  };
  isLead?: boolean;
  phone?: string;
  whatsapp?: string;
}

export interface BankAccountDetails {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branch: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  tag: {
    en: string;
    ur: string;
    ar: string;
  };
  description: {
    en: string;
    ur: string;
    ar: string;
  };
  actionLabel: {
    en: string;
    ur: string;
    ar: string;
  };
}

export interface Publication {
  id: string;
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  author: {
    en: string;
    ur: string;
    ar: string;
  };
  category: string;
  pages: number;
  fileSize: string;
  description: {
    en: string;
    ur: string;
    ar: string;
  };
  coverColor: string;
  downloadUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: {
    en: string;
    ur: string;
    ar: string;
  };
  message: {
    en: string;
    ur: string;
    ar: string;
  };
  time: string;
  type: 'fatwa' | 'prayer' | 'announcement' | 'system';
  isRead: boolean;
}

export interface AskQuestionFormState {
  title: string;
  category: string;
  questionDetails: string;
  inquirerName: string;
  inquirerPhone: string;
  inquirerEmail: string;
  inquirerCity: string;
  attachedFileName: string;
  confidentialityAccepted: boolean;
}
