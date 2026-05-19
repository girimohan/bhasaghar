-- ============================================================
-- BhasaGhar Database Migration 001 - Initial Schema
-- ============================================================

-- Drop everything in reverse dependency order (clean slate)
DROP TABLE IF EXISTS subscriptions         CASCADE;
DROP TABLE IF EXISTS cultural_content      CASCADE;
DROP TABLE IF EXISTS stories               CASCADE;
DROP TABLE IF EXISTS blog_posts            CASCADE;
DROP TABLE IF EXISTS student_badges        CASCADE;
DROP TABLE IF EXISTS badges                CASCADE;
DROP TABLE IF EXISTS quiz_attempts         CASCADE;
DROP TABLE IF EXISTS progress              CASCADE;
DROP TABLE IF EXISTS homework_submissions  CASCADE;
DROP TABLE IF EXISTS homework              CASCADE;
DROP TABLE IF EXISTS class_schedules       CASCADE;
DROP TABLE IF EXISTS quiz_questions        CASCADE;
DROP TABLE IF EXISTS flashcards            CASCADE;
DROP TABLE IF EXISTS vocabulary            CASCADE;
DROP TABLE IF EXISTS lessons               CASCADE;
DROP TABLE IF EXISTS enrollments           CASCADE;
DROP TABLE IF EXISTS courses               CASCADE;
DROP TABLE IF EXISTS teacher_profiles      CASCADE;
DROP TABLE IF EXISTS parent_children       CASCADE;
DROP TABLE IF EXISTS student_profiles      CASCADE;
DROP TABLE IF EXISTS profiles              CASCADE;

DROP TYPE IF EXISTS user_role             CASCADE;
DROP TYPE IF EXISTS enrollment_status     CASCADE;
DROP TYPE IF EXISTS submission_status     CASCADE;
DROP TYPE IF EXISTS schedule_status       CASCADE;
DROP TYPE IF EXISTS subscription_plan     CASCADE;
DROP TYPE IF EXISTS subscription_status   CASCADE;
DROP TYPE IF EXISTS cultural_content_type CASCADE;
DROP TYPE IF EXISTS quiz_type             CASCADE;

DROP TRIGGER  IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user()    CASCADE;
DROP FUNCTION IF EXISTS update_updated_at()  CASCADE;

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role             AS ENUM ('student', 'parent', 'teacher', 'admin');
CREATE TYPE enrollment_status     AS ENUM ('active', 'paused', 'completed', 'cancelled');
CREATE TYPE submission_status     AS ENUM ('pending', 'graded', 'returned');
CREATE TYPE schedule_status       AS ENUM ('scheduled', 'cancelled', 'completed');
CREATE TYPE subscription_plan     AS ENUM ('basic', 'standard', 'premium');
CREATE TYPE subscription_status   AS ENUM ('active', 'cancelled', 'past_due', 'trialing');
CREATE TYPE cultural_content_type AS ENUM ('story', 'rhyme', 'festival', 'tradition', 'recipe', 'craft');
CREATE TYPE quiz_type             AS ENUM ('multiple_choice', 'true_false', 'fill_blank');

-- ============================================================
-- 1. PROFILES (1:1 with auth.users)
-- ============================================================
CREATE TABLE profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role         user_role NOT NULL DEFAULT 'student',
  full_name_en TEXT NOT NULL DEFAULT '',
  full_name_ne TEXT,
  email        TEXT NOT NULL,
  avatar_url   TEXT,
  phone        TEXT,
  country      TEXT,
  bio          TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. STUDENT PROFILES
-- ============================================================
CREATE TABLE student_profiles (
  id         UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  age        INTEGER,
  level      INTEGER NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 3),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. PARENT-CHILD RELATIONSHIP
-- ============================================================
CREATE TABLE parent_children (
  parent_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (parent_id, student_id)
);

