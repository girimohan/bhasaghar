import { cn } from '@/lib/utils'
import Link from 'next/link'

interface LogoProps {
  locale: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeConfig = {
  sm:  { house: 28, text: 'text-base' },
  md:  { house: 36, text: 'text-xl'   },
  lg:  { house: 48, text: 'text-2xl'  },
}

export function Logo({ locale, className, size = 'md' }: LogoProps) {
  const { house, text } = sizeConfig[size]

  return (
    <Link
      href={`/${locale}`}
      className={cn('flex items-center gap-2.5 no-underline group', className)}
      aria-label="BhasaGhar — Home"
    >
      {/* SVG House Logo */}
      <svg
        width={house}
        height={house}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* House body */}
        <rect x="4" y="22" width="40" height="22" rx="4" fill="#003893" />
        {/* Roof */}
        <path
          d="M24 4L46 22H2L24 4Z"
          fill="#DC143C"
          stroke="#DC143C"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Inner white square */}
        <rect x="14" y="28" width="20" height="16" rx="2" fill="white" />
        {/* Nepali letter क */}
        <text
          x="24"
          y="41"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#003893"
          fontFamily="'Noto Sans Devanagari', system-ui, sans-serif"
        >
          क
        </text>
      </svg>

      {/* Brand name */}
      <div className="flex flex-col leading-none">
        <span className={cn('font-bold tracking-tight text-brand-blue', text)}>
          Bhasa
          <span className="text-brand-red">Ghar</span>
        </span>
        <span className="text-[10px] text-neutral-400 font-medium tracking-wide uppercase mt-0.5">
          भाषाघर
        </span>
      </div>
    </Link>
  )
}
