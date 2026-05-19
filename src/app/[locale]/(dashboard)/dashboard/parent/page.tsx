import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/Progress'
import { formatDate } from '@/lib/utils'
import { Users, BookOpen, Calendar, ClipboardList, Star } from 'lucide-react'

export default async function ParentDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/login`)

  // Get linked children
  const { data: children } = await supabase
    .from('parent_children')
    .select('student_id, profiles(id, full_name_en, full_name_ne, avatar_url)')
    .eq('parent_id', user.id)

  const childIds = children?.map((c) => c.student_id) ?? []

  // Get enrollments for all children
  const { data: enrollments } = childIds.length
    ? await supabase
        .from('enrollments')
        .select('*, courses(title_en, title_ne), profiles(full_name_en)')
        .in('student_id', childIds)
        .eq('status', 'active')
    : { data: [] }

  // Get upcoming classes
  const { data: schedules } = await supabase
    .from('class_schedules')
    .select('*, courses(title_en, title_ne)')
    .eq('status', 'scheduled')
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(5)

  // Pending homework
  const { data: homework } = childIds.length
    ? await supabase
        .from('homework')
        .select('*, courses(title_en, title_ne)')
        .in('course_id', (enrollments ?? []).map((e) => e.course_id))
        .gte('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(5)
    : { data: [] }

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">
        {locale === 'ne' ? 'पालक ड्यासबोर्ड' : 'Parent Dashboard'}
      </h1>
      <p className="text-neutral-500 mb-8">
        {locale === 'ne' ? 'तपाईंका बच्चाहरूको प्रगति हेर्नुहोस्' : 'Overview of your children\'s learning journey'}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users,        label: locale === 'ne' ? 'बच्चाहरू' : 'Children',        value: children?.length ?? 0, color: 'text-brand-blue' },
          { icon: BookOpen,     label: locale === 'ne' ? 'नामांकन' : 'Active Enrollments', value: enrollments?.length ?? 0, color: 'text-success' },
          { icon: Calendar,     label: locale === 'ne' ? 'आगामी कक्षाहरू' : 'Upcoming Classes', value: schedules?.length ?? 0, color: 'text-brand-red' },
          { icon: ClipboardList, label: locale === 'ne' ? 'गृहकार्य' : 'Pending Homework', value: homework?.length ?? 0, color: 'text-warning' },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900">{value}</div>
                <div className="text-xs text-neutral-500">{label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Children */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'ne' ? 'मेरा बच्चाहरू' : 'My Children'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {children && children.length > 0 ? (
              <div className="space-y-3">
                {children.map((c) => {
                  const p = c.profiles as any
                  const name = locale === 'ne' ? (p?.full_name_ne ?? p?.full_name_en) : p?.full_name_en
                  return (
                    <div key={c.student_id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                      <div className="w-9 h-9 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {name?.charAt(0) ?? '?'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{name}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 text-center py-6">
                {locale === 'ne' ? 'कुनै बच्चा थपिएको छैन' : 'No children added yet'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Upcoming classes */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === 'ne' ? 'आगामी कक्षाहरू' : 'Upcoming Classes'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {schedules && schedules.length > 0 ? (
              <div className="space-y-3">
                {schedules.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                    <div className="w-9 h-9 rounded-xl bg-brand-blue text-white text-xs font-bold flex flex-col items-center justify-center flex-shrink-0">
                      <span>{new Date(s.scheduled_at).getDate()}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 truncate">
                        {(s.courses as any)?.title_en}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {formatDate(s.scheduled_at, locale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 text-center py-6">
                {locale === 'ne' ? 'कुनै आगामी कक्षा छैन' : 'No upcoming classes'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Homework */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {locale === 'ne' ? 'बाँकी गृहकार्य' : 'Pending Homework'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {homework && homework.length > 0 ? (
              <div className="space-y-3">
                {homework.map((hw) => (
                  <div key={hw.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {(hw as any).title_en ?? 'Homework'}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {locale === 'ne' ? 'अन्तिम मिति:' : 'Due:'} {formatDate(hw.due_date, locale)}
                      </p>
                    </div>
                    <span className="text-xs text-brand-red font-semibold">
                      {locale === 'ne' ? 'बाँकी' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 text-center py-6">
                {locale === 'ne' ? 'कुनै बाँकी गृहकार्य छैन' : 'No pending homework — great job!'}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
