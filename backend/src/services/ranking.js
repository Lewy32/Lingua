/**
 * Ranking Service
 * Handles XP-based ranks and weekly leaderboard resets
 */

const RANKS = [
  { name: 'Bronze', minXP: 0, maxXP: 500, color: '#CD7F32', icon: '🥉' },
  { name: 'Silver', minXP: 501, maxXP: 2000, color: '#C0C0C0', icon: '🥈' },
  { name: 'Gold', minXP: 2001, maxXP: 5000, color: '#FFD700', icon: '🥇' },
  { name: 'Platinum', minXP: 5001, maxXP: 10000, color: '#E5E4E2', icon: '💎' },
  { name: 'Diamond', minXP: 10001, maxXP: 25000, color: '#B9F2FF', icon: '💠' },
  { name: 'Master', minXP: 25001, maxXP: Infinity, color: '#9B59B6', icon: '👑' }
];

/**
 * Get rank based on XP
 * @param {number} xp - User's total XP
 * @returns {object} Rank object with name, color, and icon
 */
const getRankByXP = (xp) => {
  for (const rank of RANKS) {
    if (xp >= rank.minXP && xp <= rank.maxXP) {
      return {
        name: rank.name,
        color: rank.color,
        icon: rank.icon,
        minXP: rank.minXP,
        maxXP: rank.maxXP === Infinity ? null : rank.maxXP,
        progress: rank.maxXP === Infinity 
          ? 1 
          : (xp - rank.minXP) / (rank.maxXP - rank.minXP)
      };
    }
  }
  return RANKS[0]; // Default to Bronze
};

/**
 * Get all ranks for display
 * @returns {array} All rank definitions
 */
const getAllRanks = () => {
  return RANKS.map(r => ({
    ...r,
    maxXP: r.maxXP === Infinity ? null : r.maxXP
  }));
};

/**
 * Get next rank info
 * @param {number} xp - User's current XP
 * @returns {object|null} Next rank info or null if max rank
 */
const getNextRank = (xp) => {
  const currentRank = getRankByXP(xp);
  const currentIndex = RANKS.findIndex(r => r.name === currentRank.name);
  
  if (currentIndex < RANKS.length - 1) {
    const nextRank = RANKS[currentIndex + 1];
    return {
      name: nextRank.name,
      color: nextRank.color,
      icon: nextRank.icon,
      xpRequired: nextRank.minXP,
      xpNeeded: nextRank.minXP - xp
    };
  }
  
  return null; // Already at max rank
};

/**
 * Calculate weekly XP reset date (next Monday at midnight UTC)
 * @returns {Date} Next reset date
 */
const getWeeklyResetDate = () => {
  const now = new Date();
  const daysUntilMonday = (8 - now.getUTCDay()) % 7 || 7;
  const nextMonday = new Date(now);
  nextMonday.setUTCDate(now.getUTCDate() + daysUntilMonday);
  nextMonday.setUTCHours(0, 0, 0, 0);
  return nextMonday;
};

/**
 * Check if weekly reset should occur
 * @param {Date} lastReset - Last reset timestamp
 * @returns {boolean} True if reset is needed
 */
const shouldResetWeeklyXP = (lastReset) => {
  if (!lastReset) return true;
  
  const now = new Date();
  const lastResetDate = new Date(lastReset);
  
  // Get the Monday of current week
  const currentMonday = new Date(now);
  const dayOfWeek = currentMonday.getUTCDay();
  const diff = currentMonday.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  currentMonday.setUTCDate(diff);
  currentMonday.setUTCHours(0, 0, 0, 0);
  
  return lastResetDate < currentMonday;
};

/**
 * Get rank badge HTML/emoji for display
 * @param {string} rankName - Rank name
 * @returns {string} Badge emoji/icon
 */
const getRankBadge = (rankName) => {
  const rank = RANKS.find(r => r.name === rankName);
  return rank ? rank.icon : '🥉';
};

module.exports = {
  RANKS,
  getRankByXP,
  getAllRanks,
  getNextRank,
  getWeeklyResetDate,
  shouldResetWeeklyXP,
  getRankBadge
};
