/**
 * User Routes
 * Profile management, settings
 */

const express = require('express');
const { prisma } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /users/profile
 * Get current user's full profile
 */
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        progress: true,
        streaks: true,
        achievements: {
          include: { achievement: true },
        },
        _count: {
          select: {
            friendsInitiated: { where: { status: 'ACCEPTED' } },
            friendsReceived: { where: { status: 'ACCEPTED' } },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate total stats
    const totalXp = user.progress.reduce((sum, p) => sum + p.xp, 0);
    const totalWords = user.progress.reduce((sum, p) => sum + p.wordsLearned, 0);
    const totalLessons = user.progress.reduce((sum, p) => sum + p.lessonsCompleted, 0);
    const friendCount = user._count.friendsInitiated + user._count.friendsReceived;

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        subscriptionTier: user.subscriptionTier,
        subscriptionEnds: user.subscriptionEnds,
        nativeLanguage: user.nativeLanguage,
        timezone: user.timezone,
        createdAt: user.createdAt,
      },
      stats: {
        totalXp,
        totalWords,
        totalLessons,
        friendCount,
        achievementCount: user.achievements.length,
        languagesLearning: user.progress.length,
      },
      progress: user.progress,
      streaks: user.streaks,
      achievements: user.achievements.map(ua => ({
        ...ua.achievement,
        unlockedAt: ua.unlockedAt,
      })),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /users/profile
 * Update profile
 */
router.patch('/profile', authenticate, async (req, res, next) => {
  try {
    const { displayName, avatarUrl, nativeLanguage, timezone } = req.body;

    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (nativeLanguage !== undefined) updateData.nativeLanguage = nativeLanguage;
    if (timezone !== undefined) updateData.timezone = timezone;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        nativeLanguage: true,
        timezone: true,
      },
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /users/:username
 * Get public profile by username
 */
router.get('/:username', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.params.username },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        createdAt: true,
        progress: {
          select: {
            languageCode: true,
            cefrLevel: true,
            xp: true,
          },
        },
        achievements: {
          include: { achievement: true },
          take: 5,
          orderBy: { unlockedAt: 'desc' },
        },
        streaks: {
          select: {
            languageCode: true,
            currentStreak: true,
            longestStreak: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const totalXp = user.progress.reduce((sum, p) => sum + p.xp, 0);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        totalXp,
        languages: user.progress,
        recentAchievements: user.achievements.map(ua => ({
          ...ua.achievement,
          unlockedAt: ua.unlockedAt,
        })),
        streaks: user.streaks,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /users/account
 * Delete account
 */
router.delete('/account', authenticate, async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: { id: req.userId },
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
