# Farsi Learning App - Deployment Guide

## Quick Deploy to TestFlight

### Step 1: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and create new project
2. Connect GitHub repo or upload the `backend/` folder
3. Add MongoDB plugin (Railway provides free MongoDB)
4. Set environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate-a-secure-32-char-string>
   JWT_EXPIRE=7d
   ```
5. Railway auto-detects Node.js and deploys
6. Copy your Railway URL (e.g., `https://farsi-learning-api.up.railway.app`)

### Step 2: Update Mobile App Config

Edit `mobile/src/config/index.js`:
```javascript
const PROD_API_URL = 'https://YOUR-RAILWAY-URL.up.railway.app/api';
```

### Step 3: Set Up Expo Account

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project (run in mobile/ directory)
cd mobile
eas build:configure
```

### Step 4: Build for iOS TestFlight

```bash
cd mobile

# Build for iOS (requires Apple Developer account)
eas build --platform ios --profile production

# Submit to TestFlight
eas submit --platform ios
```

### Required: Apple Developer Account

For TestFlight, you need:
- Apple Developer Program membership ($99/year)
- App Store Connect app created
- Bundle ID: `com.hussars.farsilearning`

### Alternative: Expo Go (No Apple Account Needed)

For beta testing without Apple Developer account:

```bash
cd mobile
npx expo start
```

Testers can:
1. Install "Expo Go" from App Store
2. Scan the QR code
3. Test the app immediately

---

## Environment Checklist

### Backend (.env)
- [ ] MONGODB_URI (Railway provides this)
- [ ] JWT_SECRET (generate secure random string)
- [ ] NODE_ENV=production

### Mobile (src/config/index.js)
- [ ] PROD_API_URL points to Railway backend

### EAS (eas.json)
- [ ] Apple credentials configured
- [ ] App Store Connect app ID set

---

## Testing the Beta

1. Deploy backend → verify `/health` returns OK
2. Update mobile config with backend URL
3. Build with EAS or test with Expo Go
4. Invite testers via TestFlight or Expo Go QR

---

## Costs

| Service | Cost |
|---------|------|
| Railway (Backend + MongoDB) | Free tier available |
| Expo (EAS Build) | Free tier: 30 builds/month |
| Apple Developer | $99/year (required for App Store) |
