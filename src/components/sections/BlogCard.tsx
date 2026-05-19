import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { getBilingualValue, formatDate, truncate } from '@/lib/utils'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
  locale: string
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const t = useTranslations('blog')

  const title   = getBilingualValue(post.title_en,   post.title_ne,   locale)
  const excerpt = getBilingualValue(post.excerpt_en, post.excerpt_ne, locale)
  const date    = post.published_at ? formatDate(post.published_at, locale) : ''

  return (
    <article className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Cover image */}
      <div className="relative h-48 bg-gradient-to-br from-brand-blue/8 to-brand-red/8 overflow-hidden">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl select-none">📖</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="blue" className="gap-1">
                <Tag size={10} /> {tag}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 leading-snug">
          {title}
        </h3>

        {excerpt && (
          <p className="text-sm text-neutral-500 line-clamp-3 mb-4 flex-1">{excerpt}</p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-neutral-50">
          {date && (
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock size={11} />
              {date}
            </span>
          )}
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-red transition-colors ml-auto"
          >
            {t('readMore')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
