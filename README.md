# Lingua 🌍

**Learn the language. Cook the food. Live the culture.**

A next-generation language learning app that does what Duolingo won't: combines language learning with cultural immersion through authentic recipes and real-world conversations.

---

## 🎯 The Problem with Duolingo

| Issue | User Pain |
|-------|-----------|
| Hearts system | Punishes mistakes, creates anxiety |
| No explanations | "Why is this wrong?" frustration |
| Useless sentences | "The elephant drinks wine" |
| Feature creep | Too many tabs, lost focus |
| Gamification > Learning | Earn rewards, forget learning |
| No cultural context | Language without soul |

## ✨ How Lingua is Different

### 🚫 No Hearts — Ever
Mistakes are learning opportunities. You'll never be locked out of practice.

### 📝 Grammar Explanations
Every wrong answer includes a clear explanation of WHY, not just "try again."

### 🍳 Learn Through Cooking
Master vocabulary naturally by cooking authentic dishes. Learn "시금치" (spinach) while making bibimbap.

### 💬 Real Conversations
Practical phrases you'll actually use. AI-powered conversation practice.

### 🎨 Clean, Focused Design
4 tabs: Learn, Kitchen, Social, Me. That's it.

---

## 📱 Features

### Core Learning
- **15 exercise types** — tap translation, listening, speaking, conversation
- **Spaced repetition** — science-backed memory system
- **Adaptive difficulty** — AI adjusts to your level
- **Native audio** — real speakers, multiple accents

### Kitchen Mode 🍳
- **60+ cuisines** — from Persian to Japanese to Nigerian
- **10+ recipes per language** — with full vocabulary integration
- **Cooking Mode** — step-by-step with timers and vocab quizzes
- **Cultural context** — understand the story behind each dish

### Gamification (Done Right)
- **XP & Levels** — without the anxiety
- **Streaks** — with shields and forgiveness
- **Leaderboards** — friendly competition
- **Achievements** — celebrate milestones

### Social
- **Friends** — learn together
- **Challenges** — compete on lessons
- **Share recipes** — food brings people together

---

## 🗣️ Supported Languages (60+)

**Phase 1 (Launch)**
- 🇪🇸 Spanish
- 🇫🇷 French  
- 🇯🇵 Japanese
- 🇰🇷 Korean
- 🇩🇪 German
- 🇮🇹 Italian
- 🇮🇷 Persian
- 🇸🇦 Arabic

**Phase 2**
- All major world languages
- Regional dialects (Quebec French, Mexican Spanish, etc.)
- Endangered languages with cultural preservation focus

---

## 🏗️ Tech Stack

### Mobile App
- **React Native + Expo** — cross-platform iOS/Android
- **Expo Router** — file-based navigation
- **React Context** — state management
- **Async Storage** — offline data

### Backend
- **Node.js + Express** — REST API
- **MongoDB** — user data, progress, recipes
- **Redis** — leaderboards, caching
- **AWS S3** — audio files, images

### AI
- **Speech recognition** — pronunciation feedback
- **GPT-4/Claude** — conversation mode
- **Custom ML** — adaptive difficulty

---

## 📁 Project Structure

```
/mobile                 # React Native app
├── /src
│   ├── /screens        # All screens
│   ├── /exercises      # Exercise components
│   ├── /components     # Reusable UI
│   ├── /context        # State management
│   ├── /data           # Languages, recipes
│   ├── /services       # API clients
│   └── /utils          # Helpers

/backend                # Node.js server
├── /routes             # API endpoints
├── /models             # MongoDB schemas
├── /services           # Business logic
└── /migrations         # Database migrations
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- MongoDB (local or Atlas)

### Installation

```bash
# Clone
git clone https://github.com/hussars/lingua.git
cd lingua

# Mobile app
cd mobile
npm install
npx expo start

# Backend
cd ../backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Running on Device

```bash
# iOS Simulator
npx expo run:ios

# Android Emulator
npx expo run:android

# Physical device
# Scan QR code from Expo Go app
```

---

## 📊 Monetization

### Free Tier (Complete Experience)
✅ All lessons and exercises  
✅ Unlimited learning (no hearts!)  
✅ 3 recipes per language  
✅ Weekly leaderboards  
✅ Core features

### Premium ($9.99/month)
✅ All recipes (10+ per language)  
✅ Offline mode  
✅ No ads  
✅ AI conversation mode  
✅ Advanced analytics

---

## 🎨 Design Principles

1. **Learning First** — Every feature serves education
2. **Mistakes Welcome** — No punishment, only growth
3. **Culture Matters** — Language is inseparable from culture
4. **Simplicity** — Clean UI, focused experience
5. **Accessibility** — For everyone, everywhere

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas We Need Help
- Native speaker audio recordings
- Recipe contributions
- Translations
- Exercise content
- UI/UX feedback

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- Duolingo — for showing what works (and what doesn't)
- Native speakers who contributed audio
- Recipe contributors from around the world
- Our beta testers

---

*Built with 💜 by Hussars*

**Learn the language. Cook the food. Live the culture.**
