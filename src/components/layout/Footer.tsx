import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Logo } from '@/components/common/Logo'
import { Facebook, Instagram, Youtube, Mail, MapPin } from 'lucide-react'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const navT = useTranslations('nav')

  const quickLinks = [
    { key: 'courses',   href: `/${locale}/courses`   },
    { key: 'teachers',  href: `/${locale}/teachers`  },
    { key: 'pricing',   href: `/${locale}/pricing`   },
    { key: 'schedule',  href: `/${locale}/schedule`  },
    { key: 'library',   href: `/${locale}/library`   },
    { key: 'blog',      href: `/${locale}/blog`      },
  ] as const

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo locale={locale} size="md" className="brightness-0 invert" />
            <p className="mt-4 text-sm text-neutral-400 max-w-xs leading-relaxed">
              {t('tagline')}
            </p>
            <div className="mt-6 flex gap-4">
              {[
                { Icon: Facebook,  href: '#', label: 'Facebook'  },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Youtube,   href: '#', label: 'YouTube'   },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-brand-red hover:text-white transition-all duration-150"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-150"
                  >
                    {navT(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <Mail size={14} className="mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@bhasaghar.com" className="hover:text-white transition-colors">
                  hello@bhasaghar.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-400">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>Oslo, Norway 🇳🇴</span>
              </li>
            </ul>

            <h4 className="text-sm font-semibold text-white mt-6 mb-4 uppercase tracking-wider">
              {t('legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-500">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
