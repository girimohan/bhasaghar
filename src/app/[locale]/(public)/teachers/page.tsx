import { createClient } from '@/lib/supabase/server'
import { TeacherCard } from '@/components/sections/TeacherCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Teachers' }

export default async function TeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: teachers } = await supabase
    .from('teacher_profiles')
    .select('*, profiles(*)')
    .eq('is_active', true)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {locale === 'ne' ? 'हाम्रा शिक्षकहरूसँग भेट्नुहोस्' : 'Meet Our Teachers'}
        </h1>
        <p className="text-lg text-neutral-500 max-w-xl mx-auto">
          {locale === 'ne'
            ? 'अनुभवी, उत्साही नेपाली भाषा शिक्षकहरू'
            : 'Experienced, passionate Nepali language educators'}
        </p>
      </div>

      {teachers && teachers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher as any} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-4xl mb-4">👩‍🏫</p>
          <p className="text-lg font-medium">
            {locale === 'ne' ? 'चाँडै शिक्षकहरू थपिनेछन्' : 'Teachers coming soon!'}
          </p>
        </div>
      )}
    </div>
  )
}
