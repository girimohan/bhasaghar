'use client'

import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface LanguageToggleProps {
  currentLocale: string
  className?: string
}

export function LanguageToggle({ currentLocale, className }: LanguageToggleProps) {
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(locale: string) {
    // Replace the locale segment in the current path
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
  }

  return (
    <div
      className={cn(
        'flex items-center rounded-xl border border-neutral-200 bg-white p-0.5 gap-0.5',
        className
      )}
      role="group"
      aria-label="Language selector"
    >
      {(['en', 'ne'] as const).map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer',
            currentLocale === locale
              ? 'bg-brand-blue text-white shadow-sm'
              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
          )}
          aria-pressed={currentLocale === locale}
        >
          {locale === 'en' ? 'EN' : 'ने'}
        </button>
      ))}
    </div>
  )
}
