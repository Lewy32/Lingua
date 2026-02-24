const Review = require('../models/Review');
const Vocabulary = require('../models/Vocabulary');
const User = require('../models/User');

// Get due reviews for user
exports.getDueReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      userId: req.user.id,
      nextReviewDate: { $lte: new Date() }
    })
      .populate('vocabularyId')
      .limit(20)
      .sort({ nextReviewDate: 1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// Get all reviews for user
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id })
      .populate('vocabularyId');

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

// Submit review response
exports.submitReview = async (req, res) => {
  try {
    const { vocabularyId, quality, timeTaken } = req.body;

    // quality: 0-5 (0=wrong, 3=hard, 4=good, 5=easy)

    let review = await Review.findOne({
      userId: req.user.id,
      vocabularyId
    });

    if (!review) {
      // Create new review
      review = new Review({
        userId: req.user.id,
        vocabularyId
      });
    }

    // Update SRS algorithm
    review.updateSRS(quality);

    // Add to review history
    review.reviewHistory.push({
      date: new Date(),
      quality,
      timeTaken
    });

    await review.save();

    // Update user stats
    const user = await User.findById(req.user.id);

    // Count unique words learned (mastered or in review)
    const learnedWords = await Review.countDocuments({
      userId: req.user.id,
      status: { $in: ['review', 'mastered'] }
    });
    user.stats.wordsLearned = learnedWords;

    await user.save();

    res.status(200).json({
      success: true,
      review,
      nextReviewDate: review.nextReviewDate,
      status: review.status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting review',
      error: error.message
    });
  }
};

// Get review statistics
exports.getReviewStats = async (req, res) => {
  try {
    const stats = await Review.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const dueCount = await Review.countDocuments({
      userId: req.user.id,
      nextReviewDate: { $lte: new Date() }
    });

    res.status(200).json({
      success: true,
      stats,
      dueCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review stats',
      error: error.message
    });
  }
};
