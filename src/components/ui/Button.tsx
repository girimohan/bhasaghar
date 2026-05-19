'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
  as?: 'button' | 'span'
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-red text-white hover:bg-brand-red-dark active:scale-[0.98] shadow-sm',
  secondary:
    'bg-brand-blue text-white hover:bg-brand-blue-dark active:scale-[0.98] shadow-sm',
  outline:
    'border-2 border-brand-red text-brand-red bg-transparent hover:bg-brand-red hover:text-white',
  ghost:
    'bg-transparent text-brand-blue hover:bg-brand-blue/8',
  danger:
    'bg-error text-white hover:bg-red-700 active:scale-[0.98]',
}

const sizeClasses: Record<Size, string> = {
  sm:  'px-3 py-1.5 text-sm rounded-lg',
  md:  'px-5 py-2.5 text-sm rounded-xl',
  lg:  'px-6 py-3 text-base rounded-xl',
  xl:  'px-8 py-4 text-lg rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold',
        'transition-all duration-150 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
})
