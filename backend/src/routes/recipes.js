/**
 * Recipe Routes
 * Kitchen feature - cooking with language learning
 */

const express = require('express');
const { prisma } = require('../config/database');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /recipes
 * Get recipes for a language
 */
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { language, difficulty, tag, limit = 20, offset = 0 } = req.query;

    const where = {};
    if (language) where.languageCode = language;
    if (difficulty) where.difficulty = difficulty;
    if (tag) where.tags = { has: tag };

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        select: {
          id: true,
          languageCode: true,
          nameEnglish: true,
          nameNative: true,
          namePhonetic: true,
          description: true,
          difficulty: true,
          prepTime: true,
          cookTime: true,
          servings: true,
          imageUrl: true,
          tags: true,
        },
        take: parseInt(limit),
        skip: parseInt(offset),
        orderBy: { nameEnglish: 'asc' },
      }),
      prisma.recipe.count({ where }),
    ]);

    res.json({
      recipes,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /recipes/:id
 * Get single recipe with full details
 */
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: req.params.id },
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ recipe });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /recipes/random
 * Get random recipe
 */
router.get('/random', optionalAuth, async (req, res, next) => {
  try {
    const { language } = req.query;

    const where = {};
    if (language) where.languageCode = language;

    const count = await prisma.recipe.count({ where });
    
    if (count === 0) {
      return res.status(404).json({ error: 'No recipes found' });
    }

    const skip = Math.floor(Math.random() * count);

    const recipe = await prisma.recipe.findFirst({
      where,
      skip,
    });

    res.json({ recipe });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /recipes/tags
 * Get available tags
 */
router.get('/meta/tags', async (req, res, next) => {
  try {
    const recipes = await prisma.recipe.findMany({
      select: { tags: true },
    });

    const tagCounts = {};
    recipes.forEach(r => {
      r.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const tags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);

    res.json({ tags });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /recipes/languages
 * Get languages with recipes
 */
router.get('/meta/languages', async (req, res, next) => {
  try {
    const recipes = await prisma.recipe.groupBy({
      by: ['languageCode'],
      _count: { id: true },
    });

    const languages = recipes.map(r => ({
      code: r.languageCode,
      recipeCount: r._count.id,
    }));

    res.json({ languages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
