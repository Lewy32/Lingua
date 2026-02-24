# Lingua: Multi-Language Learning + Cultural Cuisine

> Learn the language. Cook the food. Live the culture.

## App Concept

Transform the Farsi Learning app into a comprehensive multi-language platform with integrated cultural food experiences. Users learn a language and then explore authentic recipes from that culture — complete with native language ingredient names, cooking terms, and cultural context.

## Rebrand

| Current | New |
|---------|-----|
| Farsi Learning | **Lingua** |
| com.hussars.farsilearning | com.hussars.lingua |
| Single language | 15+ languages |
| Basic culture section | Full recipe/cuisine system |

---

## Languages Supported

### Phase 1 (Launch)
| Language | Native Name | Flag | Cuisine |
|----------|-------------|------|---------|
| Farsi (Persian) | فارسی | 🇮🇷 | Persian/Iranian |
| Spanish | Español | 🇪🇸 | Spanish/Mexican/Latin |
| French | Français | 🇫🇷 | French |
| Italian | Italiano | 🇮🇹 | Italian |
| Japanese | 日本語 | 🇯🇵 | Japanese |
| Korean | 한국어 | 🇰🇷 | Korean |
| Arabic | العربية | 🇸🇦 | Middle Eastern |
| Mandarin | 中文 | 🇨🇳 | Chinese |

### Phase 2
| Language | Native Name | Flag | Cuisine |
|----------|-------------|------|---------|
| German | Deutsch | 🇩🇪 | German |
| Portuguese | Português | 🇧🇷 | Brazilian/Portuguese |
| Hindi | हिन्दी | 🇮🇳 | Indian |
| Turkish | Türkçe | 🇹🇷 | Turkish |
| Vietnamese | Tiếng Việt | 🇻🇳 | Vietnamese |
| Thai | ไทย | 🇹🇭 | Thai |
| Greek | Ελληνικά | 🇬🇷 | Greek |
| Russian | Русский | 🇷🇺 | Russian |

---

## App Architecture

```
Lingua App
├── 🌍 Language Selection
│   └── Choose your language to learn
│
├── 📚 Learning (per language)
│   ├── Lessons (existing system)
│   ├── Vocabulary
│   ├── Grammar
│   ├── Speaking Practice
│   └── Review (SRS)
│
├── 🍳 Kitchen (NEW)
│   ├── Browse Recipes
│   ├── Recipe Detail
│   ├── Cooking Mode
│   ├── Shopping List
│   └── Favorites
│
├── 🏛️ Culture (expanded)
│   ├── History
│   ├── Traditions
│   ├── Music & Art
│   └── Daily Life
│
├── 👥 Social
│   ├── Friends
│   ├── Leaderboard
│   └── Challenges
│
└── 👤 Profile
    ├── Progress
    ├── Achievements
    └── Settings
```

---

## Recipe/Kitchen Feature

### Recipe Data Model

