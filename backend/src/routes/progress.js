/**
 * Progress Routes
 * User learning progress, stats, streaks
 */

const express = require('express');
const { prisma } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /progress
 * Get all language progress for user
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: req.userId },
      orderBy: { updatedAt: 'desc' },
    });

    const streaks = await prisma.streak.findMany({
      where: { userId: req.userId },
    });

    const streakMap = Object.fromEntries(
      streaks.map(s => [s.languageCode, s])
    );

    const progressWithStreaks = progress.map(p => ({
      ...p,
      streak: streakMap[p.languageCode] || null,
    }));

    res.json({ progress: progressWithStreaks });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /progress/:language
 * Get progress for specific language
 */
router.get('/:language', authenticate, async (req, res, next) => {
  try {
    const { language } = req.params;

    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: language,
        },
      },
    });

    if (!progress) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'No progress for this language',
      });
    }

    const streak = await prisma.streak.findUnique({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: language,
        },
      },
    });

    const recentLessons = await prisma.lessonProgress.findMany({
      where: {
        userId: req.userId,
        lesson: { languageCode: language },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            titleNative: true,
            unitNumber: true,
            lessonNumber: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take: 10,
    });

    res.json({
      progress,
      streak,
      recentLessons,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /progress/:language/placement
 * Save placement test results
 */
router.post('/:language/placement', authenticate, async (req, res, next) => {
  try {
    const { language } = req.params;
    const { cefrLevel, score, skillScores } = req.body;

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: language,
        },
      },
      create: {
        userId: req.userId,
        languageCode: language,
        cefrLevel,
        placementTaken: true,
        placementDate: new Date(),
        readingScore: skillScores?.reading || 0,
        writingScore: skillScores?.writing || 0,
        listeningScore: skillScores?.listening || 0,
        speakingScore: skillScores?.speaking || 0,
      },
      update: {
        cefrLevel,
        placementTaken: true,
        placementDate: new Date(),
        readingScore: skillScores?.reading || 0,
        writingScore: skillScores?.writing || 0,
        listeningScore: skillScores?.listening || 0,
        speakingScore: skillScores?.speaking || 0,
      },
    });

    res.json({
      progress,
      message: `Placed at ${cefrLevel} level`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /progress/leaderboard/:language
 * Get leaderboard for language
 */
router.get('/leaderboard/:language', async (req, res, next) => {
  try {
    const { language } = req.params;
    const { period = 'weekly' } = req.query;

    // Date filter
    let dateFilter = {};
    const now = new Date();
    if (period === 'daily') {
      dateFilter = { gte: new Date(now.setHours(0, 0, 0, 0)) };
    } else if (period === 'weekly') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      dateFilter = { gte: weekAgo };
    } else if (period === 'monthly') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      dateFilter = { gte: monthAgo };
    }

    const leaderboard = await prisma.userProgress.findMany({
      where: {
        languageCode: language,
        ...(period !== 'alltime' ? { updatedAt: dateFilter } : {}),
      },
      orderBy: { xp: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({
      language,
      period,
      leaderboard: leaderboard.map((entry, index) => ({
        rank: index + 1,
        user: entry.user,
        xp: entry.xp,
        cefrLevel: entry.cefrLevel,
        lessonsCompleted: entry.lessonsCompleted,
      })),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /progress/:language/streak/freeze
 * Use a streak freeze
 */
router.post('/:language/streak/freeze', authenticate, async (req, res, next) => {
  try {
    const { language } = req.params;

    const streak = await prisma.streak.findUnique({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: language,
        },
      },
    });

    if (!streak) {
      return res.status(404).json({ error: 'No streak found' });
    }

    if (streak.freezesAvailable <= 0) {
      return res.status(400).json({
        error: 'No freezes available',
        message: 'You don\'t have any streak freezes',
      });
    }

    if (streak.freezeUsedToday) {
      return res.status(400).json({
        error: 'Already used',
        message: 'Streak freeze already used today',
      });
    }

    const updated = await prisma.streak.update({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: language,
        },
      },
      data: {
        freezesAvailable: { decrement: 1 },
        freezeUsedToday: true,
      },
    });

    res.json({
      streak: updated,
      message: 'Streak freeze used!',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
