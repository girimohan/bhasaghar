import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { PricingPlan } from '@/types'

interface PricingCardProps {
  plan: PricingPlan
  locale: string
}

export function PricingCard({ plan, locale }: PricingCardProps) {
  const t = useTranslations('pricing')

  return (
    <div
      className={cn(
        'relative rounded-2xl flex flex-col',
        plan.highlighted
          ? 'bg-brand-blue text-white shadow-[0_20px_60px_rgba(0,56,147,0.35)] scale-105'
          : 'bg-white border border-neutral-200 shadow-sm'
      )}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-brand-red text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
            <Zap size={12} /> {t('mostPopular')}
          </span>
        </div>
      )}

      <div className="p-7">
        {/* Plan name */}
        <h3
          className={cn(
            'text-xl font-bold mb-1',
            plan.highlighted ? 'text-white' : 'text-neutral-900'
          )}
        >
          {plan.name}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-1 mb-6">
          <span
            className={cn(
              'text-5xl font-extrabold tracking-tight',
              plan.highlighted ? 'text-white' : 'text-neutral-900'
            )}
          >
            €{plan.price}
          </span>
          <span
            className={cn(
              'text-sm mb-2',
              plan.highlighted ? 'text-white/60' : 'text-neutral-400'
            )}
          >
            {t('monthly')}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                  plan.highlighted
                    ? 'bg-white/20 text-white'
                    : 'bg-brand-blue/10 text-brand-blue'
                )}
              >
                <Check size={12} strokeWidth={2.5} />
              </div>
              <span
                className={cn(
                  'text-sm',
                  plan.highlighted ? 'text-white/80' : 'text-neutral-600'
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Link href={`/${locale}/free-trial`}>
          <Button
            variant={plan.highlighted ? 'outline' : 'secondary'}
            fullWidth
            className={cn(
              plan.highlighted && 'border-white text-white hover:bg-white hover:text-brand-blue'
            )}
          >
            {t('freeTrial')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
