'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // In production, send to an API route or Supabase function
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">Get in Touch</h1>
        <p className="text-lg text-neutral-500">Questions? We're here to help.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Contact Information</h2>
          <div className="space-y-4">
            {[
              { icon: Mail,    label: 'Email',    value: 'hello@bhasaghar.com' },
              { icon: Phone,   label: 'WhatsApp', value: '+47 XXX XX XXX' },
              { icon: MapPin,  label: 'Location', value: 'Oslo, Norway 🇳🇴' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium text-neutral-700 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-brand-blue/5 rounded-2xl p-6">
            <h3 className="font-semibold text-neutral-900 mb-2">Free Trial Available</h3>
            <p className="text-sm text-neutral-600">
              Want to try BhasaGhar before subscribing? Get a free 14-day trial — no credit card needed.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <CheckCircle size={48} className="text-success mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
              <p className="text-neutral-500">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Full Name" name="name" required placeholder="Your name" />
              <Input label="Email Address" name="email" type="email" required placeholder="you@example.com" />
              <Input label="Subject" name="subject" placeholder="How can we help?" />
              <Textarea
                label="Message"
                name="message"
                required
                placeholder="Tell us more..."
                rows={5}
              />
              <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
