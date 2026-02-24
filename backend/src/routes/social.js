/**
 * Social Routes
 * Friends, leaderboards, achievements
 */

const express = require('express');
const { prisma } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /social/friends
 * Get user's friends
 */
router.get('/friends', authenticate, async (req, res, next) => {
  try {
    const [initiated, received] = await Promise.all([
      prisma.friendship.findMany({
        where: {
          initiatorId: req.userId,
          status: 'ACCEPTED',
        },
        include: {
          receiver: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              lastActiveAt: true,
              progress: {
                select: {
                  languageCode: true,
                  xp: true,
                  cefrLevel: true,
                },
              },
            },
          },
        },
      }),
      prisma.friendship.findMany({
        where: {
          receiverId: req.userId,
          status: 'ACCEPTED',
        },
        include: {
          initiator: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              lastActiveAt: true,
              progress: {
                select: {
                  languageCode: true,
                  xp: true,
                  cefrLevel: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const friends = [
      ...initiated.map(f => ({ ...f.receiver, friendshipId: f.id })),
      ...received.map(f => ({ ...f.initiator, friendshipId: f.id })),
    ];

    // Sort by last active
    friends.sort((a, b) => 
      new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime()
    );

    res.json({ friends });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /social/friends/requests
 * Get pending friend requests
 */
router.get('/friends/requests', authenticate, async (req, res, next) => {
  try {
    const requests = await prisma.friendship.findMany({
      where: {
        receiverId: req.userId,
        status: 'PENDING',
      },
      include: {
        initiator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      requests: requests.map(r => ({
        id: r.id,
        from: r.initiator,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /social/friends/add
 * Send friend request
 */
router.post('/friends/add', authenticate, async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Username required',
      });
    }

    const targetUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!targetUser) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found',
      });
    }

    if (targetUser.id === req.userId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Cannot add yourself',
      });
    }

    // Check existing friendship
    const existing = await prisma.friendship.findFirst({
      where: {
        OR: [
          { initiatorId: req.userId, receiverId: targetUser.id },
          { initiatorId: targetUser.id, receiverId: req.userId },
        ],
      },
    });

    if (existing) {
      if (existing.status === 'ACCEPTED') {
        return res.status(400).json({
          error: 'Already Friends',
          message: 'You are already friends',
        });
      }
      if (existing.status === 'PENDING') {
        return res.status(400).json({
          error: 'Pending',
          message: 'Friend request already pending',
        });
      }
      if (existing.status === 'BLOCKED') {
        return res.status(403).json({
          error: 'Blocked',
          message: 'Cannot add this user',
        });
      }
    }

    const friendship = await prisma.friendship.create({
      data: {
        initiatorId: req.userId,
        receiverId: targetUser.id,
        status: 'PENDING',
      },
    });

    res.json({
      friendship,
      message: 'Friend request sent',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /social/friends/:id/accept
 * Accept friend request
 */
router.post('/friends/:id/accept', authenticate, async (req, res, next) => {
  try {
    const friendship = await prisma.friendship.findFirst({
      where: {
        id: req.params.id,
        receiverId: req.userId,
        status: 'PENDING',
      },
    });

    if (!friendship) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Friend request not found',
      });
    }

    const updated = await prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: 'ACCEPTED' },
      include: {
        initiator: {
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
      friendship: updated,
      message: 'Friend request accepted',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /social/friends/:id/decline
 * Decline friend request
 */
router.post('/friends/:id/decline', authenticate, async (req, res, next) => {
  try {
    const friendship = await prisma.friendship.findFirst({
      where: {
        id: req.params.id,
        receiverId: req.userId,
        status: 'PENDING',
      },
    });

    if (!friendship) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Friend request not found',
      });
    }

    await prisma.friendship.delete({
      where: { id: friendship.id },
    });

    res.json({ message: 'Friend request declined' });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /social/friends/:id
 * Remove friend
 */
router.delete('/friends/:id', authenticate, async (req, res, next) => {
  try {
    const friendship = await prisma.friendship.findFirst({
      where: {
        id: req.params.id,
        OR: [
          { initiatorId: req.userId },
          { receiverId: req.userId },
        ],
        status: 'ACCEPTED',
      },
    });

    if (!friendship) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Friendship not found',
      });
    }

    await prisma.friendship.delete({
      where: { id: friendship.id },
    });

    res.json({ message: 'Friend removed' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /social/achievements
 * Get all achievements
 */
router.get('/achievements', authenticate, async (req, res, next) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { requirement: 'asc' },
    });

    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: req.userId },
    });

    const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId));

    const achievementsWithStatus = achievements.map(a => ({
      ...a,
      unlocked: unlockedIds.has(a.id),
      unlockedAt: userAchievements.find(ua => ua.achievementId === a.id)?.unlockedAt,
    }));

    res.json({ achievements: achievementsWithStatus });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /social/search
 * Search for users
 */
router.get('/search', authenticate, async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Search query must be at least 2 characters',
      });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: q, mode: 'insensitive' } },
          { displayName: { contains: q, mode: 'insensitive' } },
        ],
        NOT: { id: req.userId },
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
      },
      take: 20,
    });

    res.json({ users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
