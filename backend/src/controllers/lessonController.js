const Lesson = require('../models/Lesson');

// Get all lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: lessons.length,
      lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons',
      error: error.message
    });
  }
};

// Get single lesson
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    res.status(200).json({
      success: true,
      lesson
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lesson',
      error: error.message
    });
  }
};

// Get lessons by level
exports.getLessonsByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const lessons = await Lesson.find({ level }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: lessons.length,
      lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lessons',
      error: error.message
    });
  }
};

// Create lesson (admin function)
exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);

    res.status(201).json({
      success: true,
      lesson
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lesson',
      error: error.message
    });
  }
};
