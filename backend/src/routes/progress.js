const express = require('express');
const router = express.Router();
const {
  getUserProgress,
  getLessonProgress,
  updateProgress,
  loseHeart
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getUserProgress);
router.get('/lesson/:lessonId', protect, getLessonProgress);
router.post('/', protect, updateProgress);
router.post('/lose-heart', protect, loseHeart);

module.exports = router;
