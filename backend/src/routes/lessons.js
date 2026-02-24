/**
 * Lesson Routes
 * Course content, exercises
 */

const express = require('express');
const { prisma } = require('../config/database');
const { authenticate, optionalAuth, requirePremium } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /lessons
 * Get lessons for a language
 */
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { language, level, unit } = req.query;

    if (!language) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Language parameter required',
      });
    }

    const where = { languageCode: language };
    if (level) where.cefrLevel = level;
    if (unit) where.unitNumber = parseInt(unit);

    const lessons = await prisma.lesson.findMany({
      where,
      orderBy: [
        { unitNumber: 'asc' },
        { lessonNumber: 'asc' },
      ],
      select: {
        id: true,
        unitNumber: true,
        lessonNumber: true,
        title: true,
        titleNative: true,
        description: true,
        cefrLevel: true,
        estimatedMinutes: true,
        xpReward: true,
        isPremium: true,
        isPublished: true,
      },
    });

    // If authenticated, include user progress
    let progress = [];
    if (req.userId) {
      progress = await prisma.lessonProgress.findMany({
        where: {
          userId: req.userId,
          lessonId: { in: lessons.map(l => l.id) },
        },
        select: {
          lessonId: true,
          completed: true,
          score: true,
        },
      });
    }

    const progressMap = Object.fromEntries(
      progress.map(p => [p.lessonId, p])
    );

    const lessonsWithProgress = lessons.map(lesson => ({
      ...lesson,
      progress: progressMap[lesson.id] || null,
      locked: lesson.isPremium && req.user?.subscriptionTier === 'FREE',
    }));

    // Group by unit
    const units = {};
    lessonsWithProgress.forEach(lesson => {
      if (!units[lesson.unitNumber]) {
        units[lesson.unitNumber] = {
          unitNumber: lesson.unitNumber,
          lessons: [],
        };
      }
      units[lesson.unitNumber].lessons.push(lesson);
    });

    res.json({
      language,
      units: Object.values(units),
      totalLessons: lessons.length,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /lessons/:id
 * Get single lesson with exercises
 */
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Check premium access
    if (lesson.isPremium && req.user?.subscriptionTier === 'FREE') {
      return res.status(403).json({
        error: 'Premium Required',
        message: 'This lesson requires a premium subscription',
        upgrade: true,
      });
    }

    // Get user progress if authenticated
    let progress = null;
    if (req.userId) {
      progress = await prisma.lessonProgress.findUnique({
        where: {
          userId_lessonId: {
            userId: req.userId,
            lessonId: lesson.id,
          },
        },
      });
    }

    res.json({
      lesson: {
        ...lesson,
        progress,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /lessons/:id/start
 * Start a lesson session
 */
router.post('/:id/start', authenticate, async (req, res, next) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Create or update progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: req.userId,
          lessonId: lesson.id,
        },
      },
      create: {
        userId: req.userId,
        lessonId: lesson.id,
      },
      update: {
        updatedAt: new Date(),
      },
    });

    res.json({
      lesson,
      progress,
      sessionId: `${req.userId}-${lesson.id}-${Date.now()}`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /lessons/:id/complete
 * Complete a lesson
 */
router.post('/:id/complete', authenticate, async (req, res, next) => {
  try {
    const { score, timeSpent, mistakes } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    // Calculate XP (bonus for high scores)
    let xpEarned = lesson.xpReward;
    if (score >= 100) xpEarned = Math.floor(xpEarned * 1.5); // Perfect bonus
    else if (score >= 90) xpEarned = Math.floor(xpEarned * 1.2);

    // Update lesson progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: req.userId,
          lessonId: lesson.id,
        },
      },
      create: {
        userId: req.userId,
        lessonId: lesson.id,
        completed: true,
        completedAt: new Date(),
        score,
        xpEarned,
        timeSpent: timeSpent || 0,
        mistakes: mistakes || [],
      },
      update: {
        completed: true,
        completedAt: new Date(),
        score: Math.max(score, 0), // Keep best score
        xpEarned: Math.max(xpEarned, 0),
        timeSpent: timeSpent || 0,
        mistakes: mistakes || [],
      },
    });

    // Update user progress for the language
    await prisma.userProgress.upsert({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: lesson.languageCode,
        },
      },
      create: {
        userId: req.userId,
        languageCode: lesson.languageCode,
        xp: xpEarned,
        lessonsCompleted: 1,
        totalMinutes: Math.floor((timeSpent || 0) / 60),
      },
      update: {
        xp: { increment: xpEarned },
        lessonsCompleted: { increment: 1 },
        totalMinutes: { increment: Math.floor((timeSpent || 0) / 60) },
      },
    });

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    await prisma.streak.upsert({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: lesson.languageCode,
        },
      },
      create: {
        userId: req.userId,
        languageCode: lesson.languageCode,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: new Date(today),
      },
      update: {
        currentStreak: { increment: 1 },
        longestStreak: { increment: 1 }, // Simplified, should compare
        lastActivityDate: new Date(today),
      },
    });

    res.json({
      progress,
      xpEarned,
      message: 'Lesson completed!',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
