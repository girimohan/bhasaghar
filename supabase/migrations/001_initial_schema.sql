-- ============================================================
-- BhasaGhar Database Migration 001 — Initial Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role            AS ENUM ('student', 'parent', 'teacher', 'admin');
CREATE TYPE enrollment_status    AS ENUM ('active', 'paused', 'completed', 'cancelled');
CREATE TYPE submission_status    AS ENUM ('pending', 'graded', 'returned');
CREATE TYPE schedule_status      AS ENUM ('scheduled', 'cancelled', 'completed');
CREATE TYPE subscription_plan    AS ENUM ('basic', 'standard', 'premium');
CREATE TYPE subscription_status  AS ENUM ('active', 'cancelled', 'past_due', 'trialing');
CREATE TYPE cultural_content_type AS ENUM ('story', 'rhyme', 'festival', 'tradition', 'recipe', 'craft');
CREATE TYPE quiz_type            AS ENUM ('multiple_choice', 'true_false', 'fill_blank');

-- ============================================================
-- PROFILES (1:1 with auth.users)
-- ============================================================
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role          user_role NOT NULL DEFAULT 'student',
  full_name_en  TEXT NOT NULL DEFAULT '',
  full_name_ne  TEXT,
  email         TEXT NOT NULL,
  avatar_url    TEXT,
  phone         TEXT,
  country       TEXT,
  bio           TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own"   ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_select_admin" ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));
CREATE POLICY "profiles_all_admin"    ON profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- Auto-create profile row when a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name_en, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- STUDENT PROFILES
-- ============================================================
CREATE TABLE student_profiles (
  id         UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  age        INTEGER,
  level      INTEGER NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 3),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "student_profiles_select_own"    ON student_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "student_profiles_update_own"    ON student_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "student_profiles_select_admin"  ON student_profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- PARENT-CHILD RELATIONSHIP
-- ============================================================
CREATE TABLE parent_children (
  parent_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (parent_id, student_id)
);

ALTER TABLE parent_children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parent_children_select_parent" ON parent_children FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "parent_children_manage_admin"  ON parent_children FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- TEACHER PROFILES
-- ============================================================
CREATE TABLE teacher_profiles (
  id                UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  qualifications    TEXT,
  languages_spoken  TEXT[]   DEFAULT '{}',
  specializations   TEXT[]   DEFAULT '{}',
  zoom_link         TEXT,
  available_slots   JSONB    DEFAULT '[]',
  is_active         BOOLEAN  NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teacher_profiles_public_read"  ON teacher_profiles FOR SELECT USING (is_active = TRUE);
CREATE POLICY "teacher_profiles_update_own"   ON teacher_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "teacher_profiles_admin"        ON teacher_profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- COURSES
-- ============================================================
CREATE TABLE courses (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en       TEXT NOT NULL,
  title_ne       TEXT,
  description_en TEXT,
  description_ne TEXT,
  level          INTEGER NOT NULL CHECK (level BETWEEN 1 AND 3),
  image_url      TEXT,
  price          DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency       TEXT NOT NULL DEFAULT 'EUR',
  duration_weeks INTEGER,
  is_published   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_public_read"  ON courses FOR SELECT USING (is_published = TRUE);
CREATE POLICY "courses_admin"        ON courses FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- LESSONS
-- ============================================================
CREATE TABLE lessons (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id        UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title_en         TEXT NOT NULL,
  title_ne         TEXT,
  description_en   TEXT,
  description_ne   TEXT,
  video_url        TEXT,
  order_index      INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER,
  is_published     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lessons_enrolled_read" ON lessons FOR SELECT
  USING (
    is_published = TRUE AND (
      EXISTS (
        SELECT 1 FROM enrollments e
        WHERE e.student_id = auth.uid()
          AND e.course_id = lessons.course_id
          AND e.status = 'active'
      )
      OR EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')
      )
    )
  );
CREATE POLICY "lessons_admin" ON lessons FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- VOCABULARY
-- ============================================================
CREATE TABLE vocabulary (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  nepali_word   TEXT NOT NULL,
  english_word  TEXT NOT NULL,
  pronunciation TEXT,
  example_ne    TEXT,
  example_en    TEXT,
  image_url     TEXT,
  audio_url     TEXT,
  order_index   INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vocabulary_read" ON vocabulary FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN enrollments e ON e.course_id = l.course_id
      WHERE l.id = vocabulary.lesson_id
        AND e.student_id = auth.uid()
        AND e.status = 'active'
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
  );
CREATE POLICY "vocabulary_admin" ON vocabulary FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- FLASHCARDS
-- ============================================================
CREATE TABLE flashcards (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id       UUID REFERENCES lessons(id) ON DELETE SET NULL,
  front_text      TEXT NOT NULL,
  back_text       TEXT NOT NULL,
  front_image_url TEXT,
  back_image_url  TEXT,
  category        TEXT,
  difficulty      INTEGER NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3)
);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "flashcards_authenticated_read" ON flashcards FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "flashcards_admin" ON flashcards FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- QUIZ QUESTIONS
-- ============================================================
CREATE TABLE quiz_questions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id       UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question_en     TEXT NOT NULL,
  question_ne     TEXT,
  options         JSONB NOT NULL DEFAULT '[]',
  explanation_en  TEXT,
  explanation_ne  TEXT,
  type            quiz_type NOT NULL DEFAULT 'multiple_choice',
  order_index     INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_questions_enrolled_read" ON quiz_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN enrollments e ON e.course_id = l.course_id
      WHERE l.id = quiz_questions.lesson_id
        AND e.student_id = auth.uid()
        AND e.status = 'active'
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
  );