```typescript
interface Recipe {
  id: string;
  language: string;              // 'farsi', 'japanese', etc.
  
  // Names
  nameNative: string;            // "قورمه سبزی"
  nameEnglish: string;           // "Ghormeh Sabzi"
  namePhonetic?: string;         // "ghor-MEH sab-ZEE"
  
  // Media
  images: string[];              // Recipe photos
  videoUrl?: string;             // Cooking video
  
  // Basic Info
  description: string;
  descriptionNative?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  
  // Time
  prepTime: number;              // minutes
  cookTime: number;              // minutes
  totalTime: number;             // minutes
  
  // Servings
  servings: number;
  calories?: number;
  
  // Categorization
  category: string;              // 'main', 'appetizer', 'dessert', 'drink', 'breakfast'
  tags: string[];                // 'vegetarian', 'spicy', 'traditional', 'festive'
  region?: string;               // 'Tehran', 'Osaka', 'Sicily'
  
  // Ingredients
  ingredients: Ingredient[];
  
  // Steps
  steps: CookingStep[];
  
  // Tips
  tips: string[];
  bestPractices: string[];
  
  // Language Learning Integration
  vocabularyWords: VocabularyWord[];   // Key cooking terms
  culturalContext: string;             // Story behind the dish
  
  // Social
  rating: number;
  reviewCount: number;
  savedCount: number;
}

interface Ingredient {
  id: string;
  nameNative: string;            // "گوشت گوسفند"
  nameEnglish: string;           // "lamb"
  namePhonetic?: string;         // "goosht-e goosfand"
  
  quantity: number;
  unit: string;                  // 'cup', 'tbsp', 'piece', 'g', 'lb'
  unitNative?: string;           // "فنجان"
  
  notes?: string;                // "boneless, cubed"
  optional: boolean;
  substitutes?: string[];        // Alternative ingredients
  
  // For shopping
  category: string;              // 'protein', 'vegetable', 'spice', 'dairy'
}

interface CookingStep {
  stepNumber: number;
  instruction: string;           // English instruction
  instructionNative?: string;    // Native language instruction
  
  duration?: number;             // minutes for this step
  technique?: string;            // 'sauté', 'simmer', 'fold'
  
  image?: string;                // Step photo
  tip?: string;                  // Pro tip for this step
  
  // Vocab
  keyTerms?: {
    native: string;
    english: string;
    phonetic?: string;
  }[];
}

interface VocabularyWord {
  native: string;
  english: string;
  phonetic?: string;
  audio?: string;
  category: 'ingredient' | 'technique' | 'equipment' | 'taste';
}
```

### Recipe Categories (Per Language)

```typescript
const cuisineCategories = {
  farsi: {
    name: 'Persian Cuisine',
    categories: ['Rice Dishes', 'Stews (Khoresh)', 'Kebabs', 'Appetizers', 'Desserts', 'Drinks'],
    signature: ['Ghormeh Sabzi', 'Tahdig', 'Kebab Koobideh', 'Zereshk Polo'],
  },
  japanese: {
    name: 'Japanese Cuisine',
    categories: ['Rice & Noodles', 'Sushi & Sashimi', 'Grilled', 'Soups', 'Desserts', 'Drinks'],
    signature: ['Ramen', 'Sushi', 'Tempura', 'Miso Soup', 'Mochi'],
  },
  italian: {
    name: 'Italian Cuisine',
    categories: ['Pasta', 'Pizza', 'Risotto', 'Antipasti', 'Dolci', 'Drinks'],
    signature: ['Spaghetti Carbonara', 'Margherita Pizza', 'Tiramisu', 'Risotto'],
  },
  korean: {
    name: 'Korean Cuisine',
    categories: ['Rice & Noodles', 'BBQ', 'Stews (Jjigae)', 'Banchan', 'Desserts', 'Drinks'],
    signature: ['Bibimbap', 'Korean BBQ', 'Kimchi Jjigae', 'Tteokbokki'],
  },
  // ... etc
};
```

---

## UI/UX Design

### Language Selection Screen
```
┌─────────────────────────────────────────┐
│                                         │
│            🌍 Choose Your               │
│              Language                   │
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ 🇮🇷      │  │ 🇪🇸      │  │ 🇫🇷      │ │
│  │ فارسی   │  │ Español │  │Français │ │
│  │ Persian │  │ Spanish │  │ French  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ 🇮🇹      │  │ 🇯🇵      │  │ 🇰🇷      │ │
│  │Italiano │  │ 日本語   │  │ 한국어   │ │
│  │ Italian │  │Japanese │  │ Korean  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │ 🇸🇦      │  │ 🇨🇳      │   + More    │
│  │ العربية │  │ 中文     │   Coming    │
│  │ Arabic  │  │ Chinese │              │
│  └─────────┘  └─────────┘              │
│                                         │
└─────────────────────────────────────────┘
```

