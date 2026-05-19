import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default async function AdminStudentsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: students } = await supabase
    .from('profiles')
    .select('*, student_profiles(*), enrollments(count)')
    .eq('role', 'student')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Students</h1>
        <p className="text-neutral-500">Manage registered students</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students ({students?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {students && students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-neutral-400 uppercase border-b border-neutral-100">
                    <th className="pb-3 text-left font-semibold">Name</th>
                    <th className="pb-3 text-left font-semibold">Email</th>
                    <th className="pb-3 text-left font-semibold">Level</th>
                    <th className="pb-3 text-left font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {students.map((s) => {
                    const sp = (s as any).student_profiles as any
                    return (
                      <tr key={s.id}>
                        <td className="py-3 pr-4 font-medium text-neutral-900">
                          {s.full_name_en}
                        </td>
                        <td className="py-3 pr-4 text-neutral-500">{s.email}</td>
                        <td className="py-3 pr-4">
                          {sp?.level ? (
                            <Badge variant="blue">Level {sp.level}</Badge>
                          ) : '—'}
                        </td>
                        <td className="py-3 text-neutral-400 text-xs">
                          {s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-neutral-400 text-center py-8">No students yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
