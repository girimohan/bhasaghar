import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getBilingualValue } from '@/lib/utils'
import { Clock, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: course } = await supabase
    .from('courses')
    .select('title_en, title_ne')
    .eq('id', id)
    .single()
  return { title: course?.title_en ?? 'Course' }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const supabase = await createClient()

  const { data: course } = await supabase
    .from('courses')
    .select('*, lessons(id, title_en, title_ne, order_index, duration_minutes, is_published)')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (!course) notFound()

  const title       = getBilingualValue(course.title_en, course.title_ne, locale)
  const description = getBilingualValue(course.description_en, course.description_ne, locale)
  const lessons     = (course.lessons as any[] ?? []).filter((l: any) => l.is_published)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back */}
      <Link
        href={`/${locale}/courses`}
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-blue mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> {locale === 'ne' ? 'पछाडि' : 'Back to Courses'}
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2">
          {/* Cover */}
          <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-red/10 mb-6">
            {course.image_url && (
              <Image src={course.image_url} alt={title} fill className="object-cover" />
            )}
            <div className="absolute top-4 left-4">
              <Badge variant={course.level === 1 ? 'green' : course.level === 2 ? 'blue' : 'red'}>
                {locale === 'ne' ? `स्तर ${course.level}` : `Level ${course.level}`}
              </Badge>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-3">{title}</h1>
          {description && (
            <p className="text-neutral-500 leading-relaxed mb-8">{description}</p>
          )}

          {/* Lesson list */}
          {lessons.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                {locale === 'ne' ? 'पाठहरू' : 'Lessons'} ({lessons.length})
              </h2>
              <div className="space-y-2">
                {lessons
                  .sort((a: any, b: any) => a.order_index - b.order_index)
                  .map((lesson: any, i: number) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-3 p-4 rounded-xl border border-neutral-100 bg-white"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-800 truncate">
                          {getBilingualValue(lesson.title_en, lesson.title_ne, locale)}
                        </p>
                      </div>
                      {lesson.duration_minutes && (
                        <span className="text-xs text-neutral-400 flex items-center gap-1 flex-shrink-0">
                          <Clock size={11} /> {lesson.duration_minutes}m
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 bg-white rounded-2xl border border-neutral-200 shadow-md p-6">
            <div className="text-3xl font-extrabold text-neutral-900 mb-1">
              {course.price === 0
                ? locale === 'ne' ? 'नि:शुल्क' : 'Free'
                : `${course.currency} ${Number(course.price).toFixed(0)}`}
            </div>
            <p className="text-sm text-neutral-400 mb-6">
              {locale === 'ne' ? 'प्रति महिना' : 'per month with subscription'}
            </p>

            <ul className="space-y-2.5 mb-6">
              {[
                locale === 'ne' ? `${lessons.length} पाठहरू` : `${lessons.length} lessons`,
                locale === 'ne' ? 'लाइभ कक्षाहरू' : 'Live classes',
                locale === 'ne' ? 'गृहकार्य र क्विज' : 'Homework & quizzes',
                locale === 'ne' ? 'प्रगति अनुगमन' : 'Progress tracking',
                locale === 'ne' ? 'ब्याजहरू' : 'Badges & achievements',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle size={16} className="text-success flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link href={`/${locale}/free-trial`}>
              <Button variant="primary" fullWidth size="lg">
                {locale === 'ne' ? 'नि:शुल्क परीक्षण सुरु गर्नुहोस्' : 'Start Free Trial'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
