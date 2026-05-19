import type { Metadata } from 'next'
import { LEVELS } from '@/lib/constants'

export const metadata: Metadata = { title: 'About BhasaGhar' }

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
          {locale === 'ne' ? 'भाषाघरबारे' : 'About BhasaGhar'}
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
          {locale === 'ne'
            ? 'डायस्पोरा बालबालिकाहरूलाई नेपाली जरासँग जोड्दै'
            : 'Connecting diaspora children with their Nepali roots'}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-3xl p-8">
          <div className="text-3xl mb-4">🎯</div>
          <h2 className="text-xl font-bold mb-4">
            {locale === 'ne' ? 'हाम्रो लक्ष्य' : 'Our Mission'}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {locale === 'ne'
              ? 'भाषाघर एउटै उद्देश्यले स्थापना गरिएको थियो: विदेशमा हुर्किएका नेपाली बालबालिकाहरूले आफ्नो मातृभाषा कहिल्यै नगुमाउन।'
              : 'BhasaGhar was founded with one purpose: to ensure Nepali children growing up abroad never lose their mother tongue. We combine modern pedagogy with rich cultural content to make language learning a joy.'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-brand-red to-brand-red-dark text-white rounded-3xl p-8">
          <div className="text-3xl mb-4">🌏</div>
          <h2 className="text-xl font-bold mb-4">
            {locale === 'ne' ? 'हाम्रो दृष्टिकोण' : 'Our Vision'}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {locale === 'ne'
              ? 'एउटा यस्तो संसार जहाँ हरेक नेपाली डायस्पोरा बच्चाले आत्मविश्वास र गर्वका साथ नेपाली बोल्न, पढ्न र लेख्न सक्छ।'
              : 'A world where every Nepali diaspora child can speak, read, and write Nepali with confidence and pride.'}
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
          {locale === 'ne' ? 'हाम्रा मूल्यहरू' : 'Our Values'}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: '🤝', en: 'Community', ne: 'समुदाय', desc_en: 'Built for and by the Nepali diaspora community.', desc_ne: 'नेपाली डायस्पोरा समुदायको लागि र द्वारा बनाइएको।' },
            { emoji: '📚', en: 'Excellence', ne: 'उत्कृष्टता', desc_en: 'World-class curriculum designed by expert teachers.', desc_ne: 'विशेषज्ञ शिक्षकहरूद्वारा डिजाइन गरिएको।' },
            { emoji: '🎮', en: 'Fun', ne: 'मनोरञ्जन', desc_en: 'Learning should be joyful, not a chore.', desc_ne: 'सिकाइ आनन्दमय हुनुपर्छ।' },
            { emoji: '🌱', en: 'Growth', ne: 'वृद्धि', desc_en: 'Every child grows at their own pace, celebrated.', desc_ne: 'हरेक बच्चा आफ्नै गतिमा बढ्छ।' },
          ].map((val) => (
            <div key={val.en} className="bg-white rounded-2xl border border-neutral-100 p-6 text-center">
              <div className="text-3xl mb-3">{val.emoji}</div>
              <h3 className="font-bold text-neutral-900 mb-2">
                {locale === 'ne' ? val.ne : val.en}
              </h3>
              <p className="text-sm text-neutral-500">
                {locale === 'ne' ? val.desc_ne : val.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why diaspora? */}
      <div className="bg-neutral-50 rounded-3xl p-8 lg:p-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          {locale === 'ne' ? 'डायस्पोराका लागि किन महत्त्वपूर्ण?' : 'Why Does This Matter for Diaspora?'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-neutral-600 leading-relaxed">
          <p>
            Research shows that children raised in diaspora communities who maintain their heritage language have stronger family bonds, better cognitive development, and a healthier sense of identity.
          </p>
          <p>
            Nepali parents in Europe, the Nordics, and beyond tell us they struggle to find qualified teachers and structured curriculum. BhasaGhar solves this with professional, curriculum-driven online classes.
          </p>
        </div>
      </div>
    </div>
  )
}
