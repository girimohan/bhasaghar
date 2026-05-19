'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/common/Logo'
import type { Database } from '@/types/database'

function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email    = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    // Get role from profile and redirect accordingly
    const role = data.user?.user_metadata?.role ?? 'parent'
    if (role === 'admin') {
      router.push('/en/admin')
    } else if (role === 'student') {
      router.push('/en/dashboard/student')
    } else {
      router.push('/en/dashboard/parent')
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome back!</h1>
        <p className="text-neutral-500">Sign in to your BhasaGhar account</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            placeholder="Your password"
            autoComplete="current-password"
          />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</div>
          )}

          <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-neutral-100 text-center space-y-2">
          <p className="text-sm text-neutral-500">
            Don&apos;t have an account?{' '}
            <Link href="/en/register" className="text-brand-blue font-semibold hover:underline">
              Register
            </Link>
          </p>
          <p className="text-sm text-neutral-500">
            <Link href="/en/free-trial" className="text-brand-red font-semibold hover:underline">
              Try free for 14 days
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
