export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'student' | 'parent' | 'teacher' | 'admin'
          full_name_en: string
          full_name_ne: string | null
          email: string
          avatar_url: string | null
          phone: string | null
          country: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'student' | 'parent' | 'teacher' | 'admin'
          full_name_en?: string
          full_name_ne?: string | null
          email: string
          avatar_url?: string | null
          phone?: string | null
          country?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name_en?: string
          full_name_ne?: string | null
          avatar_url?: string | null
          phone?: string | null
          country?: string | null
          bio?: string | null
          updated_at?: string
        }
      }
      student_profiles: {
        Row: {
          id: string
          age: number | null
          level: number
          created_at: string
        }
        Insert: {
          id: string
          age?: number | null
          level?: number
          created_at?: string
        }
        Update: {
          age?: number | null
          level?: number
        }
      }
      parent_children: {
        Row: {
          parent_id: string
          student_id: string
          created_at: string
        }
        Insert: {
          parent_id: string
          student_id: string
          created_at?: string
        }
        Update: never
      }
      teacher_profiles: {
        Row: {
          id: string
          qualifications: string | null
          languages_spoken: string[]
          specializations: string[]
          zoom_link: string | null
          available_slots: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id: string
          qualifications?: string | null
          languages_spoken?: string[]
          specializations?: string[]
          zoom_link?: string | null
          available_slots?: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          qualifications?: string | null
          languages_spoken?: string[]
          specializations?: string[]
          zoom_link?: string | null
          available_slots?: Json
          is_active?: boolean
        }
      }
      courses: {
        Row: {
          id: string
          title_en: string
          title_ne: string | null
          description_en: string | null
          description_ne: string | null
          level: number
          image_url: string | null
          price: number
          currency: string
          duration_weeks: number | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title_en: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          level: number
          image_url?: string | null
          price?: number
          currency?: string
          duration_weeks?: number | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title_en?: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          level?: number
          image_url?: string | null
          price?: number
          currency?: string
          duration_weeks?: number | null
          is_published?: boolean
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title_en: string
          title_ne: string | null
          description_en: string | null
          description_ne: string | null
          video_url: string | null
          order_index: number
          duration_minutes: number | null
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title_en: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          video_url?: string | null
          order_index?: number
          duration_minutes?: number | null
          is_published?: boolean
          created_at?: string
        }
        Update: {
          title_en?: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          video_url?: string | null
          order_index?: number
          duration_minutes?: number | null
          is_published?: boolean
        }
      }
      vocabulary: {
        Row: {
          id: string
          lesson_id: string
          nepali_word: string
          english_word: string
          pronunciation: string | null
          example_ne: string | null
          example_en: string | null
          image_url: string | null
          audio_url: string | null
          order_index: number
        }
        Insert: {
          id?: string
          lesson_id: string
          nepali_word: string
          english_word: string
          pronunciation?: string | null
          example_ne?: string | null
          example_en?: string | null
          image_url?: string | null
          audio_url?: string | null
          order_index?: number
        }
        Update: {
          nepali_word?: string
          english_word?: string
          pronunciation?: string | null
          example_ne?: string | null
          example_en?: string | null
          image_url?: string | null
          audio_url?: string | null
          order_index?: number
        }
      }
      flashcards: {
        Row: {
          id: string
          lesson_id: string | null
          front_text: string
          back_text: string
          front_image_url: string | null
          back_image_url: string | null
          category: string | null
          difficulty: number
        }
        Insert: {
          id?: string
          lesson_id?: string | null
          front_text: string
          back_text: string
          front_image_url?: string | null
          back_image_url?: string | null
          category?: string | null
          difficulty?: number
        }
        Update: {
          front_text?: string
          back_text?: string
          front_image_url?: string | null
          back_image_url?: string | null
          category?: string | null
          difficulty?: number
        }
      }
      quiz_questions: {
        Row: {
          id: string
          lesson_id: string
          question_en: string
          question_ne: string | null
          options: Json
          explanation_en: string | null
          explanation_ne: string | null
          type: 'multiple_choice' | 'true_false' | 'fill_blank'
          order_index: number
        }
        Insert: {
          id?: string
          lesson_id: string
          question_en: string
          question_ne?: string | null
          options?: Json
          explanation_en?: string | null
          explanation_ne?: string | null
          type?: 'multiple_choice' | 'true_false' | 'fill_blank'
          order_index?: number
        }
        Update: {
          question_en?: string
          question_ne?: string | null
          options?: Json
          explanation_en?: string | null
          explanation_ne?: string | null
          type?: 'multiple_choice' | 'true_false' | 'fill_blank'
          order_index?: number
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          enrolled_at: string
          status: 'active' | 'paused' | 'completed' | 'cancelled'
          completed_at: string | null
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          enrolled_at?: string
          status?: 'active' | 'paused' | 'completed' | 'cancelled'
          completed_at?: string | null
        }
        Update: {
          status?: 'active' | 'paused' | 'completed' | 'cancelled'
          completed_at?: string | null
        }
      }
      class_schedules: {
        Row: {
          id: string
          course_id: string
          teacher_id: string
          title_en: string
          title_ne: string | null
          scheduled_at: string
          duration_minutes: number
          zoom_link: string | null
          max_students: number
          is_recurring: boolean
          recurrence_rule: string | null
          status: 'scheduled' | 'cancelled' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          teacher_id: string
          title_en: string
          title_ne?: string | null
          scheduled_at: string
          duration_minutes?: number
          zoom_link?: string | null
          max_students?: number
          is_recurring?: boolean
          recurrence_rule?: string | null
          status?: 'scheduled' | 'cancelled' | 'completed'
          created_at?: string
        }
        Update: {
          title_en?: string
          title_ne?: string | null
          scheduled_at?: string
          duration_minutes?: number
          zoom_link?: string | null
          max_students?: number
          status?: 'scheduled' | 'cancelled' | 'completed'
        }
      }
      homework: {
        Row: {
          id: string
          lesson_id: string
          teacher_id: string
          title_en: string
          title_ne: string | null
          description_en: string | null
          description_ne: string | null
          due_date: string
          points: number
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          teacher_id: string
          title_en: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          due_date: string
          points?: number
          created_at?: string
        }
        Update: {
          title_en?: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          due_date?: string
          points?: number
        }
      }
      homework_submissions: {
        Row: {
          id: string
          homework_id: string
          student_id: string
          content: string | null
          file_url: string | null
          submitted_at: string
          grade: number | null
          feedback: string | null
          status: 'pending' | 'graded' | 'returned'
        }
        Insert: {
          id?: string
          homework_id: string
          student_id: string
          content?: string | null
          file_url?: string | null
          submitted_at?: string
          grade?: number | null
          feedback?: string | null
          status?: 'pending' | 'graded' | 'returned'
        }
        Update: {
          content?: string | null
          file_url?: string | null
          grade?: number | null
          feedback?: string | null
          status?: 'pending' | 'graded' | 'returned'
        }
      }
      progress: {
        Row: {
          id: string
          student_id: string
          lesson_id: string
          completed: boolean
          completion_percentage: number
          time_spent_minutes: number
          last_accessed_at: string
        }
        Insert: {
          id?: string
          student_id: string
          lesson_id: string
          completed?: boolean
          completion_percentage?: number
          time_spent_minutes?: number
          last_accessed_at?: string
        }
        Update: {
          completed?: boolean
          completion_percentage?: number
          time_spent_minutes?: number
          last_accessed_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          student_id: string
          lesson_id: string
          score: number
          max_score: number
          answers: Json
          completed_at: string
        }
        Insert: {
          id?: string
          student_id: string
          lesson_id: string
          score?: number
          max_score?: number
          answers?: Json
          completed_at?: string
        }
        Update: {
          score?: number
          max_score?: number
          answers?: Json
        }
      }
      badges: {
        Row: {
          id: string
          name_en: string
          name_ne: string | null
          description_en: string | null
          description_ne: string | null
          image_url: string | null
          criteria: Json | null
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          image_url?: string | null
          criteria?: Json | null
          category?: string
          created_at?: string
        }
        Update: {
          name_en?: string
          name_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          image_url?: string | null
          criteria?: Json | null
          category?: string
        }
      }
      student_badges: {
        Row: {
          student_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          student_id: string
          badge_id: string
          earned_at?: string
        }
        Update: never
      }
      blog_posts: {
        Row: {
          id: string
          author_id: string
          title_en: string
          title_ne: string | null
          slug: string
          content_en: string | null
          content_ne: string | null
          excerpt_en: string | null
          excerpt_ne: string | null
          cover_image_url: string | null
          tags: string[]
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title_en: string
          title_ne?: string | null
          slug: string
          content_en?: string | null
          content_ne?: string | null
          excerpt_en?: string | null
          excerpt_ne?: string | null
          cover_image_url?: string | null
          tags?: string[]
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title_en?: string
          title_ne?: string | null
          slug?: string
          content_en?: string | null
          content_ne?: string | null
          excerpt_en?: string | null
          excerpt_ne?: string | null
          cover_image_url?: string | null
          tags?: string[]
          is_published?: boolean
          published_at?: string | null
          updated_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          title_en: string
          title_ne: string | null
          content_en: string | null
          content_ne: string | null
          audio_url: string | null
          image_url: string | null
          level: number
          age_range_min: number
          age_range_max: number
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title_en: string
          title_ne?: string | null
          content_en?: string | null
          content_ne?: string | null
          audio_url?: string | null
          image_url?: string | null
          level?: number
          age_range_min?: number
          age_range_max?: number
          is_published?: boolean
          created_at?: string
        }
        Update: {
          title_en?: string
          title_ne?: string | null
          content_en?: string | null
          content_ne?: string | null
          audio_url?: string | null
          image_url?: string | null
          level?: number
          age_range_min?: number
          age_range_max?: number
          is_published?: boolean
        }
      }
      cultural_content: {
        Row: {
          id: string
          title_en: string
          title_ne: string | null
          description_en: string | null
          description_ne: string | null
          content_type: 'story' | 'rhyme' | 'festival' | 'tradition' | 'recipe' | 'craft'
          media_url: string | null
          thumbnail_url: string | null
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title_en: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          content_type?: 'story' | 'rhyme' | 'festival' | 'tradition' | 'recipe' | 'craft'
          media_url?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
          created_at?: string
        }
        Update: {
          title_en?: string
          title_ne?: string | null
          description_en?: string | null
          description_ne?: string | null
          content_type?: 'story' | 'rhyme' | 'festival' | 'tradition' | 'recipe' | 'craft'
          media_url?: string | null
          thumbnail_url?: string | null
          is_published?: boolean
        }
      }
      subscriptions: {
        Row: {
          id: string
          parent_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan: 'basic' | 'standard' | 'premium'
          status: 'active' | 'cancelled' | 'past_due' | 'trialing'
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan?: 'basic' | 'standard' | 'premium'
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan?: 'basic' | 'standard' | 'premium'
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing'
          current_period_start?: string | null
          current_period_end?: string | null
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_role: 'student' | 'parent' | 'teacher' | 'admin'
      enrollment_status: 'active' | 'paused' | 'completed' | 'cancelled'
      submission_status: 'pending' | 'graded' | 'returned'
      schedule_status: 'scheduled' | 'cancelled' | 'completed'
      subscription_plan: 'basic' | 'standard' | 'premium'
      subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing'
      cultural_content_type: 'story' | 'rhyme' | 'festival' | 'tradition' | 'recipe' | 'craft'
      quiz_type: 'multiple_choice' | 'true_false' | 'fill_blank'
    }
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]
