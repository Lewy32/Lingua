const express = require('express');
const router = express.Router();
const {
  getDueReviews,
  getUserReviews,
  submitReview,
  getReviewStats
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/due', protect, getDueReviews);
router.get('/', protect, getUserReviews);
router.post('/', protect, submitReview);
router.get('/stats', protect, getReviewStats);

module.exports = router;
