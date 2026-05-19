'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'
import type { Database } from '@/types/database'

function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name     = formData.get('name') as string
    const email    = formData.get('email') as string
    const password = formData.get('password') as string
    const role     = (formData.get('role') as string) || 'parent'

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role },
      },
    })

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="w-full max-w-md text-center">
        <CheckCircle size={56} className="text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">Check Your Email</h1>
        <p className="text-neutral-500 mb-6">
          We've sent a confirmation link. Click it to activate your account.
        </p>
        <Link href="/en/login" className="text-brand-blue text-sm font-medium hover:underline">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Account</h1>
        <p className="text-neutral-500">Join BhasaGhar and start learning</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            name="name"
            required
            placeholder="Your full name"
            autoComplete="name"
          />
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
            placeholder="Create a strong password"
            hint="Minimum 8 characters"
            autoComplete="new-password"
          />
          <Select label="I am a" name="role" required>
            <option value="parent">Parent</option>
            <option value="student">Student (13+)</option>
          </Select>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</div>
          )}

          <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="text-sm text-neutral-500 text-center mt-6">
          Already have an account?{' '}
          <Link href="/en/login" className="text-brand-blue font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
