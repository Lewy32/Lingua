const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    default: 1
  },
  xp: {
    type: Number,
    default: 0
  },
  // Social/Ranking fields
  totalXP: {
    type: Number,
    default: 0
  },
  weeklyXP: {
    type: Number,
    default: 0
  },
  weeklyXPResetAt: {
    type: Date,
    default: null
  },
  rank: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master'],
    default: 'Bronze'
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  hearts: {
    type: Number,
    default: 5,
    max: 5
  },
  streak: {
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    lastActivityDate: {
      type: Date,
      default: null
    }
  },
  stats: {
    wordsLearned: {
      type: Number,
      default: 0
    },
    lessonsCompleted: {
      type: Number,
      default: 0
    },
    totalTimeSpent: {
      type: Number,
      default: 0
    },
    accuracy: {
      type: Number,
      default: 0
    }
  },
  settings: {
    notifications: {
      type: Boolean,
      default: true
    },
    dailyGoal: {
      type: Number,
      default: 20
    },
    audioEnabled: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for leaderboards
userSchema.index({ totalXP: -1 });
userSchema.index({ weeklyXP: -1 });
userSchema.index({ lastActive: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update streak
userSchema.methods.updateStreak = function() {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastActivity = this.streak.lastActivityDate
    ? new Date(this.streak.lastActivityDate).setHours(0, 0, 0, 0)
    : null;

  if (!lastActivity || lastActivity < today - 86400000) {
    // More than 1 day gap, reset streak
    this.streak.currentStreak = 1;
  } else if (lastActivity === today - 86400000) {
    // Exactly 1 day ago, increment streak
    this.streak.currentStreak += 1;
  }
  // If same day, don't change streak

  this.streak.lastActivityDate = new Date();

  if (this.streak.currentStreak > this.streak.longestStreak) {
    this.streak.longestStreak = this.streak.currentStreak;
  }
};

// Refill hearts at midnight
userSchema.methods.refillHearts = function() {
  const now = new Date();
  const lastActivity = new Date(this.streak.lastActivityDate);

  if (now.getDate() !== lastActivity.getDate()) {
    this.hearts = 5;
  }
};

// Add XP and update rank
userSchema.methods.addXP = function(amount) {
  this.xp += amount;
  this.totalXP = (this.totalXP || 0) + amount;
  this.weeklyXP = (this.weeklyXP || 0) + amount;
  
  // Update rank based on totalXP
  const ranks = [
    { name: 'Bronze', minXP: 0 },
    { name: 'Silver', minXP: 501 },
    { name: 'Gold', minXP: 2001 },
    { name: 'Platinum', minXP: 5001 },
    { name: 'Diamond', minXP: 10001 },
    { name: 'Master', minXP: 25001 }
  ];
  
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (this.totalXP >= ranks[i].minXP) {
      this.rank = ranks[i].name;
      break;
    }
  }
};

// Update last active timestamp
userSchema.methods.updateActivity = function() {
  this.lastActive = new Date();
};

// Check if user is online (active in last 5 minutes)
userSchema.methods.isOnline = function() {
  if (!this.lastActive) return false;
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return this.lastActive > fiveMinutesAgo;
};

// Reset weekly XP if needed (call on each request)
userSchema.methods.checkWeeklyReset = function() {
  const now = new Date();
  const lastReset = this.weeklyXPResetAt;
  
  if (!lastReset) {
    this.weeklyXPResetAt = now;
    return;
  }
  
  // Get the Monday of current week
  const currentMonday = new Date(now);
  const dayOfWeek = currentMonday.getUTCDay();
  const diff = currentMonday.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  currentMonday.setUTCDate(diff);
  currentMonday.setUTCHours(0, 0, 0, 0);
  
  if (new Date(lastReset) < currentMonday) {
    this.weeklyXP = 0;
    this.weeklyXPResetAt = now;
  }
};

module.exports = mongoose.model('User', userSchema);
