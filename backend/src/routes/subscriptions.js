/**
 * Subscription Routes
 * Payment handling, subscription management
 * Supports: Apple IAP, Google Play, Stripe
 */

const express = require('express');
const { prisma } = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Product definitions
const PRODUCTS = {
  premium_monthly: {
    id: 'premium_monthly',
    name: 'Premium Monthly',
    tier: 'PREMIUM',
    price: 9.99,
    currency: 'USD',
    period: 'monthly',
    features: [
      'Unlimited lessons',
      'All languages',
      'Offline mode',
      'No ads',
      'Advanced exercises',
    ],
  },
  premium_yearly: {
    id: 'premium_yearly',
    name: 'Premium Yearly',
    tier: 'PREMIUM',
    price: 79.99,
    currency: 'USD',
    period: 'yearly',
    savings: '33%',
    features: [
      'Unlimited lessons',
      'All languages',
      'Offline mode',
      'No ads',
      'Advanced exercises',
    ],
  },
  family_monthly: {
    id: 'family_monthly',
    name: 'Family Monthly',
    tier: 'FAMILY',
    price: 14.99,
    currency: 'USD',
    period: 'monthly',
    features: [
      'Up to 6 family members',
      'All Premium features',
      'Family leaderboard',
      'Parental controls',
    ],
  },
  family_yearly: {
    id: 'family_yearly',
    name: 'Family Yearly',
    tier: 'FAMILY',
    price: 119.99,
    currency: 'USD',
    period: 'yearly',
    savings: '33%',
    features: [
      'Up to 6 family members',
      'All Premium features',
      'Family leaderboard',
      'Parental controls',
    ],
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime Access',
    tier: 'LIFETIME',
    price: 199.99,
    currency: 'USD',
    period: 'lifetime',
    features: [
      'Pay once, learn forever',
      'All Premium features',
      'All future languages',
      'Priority support',
    ],
  },
};

/**
 * GET /subscriptions/products
 * Get available subscription products
 */
router.get('/products', (req, res) => {
  res.json({
    products: Object.values(PRODUCTS),
    currentPromo: null, // Add promos here
  });
});

/**
 * GET /subscriptions/status
 * Get user's subscription status
 */
