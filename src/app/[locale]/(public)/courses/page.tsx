import { useTranslations } from 'next-intl'
import { CourseCard } from '@/components/sections/CourseCard'
import { createClient } from '@/lib/supabase/server'
import { LEVELS } from '@/lib/constants'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Courses' }

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ level?: string }>
}) {
  const { locale } = await params
  const { level } = await searchParams

  const supabase = await createClient()
  let query = supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('level', { ascending: true })

  if (level && ['1', '2', '3'].includes(level)) {
    query = query.eq('level', parseInt(level))
  }

  const { data: courses } = await query

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {locale === 'ne' ? 'हाम्रा पाठ्यक्रमहरू' : 'Our Courses'}
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto">
          {locale === 'ne'
            ? 'हरेक उमेर समूहको लागि संरचित नेपाली भाषा सिकाइ'
            : 'Structured Nepali language learning for every age group'}
        </p>
      </div>

      {/* Level filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <a
          href={`/${locale}/courses`}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            !level
              ? 'bg-brand-blue text-white'
              : 'bg-white border border-neutral-200 text-neutral-600 hover:border-brand-blue hover:text-brand-blue'
          }`}
        >
          {locale === 'ne' ? 'सबै स्तरहरू' : 'All Levels'}
        </a>
        {LEVELS.map((lvl) => (
          <a
            key={lvl.id}
            href={`/${locale}/courses?level=${lvl.id}`}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              level === String(lvl.id)
                ? 'bg-brand-blue text-white'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-brand-blue hover:text-brand-blue'
            }`}
          >
            {locale === 'ne' ? `स्तर ${lvl.id}` : `Level ${lvl.id}`}
          </a>
        ))}
      </div>

      {/* Courses grid */}
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-4xl mb-4">📚</p>
          <p className="text-lg font-medium">
            {locale === 'ne' ? 'चाँडै आउँदैछ' : 'Courses coming soon!'}
          </p>
        </div>
      )}
    </div>
  )
}
