import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Clock, BookOpen, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { getLevelColor, getBilingualValue } from '@/lib/utils'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
  locale: string
  lessonCount?: number
}

export function CourseCard({ course, locale, lessonCount }: CourseCardProps) {
  const t = useTranslations('courses')

  const title = getBilingualValue(course.title_en, course.title_ne, locale)
  const description = getBilingualValue(course.description_en, course.description_ne, locale)

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Cover image / placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-brand-blue/10 to-brand-red/10 overflow-hidden">
        {course.image_url ? (
          <Image
            src={course.image_url}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl ne-script text-brand-blue/30 font-bold select-none">
              {['क', 'ख', 'ग'][course.level - 1]}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge
            variant={course.level === 1 ? 'green' : course.level === 2 ? 'blue' : 'red'}
          >
            {t('level')} {course.level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-4 flex-1">
            {description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
          {course.duration_weeks && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {course.duration_weeks} {t('weeks')}
            </span>
          )}
          {lessonCount !== undefined && (
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              {lessonCount} {t('lessons')}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
          <span className="text-base font-bold text-neutral-900">
            {course.price === 0
              ? t('free')
              : `${course.currency} ${course.price.toFixed(0)}`}
          </span>
          <Link
            href={`/${locale}/courses/${course.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-red transition-colors"
          >
            {t('viewDetails')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
