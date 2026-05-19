'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'
import type { Database } from '@/types/database'

function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function FreeTrialPage() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name  = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role: 'parent' },
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
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={56} className="text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-3">Check Your Email!</h1>
          <p className="text-neutral-500 mb-6">
            We've sent a confirmation link to your email. Click it to activate your free 14-day trial.
          </p>
          <Link href="/" className="text-brand-blue text-sm font-medium hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-success/10 text-success text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            14-Day Free Trial
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Start Learning Today</h1>
          <p className="text-neutral-500">No credit card required.</p>
        </div>

        {/* Perks */}
        <div className="bg-brand-blue/5 rounded-2xl p-5 mb-8">
          <ul className="space-y-2">
            {[
              'Access to all 3 curriculum levels',
              'Live group classes',
              'Vocabulary flashcards & quizzes',
              'Progress reports for parents',
            ].map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-neutral-700">
                <CheckCircle size={14} className="text-success flex-shrink-0" /> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" name="name" required placeholder="Your name" />
            <Input label="Email Address" name="email" type="email" required placeholder="you@example.com" />
            <Input label="Password" name="password" type="password" required placeholder="Create a password" hint="At least 8 characters" />

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</div>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
              Start Free Trial
            </Button>
          </form>

          <p className="text-xs text-neutral-400 text-center mt-4">
            Already have an account?{' '}
            <Link href="/en/login" className="text-brand-blue font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
