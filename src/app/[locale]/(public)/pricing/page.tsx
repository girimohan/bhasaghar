import { PRICING_PLANS } from '@/lib/constants'
import { PricingCard } from '@/components/sections/PricingCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pricing' }

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, you can cancel your subscription at any time. No long-term contracts.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! All plans come with a 14-day free trial. No credit card required.',
  },
  {
    q: 'How many children can I enroll?',
    a: 'Basic: 1 child. Standard: 2 children. Premium: 3 children.',
  },
  {
    q: 'What age groups are supported?',
    a: 'We support kids ages 4–14 across 3 progressive levels.',
  },
  {
    q: 'Are classes live or recorded?',
    a: 'Both! We have live weekly group classes and a library of recorded lessons.',
  },
]

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {locale === 'ne' ? 'सरल, पारदर्शी मूल्य' : 'Simple, Transparent Pricing'}
        </h1>
        <p className="text-lg text-neutral-500">
          {locale === 'ne'
            ? 'एउटा सदस्यता, तपाईंको बच्चाको लागि असीमित सिकाइ'
            : 'One subscription, unlimited learning for your child'}
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-20">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} locale={locale} />
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
          {locale === 'ne' ? 'बारम्बार सोधिने प्रश्नहरू' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-2xl border border-neutral-100 p-6">
              <h3 className="font-semibold text-neutral-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
