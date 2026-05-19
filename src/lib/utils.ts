import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind CSS classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a date for display */
export function formatDate(date: string | Date, locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale === 'ne' ? 'ne-NP' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Format time for display */
export function formatTime(date: string | Date, locale = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString(locale === 'ne' ? 'ne-NP' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** Calculate percentage */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

/** Truncate text to a max length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

/** Get initials from a name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/** Get bilingual value based on locale */
export function getBilingualValue(
  enValue: string | null | undefined,
  neValue: string | null | undefined,
  locale: string
): string {
  if (locale === 'ne' && neValue) return neValue
  return enValue ?? ''
}

/** Generate a URL-safe slug from a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Level badge color */
export function getLevelColor(level: number): string {
  const colors: Record<number, string> = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-brand-blue/10 text-brand-blue',
    3: 'bg-brand-red/10 text-brand-red',
  }
  return colors[level] ?? 'bg-neutral-100 text-neutral-800'
}
