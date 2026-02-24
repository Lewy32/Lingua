import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../config';

// API URL from config
const API_BASE_URL = CONFIG.API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear storage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateSettings: (data) => api.put('/auth/settings', data),
};

// Lesson endpoints
export const lessonAPI = {
  getAll: () => api.get('/lessons'),
  getById: (id) => api.get(`/lessons/${id}`),
  getByLevel: (level) => api.get(`/lessons/level/${level}`),
};

// Progress endpoints
export const progressAPI = {
  getAll: () => api.get('/progress'),
  getByLesson: (lessonId) => api.get(`/progress/lesson/${lessonId}`),
  update: (data) => api.post('/progress', data),
  loseHeart: () => api.post('/progress/lose-heart'),
};

// Review endpoints
export const reviewAPI = {
  getDue: () => api.get('/reviews/due'),
  getAll: () => api.get('/reviews'),
  submit: (data) => api.post('/reviews', data),
  getStats: () => api.get('/reviews/stats'),
};

// Social/Friends endpoints
export const socialAPI = {
  getFriends: () => api.get('/friends'),
  getFriendRequests: () => api.get('/friends/requests'),
  searchUsers: (query) => api.get(`/friends/search?q=${encodeURIComponent(query)}`),
  sendFriendRequest: (userId) => api.post('/friends/request', { userId }),
  acceptFriendRequest: (requestId) => api.post(`/friends/accept/${requestId}`),
  rejectFriendRequest: (requestId) => api.post(`/friends/reject/${requestId}`),
  removeFriend: (friendId) => api.delete(`/friends/${friendId}`),
};

// Leaderboard endpoints
export const leaderboardAPI = {
  getFriends: () => api.get('/leaderboard/friends'),
  getGlobal: (page = 1) => api.get(`/leaderboard/global?page=${page}`),
  getWeekly: (page = 1) => api.get(`/leaderboard/weekly?page=${page}`),
  getRanks: () => api.get('/leaderboard/ranks'),
};

export default api;
