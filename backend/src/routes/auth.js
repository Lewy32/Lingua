/**
 * Authentication Routes
 * Email, Apple, Google sign-in
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const { prisma } = require('../config/database');
const { generateToken, generateRefreshToken, authenticate } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /auth/register
 * Register with email/password
 */
router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password, displayName } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email, username, and password are required',
      });
    }

    // Check if user exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existing) {
      return res.status(409).json({
        error: 'Conflict',
        message: existing.email === email 
          ? 'Email already registered' 
          : 'Username already taken',
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        displayName: displayName || username,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        subscriptionTier: true,
      },
    });

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      user,
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /auth/login
 * Login with email/password
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email and password are required',
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password',
      });
    }

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    });

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        subscriptionTier: user.subscriptionTier,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /auth/apple
 * Sign in with Apple
 */
router.post('/apple', async (req, res, next) => {
  try {
    const { identityToken, user: appleUser } = req.body;

    if (!identityToken) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Identity token required',
      });
    }

    // In production, verify the identityToken with Apple's servers
    // For now, we'll trust the client (implement verification in production!)
    
    const appleId = appleUser?.user || identityToken.substring(0, 32); // Simplified
    const email = appleUser?.email;
    const fullName = appleUser?.fullName;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { appleId },
    });

    if (!user && email) {
      // Check if email exists
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        // Link Apple ID to existing account
        user = await prisma.user.update({
          where: { id: user.id },
          data: { appleId },
        });
      }
    }

    if (!user) {
      // Create new user
      const username = `user_${Date.now().toString(36)}`;
      const displayName = fullName 
        ? `${fullName.givenName || ''} ${fullName.familyName || ''}`.trim()
        : username;

      user = await prisma.user.create({
        data: {
          appleId,
          email: email || `${appleId}@privaterelay.appleid.com`,
          username,
          displayName,
        },
      });
    }

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    });

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        subscriptionTier: user.subscriptionTier,
      },
      token,
      refreshToken,
      isNewUser: !user.createdAt || (Date.now() - new Date(user.createdAt).getTime()) < 60000,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /auth/google
 * Sign in with Google
 */
router.post('/google', async (req, res, next) => {
  try {
    const { idToken, user: googleUser } = req.body;

    if (!idToken) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'ID token required',
      });
    }

    // In production, verify the idToken with Google's servers
    const googleId = googleUser?.id || idToken.substring(0, 32);
    const email = googleUser?.email;
    const displayName = googleUser?.name;
    const avatarUrl = googleUser?.photo;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { googleId },
    });

    if (!user && email) {
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId, avatarUrl: avatarUrl || user.avatarUrl },
        });
      }
    }

    if (!user) {
      const username = `user_${Date.now().toString(36)}`;

      user = await prisma.user.create({
        data: {
          googleId,
          email: email || `${googleId}@google.com`,
          username,
          displayName: displayName || username,
          avatarUrl,
        },
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    });

    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        subscriptionTier: user.subscriptionTier,
      },
      token,
      refreshToken,
      isNewUser: !user.createdAt || (Date.now() - new Date(user.createdAt).getTime()) < 60000,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Refresh token required',
      });
    }

    const jwt = require('jsonwebtoken');
    const { JWT_SECRET } = require('../middleware/auth');

    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid refresh token',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User not found',
      });
    }

    const newToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Refresh token expired',
      });
    }
    next(error);
  }
});

/**
 * GET /auth/me
 * Get current user
 */
router.get('/me', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

/**
 * POST /auth/logout
 * Logout (client should discard tokens)
 */
router.post('/logout', authenticate, (req, res) => {
  // In a more complex system, you'd blacklist the token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