CREATE POLICY "quiz_questions_admin" ON quiz_questions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- ENROLLMENTS
-- ============================================================
CREATE TABLE enrollments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id    UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status       enrollment_status NOT NULL DEFAULT 'active',
  completed_at TIMESTAMPTZ,
  UNIQUE (student_id, course_id)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enrollments_student_read"  ON enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "enrollments_parent_read"   ON enrollments FOR SELECT
  USING (EXISTS (SELECT 1 FROM parent_children pc WHERE pc.parent_id = auth.uid() AND pc.student_id = enrollments.student_id));
CREATE POLICY "enrollments_admin"         ON enrollments FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- CLASS SCHEDULES
-- ============================================================
CREATE TABLE class_schedules (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id        UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  teacher_id       UUID NOT NULL REFERENCES profiles(id),
  title_en         TEXT NOT NULL,
  title_ne         TEXT,
  scheduled_at     TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  zoom_link        TEXT,
  max_students     INTEGER NOT NULL DEFAULT 10,
  is_recurring     BOOLEAN NOT NULL DEFAULT FALSE,
  recurrence_rule  TEXT,
  status           schedule_status NOT NULL DEFAULT 'scheduled',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "schedules_enrolled_read" ON class_schedules FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      WHERE e.course_id = class_schedules.course_id
        AND e.student_id = auth.uid()
        AND e.status = 'active'
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    OR EXISTS (SELECT 1 FROM parent_children pc
      JOIN enrollments e ON e.student_id = pc.student_id
      WHERE pc.parent_id = auth.uid()
        AND e.course_id = class_schedules.course_id
        AND e.status = 'active')
  );
CREATE POLICY "schedules_admin" ON class_schedules FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- HOMEWORK
-- ============================================================
CREATE TABLE homework (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id      UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  teacher_id     UUID NOT NULL REFERENCES profiles(id),
  title_en       TEXT NOT NULL,
  title_ne       TEXT,
  description_en TEXT,
  description_ne TEXT,
  due_date       DATE NOT NULL,
  points         INTEGER NOT NULL DEFAULT 10,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE homework ENABLE ROW LEVEL SECURITY;

CREATE POLICY "homework_enrolled_read" ON homework FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons l
      JOIN enrollments e ON e.course_id = l.course_id
      WHERE l.id = homework.lesson_id
        AND e.student_id = auth.uid()
        AND e.status = 'active'
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    OR EXISTS (
      SELECT 1 FROM parent_children pc
      JOIN lessons l ON TRUE
      JOIN enrollments e ON e.student_id = pc.student_id AND e.course_id = l.course_id
      WHERE pc.parent_id = auth.uid()
        AND l.id = homework.lesson_id
        AND e.status = 'active'
    )
  );
