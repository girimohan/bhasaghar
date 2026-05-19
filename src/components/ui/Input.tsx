'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, className, id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-700"
        >
          {label}
          {props.required && <span className="text-brand-red ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm',
          'text-neutral-900 placeholder:text-neutral-400',
          'outline-none transition-all duration-150',
          'focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  )
})

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, className, id, ...props },
  ref
) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-neutral-700">
          {label}
          {props.required && <span className="text-brand-red ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm',
          'text-neutral-900 placeholder:text-neutral-400 resize-y min-h-[100px]',
          'outline-none transition-all duration-150',
          'focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  )
})

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, className, id, ...props },
  ref
) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-neutral-700">
          {label}
          {props.required && <span className="text-brand-red ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm',
          'text-neutral-900 outline-none transition-all duration-150',
          'focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-error',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
})
