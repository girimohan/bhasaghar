import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { CourseCard } from '@/components/sections/CourseCard'
import { PricingCard } from '@/components/sections/PricingCard'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { PRICING_PLANS, LEVELS } from '@/lib/constants'
import { getLevelColor } from '@/lib/utils'
import { ArrowRight, Star } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'ne'
      ? 'भाषाघर — नेपाली बालबालिका सिकाइ प्लेटफर्म'
      : 'BhasaGhar — Nepali Kids Learning Platform',
  }
}

const testimonials = [
  {
    name: 'Priya S.',
    country: 'Oslo, Norway 🇳🇴',
    quote: 'My daughter was born here but now speaks beautiful Nepali. BhasaGhar made it fun!',
    rating: 5,
  },
  {
    name: 'Ramesh T.',
    country: 'Stockholm, Sweden 🇸🇪',
    quote: 'The teachers are amazing and the curriculum is well-structured. Our son loves it.',
    rating: 5,
  },
  {
    name: 'Sita K.',
    country: 'London, UK 🇬🇧',
    quote: 'Finally a platform that understands diaspora kids. Highly recommend!',
    rating: 5,
  },
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Fetch published courses from Supabase
  const supabase = await createClient()
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('level', { ascending: true })
    .limit(6)

  return (
    <>
      {/* Hero */}
      <Hero locale={locale} />

      {/* Features */}
      <Features />

      {/* Levels Section */}
      <LevelsSection locale={locale} />

      {/* Courses Section */}
      {courses && courses.length > 0 && (
        <CoursesSection courses={courses} locale={locale} />
      )}

      {/* Testimonials */}
      <TestimonialsSection locale={locale} testimonials={testimonials} />

      {/* Pricing */}
      <PricingSection locale={locale} />

      {/* CTA Banner */}
      <CTASection locale={locale} />
    </>
  )
}

function LevelsSection({ locale }: { locale: string }) {
  const t = useTranslations('home.levels')

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-neutral-500">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEVELS.map((level) => (
            <div
              key={level.id}
              className="relative rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow duration-200"
            >
              <div className={`${level.color} h-2`} />
              <div className="p-6 bg-white">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${level.color} text-white text-xl font-bold`}>
                  {level.id}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {locale === 'ne' ? level.label_ne : level.label_en}
                </h3>
                <p className="text-sm text-neutral-500 mb-4">
                  {locale === 'ne' ? level.description_ne : level.description_en}
                </p>
                <Link
                  href={`/${locale}/courses?level=${level.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-red transition-colors"
                >
                  {t('learnMore')} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoursesSection({
  courses,
  locale,
}: {
  courses: any[]
  locale: string
}) {
  const t = useTranslations('courses')

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">{t('title')}</h2>
            <p className="text-neutral-500 mt-1">{t('subtitle')}</p>
          </div>
          <Link href={`/${locale}/courses`}>
            <Button variant="outline" size="sm">
              {useTranslations('common')('viewAll')} <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection({
  locale,
  testimonials,
}: {
  locale: string
  testimonials: typeof testimonials
}) {
  const t = useTranslations('home.testimonials')

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">{t('title')}</h2>
          <p className="text-neutral-500">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                <p className="text-xs text-neutral-400">{t.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection({ locale }: { locale: string }) {
  const t = useTranslations('pricing')

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-neutral-500">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PRICING_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ locale }: { locale: string }) {
  const t = useTranslations('home.cta')

  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue-dark">
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h2>
        <p className="text-lg text-white/70 mb-8">{t('subtitle')}</p>
        <Link href={`/${locale}/free-trial`}>
          <Button
            variant="outline"
            size="xl"
            className="border-white text-white hover:bg-white hover:text-brand-blue"
          >
            {t('button')} <ArrowRight size={18} />
          </Button>
        </Link>
        <p className="mt-4 text-sm text-white/50">{t('note')}</p>
      </div>
    </section>
  )
}
