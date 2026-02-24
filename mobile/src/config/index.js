// App configuration
// Update API_URL before building for production

const DEV_API_URL = 'http://localhost:3000/api';

// PRODUCTION: Update this URL after deploying backend to Railway
const PROD_API_URL = 'https://farsi-learning-api.up.railway.app/api';

export const CONFIG = {
  API_URL: __DEV__ ? DEV_API_URL : PROD_API_URL,
  
  // App settings
  APP_NAME: 'Farsi Learning',
  VERSION: '1.0.0',
  
  // Defaults
  DEFAULT_HEARTS: 5,
  HEART_REFILL_HOURS: 4,
  XP_PER_LESSON: 10,
  XP_PER_PERFECT: 15,
  
  // SRS intervals (in days)
  SRS_INTERVALS: [1, 3, 7, 14, 30, 90],
};

export default CONFIG;
