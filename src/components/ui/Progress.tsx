import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number          // 0–100
  label?: string
  showValue?: boolean
  color?: 'red' | 'blue' | 'green'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colorClasses = {
  red:   'bg-brand-red',
  blue:  'bg-brand-blue',
  green: 'bg-success',
}

const sizeClasses = {
  sm:  'h-1.5',
  md:  'h-2.5',
  lg:  'h-4',
}

export function ProgressBar({
  value,
  label,
  showValue = false,
  color = 'blue',
  size = 'md',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-neutral-600">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-neutral-700">{clamped}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-neutral-100 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            colorClasses[color]
          )}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
