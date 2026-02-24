// Date utilities for streak calculation and time formatting

// Check if two dates are the same day
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Check if date is today
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

// Check if date is yesterday
export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

// Calculate days between two dates
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Check if streak should continue
export const shouldContinueStreak = (lastActivityDate) => {
  if (!lastActivityDate) return false;
  const today = new Date();
  const lastActivity = new Date(lastActivityDate);

  if (isToday(lastActivity)) return true;
  if (isYesterday(lastActivity)) return true;

  return false;
};

// Format time duration (in seconds) to readable string
export const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
};

// Format date to readable string
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
};

// Get greeting based on time of day
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Calculate XP needed for next level
export const xpForNextLevel = (currentLevel) => {
  return currentLevel * 1000;
};

// Calculate level from XP
export const calculateLevel = (xp) => {
  return Math.floor(xp / 1000) + 1;
};

// Calculate progress percentage to next level
export const levelProgress = (xp) => {
  const level = calculateLevel(xp);
  const xpInCurrentLevel = xp % 1000;
  return (xpInCurrentLevel / 1000) * 100;
};

// Get start of day timestamp
export const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Get end of day timestamp
export const getEndOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

// Check if hearts should be refilled
export const shouldRefillHearts = (lastActivityDate) => {
  if (!lastActivityDate) return true;
  return !isToday(lastActivityDate);
};

export default {
  isSameDay,
  isToday,
  isYesterday,
  daysBetween,
  shouldContinueStreak,
  formatDuration,
  formatDate,
  getGreeting,
  xpForNextLevel,
  calculateLevel,
  levelProgress,
  getStartOfDay,
  getEndOfDay,
  shouldRefillHearts,
};
