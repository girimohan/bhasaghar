import { createClient } from '@/lib/supabase/server'
import { getBilingualValue } from '@/lib/utils'
import { BookOpen, Layers, BookMarked, Globe } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Learning Library' }

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Public: cultural content. Authenticated: stories + flashcards too
  const { data: cultural } = await supabase
    .from('cultural_content')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(12)

  let stories: any[] = []
  let flashcards: any[] = []

  if (user) {
    const [s, f] = await Promise.all([
      supabase.from('stories').select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(12),
      supabase.from('flashcards').select('*').limit(20),
    ])
    stories = s.data ?? []
    flashcards = f.data ?? []
  }

  const contentTypeIcon = (type: string) => {
    const map: Record<string, string> = {
      story: '📖', rhyme: '🎵', festival: '🎉', tradition: '🪔', recipe: '🍜', craft: '✂️',
    }
    return map[type] ?? '📌'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {locale === 'ne' ? 'सिकाइ पुस्तकालय' : 'Learning Library'}
        </h1>
        <p className="text-lg text-neutral-500">
          {locale === 'ne'
            ? 'कथाहरू, सांस्कृतिक सामग्री, फ्ल्यासकार्डहरू र थप'
            : 'Stories, cultural content, flashcards and more'}
        </p>
      </div>

      {/* Cultural Content */}
      {cultural && cultural.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Globe size={24} className="text-brand-red" />
            {locale === 'ne' ? 'सांस्कृतिक सामग्री' : 'Cultural Content'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cultural.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{contentTypeIcon(item.content_type)}</div>
                <div className="text-xs font-semibold text-brand-red uppercase tracking-wide mb-1 capitalize">
                  {item.content_type}
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  {getBilingualValue(item.title_en, item.title_ne, locale)}
                </h3>
                {item.description_en && (
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {getBilingualValue(item.description_en, item.description_ne, locale)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Stories (authenticated only) */}
      {user && stories.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <BookMarked size={24} className="text-brand-blue" />
            {locale === 'ne' ? 'कथाहरू' : 'Stories'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">📖</span>
                  <span className="text-xs font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full">
                    {locale === 'ne' ? `स्तर ${story.level}` : `Level ${story.level}`}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  {getBilingualValue(story.title_en, story.title_ne, locale)}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {locale === 'ne'
                    ? `उमेर ${story.age_range_min}–${story.age_range_max}`
                    : `Ages ${story.age_range_min}–${story.age_range_max}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Prompt to login if not authenticated */}
      {!user && (
        <div className="bg-brand-blue/5 rounded-2xl p-8 text-center">
          <BookOpen size={48} className="mx-auto text-brand-blue/30 mb-4" />
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            {locale === 'ne' ? 'थप सामग्री अनलक गर्नुहोस्' : 'Unlock More Content'}
          </h3>
          <p className="text-neutral-500 mb-6">
            {locale === 'ne'
              ? 'कथाहरू र फ्ल्यासकार्डहरू पहुँच गर्न साइन इन गर्नुहोस्।'
              : 'Sign in to access stories, flashcards, and more learning materials.'}
          </p>
          <a
            href={`/${locale}/login`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-blue-dark transition-colors"
          >
            {locale === 'ne' ? 'साइन इन गर्नुहोस्' : 'Sign In'}
          </a>
        </div>
      )}
    </div>
  )
}
