/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'lingua-dev-secret-change-in-production';

/**
 * Verify JWT token and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        subscriptionTier: true,
        subscriptionEnds: true,
        nativeLanguage: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User not found',
      });
    }

    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token expired',
      });
    }
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token',
    });
  }
};

/**
 * Optional auth - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (user) {
      req.user = user;
      req.userId = user.id;
    }
  } catch (error) {
    // Ignore errors, continue without user
  }
  next();
};

/**
 * Check if user has premium subscription
 */
const requirePremium = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required',
    });
  }

  const premiumTiers = ['PREMIUM', 'FAMILY', 'LIFETIME'];
  
  if (!premiumTiers.includes(req.user.subscriptionTier)) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Premium subscription required',
      upgrade: true,
    });
  }

  // Check if subscription is still active
  if (req.user.subscriptionEnds && new Date(req.user.subscriptionEnds) < new Date()) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Subscription expired',
      upgrade: true,
    });
  }

  next();
};

/**
 * Generate JWT token
 */
const generateToken = (userId, expiresIn = '30d') => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId, type: 'refresh' }, JWT_SECRET, { expiresIn: '90d' });
};

module.exports = {
  authenticate,
  optionalAuth,
  requirePremium,
  generateToken,
  generateRefreshToken,
  JWT_SECRET,
};
