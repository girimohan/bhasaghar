import type { PricingPlan } from '@/types'

export const SITE_NAME = 'BhasaGhar'
export const SITE_TAGLINE_EN = 'Nepali Language for Kids'
export const SITE_TAGLINE_NE = 'बालबालिकाहरूको लागि नेपाली भाषा'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bhasaghar.com'

export const LOCALES = ['en', 'ne'] as const
export const DEFAULT_LOCALE = 'en'

export const LEVELS = [
  {
    id: 1,
    label_en: 'Level 1 — Beginners',
    label_ne: 'स्तर १ — शुरुआती',
    description_en: 'Ages 4–6. Alphabet, numbers, basic words.',
    description_ne: 'उमेर ४–६। वर्णमाला, अंक, आधारभूत शब्दहरू।',
    color: 'bg-green-500',
  },
  {
    id: 2,
    label_en: 'Level 2 — Elementary',
    label_ne: 'स्तर २ — प्राथमिक',
    description_en: 'Ages 7–10. Sentences, stories, conversations.',
    description_ne: 'उमेर ७–१०। वाक्यहरू, कथाहरू, कुराकानी।',
    color: 'bg-brand-blue',
  },
  {
    id: 3,
    label_en: 'Level 3 — Intermediate',
    label_ne: 'स्तर ३ — मध्यवर्ती',
    description_en: 'Ages 11–14. Grammar, writing, culture.',
    description_ne: 'उमेर ११–१४। व्याकरण, लेखन, संस्कृति।',
    color: 'bg-brand-red',
  },
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 19,
    currency: 'EUR',
    period: '/month',
    features: [
      '1 child account',
      'Level 1 access',
      '2 live classes/month',
      'Homework assignments',
      'Progress tracking',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 35,
    currency: 'EUR',
    period: '/month',
    features: [
      '2 child accounts',
      'All 3 levels access',
      '4 live classes/month',
      'Homework + quizzes',
      'Progress tracking',
      'Cultural content',
      'Learning library',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59,
    currency: 'EUR',
    period: '/month',
    features: [
      '3 child accounts',
      'All 3 levels access',
      '8 live classes/month',
      'Priority teacher access',
      'All content unlocked',
      'Badges & certificates',
      'Parent coaching session',
    ],
  },
]

export const NAV_LINKS = [
  { label_en: 'Home', label_ne: 'गृहपृष्ठ', href: '/' },
  { label_en: 'Courses', label_ne: 'पाठ्यक्रमहरू', href: '/courses' },
  { label_en: 'Teachers', label_ne: 'शिक्षकहरू', href: '/teachers' },
  { label_en: 'Schedule', label_ne: 'तालिका', href: '/schedule' },
  { label_en: 'Library', label_ne: 'पुस्तकालय', href: '/library' },
  { label_en: 'Blog', label_ne: 'ब्लग', href: '/blog' },
  { label_en: 'About', label_ne: 'हाम्रोबारे', href: '/about' },
] as const

export const COUNTRIES = [
  'Norway', 'Sweden', 'Denmark', 'Finland', 'Iceland',
  'United Kingdom', 'Germany', 'Netherlands', 'France',
  'Belgium', 'Switzerland', 'Austria', 'Italy', 'Spain',
  'United States', 'Canada', 'Australia', 'Japan', 'Other',
]

export const FREE_TRIAL_DURATION_DAYS = 14
