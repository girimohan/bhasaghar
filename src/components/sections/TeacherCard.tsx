import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { getBilingualValue, getInitials } from '@/lib/utils'
import type { TeacherWithProfile } from '@/types'

interface TeacherCardProps {
  teacher: TeacherWithProfile
  locale: string
}

export function TeacherCard({ teacher, locale }: TeacherCardProps) {
  const t = useTranslations('teachers')

  const name = getBilingualValue(
    teacher.profiles.full_name_en,
    teacher.profiles.full_name_ne,
    locale
  )
  const bio = getBilingualValue(
    teacher.profiles.bio,
    null,
    locale
  )

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Avatar */}
      <div className="bg-gradient-to-br from-brand-blue/8 to-brand-red/8 px-6 pt-8 pb-4 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center">
          {teacher.profiles.avatar_url ? (
            <Image
              src={teacher.profiles.avatar_url}
              alt={name}
              width={80}
              height={80}
              className="object-cover"
            />
          ) : (
            <span className="text-white text-2xl font-bold">{getInitials(name)}</span>
          )}
        </div>
        <h3 className="font-semibold text-neutral-900 text-base">{name}</h3>
        <p className="text-xs text-neutral-400 mt-0.5">{teacher.profiles.country ?? 'Nepal'}</p>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {bio && (
          <p className="text-sm text-neutral-500 line-clamp-3 mb-4">{bio}</p>
        )}

        {teacher.specializations.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
              {t('specializations')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {teacher.specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} variant="blue">{spec}</Badge>
              ))}
            </div>
          </div>
        )}

        {teacher.languages_spoken.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
              {t('languages')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {teacher.languages_spoken.map((lang) => (
                <Badge key={lang} variant="default">{lang}</Badge>
              ))}
            </div>
          </div>
        )}

        {teacher.zoom_link && (
          <a
            href={teacher.zoom_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark transition-colors"
          >
            <ExternalLink size={14} />
            {t('bookClass')}
          </a>
        )}
      </div>
    </div>
  )
}