### Kitchen/Recipe Browser
```
┌─────────────────────────────────────────┐
│ 🍳 Persian Kitchen           [🔍] [❤️]  │
├─────────────────────────────────────────┤
│                                         │
│ Featured                                │
│ ┌─────────────────────────────────────┐ │
│ │ [📷 Ghormeh Sabzi Hero Image]      │ │
│ │                                     │ │
│ │ قورمه سبزی                          │ │
│ │ Ghormeh Sabzi                       │ │
│ │ ⭐ 4.9  •  ⏱️ 2.5 hrs  •  🔥 Medium │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Categories                              │
│ [Rice] [Stews] [Kebabs] [Desserts]     │
│                                         │
│ Popular Recipes                         │
│ ┌───────────┐ ┌───────────┐            │
│ │[📷 Tahdig]│ │[📷 Kebab] │            │
│ │ تەدیگ     │ │ کباب     │            │
│ │ Tahdig    │ │ Kebab    │            │
│ │ ⏱️ 45min  │ │ ⏱️ 30min  │            │
│ └───────────┘ └───────────┘            │
│                                         │
│ Learn Cooking Vocabulary                │
│ ├── سرخ کردن (sorkh kardan) - to fry   │
│ ├── جوشاندن (jushandan) - to boil     │
│ └── + 24 more words                    │
│                                         │
└─────────────────────────────────────────┘
```

### Recipe Detail Screen
```
┌─────────────────────────────────────────┐
│ [←]                            [❤️][📤]│
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │    [📷 Recipe Hero Image]          │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ قورمه سبزی                              │
│ Ghormeh Sabzi                           │
│ ghor-MEH sab-ZEE  🔊                    │
│                                         │
│ ┌─────────┬─────────┬─────────┐        │
│ │ ⏱️      │ 👥      │ 🔥      │        │
│ │ 2.5 hrs │ 6 serv  │ Medium  │        │
│ │ Total   │ Serves  │ Level   │        │
│ └─────────┴─────────┴─────────┘        │
│                                         │
│ The most beloved Persian stew,         │
│ traditionally served at family         │
│ gatherings and special occasions...    │
│                                         │
│ [📝 Ingredients] [👨‍🍳 Steps] [💡 Tips]  │
│                                         │
│ ─────────────────────────────────────  │
│                                         │
│ 📝 Ingredients (12)                    │
│                                         │
│ Protein                                 │
│ ☐ 500g lamb - گوشت گوسفند              │
│   (goosht-e goosfand) 🔊               │
│                                         │
│ Herbs                                   │
│ ☐ 3 cups parsley - جعفری               │
│   (ja'fari) 🔊                         │
│ ☐ 2 cups cilantro - گشنیز              │
│   (geshniz) 🔊                         │
│ ☐ 1 cup fenugreek - شنبلیله            │
│   (shanbalileh) 🔊                     │
│                                         │
│ [📋 Copy to Shopping List]             │
│                                         │
│ ─────────────────────────────────────  │
│                                         │
│          [🍳 Start Cooking]            │
│                                         │
└─────────────────────────────────────────┘
```

