import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'outline'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  red:     'bg-brand-red/10 text-brand-red',
  blue:    'bg-brand-blue/10 text-brand-blue',
  green:   'bg-green-100 text-green-700',
  yellow:  'bg-yellow-100 text-yellow-700',
  purple:  'bg-purple-100 text-purple-700',
  outline: 'border border-neutral-300 text-neutral-600 bg-transparent',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
