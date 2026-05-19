import type { Tables } from './database'

// Re-export common table row types with cleaner names
export type Profile = Tables<'profiles'>
export type StudentProfile = Tables<'student_profiles'>
export type TeacherProfile = Tables<'teacher_profiles'>
export type Course = Tables<'courses'>
export type Lesson = Tables<'lessons'>
export type Vocabulary = Tables<'vocabulary'>
export type Flashcard = Tables<'flashcards'>
export type QuizQuestion = Tables<'quiz_questions'>
export type Enrollment = Tables<'enrollments'>
export type ClassSchedule = Tables<'class_schedules'>
export type Homework = Tables<'homework'>
export type HomeworkSubmission = Tables<'homework_submissions'>
export type Progress = Tables<'progress'>
export type QuizAttempt = Tables<'quiz_attempts'>
export type Badge = Tables<'badges'>
export type StudentBadge = Tables<'student_badges'>
export type BlogPost = Tables<'blog_posts'>
export type Story = Tables<'stories'>
export type CulturalContent = Tables<'cultural_content'>
export type Subscription = Tables<'subscriptions'>

// Composite types used across the app
export type ProfileWithRole = Profile & {
  student_profiles?: StudentProfile | null
  teacher_profiles?: TeacherProfile | null
}

export type CourseWithLessons = Course & {
  lessons: Lesson[]
}

export type LessonWithContent = Lesson & {
  vocabulary: Vocabulary[]
  flashcards: Flashcard[]
  quiz_questions: QuizQuestion[]
}

export type ScheduleWithTeacher = ClassSchedule & {
  profiles: Pick<Profile, 'full_name_en' | 'full_name_ne' | 'avatar_url'>
  courses: Pick<Course, 'title_en' | 'title_ne'>
}

export type HomeworkWithLesson = Homework & {
  lessons: Pick<Lesson, 'title_en' | 'title_ne'>
  homework_submissions?: HomeworkSubmission[]
}

export type TeacherWithProfile = TeacherProfile & {
  profiles: Profile
}

// Quiz option shape (stored in JSONB)
export interface QuizOption {
  text: string
  is_correct: boolean
}

// Available slot shape for teacher profiles
export interface AvailableSlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  start_time: string // HH:mm
  end_time: string   // HH:mm
}

// Pricing plans
export interface PricingPlan {
  id: 'basic' | 'standard' | 'premium'
  name: string
  price: number
  currency: string
  period: string
  features: string[]
  highlighted?: boolean
}

// Navigation items
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
