import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys
const KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  LESSON_PROGRESS: 'lessonProgress',
  CACHED_LESSONS: 'cachedLessons',
  OFFLINE_QUEUE: 'offlineQueue',
  SETTINGS: 'settings',
};

// Auth storage
export const setAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

// User data storage
export const setUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER_DATA);
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

// Lesson caching
export const cacheLessons = async (lessons) => {
  try {
    await AsyncStorage.setItem(KEYS.CACHED_LESSONS, JSON.stringify(lessons));
  } catch (error) {
    console.error('Error caching lessons:', error);
  }
};

export const getCachedLessons = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.CACHED_LESSONS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached lessons:', error);
    return null;
  }
};

// Offline queue
export const addToOfflineQueue = async (action) => {
  try {
    const queue = await getOfflineQueue();
    queue.push(action);
    await AsyncStorage.setItem(KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
  } catch (error) {
    console.error('Error adding to offline queue:', error);
  }
};

export const getOfflineQueue = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.OFFLINE_QUEUE);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting offline queue:', error);
    return [];
  }
};

export const clearOfflineQueue = async () => {
  try {
    await AsyncStorage.setItem(KEYS.OFFLINE_QUEUE, JSON.stringify([]));
  } catch (error) {
    console.error('Error clearing offline queue:', error);
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.AUTH_TOKEN,
      KEYS.USER_DATA,
      KEYS.LESSON_PROGRESS,
      KEYS.CACHED_LESSONS,
      KEYS.OFFLINE_QUEUE,
    ]);
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};

export default {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  setUserData,
  getUserData,
  removeUserData,
  cacheLessons,
  getCachedLessons,
  addToOfflineQueue,
  getOfflineQueue,
  clearOfflineQueue,
  clearAllData,
};
