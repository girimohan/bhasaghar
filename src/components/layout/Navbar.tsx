'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { LanguageToggle } from '@/components/common/LanguageToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface NavbarProps {
  locale: string
  isAuthenticated?: boolean
  userRole?: string | null
}

export function Navbar({ locale, isAuthenticated = false, userRole }: NavbarProps) {
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { key: 'courses',  href: `/${locale}/courses`  },
    { key: 'teachers', href: `/${locale}/teachers` },
    { key: 'schedule', href: `/${locale}/schedule` },
    { key: 'library',  href: `/${locale}/library`  },
    { key: 'blog',     href: `/${locale}/blog`     },
    { key: 'about',    href: `/${locale}/about`    },
  ] as const

  const dashboardHref = userRole === 'student'
    ? `/${locale}/dashboard/student`
    : `/${locale}/dashboard/parent`

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo locale={locale} size="md" />

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="px-3 py-2 text-sm font-medium text-neutral-600 rounded-lg hover:text-brand-blue hover:bg-brand-blue/5 transition-colors duration-150"
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle currentLocale={locale} />

            {isAuthenticated ? (
              <>
                <Link href={dashboardHref}>
                  <Button variant="outline" size="sm">
                    {t('dashboard')}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/${locale}/login`}>
                  <Button variant="ghost" size="sm">
                    {t('login')}
                  </Button>
                </Link>
                <Link href={`/${locale}/free-trial`}>
                  <Button variant="primary" size="sm">
                    {t('freeTrial')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-neutral-100 py-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-neutral-700 rounded-xl hover:bg-brand-blue/5 hover:text-brand-blue transition-colors"
              >
                {t(key)}
              </Link>
            ))}

            <div className="pt-4 border-t border-neutral-100 flex items-center gap-3 px-4">
              <LanguageToggle currentLocale={locale} />
              {isAuthenticated ? (
                <Link href={dashboardHref} className="flex-1">
                  <Button variant="secondary" size="sm" fullWidth>
                    {t('dashboard')}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href={`/${locale}/login`} className="flex-1">
                    <Button variant="outline" size="sm" fullWidth>
                      {t('login')}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/free-trial`} className="flex-1">
                    <Button variant="primary" size="sm" fullWidth>
                      {t('freeTrial')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
