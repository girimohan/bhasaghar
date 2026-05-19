import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default async function AdminTeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: teachers } = await supabase
    .from('teacher_profiles')
    .select('*, profiles(full_name_en, email, avatar_url)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Teachers</h1>
        <p className="text-neutral-500">Manage platform teachers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teachers ({teachers?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {teachers && teachers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-neutral-400 uppercase border-b border-neutral-100">
                    <th className="pb-3 text-left font-semibold">Name</th>
                    <th className="pb-3 text-left font-semibold">Email</th>
                    <th className="pb-3 text-left font-semibold">Rate/hr</th>
                    <th className="pb-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {teachers.map((t) => {
                    const p = (t as any).profiles as any
                    return (
                      <tr key={t.id}>
                        <td className="py-3 pr-4 font-medium text-neutral-900">{p?.full_name_en}</td>
                        <td className="py-3 pr-4 text-neutral-500">{p?.email}</td>
                        <td className="py-3 pr-4 text-neutral-600">
                          {t.hourly_rate ? `€${Number(t.hourly_rate).toFixed(0)}` : '—'}
                        </td>
                        <td className="py-3">
                          <Badge variant={t.is_active ? 'green' : 'default'}>
                            {t.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-neutral-400 text-center py-8">No teachers yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
