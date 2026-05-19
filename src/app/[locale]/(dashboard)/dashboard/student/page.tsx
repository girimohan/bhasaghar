import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { formatDate, getBilingualValue } from '@/lib/utils'
import { BookOpen, Star, Video, Trophy, Zap } from 'lucide-react'

export default async function StudentDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/login`)

  // Student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name_en, full_name_ne, avatar_url')
    .eq('id', user.id)
    .single()

  // Enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(id, title_en, title_ne, level)')
    .eq('student_id', user.id)
    .eq('status', 'active')

  // Progress
  const { data: progress } = await supabase
    .from('progress')
    .select('*, lessons(title_en, title_ne)')
    .eq('student_id', user.id)
    .order('last_accessed_at', { ascending: false })
    .limit(5)

  // Badges
  const { data: studentBadges } = await supabase
    .from('student_badges')
    .select('*, badges(name, icon_url, description)')
    .eq('student_id', user.id)
    .order('earned_at', { ascending: false })
    .limit(6)

  const name = getBilingualValue(profile?.full_name_en, profile?.full_name_ne, locale)

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          {locale === 'ne' ? `नमस्ते, ${name}!` : `Welcome back, ${name}!`}
        </h1>
        <p className="text-neutral-500">
          {locale === 'ne' ? 'सिकाइ जारी राख्नुहोस्' : 'Keep up the great work on your learning journey!'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, label: locale === 'ne' ? 'कोर्सहरू' : 'Courses', value: enrollments?.length ?? 0, color: 'text-brand-blue' },
          { icon: Zap,      label: locale === 'ne' ? 'पाठहरू पूर्ण' : 'Lessons Done', value: progress?.filter(p => p.completed).length ?? 0, color: 'text-success' },
          { icon: Trophy,   label: locale === 'ne' ? 'ब्याजहरू' : 'Badges', value: studentBadges?.length ?? 0, color: 'text-warning' },
          { icon: Star,     label: locale === 'ne' ? 'स्तर' : 'Level', value: (enrollments?.[0]?.courses as any)?.level ?? 1, color: 'text-brand-red' },
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
        {/* Enrolled Courses */}
        <Card>
          <CardHeader>
            <CardTitle>{locale === 'ne' ? 'मेरा कोर्सहरू' : 'My Courses'}</CardTitle>
          </CardHeader>
          <CardContent>
            {enrollments && enrollments.length > 0 ? (
              <div className="space-y-3">
                {enrollments.map((enr) => {
                  const course = enr.courses as any
                  return (
                    <div key={enr.id} className="p-3 rounded-xl bg-neutral-50">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-neutral-900">
                          {getBilingualValue(course?.title_en, course?.title_ne, locale)}
                        </p>
                        <Badge variant={course?.level === 1 ? 'green' : course?.level === 2 ? 'blue' : 'red'}>
                          L{course?.level}
                        </Badge>
                      </div>
                      <ProgressBar value={enr.progress_percentage ?? 0} size="sm" showValue />
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 text-center py-6">
                {locale === 'ne' ? 'कुनै कोर्स छैन' : 'No courses enrolled yet'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{locale === 'ne' ? 'हालको गतिविधि' : 'Recent Activity'}</CardTitle>
          </CardHeader>
          <CardContent>
            {progress && progress.length > 0 ? (
              <div className="space-y-3">
                {progress.map((p) => {
                  const lesson = p.lessons as any
                  return (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                      <Video size={16} className="text-brand-blue flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-900 truncate">
                          {getBilingualValue(lesson?.title_en, lesson?.title_ne, locale)}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {p.last_accessed_at ? formatDate(p.last_accessed_at, locale) : ''}
                        </p>
                      </div>
                      <Badge variant={p.completed ? 'green' : 'default'} className="flex-shrink-0">
                        {p.completed ? 'done' : 'in progress'}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 text-center py-6">
                {locale === 'ne' ? 'कुनै गतिविधि छैन' : 'No recent activity'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{locale === 'ne' ? 'मेरा ब्याजहरू' : 'My Badges'}</CardTitle>
          </CardHeader>
          <CardContent>
            {studentBadges && studentBadges.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {studentBadges.map((sb) => {
                  const badge = sb.badges as any
                  return (
                    <div key={sb.id} className="flex flex-col items-center text-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center text-2xl">
                        {badge?.image_url ? (
                          <img src={badge.image_url} alt={badge.name_en} className="w-10 h-10 object-contain" />
                        ) : '🏆'}
                      </div>
                      <span className="text-xs font-medium text-neutral-700 leading-tight">{badge?.name_en}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Trophy size={32} className="mx-auto text-neutral-200 mb-2" />
                <p className="text-sm text-neutral-400">
                  {locale === 'ne' ? 'कुनै ब्याज छैन — अझ सिक्नुहोस्!' : 'No badges yet — keep learning to earn them!'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
