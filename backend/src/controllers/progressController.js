const Progress = require('../models/Progress');
const User = require('../models/User');

// Get user's progress for all lessons
exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id })
      .populate('lessonId')
      .sort({ 'lessonId.order': 1 });

    res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message
    });
  }
};

// Get progress for specific lesson
exports.getLessonProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user.id,
      lessonId: req.params.lessonId
    }).populate('lessonId');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found'
      });
    }

    res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message
    });
  }
};

// Update or create progress
exports.updateProgress = async (req, res) => {
  try {
    const { lessonId, status, score, correctAnswers, totalQuestions, timeSpent } = req.body;

    let progress = await Progress.findOne({
      userId: req.user.id,
      lessonId
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        lessonId,
        status,
        score,
        correctAnswers,
        totalQuestions,
        timeSpent
      });
    } else {
      progress.status = status || progress.status;
      progress.score = score !== undefined ? score : progress.score;
      progress.correctAnswers = correctAnswers !== undefined ? correctAnswers : progress.correctAnswers;
      progress.totalQuestions = totalQuestions !== undefined ? totalQuestions : progress.totalQuestions;
      progress.timeSpent += timeSpent || 0;
      progress.attemptsCount += 1;
      progress.lastAccessedAt = Date.now();
    }

    if (status === 'completed' && !progress.completedAt) {
      progress.completedAt = Date.now();

      // Update user stats and XP
      const user = await User.findById(req.user.id);
      user.xp += 100;
      user.stats.lessonsCompleted += 1;
      user.stats.totalTimeSpent += timeSpent || 0;

      // Calculate new accuracy
      const totalAccuracy = (user.stats.accuracy * (user.stats.lessonsCompleted - 1) + score) / user.stats.lessonsCompleted;
      user.stats.accuracy = Math.round(totalAccuracy);

      // Level up calculation (every 1000 XP)
      const newLevel = Math.floor(user.xp / 1000) + 1;
      if (newLevel > user.level) {
        user.level = newLevel;
      }

      await user.save();
    }

    await progress.save();

    res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
};

// Lose a heart
exports.loseHeart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.hearts > 0) {
      user.hearts -= 1;
      await user.save();
    }

    res.status(200).json({
      success: true,
      hearts: user.hearts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating hearts',
      error: error.message
    });
  }
};
