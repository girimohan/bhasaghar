import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { CoursesTable } from './CoursesTable'

export default async function AdminCoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: courses } = await supabase
    .from('courses')
    .select('id, title_en, level, is_published, price, currency')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Courses</h1>
          <p className="text-neutral-500">Manage all platform courses</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses ({courses?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {courses && courses.length > 0 ? (
            <CoursesTable courses={courses} />
          ) : (
            <p className="text-sm text-neutral-400 text-center py-8">No courses yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