### Cooking Mode (Step-by-Step)
```
┌─────────────────────────────────────────┐
│ Step 3 of 8                    [✕ Exit]│
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │    [📷 Step 3 Photo]               │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Sauté the Herbs                         │
│ سرخ کردن سبزی‌ها                        │
│                                         │
│ In a large pan, sauté the chopped      │
│ herbs in 2 tbsp oil until fragrant     │
│ and slightly darkened, about 10-15     │
│ minutes.                                │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 💡 Pro Tip                          │ │
│ │ Don't skip the fenugreek - it gives │ │
│ │ Ghormeh Sabzi its distinctive       │ │
│ │ flavor!                              │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 🕐 Suggested time: 15 minutes          │
│                                         │
│ New Word: سرخ کردن                      │
│ "sorkh kardan" = to sauté/fry 🔊       │
│                                         │
│ ┌────────────────────────────────────┐ │
│ │ [← Previous]        [Timer ⏱️]        │
│ │                     [Next Step →]  │ │
│ └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Database Schema

### New Tables

```sql
-- Languages
CREATE TABLE languages (
  id TEXT PRIMARY KEY,           -- 'farsi', 'japanese'
  name_english TEXT NOT NULL,    -- 'Persian'
  name_native TEXT NOT NULL,     -- 'فارسی'
  flag_emoji TEXT NOT NULL,      -- '🇮🇷'
  text_direction TEXT DEFAULT 'ltr', -- 'rtl' for Arabic/Farsi/Hebrew
  cuisine_name TEXT NOT NULL,    -- 'Persian Cuisine'
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipes
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language_id TEXT REFERENCES languages(id),
  
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
  
  -- Timing
  prep_time INTEGER NOT NULL,    -- minutes
  cook_time INTEGER NOT NULL,    -- minutes
  total_time INTEGER NOT NULL,
  
  -- Details
  servings INTEGER NOT NULL,
  calories INTEGER,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  
  -- Categorization
  category TEXT NOT NULL,
  tags TEXT[],
  region TEXT,
  
  -- Stats
  rating NUMERIC(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  saved_count INTEGER DEFAULT 0,
  
  -- Status
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe ingredients
CREATE TABLE recipe_ingredients (
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
  category TEXT,               -- 'protein', 'vegetable', 'spice'
  is_optional BOOLEAN DEFAULT false,
  substitutes TEXT[],
  
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cooking steps
CREATE TABLE recipe_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  
  -- Instructions
  instruction TEXT NOT NULL,
  instruction_native TEXT,
  
  -- Details
  duration INTEGER,            -- minutes
  technique TEXT,
  image_url TEXT,
  tip TEXT,
  
  -- Vocabulary
  key_terms JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe tips/best practices
CREATE TABLE recipe_tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  tip_type TEXT CHECK (tip_type IN ('tip', 'best_practice', 'warning')),
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cooking vocabulary
CREATE TABLE cooking_vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language_id TEXT REFERENCES languages(id),
  
  word_native TEXT NOT NULL,
  word_english TEXT NOT NULL,
  word_phonetic TEXT,
  audio_url TEXT,
  
  category TEXT,               -- 'ingredient', 'technique', 'equipment', 'taste'
  example_sentence TEXT,
  example_sentence_native TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User saved recipes
CREATE TABLE user_saved_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

-- User cooking history
CREATE TABLE user_cooking_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT
);

-- Shopping lists
CREATE TABLE shopping_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'My List',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shopping_list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES recipe_ingredients(id),
  custom_item TEXT,            -- For manually added items
  quantity NUMERIC,
  unit TEXT,
  is_checked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_recipes_language ON recipes(language_id);
CREATE INDEX idx_recipes_category ON recipes(category);
CREATE INDEX idx_recipes_featured ON recipes(is_featured) WHERE is_featured = true;
CREATE INDEX idx_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_steps_recipe ON recipe_steps(recipe_id);
CREATE INDEX idx_vocabulary_language ON cooking_vocabulary(language_id);
```

---

## API Endpoints

```
Languages
├── GET  /api/languages              # List all languages
├── GET  /api/languages/:id          # Language details

Recipes
├── GET  /api/recipes                # List recipes (filter by language, category)
├── GET  /api/recipes/featured       # Featured recipes
├── GET  /api/recipes/:id            # Recipe detail
├── GET  /api/recipes/:id/ingredients # Recipe ingredients
├── GET  /api/recipes/:id/steps      # Cooking steps
├── POST /api/recipes/:id/save       # Save recipe
├── DELETE /api/recipes/:id/save     # Unsave recipe
├── POST /api/recipes/:id/cooked     # Mark as cooked
├── POST /api/recipes/:id/rate       # Rate recipe

Vocabulary
├── GET  /api/vocabulary/:language   # Cooking vocab for language
├── GET  /api/vocabulary/recipe/:id  # Vocab from a recipe

Shopping
├── GET  /api/shopping-lists         # User's lists
├── POST /api/shopping-lists         # Create list
├── POST /api/shopping-lists/:id/items  # Add items
├── PUT  /api/shopping-lists/:id/items/:itemId  # Update item
├── DELETE /api/shopping-lists/:id   # Delete list
```

---

## Initial Recipe Data (Farsi/Persian)

```javascript
const persianRecipes = [
  {
    nameNative: 'قورمه سبزی',
    nameEnglish: 'Ghormeh Sabzi',
    namePhonetic: 'ghor-MEH sab-ZEE',
    description: 'The most beloved Persian stew, featuring slow-cooked herbs, lamb, and kidney beans.',
    difficulty: 'medium',
    prepTime: 30,
    cookTime: 120,
    servings: 6,
    category: 'stew',
    tags: ['traditional', 'festive', 'gluten-free'],
    // ... full recipe data
  },
  {
    nameNative: 'چلو کباب',
    nameEnglish: 'Chelo Kabab',
    namePhonetic: 'che-LOW ka-BAHB',
    description: 'Iran\'s national dish - saffron rice with grilled kebab.',
    difficulty: 'medium',
    prepTime: 45,
    cookTime: 30,
    servings: 4,
    category: 'main',
    tags: ['national-dish', 'grilled', 'gluten-free'],
  },
  {
    nameNative: 'تەدیگ',
    nameEnglish: 'Tahdig',
    namePhonetic: 'tah-DEEG',
    description: 'The coveted crispy golden rice crust - a Persian delicacy.',
    difficulty: 'hard',
    prepTime: 15,
    cookTime: 60,
    servings: 6,
    category: 'rice',
    tags: ['crispy', 'side-dish', 'vegetarian'],
  },
  {
    nameNative: 'فسنجان',
    nameEnglish: 'Fesenjan',
    namePhonetic: 'fe-sen-JAHN',
    description: 'Rich pomegranate and walnut stew with chicken.',
    difficulty: 'medium',
    prepTime: 20,
    cookTime: 90,
    servings: 4,
    category: 'stew',
    tags: ['sweet-savory', 'nuts', 'festive'],
  },
  {
    nameNative: 'زرشک پلو با مرغ',
    nameEnglish: 'Zereshk Polo ba Morgh',
    namePhonetic: 'ze-RESHK po-LOW ba MORGH',
    description: 'Saffron rice with barberries and tender chicken.',
    difficulty: 'medium',
    prepTime: 30,
    cookTime: 60,
    servings: 6,
    category: 'rice',
    tags: ['festive', 'wedding', 'sweet-sour'],
  },
  // ... more recipes
];
```

---

## Implementation Plan

### Phase 1: Foundation (Week 1)
- [ ] Rebrand app to "Lingua"
- [ ] Create language selection screen
- [ ] Set up multi-language data structure
- [ ] Create database tables
- [ ] Build API endpoints

### Phase 2: Kitchen Feature (Week 2)
- [ ] Recipe browser screen
- [ ] Recipe detail screen
- [ ] Cooking mode (step-by-step)
- [ ] Shopping list feature
- [ ] Favorites/saved recipes

### Phase 3: Content (Week 3)
- [ ] Add 10+ Persian recipes with full data
- [ ] Add cooking vocabulary
- [ ] Record audio pronunciations
- [ ] Add recipe photos
- [ ] Add cultural context

### Phase 4: Additional Languages (Week 4+)
- [ ] Japanese recipes
- [ ] Korean recipes
- [ ] Italian recipes
- [ ] Spanish recipes
- [ ] Continue expanding...

---

## File Changes Required

### Rename/Rebrand
- `app.json` → Update name, slug, bundleIdentifier
- `package.json` → Update name
- Assets → New logo, splash screen

### New Screens
- `LanguageSelectScreen.js`
- `KitchenScreen.js` (recipe browser)
- `RecipeDetailScreen.js`
- `CookingModeScreen.js`
- `ShoppingListScreen.js`

### New Components
- `LanguageCard.js`
- `RecipeCard.js`
- `IngredientItem.js`
- `CookingStep.js`
- `VocabularyWord.js`

### Navigation Updates
- Add Kitchen tab to bottom nav
- Add language context/switching

---

Ready to start building?
