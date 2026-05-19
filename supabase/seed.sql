-- BhasaGhar Seed Data
-- Nepali curriculum: courses, lessons, vocabulary, flashcards, quiz questions, stories, cultural content, badges

-- ============================================================
-- COURSES
-- ============================================================
INSERT INTO courses (id, title_en, title_ne, description_en, description_ne, level, price, currency, is_published) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Nepali Beginners',    'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤¸à¥à¤°à¥à¤µà¤¾à¤¤', 'Learn the Nepali alphabet, basic words and simple sentences.',                      'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤µà¤°à¥à¤£à¤®à¤¾à¤²à¤¾, à¤†à¤§à¤¾à¤°à¤­à¥‚à¤¤ à¤¶à¤¬à¥à¤¦ à¤° à¤¸à¤°à¤² à¤µà¤¾à¤•à¥à¤¯à¤¹à¤°à¥‚ à¤¸à¤¿à¤•à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤',                     1,  0, 'EUR', true),
  ('c1000000-0000-0000-0000-000000000002', 'Nepali Intermediate', 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤®à¤§à¥à¤¯à¤®',   'Build vocabulary, read short stories, and hold basic conversations.',               'à¤¶à¤¬à¥à¤¦ à¤­à¤£à¥à¤¡à¤¾à¤° à¤¬à¤¨à¤¾à¤‰à¤¨à¥à¤¹à¥‹à¤¸à¥, à¤›à¥‹à¤Ÿà¥‹ à¤•à¤¥à¤¾à¤¹à¤°à¥‚ à¤ªà¤¢à¥à¤¨à¥à¤¹à¥‹à¤¸à¥ à¤° à¤†à¤§à¤¾à¤°à¤­à¥‚à¤¤ à¤•à¥à¤°à¤¾à¤•à¤¾à¤¨à¥€ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤', 2, 19, 'EUR', true),
  ('c1000000-0000-0000-0000-000000000003', 'Nepali Advanced',     'à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤‰à¤¨à¥à¤¨à¤¤',   'Essay writing, literature, festivals and deep cultural knowledge.',                 'à¤¨à¤¿à¤¬à¤¨à¥à¤§ à¤²à¥‡à¤–à¤¨, à¤¸à¤¾à¤¹à¤¿à¤¤à¥à¤¯, à¤šà¤¾à¤¡à¤ªà¤°à¥à¤µ à¤° à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤œà¥à¤žà¤¾à¤¨à¥¤',                           3, 29, 'EUR', true);

-- ============================================================
-- LESSONS  (Level 1)
-- ============================================================
INSERT INTO lessons (id, course_id, title_en, title_ne, order_index, duration_minutes, is_published) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'The Devanagari Alphabet', 'à¤¦à¥‡à¤µà¤¨à¤¾à¤—à¤°à¥€ à¤µà¤°à¥à¤£à¤®à¤¾à¤²à¤¾',    1, 20, true),
  ('a1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Vowels (Swar)',           'à¤¸à¥à¤µà¤° à¤µà¤°à¥à¤£à¤¹à¤°à¥‚',          2, 15, true),
  ('a1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Consonants (Byanjan)',    'à¤µà¥à¤¯à¤žà¥à¤œà¤¨ à¤µà¤°à¥à¤£à¤¹à¤°à¥‚',        3, 20, true),
  ('a1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'Numbers 1â€“20',           'à¤…à¤™à¥à¤•à¤¹à¤°à¥‚ à¥§â€“à¥¨à¥¦',           4, 15, true),
  ('a1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'Colors',                 'à¤°à¤™à¤¹à¤°à¥‚',                  5, 15, true),
  ('a1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001', 'Body Parts',             'à¤¶à¤°à¥€à¤°à¤•à¤¾ à¤…à¤™à¥à¤—à¤¹à¤°à¥‚',          6, 15, true),
  ('a1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000001', 'Family Members',         'à¤ªà¤°à¤¿à¤µà¤¾à¤°à¤•à¤¾ à¤¸à¤¦à¤¸à¥à¤¯à¤¹à¤°à¥‚',       7, 20, true),
  ('a1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000001', 'Greetings',              'à¤…à¤­à¤¿à¤µà¤¾à¤¦à¤¨à¤¹à¤°à¥‚',              8, 15, true);

-- Level 2 lessons
INSERT INTO lessons (id, course_id, title_en, title_ne, order_index, duration_minutes, is_published) VALUES
  ('a2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'Animals in Nepal',   'à¤¨à¥‡à¤ªà¤¾à¤²à¤•à¤¾ à¤œà¤¨à¤¾à¤µà¤°à¤¹à¤°à¥‚',  1, 20, true),
  ('a2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'Food and Eating',    'à¤–à¤¾à¤¨à¤¾ à¤° à¤–à¤¾à¤¨à¤¾ à¤–à¤¾à¤¨à¥‡', 2, 20, true),
  ('a2000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'Weather and Seasons','à¤®à¥Œà¤¸à¤® à¤° à¤‹à¤¤à¥à¤¹à¤°à¥‚',     3, 20, true),
  ('a2000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'My School',          'à¤®à¥‡à¤°à¥‹ à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯',     4, 25, true),
  ('a2000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Time and Days',      'à¤¸à¤®à¤¯ à¤° à¤¦à¤¿à¤¨à¤¹à¤°à¥‚',      5, 20, true);

-- ============================================================
-- VOCABULARY  (lesson_id nullable â€” standalone vocabulary bank)
-- ============================================================
INSERT INTO vocabulary (nepali_word, english_word, pronunciation, order_index) VALUES
  -- Greetings
  ('à¤¨à¤®à¤¸à¥à¤¤à¥‡',     'Hello / Greetings',  'Namaste',      1),
  ('à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦',    'Thank you',          'Dhanyabad',    2),
  ('à¤®à¤¾à¤« à¤—à¤°à¥à¤¨à¥à¤¸à¥','Sorry / Excuse me',  'Maaf garnus',  3),
  ('à¤¶à¥à¤­ à¤ªà¥à¤°à¤­à¤¾à¤¤', 'Good morning',       'Shubha Prabhat',4),
  ('à¤¶à¥à¤­ à¤°à¤¾à¤¤à¥à¤°à¥€', 'Good night',         'Shubha Ratri', 5),
  -- Family
  ('à¤†à¤®à¤¾',        'Mother',             'Aama',         10),
  ('à¤¬à¥à¤¬à¤¾',        'Father',             'Buba',         11),
  ('à¤¦à¤¾à¤‡',         'Older brother',      'Dai',          12),
  ('à¤¦à¤¿à¤¦à¥€',        'Older sister',       'Didi',         13),
  ('à¤­à¤¾à¤‡',         'Younger brother',    'Bhai',         14),
  ('à¤¬à¤¹à¤¿à¤¨à¥€',       'Younger sister',     'Bahini',       15),
  ('à¤¹à¤œà¥à¤°à¤¬à¥à¤¬à¤¾',    'Grandfather',        'Hajurba',      16),
  ('à¤¹à¤œà¥à¤°à¤†à¤®à¤¾',     'Grandmother',        'Hajurama',     17),
  -- Colors
  ('à¤°à¤¾à¤¤à¥‹',       'Red',                'Rato',         20),
  ('à¤¨à¥€à¤²à¥‹',       'Blue',               'Nilo',         21),
  ('à¤¹à¤°à¤¿à¤¯à¥‹',      'Green',              'Hariyo',       22),
  ('à¤ªà¤¹à¥‡à¤à¤²à¥‹',     'Yellow',             'Pahelo',       23),
  ('à¤¸à¥‡à¤¤à¥‹',       'White',              'Seto',         24),
  ('à¤•à¤¾à¤²à¥‹',       'Black',              'Kalo',         25),
  ('à¤¨à¤¾à¤°à¤™à¥à¤—à¥€',    'Orange',             'Narangi',      26),
  -- Numbers
  ('à¤à¤•',         'One',                'Ek',           30),
  ('à¤¦à¥à¤ˆ',        'Two',                'Dui',          31),
  ('à¤¤à¥€à¤¨',        'Three',              'Teen',         32),
  ('à¤šà¤¾à¤°',        'Four',               'Char',         33),
  ('à¤ªà¤¾à¤à¤š',       'Five',               'Panch',        34),
  ('à¤›',          'Six',                'Chha',         35),
  ('à¤¸à¤¾à¤¤',        'Seven',              'Saat',         36),
  ('à¤†à¤ ',         'Eight',              'Aath',         37),
  ('à¤¨à¥Œ',         'Nine',               'Nau',          38),
  ('à¤¦à¤¶',         'Ten',                'Dash',         39),
  -- Animals
  ('à¤•à¥à¤•à¥à¤°',      'Dog',                'Kukur',        40),
  ('à¤¬à¤¿à¤°à¤¾à¤²à¥‹',     'Cat',                'Biralo',       41),
  ('à¤—à¤¾à¤ˆ',        'Cow',                'Gai',          42),
  ('à¤¹à¤¾à¤¤à¥à¤¤à¥€',     'Elephant',           'Haatti',       43),
  ('à¤¬à¤¾à¤˜',        'Tiger',              'Bagh',         44),
  -- Food
  ('à¤¦à¤¾à¤² à¤­à¤¾à¤¤',    'Lentils and rice',   'Dal Bhat',     50),
  ('à¤®à¥‹à¤®à¥‹',       'Dumplings',          'Momo',         51),
  ('à¤°à¥‹à¤Ÿà¥€',       'Bread',              'Roti',         52),
  ('à¤šà¤¿à¤¯à¤¾',       'Tea',                'Chiya',        53),
  ('à¤ªà¤¾à¤¨à¥€',       'Water',              'Pani',         54),
  -- Body
  ('à¤†à¤à¤–à¤¾',       'Eyes',               'Aankha',       60),
  ('à¤¨à¤¾à¤•',        'Nose',               'Nak',          61),
  ('à¤®à¥à¤–',        'Mouth',              'Mukh',         62),
  ('à¤•à¤¾à¤¨',        'Ears',               'Kan',          63),
  ('à¤¹à¤¾à¤¤',        'Hand',               'Haat',         64),
  ('à¤–à¥à¤Ÿà¥à¤Ÿà¤¾',     'Leg / Foot',         'Khutta',       65);

-- ============================================================
-- FLASHCARDS  (lesson_id nullable)
-- ============================================================
INSERT INTO flashcards (front_text, back_text, category, difficulty) VALUES
  ('à¤¨à¤®à¤¸à¥à¤¤à¥‡',      'Hello',             'greetings', 1),
  ('à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦',     'Thank you',         'greetings', 1),
  ('à¤®à¤¾à¤« à¤—à¤°à¥à¤¨à¥à¤¸à¥', 'Sorry / Excuse me', 'greetings', 1),
  ('à¤†à¤®à¤¾',         'Mother',            'family',    1),
  ('à¤¬à¥à¤¬à¤¾',         'Father',            'family',    1),
  ('à¤¹à¤œà¥à¤°à¤†à¤®à¤¾',      'Grandmother',       'family',    1),
  ('à¤°à¤¾à¤¤à¥‹',        'Red',               'colors',    1),
  ('à¤¨à¥€à¤²à¥‹',        'Blue',              'colors',    1),
  ('à¤¹à¤°à¤¿à¤¯à¥‹',       'Green',             'colors',    1),
  ('à¤ªà¤¹à¥‡à¤à¤²à¥‹',      'Yellow',            'colors',    1),
  ('à¤à¤•',          'One',               'numbers',   1),
  ('à¤¦à¥à¤ˆ',         'Two',               'numbers',   1),
  ('à¤¤à¥€à¤¨',         'Three',             'numbers',   1),
  ('à¤ªà¤¾à¤à¤š',        'Five',              'numbers',   1),
  ('à¤¦à¤¶',          'Ten',               'numbers',   1),
  ('à¤¦à¤¾à¤² à¤­à¤¾à¤¤',     'Lentils and rice',  'food',      1),
  ('à¤®à¥‹à¤®à¥‹',        'Dumplings',         'food',      1),
  ('à¤ªà¤¾à¤¨à¥€',        'Water',             'food',      1),
  ('à¤•à¥à¤•à¥à¤°',       'Dog',               'animals',   1),
  ('à¤¬à¤¿à¤°à¤¾à¤²à¥‹',      'Cat',               'animals',   1),
  ('à¤†à¤à¤–à¤¾',        'Eyes',              'body',      1),
  ('à¤¹à¤¾à¤¤',         'Hand',              'body',      1),
  ('à¤–à¥à¤Ÿà¥à¤Ÿà¤¾',      'Leg / Foot',        'body',      1);

-- ============================================================
-- QUIZ QUESTIONS  (correct answer marked as isCorrect:true in options JSON)
-- ============================================================
INSERT INTO quiz_questions (lesson_id, question_en, question_ne, options, type, order_index) VALUES
  ('a1000000-0000-0000-0000-000000000008',
    'What does "à¤¨à¤®à¤¸à¥à¤¤à¥‡" mean?', '"à¤¨à¤®à¤¸à¥à¤¤à¥‡" à¤•à¥‹ à¤…à¤°à¥à¤¥ à¤•à¥‡ à¤¹à¥‹?',
    '[{"text":"Hello / Greetings","isCorrect":true},{"text":"Thank you","isCorrect":false},{"text":"Sorry","isCorrect":false},{"text":"Goodbye","isCorrect":false}]',
    'multiple_choice', 1),
  ('a1000000-0000-0000-0000-000000000008',
    'How do you say "Thank you" in Nepali?', 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€à¤®à¤¾ "Thank you" à¤•à¤¸à¤°à¥€ à¤­à¤¨à¥à¤›à¤¨à¥?',
    '[{"text":"à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦","isCorrect":true},{"text":"à¤¨à¤®à¤¸à¥à¤¤à¥‡","isCorrect":false},{"text":"à¤®à¤¾à¤« à¤—à¤°à¥à¤¨à¥à¤¸à¥","isCorrect":false},{"text":"à¤¶à¥à¤­ à¤°à¤¾à¤¤à¥à¤°à¥€","isCorrect":false}]',
    'multiple_choice', 2),
  ('a1000000-0000-0000-0000-000000000007',
    'What is "à¤†à¤®à¤¾" in English?', '"à¤†à¤®à¤¾" à¤…à¤‚à¤—à¥à¤°à¥‡à¤œà¥€à¤®à¤¾ à¤•à¥‡ à¤¹à¥‹?',
    '[{"text":"Mother","isCorrect":true},{"text":"Father","isCorrect":false},{"text":"Sister","isCorrect":false},{"text":"Brother","isCorrect":false}]',
    'multiple_choice', 1),
  ('a1000000-0000-0000-0000-000000000007',
    'What is "à¤¬à¥à¤¬à¤¾" in English?', '"à¤¬à¥à¤¬à¤¾" à¤…à¤‚à¤—à¥à¤°à¥‡à¤œà¥€à¤®à¤¾ à¤•à¥‡ à¤¹à¥‹?',
    '[{"text":"Father","isCorrect":true},{"text":"Grandfather","isCorrect":false},{"text":"Uncle","isCorrect":false},{"text":"Brother","isCorrect":false}]',
    'multiple_choice', 2),
  ('a1000000-0000-0000-0000-000000000005',
    'Which color is "à¤°à¤¾à¤¤à¥‹"?', '"à¤°à¤¾à¤¤à¥‹" à¤•à¥à¤¨ à¤°à¤™ à¤¹à¥‹?',
    '[{"text":"Red","isCorrect":true},{"text":"Blue","isCorrect":false},{"text":"Green","isCorrect":false},{"text":"Yellow","isCorrect":false}]',
    'multiple_choice', 1),
  ('a1000000-0000-0000-0000-000000000005',
    'How do you say "Blue" in Nepali?', 'à¤¨à¥‡à¤ªà¤¾à¤²à¥€à¤®à¤¾ "Blue" à¤•à¤¸à¤°à¥€ à¤­à¤¨à¥à¤›à¤¨à¥?',
    '[{"text":"à¤¨à¥€à¤²à¥‹","isCorrect":true},{"text":"à¤°à¤¾à¤¤à¥‹","isCorrect":false},{"text":"à¤¹à¤°à¤¿à¤¯à¥‹","isCorrect":false},{"text":"à¤ªà¤¹à¥‡à¤à¤²à¥‹","isCorrect":false}]',
    'multiple_choice', 2),
  ('a1000000-0000-0000-0000-000000000004',
    'What number is "à¤ªà¤¾à¤à¤š"?', '"à¤ªà¤¾à¤à¤š" à¤•à¥à¤¨ à¤…à¤™à¥à¤• à¤¹à¥‹?',
    '[{"text":"5","isCorrect":true},{"text":"3","isCorrect":false},{"text":"7","isCorrect":false},{"text":"9","isCorrect":false}]',
    'multiple_choice', 1);

-- ============================================================
-- STORIES
-- ============================================================
INSERT INTO stories (title_en, title_ne, content_en, content_ne, level, age_range_min, age_range_max, is_published) VALUES
  ('The Kind Fox',
   'à¤¦à¤¯à¤¾à¤²à¥ à¤«à¥à¤¯à¤¾à¤‰à¤°à¥‹',
   'Once upon a time in the hills of Nepal, there lived a kind fox. The fox helped all the animals in the forest and everyone loved him. One day, a little rabbit got lost. The fox walked through the whole forest until he found the rabbit and brought him home safely. All the animals celebrated and thanked the kind fox.',
   'à¤à¤• à¤¸à¤®à¤¯ à¤¨à¥‡à¤ªà¤¾à¤²à¤•à¤¾ à¤ªà¤¹à¤¾à¤¡à¤¹à¤°à¥‚à¤®à¤¾ à¤à¤‰à¤Ÿà¤¾ à¤¦à¤¯à¤¾à¤²à¥ à¤«à¥à¤¯à¤¾à¤‰à¤°à¥‹ à¤¬à¤¸à¥à¤¥à¥à¤¯à¥‹à¥¤ à¤«à¥à¤¯à¤¾à¤‰à¤°à¥‹à¤²à¥‡ à¤œà¤‚à¤—à¤²à¤•à¤¾ à¤¸à¤¬à¥ˆ à¤œà¤¨à¤¾à¤µà¤°à¤¹à¤°à¥‚à¤²à¤¾à¤ˆ à¤®à¤¦à¥à¤¦à¤¤ à¤—à¤°à¥à¤¥à¥à¤¯à¥‹ à¤° à¤¸à¤¬à¥ˆà¤²à¥‡ à¤‰à¤¸à¤²à¤¾à¤ˆ à¤®à¤¾à¤¯à¤¾ à¤—à¤°à¥à¤¥à¥‡à¥¤ à¤à¤• à¤¦à¤¿à¤¨ à¤à¤‰à¤Ÿà¤¾ à¤¸à¤¾à¤¨à¥‹ à¤–à¤°à¤¾à¤¯à¥‹ à¤¹à¤°à¤¾à¤¯à¥‹à¥¤ à¤«à¥à¤¯à¤¾à¤‰à¤°à¥‹à¤²à¥‡ à¤¸à¤¾à¤°à¤¾ à¤œà¤‚à¤—à¤² à¤–à¥‹à¤œà¥à¤¯à¥‹ à¤° à¤–à¤°à¤¾à¤¯à¥‹à¤²à¤¾à¤ˆ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤˜à¤° à¤ªà¥à¤°à¥â€à¤¯à¤¾à¤¯à¥‹à¥¤ à¤¸à¤¬à¥ˆ à¤œà¤¨à¤¾à¤µà¤°à¤¹à¤°à¥‚à¤²à¥‡ à¤–à¥à¤¶à¥€ à¤®à¤¨à¤¾à¤ à¤° à¤¦à¤¯à¤¾à¤²à¥ à¤«à¥à¤¯à¤¾à¤‰à¤°à¥‹à¤²à¤¾à¤ˆ à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦ à¤¦à¤¿à¤à¥¤',
   1, 4, 7, true),

  ('Sita Learns Nepali',
   'à¤¸à¥€à¤¤à¤¾à¤²à¥‡ à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤¸à¤¿à¤•à¥à¤›à¤¿à¤¨à¥',
   'Sita was born in Norway. She spoke Norwegian at school and English with her friends. At home, her mother and father spoke Nepali. One day Sita decided to learn Nepali properly. She studied every day. She learned the alphabet, then words, then sentences. Six months later, Sita could talk with her grandmother in Nepal on video call. Grandmother cried happy tears.',
   'à¤¸à¥€à¤¤à¤¾ à¤¨à¤°à¥à¤µà¥‡à¤®à¤¾ à¤œà¤¨à¥à¤®à¤¿à¤à¤•à¥€ à¤¥à¤¿à¤‡à¤¨à¥à¥¤ à¤‰à¤¨à¥€ à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤²à¤¯à¤®à¤¾ à¤¨à¤°à¥à¤µà¥‡à¤œà¤¿à¤¯à¤¨ à¤° à¤¸à¤¾à¤¥à¥€à¤¹à¤°à¥‚à¤¸à¤à¤— à¤…à¤‚à¤—à¥à¤°à¥‡à¤œà¥€ à¤¬à¥‹à¤²à¥à¤¥à¤¿à¤¨à¥à¥¤ à¤˜à¤°à¤®à¤¾ à¤†à¤®à¤¾à¤¬à¥à¤¬à¤¾ à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤¬à¥‹à¤²à¥à¤¥à¥‡à¥¤ à¤à¤• à¤¦à¤¿à¤¨ à¤¸à¥€à¤¤à¤¾à¤²à¥‡ à¤°à¤¾à¤®à¥à¤°à¤°à¥€ à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤¸à¤¿à¤•à¥à¤¨à¥‡ à¤¨à¤¿à¤°à¥à¤£à¤¯ à¤—à¤°à¤¿à¤¨à¥à¥¤ à¤‰à¤¨à¥€ à¤¹à¤°à¥‡à¤• à¤¦à¤¿à¤¨ à¤ªà¤¢à¥à¤¥à¤¿à¤¨à¥à¥¤ à¤‰à¤¨à¤²à¥‡ à¤µà¤°à¥à¤£à¤®à¤¾à¤²à¤¾, à¤¤à¥à¤¯à¤¸à¤ªà¤›à¤¿ à¤¶à¤¬à¥à¤¦ à¤° à¤¤à¥à¤¯à¤¸à¤ªà¤›à¤¿ à¤µà¤¾à¤•à¥à¤¯à¤¹à¤°à¥‚ à¤¸à¤¿à¤•à¤¿à¤¨à¥à¥¤ à¤› à¤®à¤¹à¤¿à¤¨à¤¾à¤ªà¤›à¤¿ à¤¸à¥€à¤¤à¤¾ à¤¨à¥‡à¤ªà¤¾à¤²à¤®à¤¾ à¤¹à¤œà¥à¤°à¤†à¤®à¤¾à¤¸à¤à¤— à¤­à¤¿à¤¡à¤¿à¤“ à¤•à¤²à¤®à¤¾ à¤¨à¥‡à¤ªà¤¾à¤²à¥€à¤®à¤¾ à¤•à¥à¤°à¤¾ à¤—à¤°à¥à¤¨ à¤¸à¤•à¥à¤¥à¤¿à¤¨à¥à¥¤ à¤¹à¤œà¥à¤°à¤†à¤®à¤¾à¤•à¤¾ à¤†à¤à¤–à¤¾à¤¬à¤¾à¤Ÿ à¤–à¥à¤¶à¥€à¤•à¤¾ à¤†à¤à¤¸à¥ à¤†à¤à¥¤',
   1, 8, 12, true),

  ('The Dashain Festival',
   'à¤¦à¤¶à¥ˆà¤‚à¤•à¥‹ à¤šà¤¾à¤¡',
   'Dashain is the biggest festival in Nepal. Families come together from near and far. Grandparents give tika â€” a red mark made of rice, yogurt and flower petals â€” to their grandchildren. Children receive blessings and jamara. Flying kites is a tradition during Dashain. The smell of incense fills every home.',
   'à¤¦à¤¶à¥ˆà¤‚ à¤¨à¥‡à¤ªà¤¾à¤²à¤•à¥‹ à¤¸à¤¬à¥ˆà¤­à¤¨à¥à¤¦à¤¾ à¤ à¥‚à¤²à¥‹ à¤šà¤¾à¤¡ à¤¹à¥‹à¥¤ à¤ªà¤°à¤¿à¤µà¤¾à¤°à¤¹à¤°à¥‚ à¤Ÿà¤¾à¤¢à¤¾-à¤Ÿà¤¾à¤¢à¤¾à¤¬à¤¾à¤Ÿ à¤à¤•à¤¸à¤¾à¤¥ à¤†à¤‰à¤à¤›à¤¨à¥à¥¤ à¤¹à¤œà¥à¤°à¤¬à¥à¤¬à¤¾à¤¹à¤œà¥à¤°à¤†à¤®à¤¾à¤²à¥‡ à¤¨à¤¾à¤¤à¤¿à¤¨à¤¾à¤¤à¤¿à¤¨à¥€à¤¹à¤°à¥‚à¤²à¤¾à¤ˆ à¤Ÿà¥€à¤•à¤¾ à¤²à¤—à¤¾à¤‡à¤¦à¤¿à¤¨à¥à¤¹à¥à¤¨à¥à¤›à¥¤ à¤¬à¤šà¥à¤šà¤¾à¤¹à¤°à¥‚à¤²à¥‡ à¤†à¤¶à¥€à¤°à¥à¤µà¤¾à¤¦ à¤° à¤œà¤®à¤°à¤¾ à¤ªà¤¾à¤‰à¤à¤›à¤¨à¥à¥¤ à¤¦à¤¶à¥ˆà¤‚à¤®à¤¾ à¤šà¤™à¥à¤—à¤¾ à¤‰à¤¡à¤¾à¤‰à¤¨à¥ à¤ªà¤°à¤®à¥à¤ªà¤°à¤¾ à¤¹à¥‹à¥¤ à¤§à¥‚à¤ªà¤•à¥‹ à¤¸à¥à¤—à¤¨à¥à¤§à¤²à¥‡ à¤¹à¤° à¤˜à¤° à¤­à¤°à¤¿à¤¨à¥à¤›à¥¤',
   2, 8, 14, true);

-- ============================================================
-- CULTURAL CONTENT
-- ============================================================
INSERT INTO cultural_content (title_en, title_ne, description_en, description_ne, content_type, is_published) VALUES
  ('Dashain',              'à¤¦à¤¶à¥ˆà¤‚',           'The biggest Hindu festival in Nepal, celebrating the victory of good over evil.',           'à¤¨à¥‡à¤ªà¤¾à¤²à¤•à¥‹ à¤¸à¤¬à¥ˆà¤­à¤¨à¥à¤¦à¤¾ à¤ à¥‚à¤²à¥‹ à¤¹à¤¿à¤¨à¥à¤¦à¥‚ à¤šà¤¾à¤¡, à¤…à¤¸à¤¤à¥à¤¯à¤®à¤¾à¤¥à¤¿ à¤¸à¤¤à¥à¤¯à¤•à¥‹ à¤µà¤¿à¤œà¤¯à¤•à¥‹ à¤‰à¤¤à¥à¤¸à¤µà¥¤',              'festival',  true),
  ('Tihar',                'à¤¤à¤¿à¤¹à¤¾à¤°',           'Festival of lights â€” five days celebrating crows, dogs, cows, oxen, and siblings.',         'à¤¦à¥€à¤ªà¤¾à¤µà¤²à¥€ â€” à¤•à¤¾à¤—à¤¤à¤¿à¤¹à¤¾à¤°, à¤•à¥à¤•à¥à¤°à¤¤à¤¿à¤¹à¤¾à¤°, à¤—à¤¾à¤ˆà¤¤à¤¿à¤¹à¤¾à¤°, à¤—à¥‹à¤°à¥à¤¤à¤¿à¤¹à¤¾à¤° à¤° à¤­à¤¾à¤‡à¤Ÿà¥€à¤•à¤¾à¥¤',                'festival',  true),
  ('Dal Bhat',             'à¤¦à¤¾à¤² à¤­à¤¾à¤¤',         'The national dish of Nepal â€” lentil soup with steamed rice, eaten twice daily.',            'à¤¨à¥‡à¤ªà¤¾à¤²à¤•à¥‹ à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°à¤¿à¤¯ à¤–à¤¾à¤¨à¤¾ â€” à¤¦à¤¾à¤² à¤° à¤­à¤¾à¤¤, à¤¦à¤¿à¤¨à¤®à¤¾ à¤¦à¥à¤ˆ à¤ªà¤Ÿà¤• à¤–à¤¾à¤‡à¤¨à¥à¤›à¥¤',                    'recipe',    true),
  ('Momo',                 'à¤®à¥‹à¤®à¥‹',            'Beloved Nepali dumplings, steamed or fried, filled with vegetables or meat.',               'à¤¨à¥‡à¤ªà¤¾à¤²à¤•à¥‹ à¤ªà¥à¤°à¤¿à¤¯ à¤®à¥‹à¤®à¥‹ â€” à¤­à¤¾à¤«à¤®à¤¾ à¤ªà¤•à¤¾à¤à¤•à¥‹ à¤µà¤¾ à¤¤à¤¾à¤°à¥‡à¤•à¥‹à¥¤',                                  'recipe',    true),
  ('Resham Firiri',        'à¤°à¥‡à¤¶à¤® à¤«à¤¿à¤°à¤¿à¤°à¥€',     'A beloved traditional Nepali folk song about a kite flying in the sky.',                    'à¤†à¤•à¤¾à¤¶à¤®à¤¾ à¤‰à¤¡à¥à¤¨à¥‡ à¤šà¤™à¥à¤—à¤¾à¤¬à¤¾à¤°à¥‡ à¤ªà¥à¤°à¤¿à¤¯ à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤²à¥‹à¤•à¤—à¥€à¤¤à¥¤',                                  'rhyme',     true),
  ('Dhaka Weaving',        'à¤¢à¤¾à¤•à¤¾ à¤¬à¥à¤¨à¤¾à¤‡',      'Traditional Nepali textile art with geometric patterns, woven on handlooms.',               'à¤œà¥à¤¯à¤¾à¤®à¤¿à¤¤à¥€à¤¯ à¤¢à¤¾à¤à¤šà¤¾à¤¸à¤¹à¤¿à¤¤ à¤ªà¤°à¤®à¥à¤ªà¤°à¤¾à¤—à¤¤ à¤¨à¥‡à¤ªà¤¾à¤²à¥€ à¤•à¤ªà¤¡à¤¾ à¤•à¤²à¤¾à¥¤',                                'craft',     true),
  ('Buddha Jayanti',       'à¤¬à¥à¤¦à¥à¤§ à¤œà¤¯à¤¨à¥à¤¤à¥€',   'Celebrating the birth, enlightenment and death of Siddhartha Gautama â€” Lord Buddha.',      'à¤­à¤—à¤µà¤¾à¤¨ à¤¬à¥à¤¦à¥à¤§à¤•à¥‹ à¤œà¤¨à¥à¤®, à¤œà¥à¤žà¤¾à¤¨ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤à¤¿ à¤° à¤¨à¤¿à¤°à¥à¤µà¤¾à¤£à¤•à¥‹ à¤‰à¤¤à¥à¤¸à¤µà¥¤',                        'festival',  true),
  ('Holi',                 'à¤¹à¥‹à¤²à¥€',            'Festival of colors celebrating the arrival of spring and the triumph of good over evil.',   'à¤°à¤‚à¤—à¤¹à¤°à¥‚à¤•à¥‹ à¤šà¤¾à¤¡ â€” à¤µà¤¸à¤¨à¥à¤¤à¤•à¥‹ à¤†à¤—à¤®à¤¨ à¤° à¤…à¤¸à¤¤à¥à¤¯à¤®à¤¾à¤¥à¤¿ à¤¸à¤¤à¥à¤¯à¤•à¥‹ à¤µà¤¿à¤œà¤¯à¤•à¥‹ à¤‰à¤¤à¥à¤¸à¤µà¥¤',               'festival',  true);

-- ============================================================
-- BADGES
-- ============================================================
INSERT INTO badges (id, name_en, name_ne, description_en, description_ne, criteria, category) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'First Step',       'à¤ªà¤¹à¤¿à¤²à¥‹ à¤•à¤¦à¤®',       'Complete your first lesson',        'à¤ªà¤¹à¤¿à¤²à¥‹ à¤ªà¤¾à¤  à¤ªà¥‚à¤°à¤¾ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥',      '{"lessons_completed":1}',    'achievement'),
  ('b0000000-0000-0000-0000-000000000002', 'Word Collector',   'à¤¶à¤¬à¥à¤¦ à¤¸à¤‚à¤—à¥à¤°à¤¹à¤•à¤°à¥à¤¤à¤¾', 'Learn 25 vocabulary words',         'à¥¨à¥« à¤¶à¤¬à¥à¤¦ à¤¸à¤¿à¤•à¥à¤¨à¥à¤¹à¥‹à¤¸à¥',             '{"vocab_learned":25}',       'achievement'),
  ('b0000000-0000-0000-0000-000000000003', 'Quiz Master',      'à¤•à¥à¤µà¤¿à¤œ à¤®à¤¾à¤¸à¥à¤Ÿà¤°',    'Score 100% on any quiz',            'à¤•à¥à¤¨à¥ˆ à¤ªà¤¨à¤¿ à¤•à¥à¤µà¤¿à¤œà¤®à¤¾ à¥§à¥¦à¥¦% à¤²à¥à¤¯à¤¾à¤‰à¤¨à¥à¤¹à¥‹à¤¸à¥','{"quiz_perfect":true}',       'academic'),
  ('b0000000-0000-0000-0000-000000000004', 'Story Reader',     'à¤•à¤¥à¤¾ à¤ªà¤¾à¤ à¤•',        'Read your first story',             'à¤ªà¤¹à¤¿à¤²à¥‹ à¤•à¤¥à¤¾ à¤ªà¤¢à¥à¤¨à¥à¤¹à¥‹à¤¸à¥',            '{"stories_read":1}',         'achievement'),
  ('b0000000-0000-0000-0000-000000000005', '7-Day Streak',     'à¥­ à¤¦à¤¿à¤¨',           'Study 7 days in a row',             'à¤²à¤—à¤¾à¤¤à¤¾à¤° à¥­ à¤¦à¤¿à¤¨ à¤ªà¤¢à¥à¤¨à¥à¤¹à¥‹à¤¸à¥',         '{"streak_days":7}',          'consistency'),
  ('b0000000-0000-0000-0000-000000000006', 'Alphabet Hero',    'à¤µà¤°à¥à¤£à¤®à¤¾à¤²à¤¾ à¤¹à¤¿à¤°à¥‹',   'Complete the alphabet lesson',      'à¤µà¤°à¥à¤£à¤®à¤¾à¤²à¤¾ à¤ªà¤¾à¤  à¤ªà¥‚à¤°à¤¾ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥',    '{"lesson_type":"alphabet"}', 'academic'),
  ('b0000000-0000-0000-0000-000000000007', 'Culture Explorer', 'à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤–à¥‹à¤œà¥€', 'View 5 cultural content items',     'à¥« à¤¸à¤¾à¤‚à¤¸à¥à¤•à¥ƒà¤¤à¤¿à¤• à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤¹à¥‡à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥', '{"cultural_viewed":5}',       'cultural'),
  ('b0000000-0000-0000-0000-000000000008', 'Level Up!',        'à¤¸à¥à¤¤à¤° à¤¬à¤¢à¥à¤¯à¥‹!',     'Complete all Level 1 lessons',      'à¤¸à¥à¤¤à¤° à¥§ à¤•à¤¾ à¤¸à¤¬à¥ˆ à¤ªà¤¾à¤  à¤ªà¥‚à¤°à¤¾ à¤—à¤°à¥à¤¨à¥à¤¹à¥‹à¤¸à¥','{"level_completed":1}',       'achievement');
