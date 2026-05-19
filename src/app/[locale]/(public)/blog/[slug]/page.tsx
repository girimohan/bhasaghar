import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getBilingualValue, formatDate } from '@/lib/utils'
import { ArrowLeft, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title_en, title_ne')
    .eq('slug', slug)
    .single()
  return { title: post?.title_en ?? 'Blog Post' }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) notFound()

  const title   = getBilingualValue(post.title_en, post.title_ne, locale)
  const content = getBilingualValue(post.content_en, post.content_ne, locale)
  const date    = post.published_at ? formatDate(post.published_at, locale) : ''

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-blue mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> {locale === 'ne' ? 'ब्लगमा फर्कनुहोस्' : 'Back to Blog'}
      </Link>

      {post.cover_image_url && (
        <div className="relative h-72 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.cover_image_url}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
        <Clock size={12} />
        {date}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
        {title}
      </h1>

      {content && (
        <div
          className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {content}
        </div>
      )}
    </div>
  )
}
