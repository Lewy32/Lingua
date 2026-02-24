/**
 * Vocabulary Routes
 * Word learning, SRS review
 */

const express = require('express');
const { prisma } = require('../config/database');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /vocabulary
 * Get vocabulary for a language
 */
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { language, level, category, slang, limit = 50, offset = 0 } = req.query;

    if (!language) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Language parameter required',
      });
    }

    const where = { languageCode: language };
    if (level) where.cefrLevel = level;
    if (category) where.category = category;
    if (slang === 'true') where.isSlang = true;
    if (slang === 'false') where.isSlang = false;

    const [vocabulary, total] = await Promise.all([
      prisma.vocabularyItem.findMany({
        where,
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { cefrLevel: 'asc' },
      }),
      prisma.vocabularyItem.count({ where }),
    ]);

    res.json({
      vocabulary,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /vocabulary/review
 * Get words due for SRS review
 */
router.get('/review', authenticate, async (req, res, next) => {
  try {
    const { language, limit = 20 } = req.query;

    const where = {
      userId: req.userId,
      nextReview: { lte: new Date() },
    };

    if (language) {
      where.vocabulary = { languageCode: language };
    }

    const dueItems = await prisma.sRSItem.findMany({
      where,
      include: {
        vocabulary: true,
      },
      orderBy: { nextReview: 'asc' },
      take: parseInt(limit),
    });

    res.json({
      reviewItems: dueItems,
      dueCount: dueItems.length,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /vocabulary/:id/learn
 * Add word to user's learning list
 */
router.post('/:id/learn', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const vocabulary = await prisma.vocabularyItem.findUnique({
      where: { id },
    });

    if (!vocabulary) {
      return res.status(404).json({ error: 'Vocabulary item not found' });
    }

    const srsItem = await prisma.sRSItem.upsert({
      where: {
        userId_vocabularyId: {
          userId: req.userId,
          vocabularyId: id,
        },
      },
      create: {
        userId: req.userId,
        vocabularyId: id,
        nextReview: new Date(),
      },
      update: {},
    });

    // Update user progress
    await prisma.userProgress.upsert({
      where: {
        userId_languageCode: {
          userId: req.userId,
          languageCode: vocabulary.languageCode,
        },
      },
      create: {
        userId: req.userId,
        languageCode: vocabulary.languageCode,
        wordsLearned: 1,
      },
      update: {
        wordsLearned: { increment: 1 },
      },
    });

    res.json({
      srsItem,
      message: 'Word added to learning list',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /vocabulary/:id/review
 * Submit review result (SRS update)
 */
router.post('/:id/review', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quality } = req.body; // 0-5 scale (SM-2 algorithm)

    if (quality === undefined || quality < 0 || quality > 5) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Quality must be 0-5',
      });
    }

    const srsItem = await prisma.sRSItem.findUnique({
      where: {
        userId_vocabularyId: {
          userId: req.userId,
          vocabularyId: id,
        },
      },
    });

    if (!srsItem) {
      return res.status(404).json({ error: 'SRS item not found' });
    }

    // SM-2 Algorithm
    let { easeFactor, interval, repetitions } = srsItem;

    if (quality >= 3) {
      // Correct response
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    } else {
      // Incorrect response
      repetitions = 0;
      interval = 1;
    }

    // Update ease factor
    easeFactor = Math.max(
      1.3,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    const updated = await prisma.sRSItem.update({
      where: {
        userId_vocabularyId: {
          userId: req.userId,
          vocabularyId: id,
        },
      },
      data: {
        easeFactor,
        interval,
        repetitions,
        nextReview,
        lastReview: new Date(),
        correctCount: quality >= 3 ? { increment: 1 } : undefined,
        incorrectCount: quality < 3 ? { increment: 1 } : undefined,
      },
    });

    res.json({
      srsItem: updated,
      nextReviewIn: `${interval} day(s)`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /vocabulary/stats
 * Get vocabulary learning stats
 */
router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const { language } = req.query;

    const where = { userId: req.userId };
    if (language) {
      where.vocabulary = { languageCode: language };
    }

    const [total, dueNow, mastered] = await Promise.all([
      prisma.sRSItem.count({ where }),
      prisma.sRSItem.count({
        where: {
          ...where,
          nextReview: { lte: new Date() },
        },
      }),
      prisma.sRSItem.count({
        where: {
          ...where,
          interval: { gte: 21 }, // 3+ weeks = mastered
        },
      }),
    ]);

    res.json({
      stats: {
        total,
        dueNow,
        mastered,
        learning: total - mastered,
        masteryRate: total > 0 ? Math.round((mastered / total) * 100) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
