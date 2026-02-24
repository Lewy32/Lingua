-- Lingua: Multi-Language Learning App
-- Migration 002: Recipes & Kitchen Feature

-- Enable UUID extension if not already
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Languages table
CREATE TABLE IF NOT EXISTS languages (
  id TEXT PRIMARY KEY,                    -- 'farsi', 'japanese', etc.
  name_english TEXT NOT NULL,             -- 'Persian'
  name_native TEXT NOT NULL,              -- 'فارسی'
  flag_emoji TEXT NOT NULL,               -- '🇮🇷'
  text_direction TEXT DEFAULT 'ltr',      -- 'rtl' for Arabic/Farsi/Hebrew
  cuisine_name TEXT NOT NULL,             -- 'Persian Cuisine'
  cuisine_description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language_id TEXT REFERENCES languages(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,              -- 'ghormeh-sabzi' for URLs
  
  -- Names
  name_native TEXT NOT NULL,
  name_english TEXT NOT NULL,
  name_phonetic TEXT,
  
  -- Description
  description TEXT NOT NULL,
  description_native TEXT,
  cultural_context TEXT,
  
  -- Media
  image_url TEXT,
  images JSONB DEFAULT '[]',
  video_url TEXT,
  
  -- Timing (minutes)
  prep_time INTEGER NOT NULL,
  cook_time INTEGER NOT NULL,
  total_time INTEGER NOT NULL,
  
  -- Details
  servings INTEGER NOT NULL,
  calories INTEGER,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  
  -- Categorization
  category TEXT NOT NULL,                 -- 'stew', 'rice', 'pasta', etc.
  tags TEXT[] DEFAULT '{}',
  region TEXT,
  
  -- Stats
  rating NUMERIC(2,1) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  saved_count INTEGER DEFAULT 0,
  cooked_count INTEGER DEFAULT 0,
  
  -- Status
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe ingredients
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  
  -- Names
  name_english TEXT NOT NULL,
  name_native TEXT,
  name_phonetic TEXT,
  
  -- Quantity
  quantity NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  unit_native TEXT,
  
  -- Details
  notes TEXT,
  category TEXT,                          -- 'protein', 'vegetable', 'spice'
  is_optional BOOLEAN DEFAULT false,
  substitutes TEXT[],
  
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cooking steps
CREATE TABLE IF NOT EXISTS recipe_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  
  -- Instructions
  instruction TEXT NOT NULL,
  instruction_native TEXT,
  
  -- Details
  duration INTEGER,                       -- minutes
  technique TEXT,
  image_url TEXT,
  tip TEXT,
  
  -- Vocabulary
  key_terms JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe tips/best practices
CREATE TABLE IF NOT EXISTS recipe_tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  tip_type TEXT CHECK (tip_type IN ('tip', 'best_practice', 'warning')),
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe vocabulary (words learned from recipes)
CREATE TABLE IF NOT EXISTS recipe_vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  
  word_native TEXT NOT NULL,
  word_english TEXT NOT NULL,
  word_phonetic TEXT,
  audio_url TEXT,
  
  category TEXT,                          -- 'ingredient', 'technique', 'equipment', 'taste'
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cooking vocabulary (general cooking terms per language)
CREATE TABLE IF NOT EXISTS cooking_vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language_id TEXT REFERENCES languages(id) ON DELETE CASCADE,
  
  word_native TEXT NOT NULL,
  word_english TEXT NOT NULL,
  word_phonetic TEXT,
  audio_url TEXT,
  
  category TEXT,                          -- 'technique', 'equipment', 'taste', 'measurement'
  example_sentence TEXT,
  example_sentence_native TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User saved recipes
CREATE TABLE IF NOT EXISTS user_saved_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- User cooking history
CREATE TABLE IF NOT EXISTS user_cooking_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  photo_url TEXT
);

-- Shopping lists
CREATE TABLE IF NOT EXISTS shopping_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'My List',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shopping_list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id),     -- Source recipe (optional)
  
  -- Item details
  name TEXT NOT NULL,
  name_native TEXT,
  quantity NUMERIC,
  unit TEXT,
  category TEXT,
  
  is_checked BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe reviews