router.get('/status', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        subscriptionTier: true,
        subscriptionId: true,
        subscriptionEnds: true,
      },
    });

    const isActive = user.subscriptionTier !== 'FREE' && 
      (!user.subscriptionEnds || new Date(user.subscriptionEnds) > new Date());

    res.json({
      tier: user.subscriptionTier,
      isActive,
      expiresAt: user.subscriptionEnds,
      features: getFeaturesByTier(user.subscriptionTier),
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /subscriptions/verify/apple
 * Verify Apple IAP receipt
 */
router.post('/verify/apple', authenticate, async (req, res, next) => {
  try {
    const { receiptData, productId } = req.body;

    if (!receiptData || !productId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Receipt data and product ID required',
      });
    }

    // In production: Verify receipt with Apple's servers
    // https://developer.apple.com/documentation/storekit/in-app_purchase/validating_receipts_with_the_app_store

    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({
        error: 'Invalid Product',
        message: 'Unknown product ID',
      });
    }

    // Calculate subscription end date
    let subscriptionEnds = null;
    if (product.period === 'monthly') {
      subscriptionEnds = new Date();
      subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    } else if (product.period === 'yearly') {
      subscriptionEnds = new Date();
      subscriptionEnds.setFullYear(subscriptionEnds.getFullYear() + 1);
    }
    // Lifetime = null (never expires)

    // Record transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: req.userId,
        provider: 'APPLE',
        providerId: `apple_${Date.now()}`, // In production: use actual transaction ID
        amount: product.price,
        currency: product.currency,
        productId,
        productType: product.period === 'lifetime' ? 'LIFETIME' : 'SUBSCRIPTION',
        status: 'COMPLETED',
      },
    });

    // Update user subscription
    await prisma.user.update({
      where: { id: req.userId },
      data: {
        subscriptionTier: product.tier,
        subscriptionId: transaction.id,
        subscriptionEnds,
      },
    });

    res.json({
      success: true,
      tier: product.tier,
      expiresAt: subscriptionEnds,
      transactionId: transaction.id,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /subscriptions/verify/google
 * Verify Google Play purchase
 */
router.post('/verify/google', authenticate, async (req, res, next) => {
  try {
    const { purchaseToken, productId } = req.body;

    if (!purchaseToken || !productId) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Purchase token and product ID required',
      });
    }

    // In production: Verify with Google Play Developer API
    // https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions

    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({
        error: 'Invalid Product',
        message: 'Unknown product ID',
      });
    }

    let subscriptionEnds = null;
    if (product.period === 'monthly') {
      subscriptionEnds = new Date();
      subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
    } else if (product.period === 'yearly') {
      subscriptionEnds = new Date();
      subscriptionEnds.setFullYear(subscriptionEnds.getFullYear() + 1);
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: req.userId,
        provider: 'GOOGLE',
        providerId: `google_${Date.now()}`,
        amount: product.price,
        currency: product.currency,
        productId,
        productType: product.period === 'lifetime' ? 'LIFETIME' : 'SUBSCRIPTION',
        status: 'COMPLETED',
      },
    });

    await prisma.user.update({
      where: { id: req.userId },
      data: {
        subscriptionTier: product.tier,
        subscriptionId: transaction.id,
        subscriptionEnds,
      },
    });

    res.json({
      success: true,
      tier: product.tier,
      expiresAt: subscriptionEnds,
      transactionId: transaction.id,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /subscriptions/webhook/apple
 * Apple App Store Server Notifications
 */
router.post('/webhook/apple', async (req, res, next) => {
  try {
    // In production: Verify notification signature
    const { notificationType, data } = req.body;

    console.log('Apple webhook:', notificationType, data);

    // Handle different notification types
    switch (notificationType) {
      case 'DID_RENEW':
        // Subscription renewed
        break;
      case 'DID_FAIL_TO_RENEW':
        // Payment failed
        break;
      case 'CANCEL':
      case 'REFUND':
        // Subscription cancelled/refunded
        break;
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /subscriptions/webhook/google
 * Google Play Real-time Developer Notifications
 */
router.post('/webhook/google', async (req, res, next) => {
  try {
    const { message } = req.body;
    
    if (message?.data) {
      const data = JSON.parse(Buffer.from(message.data, 'base64').toString());
      console.log('Google webhook:', data);

      // Handle subscription state changes
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /subscriptions/restore
 * Restore purchases (for users reinstalling app)
 */
router.post('/restore', authenticate, async (req, res, next) => {
  try {
    const { platform, receipts } = req.body;

    // In production: Verify each receipt with the respective store
    // and restore the user's subscription status

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        subscriptionTier: true,
        subscriptionEnds: true,
      },
    });

    res.json({
      restored: user.subscriptionTier !== 'FREE',
      tier: user.subscriptionTier,
      expiresAt: user.subscriptionEnds,
    });
  } catch (error) {
    next(error);
  }
});

// Helper function
function getFeaturesByTier(tier) {
  const features = {
    FREE: {
      lessonsPerDay: 3,
      languages: 1,
      offline: false,
      ads: true,
      advancedExercises: false,
    },
    PREMIUM: {
      lessonsPerDay: Infinity,
      languages: Infinity,
      offline: true,
      ads: false,
      advancedExercises: true,
    },
    FAMILY: {
      lessonsPerDay: Infinity,
      languages: Infinity,
      offline: true,
      ads: false,
      advancedExercises: true,
      familyMembers: 6,
    },
    LIFETIME: {
      lessonsPerDay: Infinity,
      languages: Infinity,
      offline: true,
      ads: false,
      advancedExercises: true,
      prioritySupport: true,
    },
  };
  return features[tier] || features.FREE;
}

module.exports = router;
