import { createClient } from '@/lib/supabase/server'
import { formatDate, formatTime, getBilingualValue } from '@/lib/utils'
import { Calendar, Clock, Users, Video } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Class Schedule' }

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: schedules } = await supabase
    .from('class_schedules')
    .select('*, courses(title_en, title_ne), profiles(full_name_en, full_name_ne)')
    .eq('status', 'scheduled')
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(20)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {locale === 'ne' ? 'कक्षा तालिका' : 'Class Schedule'}
        </h1>
        <p className="text-lg text-neutral-500">
          {locale === 'ne'
            ? 'आगामी लाइभ कक्षाहरू हेर्नुहोस्'
            : 'View upcoming live class sessions'}
        </p>
      </div>

      {schedules && schedules.length > 0 ? (
        <div className="space-y-4">
          {schedules.map((schedule) => {
            const courseTitle = getBilingualValue(
              (schedule.courses as any)?.title_en,
              (schedule.courses as any)?.title_ne,
              locale
            )
            const teacherName = getBilingualValue(
              (schedule.profiles as any)?.full_name_en,
              (schedule.profiles as any)?.full_name_ne,
              locale
            )

            return (
              <div
                key={schedule.id}
                className="bg-white rounded-2xl border border-neutral-100 p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-16 h-16 bg-brand-blue rounded-2xl flex flex-col items-center justify-center text-white">
                  <span className="text-xs font-medium">
                    {new Date(schedule.scheduled_at).toLocaleDateString('en', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-bold leading-none">
                    {new Date(schedule.scheduled_at).getDate()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {getBilingualValue(schedule.title_en, schedule.title_ne, locale)}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-2">{courseTitle}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {formatTime(schedule.scheduled_at)} · {schedule.duration_minutes}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {locale === 'ne' ? 'शिक्षक:' : 'Teacher:'} {teacherName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {locale === 'ne' ? 'अधिकतम' : 'Max'} {schedule.max_students} {locale === 'ne' ? 'विद्यार्थीहरू' : 'students'}
                    </span>
                  </div>
                </div>

                {/* Zoom link */}
                {schedule.zoom_link && (
                  <a
                    href={schedule.zoom_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark transition-colors"
                  >
                    <Video size={14} />
                    {locale === 'ne' ? 'सामेल हुनुहोस्' : 'Join'}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">
          <Calendar size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">
            {locale === 'ne'
              ? 'हाल कुनै निर्धारित कक्षा छैन'
              : 'No classes scheduled yet. Check back soon!'}
          </p>
        </div>
      )}
    </div>
  )
}
