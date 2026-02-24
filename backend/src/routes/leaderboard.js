const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Friend = require('../models/Friend');
const { protect } = require('../middleware/auth');
const { getRankByXP } = require('../services/ranking');

// All routes require authentication
router.use(protect);

/**
 * @route   GET /api/leaderboard/friends
 * @desc    Get friends leaderboard (sorted by total XP)
 * @access  Private
 */
router.get('/friends', async (req, res) => {
  try {
    const friends = await Friend.getFriends(req.user._id);
    
    // Get friend IDs and include current user
    const friendIds = friends.map(f => f.friend._id);
    friendIds.push(req.user._id);

    // Fetch users with their stats
    const users = await User.find({ _id: { $in: friendIds } })
      .select('name email level xp totalXP weeklyXP streak rank')
      .sort({ totalXP: -1, xp: -1 });

    const leaderboard = users.map((user, index) => ({
      position: index + 1,
      _id: user._id,
      name: user.name,
      level: user.level,
      xp: user.totalXP || user.xp,
      weeklyXP: user.weeklyXP || 0,
      streak: user.streak?.currentStreak || 0,
      rank: user.rank || getRankByXP(user.totalXP || user.xp).name,
      isCurrentUser: user._id.toString() === req.user._id.toString()
    }));

    // Find current user's position
    const userPosition = leaderboard.findIndex(u => u.isCurrentUser) + 1;

    res.json({
      success: true,
      data: {
        leaderboard,
        userPosition,
        totalFriends: leaderboard.length - 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/leaderboard/global
 * @desc    Get global top 100 leaderboard
 * @access  Private
 */
router.get('/global', async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get top users
    const users = await User.find()
      .select('name level xp totalXP weeklyXP streak rank')
      .sort({ totalXP: -1, xp: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments();

    // Get current user's position
    const currentUserXP = req.user.totalXP || req.user.xp;
    const usersAbove = await User.countDocuments({
      $or: [
        { totalXP: { $gt: currentUserXP } },
        { totalXP: currentUserXP, xp: { $gt: req.user.xp } }
      ]
    });
    const userPosition = usersAbove + 1;

    const leaderboard = users.map((user, index) => ({
      position: skip + index + 1,
      _id: user._id,
      name: user.name,
      level: user.level,
      xp: user.totalXP || user.xp,
      weeklyXP: user.weeklyXP || 0,
      streak: user.streak?.currentStreak || 0,
      rank: user.rank || getRankByXP(user.totalXP || user.xp).name,
      isCurrentUser: user._id.toString() === req.user._id.toString()
    }));

    res.json({
      success: true,
      data: {
        leaderboard,
        userPosition,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/leaderboard/weekly
 * @desc    Get weekly leaderboard (resets every Monday)
 * @access  Private
 */
router.get('/weekly', async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get users sorted by weekly XP
    const users = await User.find({ weeklyXP: { $gt: 0 } })
      .select('name level xp totalXP weeklyXP streak rank')
      .sort({ weeklyXP: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ weeklyXP: { $gt: 0 } });

    // Get current user's weekly position
    const currentUserWeeklyXP = req.user.weeklyXP || 0;
    const usersAbove = await User.countDocuments({
      weeklyXP: { $gt: currentUserWeeklyXP }
    });
    const userPosition = currentUserWeeklyXP > 0 ? usersAbove + 1 : null;

    const leaderboard = users.map((user, index) => ({
      position: skip + index + 1,
      _id: user._id,
      name: user.name,
      level: user.level,
      xp: user.totalXP || user.xp,
      weeklyXP: user.weeklyXP || 0,
      streak: user.streak?.currentStreak || 0,
      rank: user.rank || getRankByXP(user.totalXP || user.xp).name,
      isCurrentUser: user._id.toString() === req.user._id.toString()
    }));

    // Calculate next reset time (next Monday at midnight UTC)
    const now = new Date();
    const daysUntilMonday = (8 - now.getUTCDay()) % 7 || 7;
    const nextReset = new Date(now);
    nextReset.setUTCDate(now.getUTCDate() + daysUntilMonday);
    nextReset.setUTCHours(0, 0, 0, 0);

    res.json({
      success: true,
      data: {
        leaderboard,
        userPosition,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        nextReset: nextReset.toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/leaderboard/ranks
 * @desc    Get all rank definitions
 * @access  Private
 */
router.get('/ranks', async (req, res) => {
  try {
    const { getAllRanks } = require('../services/ranking');
    
    res.json({
      success: true,
      data: getAllRanks()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
