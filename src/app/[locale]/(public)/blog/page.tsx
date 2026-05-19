import { createClient } from '@/lib/supabase/server'
import { BlogCard } from '@/components/sections/BlogCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {locale === 'ne' ? 'ब्लग र स्रोतहरू' : 'Blog & Resources'}
        </h1>
        <p className="text-lg text-neutral-500">
          {locale === 'ne'
            ? 'द्विभाषी नेपाली बालबालिकाहरू हुर्काउनका लागि सुझाव र कथाहरू'
            : 'Tips, stories, and insights for raising bilingual Nepali kids'}
        </p>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-4xl mb-4">✍️</p>
          <p className="text-lg font-medium">
            {locale === 'ne' ? 'चाँडै पोस्टहरू आउँदैछन्' : 'Blog posts coming soon!'}
          </p>
        </div>
      )}
    </div>
  )
}
