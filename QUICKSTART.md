# Quick Start Guide

## Get the app running in 5 minutes!

### Step 1: Start MongoDB

```bash
# On macOS with Homebrew:
brew services start mongodb-community

# Or start manually:
mongod --config /usr/local/etc/mongod.conf
```

### Step 2: Start Backend Server

```bash
cd backend
npm install  # First time only
npm run dev

# You should see:
# Server running on port 3000
# MongoDB connected successfully
```

### Step 3: Start Mobile App

```bash
# In a new terminal window
cd mobile
npm install  # First time only
npx expo start

# Then press:
# 'i' for iOS simulator
# 'a' for Android emulator
# Or scan QR code with Expo Go app
```

### Step 4: Create an Account

1. App will open to the Auth screen
2. Click "Sign Up"
3. Enter your name, email, and password
4. You're in!

## Testing the App

### Create a Test User

The app should work immediately. You can:
- Register with any email (e.g., test@test.com)
- Browse the 2 sample lessons
- View your profile
- Check cultural content

### API is Running?

Test the backend: http://localhost:3000/health

Should return: `{"status":"ok","message":"Farsi Learning API is running"}`

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`

### Mobile App Won't Connect to Backend
- **iOS Simulator**: Use `http://localhost:3000/api`
- **Android Emulator**: Use `http://10.0.2.2:3000/api`
- **Physical Device**: Use your computer's IP (e.g., `http://192.168.1.x:3000/api`)
- Update in `mobile/src/services/api.js`

### Expo Errors
```bash
# Clear cache and restart
npx expo start --clear
```

## Next Steps

1. ✅ App is running!
2. 📝 Read [README.md](README.md) for full documentation
3. 🎨 Implement exercise types (see README)
4. 📚 Add more lesson content
5. 🚀 Deploy to TestFlight

## File Structure Quick Reference

```
backend/
├── server.js              ← Backend entry point
├── .env                   ← Configuration (UPDATE MongoDB URL here)
├── src/
│   ├── models/            ← Database schemas
│   ├── routes/            ← API endpoints
│   ├── controllers/       ← Business logic
│   └── data/              ← Lesson content & vocabulary

mobile/
├── App.js                 ← Mobile app entry
├── src/
│   ├── screens/           ← App screens (Home, Lesson, etc.)
│   ├── context/           ← State management
│   ├── services/          ← API client, SRS, TTS
│   └── navigation/        ← Navigation setup
```

## Common Commands

```bash
# Backend
cd backend
npm run dev              # Start development server
npm start                # Start production server

# Mobile
cd mobile
npx expo start           # Start Expo
npx expo start --clear   # Clear cache and start
npx expo install <pkg>   # Install Expo package

# MongoDB
brew services start mongodb-community    # Start MongoDB
brew services stop mongodb-community     # Stop MongoDB
mongosh                                   # Open MongoDB shell
```

## Need Help?

Check the detailed [README.md](README.md) for:
- Complete API documentation
- Exercise implementation guide
- iOS TestFlight deployment
- Backend deployment options

Happy coding! 🎉
