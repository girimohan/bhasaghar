import { useTranslations } from 'next-intl'
import { Video, BookOpen, Leaf, TrendingUp, Smile, Languages } from 'lucide-react'

export function Features() {
  const t = useTranslations('home.features')

  const features = [
    {
      icon: Video,
      titleKey: 'f1Title',
      descKey: 'f1Desc',
      color: 'bg-blue-50 text-brand-blue',
    },
    {
      icon: BookOpen,
      titleKey: 'f2Title',
      descKey: 'f2Desc',
      color: 'bg-red-50 text-brand-red',
    },
    {
      icon: Leaf,
      titleKey: 'f3Title',
      descKey: 'f3Desc',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: TrendingUp,
      titleKey: 'f4Title',
      descKey: 'f4Desc',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Smile,
      titleKey: 'f5Title',
      descKey: 'f5Desc',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      icon: Languages,
      titleKey: 'f6Title',
      descKey: 'f6Desc',
      color: 'bg-brand-blue/8 text-brand-blue',
    },
  ] as const

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-neutral-500">{t('subtitle')}</p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, titleKey, descKey, color }) => (
            <div
              key={titleKey}
              className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={22} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 mb-2">
                {t(titleKey)}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
