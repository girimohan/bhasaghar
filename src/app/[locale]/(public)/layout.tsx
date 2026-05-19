import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let userRole: string | null = null
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    userRole = profile?.role ?? null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        locale={locale}
        isAuthenticated={!!user}
        userRole={userRole}
      />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  )
}
