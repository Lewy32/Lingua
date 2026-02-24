# 🌍 Lingua

> Learn the language. Cook the food. Live the culture.

A comprehensive multi-language learning app with integrated cultural food experiences. Learn 8+ languages while exploring authentic recipes from each culture.

![Lingua App](./assets/lingua-preview.png)

## ✨ Features

### 📚 Language Learning
- **30+ lessons per language** with vocabulary, grammar, and pronunciation
- **SRS review system** for optimal retention
- **Speaking practice** with pronunciation feedback
- **7 exercise types**: multiple choice, matching, fill-blank, listening, speaking, ordering, translation

### 🍳 Kitchen & Recipes
- **Authentic recipes** from each language's culture
- **Native language ingredients** with phonetic pronunciation
- **Step-by-step cooking mode** with timers and tips
- **Cooking vocabulary** - learn language through food
- **Shopping lists** with native translations
- **Cultural context** - the story behind each dish

### 🎮 Gamification
- **XP system** with daily goals
- **Streaks** for consistent practice
- **Levels** that unlock new content
- **Leaderboards** to compete with friends
- **Achievements** for milestones

### 👥 Social
- **Add friends** and see their progress
- **Leaderboards** (daily, weekly, all-time)
- **Share recipes** with language learners

## 🗣️ Supported Languages

| Language | Native | Cuisine |
|----------|--------|---------|
| 🇮🇷 Persian | فارسی | Stews, saffron rice, kebabs |
| 🇪🇸 Spanish | Español | Tapas, paella, Latin flavors |
| 🇫🇷 French | Français | Classic techniques, pastries |
| 🇮🇹 Italian | Italiano | Pasta, pizza, dolci |
| 🇯🇵 Japanese | 日本語 | Sushi, ramen, izakaya |
| 🇰🇷 Korean | 한국어 | BBQ, kimchi, banchan |
| 🇸🇦 Arabic | العربية | Mezze, grilled meats |
| 🇨🇳 Chinese | 中文 | Regional wok dishes |

*More languages coming soon!*

## 📱 Screenshots

<table>
  <tr>
    <td><img src="./assets/screenshots/language-select.png" width="200"/></td>
    <td><img src="./assets/screenshots/home.png" width="200"/></td>
    <td><img src="./assets/screenshots/kitchen.png" width="200"/></td>
    <td><img src="./assets/screenshots/recipe.png" width="200"/></td>
  </tr>
  <tr>
    <td align="center">Language Select</td>
    <td align="center">Home</td>
    <td align="center">Kitchen</td>
    <td align="center">Recipe Detail</td>
  </tr>
</table>

## 🛠️ Tech Stack

- **Frontend**: React Native + Expo
- **Navigation**: React Navigation 6
- **State**: Context API + AsyncStorage
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Auth**: JWT
- **Styling**: StyleSheet (dark theme)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

```bash
# Clone the repo
git clone https://github.com/hussars/lingua.git
cd lingua

# Install dependencies
cd mobile
pnpm install

# Start Expo
pnpm start
```

### Running on Device

```bash
# iOS
pnpm ios

# Android
pnpm android
```

### Backend Setup

```bash
cd backend
pnpm install
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
pnpm migrate

# Start server
pnpm dev
```

## 📁 Project Structure

```
lingua/
├── mobile/                  # React Native app
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── screens/         # Screen components
│   │   ├── navigation/      # Navigation config
│   │   ├── context/         # React Context providers
│   │   ├── data/            # Static data (lessons, recipes)
│   │   │   ├── lessons/     # Lesson content per language
│   │   │   └── recipes/     # Recipe data per language
│   │   ├── services/        # API services
│   │   ├── constants/       # Colors, config
│   │   └── utils/           # Helpers
│   └── assets/              # Images, fonts
│
├── backend/                 # Node.js API
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, validation
│   ├── models/              # Database models
│   ├── migrations/          # SQL migrations
│   └── services/            # Business logic
│
└── docs/                    # Documentation
```

## 🍽️ Recipe Data Structure

Each recipe includes:

```javascript
{
  nameNative: 'قورمه سبزی',        // Native script
  nameEnglish: 'Ghormeh Sabzi',    // English name
  namePhonetic: 'ghor-MEH sab-ZEE', // Pronunciation guide
  
  ingredients: [{
    nameNative: 'گوشت گوسفند',     // Native ingredient name
    namePhonetic: 'goosht-e goosfand',
    quantity: 500,
    unit: 'g',
  }],
  
  steps: [{
    instruction: 'Sauté the herbs...',
    instructionNative: 'سرخ کردن سبزی‌ها...',
    keyTerms: [
      { native: 'سرخ کردن', english: 'to sauté' }
    ],
  }],
  
  vocabulary: [
    { native: 'خورش', english: 'stew' }
  ],
}
```

## 🔐 Environment Variables

### Mobile (.env)

```env
API_URL=https://api.lingua.app
```

### Backend (.env)

```env
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/lingua
JWT_SECRET=your-secret-key
```

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

Built with ❤️ by Hussars

*Learn the language. Cook the food. Live the culture.*
