-- BhasaGhar Seed Data
-- Nepali curriculum: vocabulary, stories, cultural content, flashcards, quiz questions

-- ============================================================
-- COURSES
-- ============================================================
INSERT INTO courses (id, title_en, title_ne, description_en, description_ne, level, price, currency, is_published) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Nepali Beginners', 'नेपाली सुरुवात', 'Learn the Nepali alphabet, basic words and simple sentences.', 'नेपाली वर्णमाला, आधारभूत शब्द र सरल वाक्यहरू सिक्नुहोस्।', 1, 0, 'EUR', true),
  ('c1000000-0000-0000-0000-000000000002', 'Nepali Intermediate', 'नेपाली मध्यम', 'Build vocabulary, read short stories, and hold basic conversations.', 'शब्द भण्डार बनाउनुहोस्, छोटो कथाहरू पढ्नुहोस् र आधारभूत कुराकानी गर्नुहोस्।', 2, 19, 'EUR', true),
  ('c1000000-0000-0000-0000-000000000003', 'Nepali Advanced', 'नेपाली उन्नत', 'Essay writing, literature, festivals and cultural knowledge.', 'निबन्ध लेखन, साहित्य, चाडपर्व र सांस्कृतिक ज्ञान।', 3, 29, 'EUR', true);

-- ============================================================
-- LESSONS  (Level 1)
-- ============================================================
INSERT INTO lessons (id, course_id, title_en, title_ne, order_index, duration_minutes, is_published) VALUES
  ('l1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'The Devanagari Alphabet', 'देवनागरी वर्णमाला', 1, 20, true),
  ('l1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Vowels (Swar)', 'स्वर वर्णहरू', 2, 15, true),
  ('l1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Consonants (Byanjan)', 'व्यञ्जन वर्णहरू', 3, 20, true),
  ('l1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'Numbers 1–20', 'अङ्कहरू १–२०', 4, 15, true),
  ('l1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'Colors', 'रङहरू', 5, 15, true),
  ('l1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001', 'Body Parts', 'शरीरका अङ्गहरू', 6, 15, true),
  ('l1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000001', 'Family Members', 'परिवारका सदस्यहरू', 7, 20, true),
  ('l1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000001', 'Greetings', 'अभिवादनहरू', 8, 15, true);

-- Level 2 lessons
INSERT INTO lessons (id, course_id, title_en, title_ne, order_index, duration_minutes, is_published) VALUES
  ('l2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'Animals in Nepal', 'नेपालका जनावरहरू', 1, 20, true),
  ('l2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'Food and Eating', 'खाना र खाना खाने', 2, 20, true),
  ('l2000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'Weather and Seasons', 'मौसम र ऋतुहरू', 3, 20, true),
  ('l2000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'My School', 'मेरो विद्यालय', 4, 25, true),
  ('l2000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Time and Days', 'समय र दिनहरू', 5, 20, true);

-- ============================================================
-- VOCABULARY
-- ============================================================
INSERT INTO vocabulary (id, nepali_word, english_translation, romanization, level, category) VALUES
  -- Greetings
  (gen_random_uuid(), 'नमस्ते', 'Hello / Greetings', 'Namaste', 1, 'greetings'),
  (gen_random_uuid(), 'धन्यवाद', 'Thank you', 'Dhanyabad', 1, 'greetings'),
  (gen_random_uuid(), 'माफ गर्नुस्', 'Sorry / Excuse me', 'Maaf garnus', 1, 'greetings'),
  (gen_random_uuid(), 'शुभ प्रभात', 'Good morning', 'Shubha Prabhat', 1, 'greetings'),
  (gen_random_uuid(), 'शुभ रात्री', 'Good night', 'Shubha Ratri', 1, 'greetings'),
  -- Family
  (gen_random_uuid(), 'आमा', 'Mother', 'Aama', 1, 'family'),
  (gen_random_uuid(), 'बुबा', 'Father', 'Buba', 1, 'family'),
  (gen_random_uuid(), 'दाइ', 'Older brother', 'Dai', 1, 'family'),
  (gen_random_uuid(), 'दिदी', 'Older sister', 'Didi', 1, 'family'),
  (gen_random_uuid(), 'भाइ', 'Younger brother', 'Bhai', 1, 'family'),
  (gen_random_uuid(), 'बहिनी', 'Younger sister', 'Bahini', 1, 'family'),
  (gen_random_uuid(), 'हजुरबुबा', 'Grandfather', 'Hajurba', 1, 'family'),
  (gen_random_uuid(), 'हजुरआमा', 'Grandmother', 'Hajurama', 1, 'family'),
  -- Colors
  (gen_random_uuid(), 'रातो', 'Red', 'Rato', 1, 'colors'),
  (gen_random_uuid(), 'नीलो', 'Blue', 'Nilo', 1, 'colors'),
  (gen_random_uuid(), 'हरियो', 'Green', 'Hariyo', 1, 'colors'),
  (gen_random_uuid(), 'पहेँलो', 'Yellow', 'Pahelo', 1, 'colors'),
  (gen_random_uuid(), 'सेतो', 'White', 'Seto', 1, 'colors'),
  (gen_random_uuid(), 'कालो', 'Black', 'Kalo', 1, 'colors'),
  (gen_random_uuid(), 'नारङ्गी', 'Orange', 'Narangi', 1, 'colors'),
  -- Numbers
  (gen_random_uuid(), 'एक', 'One', 'Ek', 1, 'numbers'),
  (gen_random_uuid(), 'दुई', 'Two', 'Dui', 1, 'numbers'),
  (gen_random_uuid(), 'तीन', 'Three', 'Teen', 1, 'numbers'),
  (gen_random_uuid(), 'चार', 'Four', 'Char', 1, 'numbers'),
  (gen_random_uuid(), 'पाँच', 'Five', 'Panch', 1, 'numbers'),
  (gen_random_uuid(), 'छ', 'Six', 'Chha', 1, 'numbers'),
  (gen_random_uuid(), 'सात', 'Seven', 'Saat', 1, 'numbers'),
  (gen_random_uuid(), 'आठ', 'Eight', 'Aath', 1, 'numbers'),
  (gen_random_uuid(), 'नौ', 'Nine', 'Nau', 1, 'numbers'),
  (gen_random_uuid(), 'दश', 'Ten', 'Dash', 1, 'numbers'),
  -- Animals
  (gen_random_uuid(), 'कुकुर', 'Dog', 'Kukur', 1, 'animals'),
  (gen_random_uuid(), 'बिरालो', 'Cat', 'Biralo', 1, 'animals'),
  (gen_random_uuid(), 'गाई', 'Cow', 'Gai', 1, 'animals'),
  (gen_random_uuid(), 'हात्ती', 'Elephant', 'Haatti', 2, 'animals'),
  (gen_random_uuid(), 'बाघ', 'Tiger', 'Bagh', 2, 'animals'),
  (gen_random_uuid(), 'सिंह', 'Lion', 'Singh', 2, 'animals'),
  -- Food
  (gen_random_uuid(), 'दाल भात', 'Lentils and rice', 'Dal Bhat', 1, 'food'),
  (gen_random_uuid(), 'मोमो', 'Dumplings', 'Momo', 1, 'food'),
  (gen_random_uuid(), 'रोटी', 'Bread', 'Roti', 1, 'food'),
  (gen_random_uuid(), 'चिया', 'Tea', 'Chiya', 1, 'food'),
  (gen_random_uuid(), 'पानी', 'Water', 'Pani', 1, 'food'),
  -- Body parts
  (gen_random_uuid(), 'आँखा', 'Eyes', 'Aankha', 1, 'body'),
  (gen_random_uuid(), 'नाक', 'Nose', 'Nak', 1, 'body'),
  (gen_random_uuid(), 'मुख', 'Mouth', 'Mukh', 1, 'body'),
  (gen_random_uuid(), 'कान', 'Ears', 'Kan', 1, 'body'),
  (gen_random_uuid(), 'हात', 'Hand', 'Haat', 1, 'body'),
  (gen_random_uuid(), 'खुट्टा', 'Leg / Foot', 'Khutta', 1, 'body');

-- ============================================================
-- FLASHCARDS (Level 1)
-- ============================================================
INSERT INTO flashcards (id, course_id, front_text, back_text, front_language, back_language, level) VALUES
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'नमस्ते', 'Hello', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'आमा', 'Mother', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'बुबा', 'Father', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'रातो', 'Red', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'नीलो', 'Blue', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'हरियो', 'Green', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'एक', 'One', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'दुई', 'Two', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'तीन', 'Three', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'दाल भात', 'Lentils and rice', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'मोमो', 'Dumplings', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'पानी', 'Water', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'धन्यवाद', 'Thank you', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'माफ गर्नुस्', 'Sorry / Excuse me', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'कुकुर', 'Dog', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'बिरालो', 'Cat', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'आँखा', 'Eyes', 'ne', 'en', 1),
  (gen_random_uuid(), 'c1000000-0000-0000-0000-000000000001', 'हात', 'Hand', 'ne', 'en', 1);

-- ============================================================
-- QUIZ QUESTIONS
-- ============================================================
INSERT INTO quiz_questions (id, lesson_id, question_en, question_ne, correct_answer, options, difficulty, points) VALUES
  (gen_random_uuid(), 'l1000000-0000-0000-0000-000000000008',
    'What does "नमस्ते" mean?', '"नमस्ते" को अर्थ के हो?',
    'Hello / Greetings',
    '[{"text":"Hello / Greetings","isCorrect":true},{"text":"Thank you","isCorrect":false},{"text":"Sorry","isCorrect":false},{"text":"Goodbye","isCorrect":false}]',
    'easy', 10),
  (gen_random_uuid(), 'l1000000-0000-0000-0000-000000000008',
    'How do you say "Thank you" in Nepali?', 'नेपालीमा "Thank you" कसरी भन्छन्?',
    'धन्यवाद',
    '[{"text":"धन्यवाद","isCorrect":true},{"text":"नमस्ते","isCorrect":false},{"text":"माफ गर्नुस्","isCorrect":false},{"text":"शुभ रात्री","isCorrect":false}]',
    'easy', 10),
  (gen_random_uuid(), 'l1000000-0000-0000-0000-000000000007',
    'What is "आमा" in English?', '"आमा" अंग्रेजीमा के हो?',
    'Mother',
    '[{"text":"Mother","isCorrect":true},{"text":"Father","isCorrect":false},{"text":"Sister","isCorrect":false},{"text":"Brother","isCorrect":false}]',
    'easy', 10),
  (gen_random_uuid(), 'l1000000-0000-0000-0000-000000000007',
    'What is "बुबा" in English?', '"बुबा" अंग्रेजीमा के हो?',
    'Father',
    '[{"text":"Father","isCorrect":true},{"text":"Grandfather","isCorrect":false},{"text":"Uncle","isCorrect":false},{"text":"Brother","isCorrect":false}]',
    'easy', 10),
  (gen_random_uuid(), 'l1000000-0000-0000-0000-000000000005',
    'Which color is "रातो"?', '"रातो" कुन रङ हो?',
    'Red',
    '[{"text":"Red","isCorrect":true},{"text":"Blue","isCorrect":false},{"text":"Green","isCorrect":false},{"text":"Yellow","isCorrect":false}]',
    'easy', 10),
  (gen_random_uuid(), 'l1000000-0000-0000-0000-000000000005',
    'How do you say "Blue" in Nepali?', 'नेपालीमा "Blue" कसरी भन्छन्?',
    'नीलो',
    '[{"text":"नीलो","isCorrect":true},{"text":"रातो","isCorrect":false},{"text":"हरियो","isCorrect":false},{"text":"पहेँलो","isCorrect":false}]',
    'easy', 10),
  (gen_random_uuid(), 'l1000000-0000-0000-0000-000000000004',
    'What number is "पाँच"?', '"पाँच" कुन अङ्क हो?',
    '5',
    '[{"text":"5","isCorrect":true},{"text":"3","isCorrect":false},{"text":"7","isCorrect":false},{"text":"9","isCorrect":false}]',
    'easy', 10);

-- ============================================================
-- STORIES
-- ============================================================
INSERT INTO stories (id, title_en, title_ne, content_en, content_ne, level, age_range_min, age_range_max, is_published) VALUES
  (gen_random_uuid(),
    'The Kind Fox',
    'दयालु फ्याउरो',
    'Once upon a time in the hills of Nepal, there lived a kind fox. The fox helped all the animals in the forest and everyone loved him. One day, a little rabbit got lost. The fox walked through the whole forest until he found the rabbit and brought him home safely. All the animals celebrated and thanked the kind fox.',
    'एक समय नेपालका पहाडहरूमा एउटा दयालु फ्याउरो बस्थ्यो। फ्याउरोले जंगलका सबै जनावरहरूलाई मद्दत गर्थ्यो र सबैले उसलाई माया गर्थे। एक दिन एउटा सानो खरायो हरायो। फ्याउरोले सारा जंगल खोज्यो र खरायोलाई सुरक्षित घर पुर्‍यायो। सबै जनावरहरूले खुशी मनाए र दयालु फ्याउरोलाई धन्यवाद दिए।',
    1, 4, 7, true),
  (gen_random_uuid(),
    'Sita Learns Nepali',
    'सीताले नेपाली सिक्छिन्',
    'Sita was born in Norway. She spoke Norwegian at school and English with her friends. At home, her mother and father spoke Nepali. One day Sita decided to learn Nepali properly. She studied every day. She learned the alphabet, then words, then sentences. Six months later, Sita could talk with her grandmother in Nepal on video call. Grandmother cried happy tears.',
    'सीता नर्वेमा जन्मिएकी थिइन्। उनी विद्यालयमा नर्वेजियन र साथीहरूसँग अंग्रेजी बोल्थिन्। घरमा आमाबुबा नेपाली बोल्थे। एक दिन सीताले राम्ररी नेपाली सिक्ने निर्णय गरिन्। उनी हरेक दिन पढ्थिन्। उनले वर्णमाला, त्यसपछि शब्द र त्यसपछि वाक्यहरू सिकिन्। छ महिनापछि सीता नेपालमा हजुरआमासँग भिडिओ कलमा नेपालीमा कुरा गर्न सक्थिन्। हजुरआमाका आँखाबाट खुशीका आँसु आए।',
    1, 8, 12, true),
  (gen_random_uuid(),
    'The Dashain Festival',
    'दशैंको चाड',
    'Dashain is the biggest festival in Nepal. Families come together from near and far. Grandparents give tika — a red mark made of rice, yogurt and flower petals — to their grandchildren. Children receive blessings and jamara, the green grass grown during the festival. Flying kites is a tradition during Dashain. The smell of incense fills every home.',
    'दशैं नेपालको सबैभन्दा ठूलो चाड हो। परिवारहरू टाढा-टाढाबाट एकसाथ आउँछन्। हजुरबुबाहजुरआमाले नातिनातिनीहरूलाई टीका — चामल, दही र फूलको पत्तीले बनेको रातो थाप — लगाइदिनुहुन्छ। बच्चाहरूले आशीर्वाद र जमरा — चाडमा उमारिएको हरियो घाँस — पाउँछन्। दशैंमा चङ्गा उडाउनु परम्परा हो। धूपको सुगन्धले हर घर भरिन्छ।',
    2, 8, 14, true);

-- ============================================================
-- CULTURAL CONTENT
-- ============================================================
INSERT INTO cultural_content (id, title_en, title_ne, description_en, description_ne, content_type, is_published) VALUES
  (gen_random_uuid(), 'Dashain', 'दशैं', 'The biggest Hindu festival in Nepal, celebrating the victory of good over evil.', 'नेपालको सबैभन्दा ठूलो हिन्दू चाड, असत्यमाथि सत्यको विजयको उत्सव।', 'festival', true),
  (gen_random_uuid(), 'Tihar', 'तिहार', 'Festival of lights — five days celebrating crows, dogs, cows, oxen, and siblings.', 'दीपावली — कागतिहार, कुकुरतिहार, गाईतिहार, गोरुतिहार र भाइटीका।', 'festival', true),
  (gen_random_uuid(), 'Dal Bhat', 'दाल भात', 'The national dish of Nepal — lentil soup with steamed rice, eaten twice daily.', 'नेपालको राष्ट्रिय खाना — दाल र भात, दिनमा दुई पटक खाइन्छ।', 'recipe', true),
  (gen_random_uuid(), 'Momo', 'मोमो', 'Beloved Nepali dumplings, steamed or fried, filled with vegetables or meat.', 'नेपालको प्रिय मोमो — भाफमा पकाएको वा तारेको, तरकारी वा मासुले भरिएको।', 'recipe', true),
  (gen_random_uuid(), 'Nepali Rhyme: Resham Firiri', 'रेशम फिरिरी', 'A beloved traditional Nepali folk song about a kite flying in the sky.', 'आकाशमा उड्ने चङ्गाबारे प्रिय नेपाली लोकगीत।', 'rhyme', true),
  (gen_random_uuid(), 'Dhaka Weaving', 'ढाका बुनाइ', 'Traditional Nepali textile art with geometric patterns, woven on handlooms.', 'ज्यामितीय ढाँचासहित परम्परागत नेपाली कपडा कला, हातले बुनिएको।', 'craft', true),
  (gen_random_uuid(), 'Buddha Jayanti', 'बुद्ध जयन्ती', 'Celebrating the birth, enlightenment and death of Siddhartha Gautama — Lord Buddha.', 'सिद्धार्थ गौतम — भगवान बुद्धको जन्म, ज्ञान प्राप्ति र निर्वाणको उत्सव।', 'festival', true),
  (gen_random_uuid(), 'Holi', 'होली', 'Festival of colors celebrating the arrival of spring and the triumph of good over evil.', 'रंगहरूको चाड — वसन्तको आगमन र असत्यमाथि सत्यको विजयको उत्सव।', 'festival', true);

-- ============================================================
-- BADGES
-- ============================================================
INSERT INTO badges (id, name, description, criteria) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'First Step', 'Complete your first lesson', '{"lessons_completed": 1}'),
  ('b0000000-0000-0000-0000-000000000002', 'Word Collector', 'Learn 25 vocabulary words', '{"vocab_learned": 25}'),
  ('b0000000-0000-0000-0000-000000000003', 'Quiz Master', 'Score 100% on any quiz', '{"quiz_perfect": true}'),
  ('b0000000-0000-0000-0000-000000000004', 'Story Reader', 'Read your first story', '{"stories_read": 1}'),
  ('b0000000-0000-0000-0000-000000000005', '7-Day Streak', 'Study 7 days in a row', '{"streak_days": 7}'),
  ('b0000000-0000-0000-0000-000000000006', 'Alphabet Hero', 'Complete the alphabet lesson', '{"lesson_id": "l1000000-0000-0000-0000-000000000001"}'),
  ('b0000000-0000-0000-0000-000000000007', 'Culture Explorer', 'View 5 cultural items', '{"cultural_viewed": 5}'),
  ('b0000000-0000-0000-0000-000000000008', 'Level Up!', 'Complete all Level 1 lessons', '{"level_completed": 1}');
