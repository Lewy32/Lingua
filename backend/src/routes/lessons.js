const express = require('express');
const router = express.Router();
const {
  getAllLessons,
  getLesson,
  getLessonsByLevel,
  createLesson
} = require('../controllers/lessonController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllLessons);
router.get('/:id', protect, getLesson);
router.get('/level/:level', protect, getLessonsByLevel);
router.post('/', protect, createLesson);

module.exports = router;
