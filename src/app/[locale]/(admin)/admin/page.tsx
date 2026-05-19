import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Users, BookOpen, GraduationCap, FileText, TrendingUp } from 'lucide-react'

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Parallel stats
  const [
    { count: totalStudents },
    { count: totalCourses },
    { count: totalTeachers },
    { count: totalPosts },
    { count: totalEnrollments },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('courses').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('status', 'active'),
  ])

  // Recent enrollments
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select('*, profiles(full_name_en), courses(title_en)')
    .order('created_at', { ascending: false })
    .limit(8)

  const stats = [
    { icon: Users,         label: 'Total Students',      value: totalStudents ?? 0, color: 'text-brand-blue' },
    { icon: GraduationCap, label: 'Active Enrollments',  value: totalEnrollments ?? 0, color: 'text-success' },
    { icon: BookOpen,      label: 'Published Courses',   value: totalCourses ?? 0, color: 'text-brand-red' },
    { icon: Users,         label: 'Teachers',            value: totalTeachers ?? 0, color: 'text-warning' },
    { icon: FileText,      label: 'Blog Posts',          value: totalPosts ?? 0, color: 'text-purple-500' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="text-neutral-500">Platform overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center mb-3 ${color}`}>
                <Icon size={20} />
              </div>
              <div className="text-3xl font-bold text-neutral-900">{value}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEnrollments && recentEnrollments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-neutral-400 uppercase border-b border-neutral-100">
                    <th className="pb-3 text-left font-semibold">Student</th>
                    <th className="pb-3 text-left font-semibold">Course</th>
                    <th className="pb-3 text-left font-semibold">Status</th>
                    <th className="pb-3 text-left font-semibold">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {recentEnrollments.map((enr) => (
                    <tr key={enr.id} className="py-2">
                      <td className="py-3 pr-4 font-medium text-neutral-900">
                        {(enr.profiles as any)?.full_name_en ?? '—'}
                      </td>
                      <td className="py-3 pr-4 text-neutral-600">
                        {(enr.courses as any)?.title_en ?? '—'}
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          enr.status === 'active' ? 'bg-success/10 text-success' : 'bg-neutral-100 text-neutral-500'
                        }`}>
                          {enr.status}
                        </span>
                      </td>
                      <td className="py-3 text-neutral-500">
                        {enr.progress_percentage ?? 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-neutral-400 text-center py-6">No enrollments yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