CREATE POLICY "homework_admin" ON homework FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- HOMEWORK SUBMISSIONS
-- ============================================================
CREATE TABLE homework_submissions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  homework_id  UUID NOT NULL REFERENCES homework(id) ON DELETE CASCADE,
  student_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content      TEXT,
  file_url     TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  grade        INTEGER,
  feedback     TEXT,
  status       submission_status NOT NULL DEFAULT 'pending',
  UNIQUE (homework_id, student_id)
);

ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "submissions_student_manage" ON homework_submissions FOR ALL  USING (auth.uid() = student_id);
CREATE POLICY "submissions_admin"          ON homework_submissions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- PROGRESS
-- ============================================================
CREATE TABLE progress (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id            UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id             UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed             BOOLEAN NOT NULL DEFAULT FALSE,
  completion_percentage INTEGER NOT NULL DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  time_spent_minutes    INTEGER NOT NULL DEFAULT 0,
  last_accessed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, lesson_id)
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_student_manage" ON progress FOR ALL  USING (auth.uid() = student_id);
CREATE POLICY "progress_parent_read"    ON progress FOR SELECT
  USING (EXISTS (SELECT 1 FROM parent_children pc WHERE pc.parent_id = auth.uid() AND pc.student_id = progress.student_id));
CREATE POLICY "progress_admin"          ON progress FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================
CREATE TABLE quiz_attempts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  score        INTEGER NOT NULL DEFAULT 0,
  max_score    INTEGER NOT NULL DEFAULT 0,
  answers      JSONB NOT NULL DEFAULT '[]',
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quiz_attempts_student" ON quiz_attempts FOR ALL  USING (auth.uid() = student_id);
CREATE POLICY "quiz_attempts_admin"   ON quiz_attempts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- ============================================================
-- BADGES
-- ============================================================
CREATE TABLE badges (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en        TEXT NOT NULL,
  name_ne        TEXT,
  description_en TEXT,
  description_ne TEXT,
  image_url      TEXT,
  criteria       JSONB,
  category       TEXT NOT NULL DEFAULT 'achievement',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "badges_public_read" ON badges FOR SELECT USING (TRUE);
CREATE POLICY "badges_admin"       ON badges FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE TABLE student_badges (
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id   UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (student_id, badge_id)
);

ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "student_badges_own"    ON student_badges FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "student_badges_parent" ON student_badges FOR SELECT
  USING (EXISTS (SELECT 1 FROM parent_children pc WHERE pc.parent_id = auth.uid() AND pc.student_id = student_badges.student_id));
CREATE POLICY "student_badges_admin"  ON student_badges FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE blog_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id       UUID NOT NULL REFERENCES profiles(id),
  title_en        TEXT NOT NULL,
  title_ne        TEXT,
  slug            TEXT NOT NULL UNIQUE,
  content_en      TEXT,
  content_ne      TEXT,
  excerpt_en      TEXT,
  excerpt_ne      TEXT,
  cover_image_url TEXT,
  tags            TEXT[] DEFAULT '{}',
  is_published    BOOLEAN NOT NULL DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_public_read"  ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "blog_admin"        ON blog_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- STORIES
-- ============================================================
CREATE TABLE stories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en      TEXT NOT NULL,
  title_ne      TEXT,
  content_en    TEXT,
  content_ne    TEXT,
  audio_url     TEXT,
  image_url     TEXT,
  level         INTEGER NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 3),
  age_range_min INTEGER NOT NULL DEFAULT 4,
  age_range_max INTEGER NOT NULL DEFAULT 14,
  is_published  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stories_authenticated_read" ON stories FOR SELECT
  USING (is_published = TRUE AND auth.role() = 'authenticated');
CREATE POLICY "stories_admin"              ON stories FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- CULTURAL CONTENT
-- ============================================================
CREATE TABLE cultural_content (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en      TEXT NOT NULL,
  title_ne      TEXT,
  description_en TEXT,
  description_ne TEXT,
  content_type  cultural_content_type NOT NULL DEFAULT 'festival',
  media_url     TEXT,
  thumbnail_url TEXT,
  is_published  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE cultural_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cultural_public_read" ON cultural_content FOR SELECT USING (is_published = TRUE);
CREATE POLICY "cultural_admin"       ON cultural_content FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
CREATE TABLE subscriptions (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id              UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  plan                   subscription_plan   NOT NULL DEFAULT 'basic',
  status                 subscription_status NOT NULL DEFAULT 'trialing',
  current_period_start   TIMESTAMPTZ,
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_parent_read"  ON subscriptions FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "subscriptions_admin"        ON subscriptions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- updated_at AUTO-UPDATE TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at      BEFORE UPDATE ON profiles      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER courses_updated_at       BEFORE UPDATE ON courses        FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER blog_posts_updated_at    BEFORE UPDATE ON blog_posts     FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- STORAGE BUCKETS (run separately in Supabase dashboard or via API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('videos',    'videos',    FALSE);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images',    'images',    TRUE);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', FALSE);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars',   'avatars',   FALSE);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('cultural',  'cultural',  TRUE);