-- ============================================================
-- 4. TEACHER PROFILES
-- ============================================================
CREATE TABLE teacher_profiles (
  id               UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  qualifications   TEXT,
  languages_spoken TEXT[]        DEFAULT '{}',
  specializations  TEXT[]        DEFAULT '{}',
  zoom_link        TEXT,
  available_slots  JSONB         DEFAULT '[]',
  hourly_rate      DECIMAL(10,2),
  is_active        BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. COURSES
-- ============================================================
CREATE TABLE courses (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================
-- 6. ENROLLMENTS (before lessons — lessons policies reference this table)
-- ============================================================
CREATE TABLE enrollments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id          UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id           UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status              enrollment_status NOT NULL DEFAULT 'active',
  progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
  completed_at        TIMESTAMPTZ,
  UNIQUE (student_id, course_id)
);

-- ============================================================
-- 7. LESSONS
-- ============================================================
CREATE TABLE lessons (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================
-- 8. VOCABULARY
-- ============================================================
CREATE TABLE vocabulary (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID REFERENCES lessons(id) ON DELETE CASCADE,
  nepali_word   TEXT NOT NULL,
  english_word  TEXT NOT NULL,
  pronunciation TEXT,
  example_ne    TEXT,
  example_en    TEXT,
  image_url     TEXT,
  audio_url     TEXT,
  order_index   INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- 9. FLASHCARDS
-- ============================================================
CREATE TABLE flashcards (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id       UUID REFERENCES lessons(id) ON DELETE SET NULL,
  front_text      TEXT NOT NULL,
  back_text       TEXT NOT NULL,
  front_image_url TEXT,
  back_image_url  TEXT,
  category        TEXT,
  difficulty      INTEGER NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3)
);

-- ============================================================
-- 10. QUIZ QUESTIONS
-- ============================================================
CREATE TABLE quiz_questions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id      UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question_en    TEXT NOT NULL,
  question_ne    TEXT,
  options        JSONB NOT NULL DEFAULT '[]',
  explanation_en TEXT,
  explanation_ne TEXT,
  type           quiz_type NOT NULL DEFAULT 'multiple_choice',
  order_index    INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- 11. CLASS SCHEDULES
-- ============================================================
CREATE TABLE class_schedules (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================
-- 12. HOMEWORK
-- ============================================================
CREATE TABLE homework (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id      UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id      UUID REFERENCES lessons(id) ON DELETE SET NULL,
  teacher_id     UUID NOT NULL REFERENCES profiles(id),
  title_en       TEXT NOT NULL,
  title_ne       TEXT,
  description_en TEXT,
  description_ne TEXT,
  due_date       DATE NOT NULL,
  points         INTEGER NOT NULL DEFAULT 10,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 13. HOMEWORK SUBMISSIONS
-- ============================================================
CREATE TABLE homework_submissions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================
-- 14. PROGRESS
-- ============================================================
CREATE TABLE progress (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id            UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id             UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed             BOOLEAN NOT NULL DEFAULT FALSE,
  completion_percentage INTEGER NOT NULL DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  time_spent_minutes    INTEGER NOT NULL DEFAULT 0,
  last_accessed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, lesson_id)
);

-- ============================================================
-- 15. QUIZ ATTEMPTS
-- ============================================================
CREATE TABLE quiz_attempts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  score        INTEGER NOT NULL DEFAULT 0,
  max_score    INTEGER NOT NULL DEFAULT 0,
  answers      JSONB NOT NULL DEFAULT '[]',
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 16. BADGES
-- ============================================================
CREATE TABLE badges (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en        TEXT NOT NULL,
  name_ne        TEXT,
  description_en TEXT,
  description_ne TEXT,
  image_url      TEXT,
  criteria       JSONB,
  category       TEXT NOT NULL DEFAULT 'achievement',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE student_badges (
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id   UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (student_id, badge_id)
);

-- ============================================================
-- 17. BLOG POSTS
-- ============================================================
CREATE TABLE blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================
-- 18. STORIES
-- ============================================================
CREATE TABLE stories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================
-- 19. CULTURAL CONTENT
-- ============================================================
CREATE TABLE cultural_content (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en       TEXT NOT NULL,
  title_ne       TEXT,
  description_en TEXT,
  description_ne TEXT,
  content_type   cultural_content_type NOT NULL DEFAULT 'festival',
  media_url      TEXT,
  thumbnail_url  TEXT,
  is_published   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 20. SUBSCRIPTIONS
-- ============================================================
CREATE TABLE subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name_en, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'parent')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

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
-- ROW LEVEL SECURITY — enable on all tables
-- ============================================================
ALTER TABLE profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_children      ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses               ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons               ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary            ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards            ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules       ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework              ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress              ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges                ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges        ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories               ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_content      ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions         ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- profiles
CREATE POLICY "profiles_select_own"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own"   ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_admin"        ON profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'));

-- student_profiles
CREATE POLICY "student_profiles_own"   ON student_profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "student_profiles_admin" ON student_profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- parent_children
CREATE POLICY "parent_children_parent" ON parent_children FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "parent_children_admin"  ON parent_children FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- teacher_profiles
CREATE POLICY "teacher_profiles_public_read" ON teacher_profiles FOR SELECT USING (is_active = TRUE);
CREATE POLICY "teacher_profiles_update_own"  ON teacher_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "teacher_profiles_admin"       ON teacher_profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- courses
CREATE POLICY "courses_public_read" ON courses FOR SELECT USING (is_published = TRUE);
CREATE POLICY "courses_admin"       ON courses FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- enrollments
CREATE POLICY "enrollments_student_read" ON enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "enrollments_parent_read"  ON enrollments FOR SELECT
  USING (EXISTS (SELECT 1 FROM parent_children pc WHERE pc.parent_id = auth.uid() AND pc.student_id = enrollments.student_id));
CREATE POLICY "enrollments_admin"        ON enrollments FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- lessons
CREATE POLICY "lessons_enrolled_read" ON lessons FOR SELECT
  USING (
    is_published = TRUE AND (
      EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = auth.uid() AND e.course_id = lessons.course_id AND e.status = 'active')
      OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    )
  );
CREATE POLICY "lessons_admin" ON lessons FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- vocabulary
CREATE POLICY "vocabulary_enrolled_read" ON vocabulary FOR SELECT
  USING (
    lesson_id IS NULL
    OR EXISTS (
      SELECT 1 FROM lessons l JOIN enrollments e ON e.course_id = l.course_id
      WHERE l.id = vocabulary.lesson_id AND e.student_id = auth.uid() AND e.status = 'active'
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
  );
CREATE POLICY "vocabulary_admin" ON vocabulary FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- flashcards
CREATE POLICY "flashcards_authenticated_read" ON flashcards FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "flashcards_admin"              ON flashcards FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- quiz_questions
CREATE POLICY "quiz_questions_enrolled_read" ON quiz_questions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lessons l JOIN enrollments e ON e.course_id = l.course_id
      WHERE l.id = quiz_questions.lesson_id AND e.student_id = auth.uid() AND e.status = 'active'
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
  );
CREATE POLICY "quiz_questions_admin" ON quiz_questions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- class_schedules
CREATE POLICY "schedules_enrolled_read" ON class_schedules FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = class_schedules.course_id AND e.student_id = auth.uid() AND e.status = 'active')
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    OR EXISTS (
      SELECT 1 FROM parent_children pc JOIN enrollments e ON e.student_id = pc.student_id
      WHERE pc.parent_id = auth.uid() AND e.course_id = class_schedules.course_id AND e.status = 'active'
    )
  );
CREATE POLICY "schedules_admin" ON class_schedules FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- homework
CREATE POLICY "homework_enrolled_read" ON homework FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = homework.course_id AND e.student_id = auth.uid() AND e.status = 'active')
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
    OR EXISTS (
      SELECT 1 FROM parent_children pc JOIN enrollments e ON e.student_id = pc.student_id
      WHERE pc.parent_id = auth.uid() AND e.course_id = homework.course_id AND e.status = 'active'
    )
  );
