import type { ReactNode } from 'react'
import { Logo } from '@/components/common/Logo'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-neutral-100 bg-white">
        <Link href="/">
          <Logo size="sm" />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
      <footer className="text-center text-xs text-neutral-400 py-4">
        © {new Date().getFullYear()} BhasaGhar
      </footer>
    </div>
  )
}
