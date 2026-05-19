import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | BhasaGhar',
    default: 'BhasaGhar — Nepali Kids Learning Platform',
  },
  description:
    'Professional Nepali language education for diaspora kids ages 4–14. Live classes, cultural stories, quizzes, and progress tracking.',
  keywords: ['Nepali language', 'kids learning', 'diaspora', 'Nepal', 'BhasaGhar'],
}

// Root layout — next-intl requires locale-specific HTML/body in [locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

