import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

export default async function AdminLayout({
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect(`/${locale}/dashboard/parent`)

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <DashboardSidebar role="admin" locale={locale} />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