CREATE POLICY "homework_admin" ON homework FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- homework_submissions
CREATE POLICY "submissions_student" ON homework_submissions FOR ALL  USING (auth.uid() = student_id);
CREATE POLICY "submissions_admin"   ON homework_submissions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- progress
CREATE POLICY "progress_student" ON progress FOR ALL  USING (auth.uid() = student_id);
CREATE POLICY "progress_parent"  ON progress FOR SELECT
  USING (EXISTS (SELECT 1 FROM parent_children pc WHERE pc.parent_id = auth.uid() AND pc.student_id = progress.student_id));
CREATE POLICY "progress_admin"   ON progress FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- quiz_attempts
CREATE POLICY "quiz_attempts_student" ON quiz_attempts FOR ALL  USING (auth.uid() = student_id);
CREATE POLICY "quiz_attempts_admin"   ON quiz_attempts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'teacher')));

-- badges
CREATE POLICY "badges_public_read" ON badges FOR SELECT USING (TRUE);
CREATE POLICY "badges_admin"       ON badges FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- student_badges
CREATE POLICY "student_badges_own"    ON student_badges FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "student_badges_parent" ON student_badges FOR SELECT
  USING (EXISTS (SELECT 1 FROM parent_children pc WHERE pc.parent_id = auth.uid() AND pc.student_id = student_badges.student_id));
CREATE POLICY "student_badges_admin"  ON student_badges FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- blog_posts
CREATE POLICY "blog_public_read" ON blog_posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "blog_admin"       ON blog_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- stories
CREATE POLICY "stories_authenticated_read" ON stories FOR SELECT
  USING (is_published = TRUE AND auth.role() = 'authenticated');
CREATE POLICY "stories_admin"              ON stories FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- cultural_content
CREATE POLICY "cultural_public_read" ON cultural_content FOR SELECT USING (is_published = TRUE);
CREATE POLICY "cultural_admin"       ON cultural_content FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- subscriptions
CREATE POLICY "subscriptions_parent" ON subscriptions FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "subscriptions_admin"  ON subscriptions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
