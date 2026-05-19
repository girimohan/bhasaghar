import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect(`/${locale}/login`)

  // Get role from profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role ?? 'parent'

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <DashboardSidebar role={role as any} locale={locale} />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