CREATE TABLE IF NOT EXISTS recipe_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  title TEXT,
  content TEXT,
  photo_urls TEXT[],
  is_verified_cook BOOLEAN DEFAULT false,   -- User has completed cooking
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- User language preferences
CREATE TABLE IF NOT EXISTS user_languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  language_id TEXT REFERENCES languages(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  skill_level TEXT DEFAULT 'beginner',      -- 'beginner', 'intermediate', 'advanced'
  recipes_cooked INTEGER DEFAULT 0,
  words_learned INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, language_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_recipes_language ON recipes(language_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_featured ON recipes(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX IF NOT EXISTS idx_recipes_total_time ON recipes(total_time);
CREATE INDEX IF NOT EXISTS idx_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_steps_recipe ON recipe_steps(recipe_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_language ON cooking_vocabulary(language_id);
CREATE INDEX IF NOT EXISTS idx_saved_recipes_user ON user_saved_recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_cooking_history_user ON user_cooking_history(user_id);
CREATE INDEX IF NOT EXISTS idx_shopping_list_user ON shopping_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_recipe ON recipe_reviews(recipe_id);
CREATE INDEX IF NOT EXISTS idx_user_languages_user ON user_languages(user_id);

-- Full-text search on recipes
CREATE INDEX IF NOT EXISTS idx_recipes_search ON recipes 
  USING GIN (to_tsvector('english', name_english || ' ' || COALESCE(description, '')));

-- Trigger to update recipe rating when reviews change
CREATE OR REPLACE FUNCTION update_recipe_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE recipes
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM recipe_reviews
    WHERE recipe_id = COALESCE(NEW.recipe_id, OLD.recipe_id)
  ),
  rating_count = (
    SELECT COUNT(*)
    FROM recipe_reviews
    WHERE recipe_id = COALESCE(NEW.recipe_id, OLD.recipe_id)
  ),
  updated_at = NOW()
  WHERE id = COALESCE(NEW.recipe_id, OLD.recipe_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_recipe_rating ON recipe_reviews;
CREATE TRIGGER trigger_update_recipe_rating
AFTER INSERT OR UPDATE OR DELETE ON recipe_reviews
FOR EACH ROW EXECUTE FUNCTION update_recipe_rating();

-- Insert initial languages
INSERT INTO languages (id, name_english, name_native, flag_emoji, text_direction, cuisine_name, cuisine_description, is_active, sort_order)
VALUES
  ('farsi', 'Persian', 'فارسی', '🇮🇷', 'rtl', 'Persian Cuisine', 'Rich stews, saffron rice, and aromatic herbs', true, 1),
  ('spanish', 'Spanish', 'Español', '🇪🇸', 'ltr', 'Spanish & Latin Cuisine', 'Tapas, paella, and vibrant flavors', true, 2),
  ('french', 'French', 'Français', '🇫🇷', 'ltr', 'French Cuisine', 'Classic techniques and refined flavors', true, 3),
  ('italian', 'Italian', 'Italiano', '🇮🇹', 'ltr', 'Italian Cuisine', 'Pasta, pizza, and Mediterranean freshness', true, 4),
  ('japanese', 'Japanese', '日本語', '🇯🇵', 'ltr', 'Japanese Cuisine', 'Sushi, ramen, and umami mastery', true, 5),
  ('korean', 'Korean', '한국어', '🇰🇷', 'ltr', 'Korean Cuisine', 'BBQ, kimchi, and bold fermented flavors', true, 6),
  ('arabic', 'Arabic', 'العربية', '🇸🇦', 'rtl', 'Middle Eastern Cuisine', 'Mezze, grilled meats, and fragrant spices', true, 7),
  ('mandarin', 'Chinese', '中文', '🇨🇳', 'ltr', 'Chinese Cuisine', 'Wok mastery and regional diversity', true, 8)
ON CONFLICT (id) DO UPDATE SET
  name_english = EXCLUDED.name_english,
  name_native = EXCLUDED.name_native,
  cuisine_name = EXCLUDED.cuisine_name,
  cuisine_description = EXCLUDED.cuisine_description,
  updated_at = NOW();

-- Migration complete
COMMENT ON TABLE recipes IS 'Lingua: Multi-language recipes with full cooking details';
COMMENT ON TABLE languages IS 'Supported languages with cuisine metadata';
