'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard, BookOpen, Calendar, ClipboardList,
  TrendingUp, User, CreditCard, Video, BookMarked,
  Layers, HelpCircle, Award, Users, BookText, Globe,
  Settings, LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/common/Logo'

interface SidebarProps {
  locale: string
  role: 'parent' | 'student' | 'admin'
  userName: string
  onLogout: () => void
}

const parentLinks = (locale: string) => [
  { icon: LayoutDashboard, labelKey: 'overview', href: `/${locale}/dashboard/parent` },
  { icon: BookOpen,        labelKey: 'courses',  href: `/${locale}/dashboard/parent/courses`  },
  { icon: Calendar,        labelKey: 'schedule', href: `/${locale}/dashboard/parent/schedule` },
  { icon: ClipboardList,   labelKey: 'homework', href: `/${locale}/dashboard/parent/homework` },
  { icon: TrendingUp,      labelKey: 'progress', href: `/${locale}/dashboard/parent/progress` },
  { icon: User,            labelKey: 'profile',  href: `/${locale}/dashboard/parent/profile`  },
  { icon: CreditCard,      labelKey: 'subscription', href: `/${locale}/dashboard/parent/subscription` },
]

const studentLinks = (locale: string) => [
  { icon: LayoutDashboard, labelKey: 'overview',    href: `/${locale}/dashboard/student` },
  { icon: Video,           labelKey: 'videos',      href: `/${locale}/dashboard/student/videos`     },
  { icon: BookMarked,      labelKey: 'stories',     href: `/${locale}/dashboard/student/stories`    },
  { icon: Layers,          labelKey: 'flashcards',  href: `/${locale}/dashboard/student/flashcards` },
  { icon: HelpCircle,      labelKey: 'quizzes',     href: `/${locale}/dashboard/student/quizzes`    },
  { icon: Award,           labelKey: 'badges',      href: `/${locale}/dashboard/student/badges`     },
  { icon: Calendar,        labelKey: 'joinClass',   href: `/${locale}/dashboard/student/class`      },
]

const adminLinks = (locale: string) => [
  { icon: LayoutDashboard, labelKey: 'overview',  href: `/${locale}/admin`           },
  { icon: BookOpen,        labelKey: 'courses',   href: `/${locale}/admin/courses`   },
  { icon: Layers,          labelKey: 'materials', href: `/${locale}/admin/materials` },
  { icon: Users,           labelKey: 'teachers',  href: `/${locale}/admin/teachers`  },
  { icon: Users,           labelKey: 'students',  href: `/${locale}/admin/students`  },
  { icon: BookText,        labelKey: 'blog',      href: `/${locale}/admin/blog`      },
  { icon: Globe,           labelKey: 'cultural',  href: `/${locale}/admin/cultural`  },
]

export function DashboardSidebar({ locale, role, userName, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const dashT = useTranslations('dashboard')
  const adminT = useTranslations('admin')
  const navT   = useTranslations('nav')

  const links =
    role === 'parent'  ? parentLinks(locale)  :
    role === 'student' ? studentLinks(locale) :
    adminLinks(locale)

  const getLabel = (key: string) => {
    if (role === 'admin') return adminT(key as any)
    if (role === 'parent') return dashT(`parent.${key}` as any)
    return dashT(`student.${key}` as any)
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-neutral-100 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-neutral-100">
        <Logo locale={locale} size="sm" />
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">{userName}</p>
            <p className="text-xs text-neutral-400 capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map(({ icon: Icon, labelKey, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-brand-blue/10 text-brand-blue'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              )}
            >
              <Icon
                size={18}
                className={cn(isActive ? 'text-brand-blue' : 'text-neutral-400')}
              />
              {getLabel(labelKey)}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-neutral-100">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-brand-red transition-all duration-150 w-full"
        >
          <LogOut size={18} className="text-neutral-400" />
          {navT('logout')}
        </button>
      </div>
    </aside>
  )
}
