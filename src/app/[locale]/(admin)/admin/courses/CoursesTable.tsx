'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Plus, Pencil, Trash2 } from 'lucide-react'

type Course = {
  id: string
  title_en: string
  level: number
  is_published: boolean
  price: number
  currency: string
}

export function CoursesTable({ courses }: { courses: Course[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-neutral-400 uppercase border-b border-neutral-100">
            <th className="pb-3 text-left font-semibold">Title</th>
            <th className="pb-3 text-left font-semibold">Level</th>
            <th className="pb-3 text-left font-semibold">Price</th>
            <th className="pb-3 text-left font-semibold">Status</th>
            <th className="pb-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-50">
          {courses.map((course) => (
            <tr key={course.id}>
              <td className="py-3 pr-4 font-medium text-neutral-900">{course.title_en}</td>
              <td className="py-3 pr-4">
                <Badge variant={course.level === 1 ? 'green' : course.level === 2 ? 'blue' : 'red'}>
                  Level {course.level}
                </Badge>
              </td>
              <td className="py-3 pr-4 text-neutral-600">
                {course.price === 0 ? 'Free' : `${course.currency} ${Number(course.price).toFixed(0)}`}
              </td>
              <td className="py-3 pr-4">
                <Badge variant={course.is_published ? 'green' : 'default'}>
                  {course.is_published ? 'Published' : 'Draft'}
                </Badge>
              </td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Pencil size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
