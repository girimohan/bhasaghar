import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowRight, Play, Users, BookOpen, Globe, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface HeroProps {
  locale: string
}

export function Hero({ locale }: HeroProps) {
  const t = useTranslations('home.hero')

  const stats = [
    { icon: Users,          value: t('stat1') },
    { icon: BookOpen,       value: t('stat2') },
    { icon: GraduationCap,  value: t('stat3') },
    { icon: Globe,          value: t('stat4') },
  ]

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background decorations */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/4 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-red/4 rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-brand-blue/8 text-brand-blue rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" aria-hidden="true" />
              {t('badge')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
              {t('title').split('Nepali').map((part, i) =>
                i === 0 ? (
                  <span key={i}>{part}</span>
                ) : (
                  <span key={i}>
                    <span className="text-brand-red">Nepali</span>
                    {part}
                  </span>
                )
              )}
            </h1>

            <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-lg">
              {t('subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <Link href={`/${locale}/free-trial`}>
                <Button variant="primary" size="lg" className="gap-2">
                  {t('cta')}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button variant="ghost" size="lg" className="gap-2">
                  <Play size={18} className="text-brand-red" />
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/8 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-brand-blue" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual card */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-3xl p-8 text-white shadow-[0_24px_80px_rgba(0,56,147,0.3)]">
              {/* Decorative Devanagari letters */}
              <div className="grid grid-cols-4 gap-3 mb-8" aria-hidden="true">
                {['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ'].map((letter) => (
                  <div
                    key={letter}
                    className="aspect-square bg-white/10 rounded-xl flex items-center justify-center text-xl font-bold ne-script hover:bg-white/20 transition-colors cursor-default"
                  >
                    {letter}
                  </div>
                ))}
              </div>

              {/* Progress card */}
              <div className="bg-white rounded-2xl p-4 text-neutral-900">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Today's Progress</p>
                    <p className="text-sm font-semibold text-neutral-800 mt-0.5">Level 1 — Alphabet</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
                    <span className="text-brand-red text-lg font-bold">क</span>
                  </div>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-gradient-to-r from-brand-blue to-brand-red rounded-full" />
                </div>
                <p className="text-xs text-neutral-400 mt-1.5">72% complete • 3 lessons done</p>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-brand-red text-white rounded-2xl px-4 py-2 shadow-lg">
                <p className="text-xs font-bold">🇳🇵 नेपाली</p>
                <p className="text-xs opacity-80">Nepali Language</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
