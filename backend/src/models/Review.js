const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vocabularyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vocabulary',
    required: true
  },
  ease: {
    type: Number,
    default: 2.5,
    min: 1.3
  },
  interval: {
    type: Number,
    default: 1
  },
  repetitions: {
    type: Number,
    default: 0
  },
  nextReviewDate: {
    type: Date,
    default: Date.now
  },
  lastReviewDate: {
    type: Date,
    default: null
  },
  reviewHistory: [{
    date: Date,
    quality: {
      type: Number,
      min: 0,
      max: 5
    },
    timeTaken: Number
  }],
  totalReviews: {
    type: Number,
    default: 0
  },
  correctCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['new', 'learning', 'review', 'mastered'],
    default: 'new'
  }
}, {
  timestamps: true
});

// SM-2 algorithm for spaced repetition
reviewSchema.methods.updateSRS = function(quality) {
  // quality: 0-5 (0=complete blackout, 5=perfect response)

  if (quality < 3) {
    // Reset the interval
    this.repetitions = 0;
    this.interval = 1;
  } else {
    if (this.repetitions === 0) {
      this.interval = 1;
    } else if (this.repetitions === 1) {
      this.interval = 6;
    } else {
      this.interval = Math.round(this.interval * this.ease);
    }
    this.repetitions += 1;
  }

  // Update ease factor
  this.ease = this.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  if (this.ease < 1.3) {
    this.ease = 1.3;
  }

  // Set next review date
  this.nextReviewDate = new Date(Date.now() + this.interval * 24 * 60 * 60 * 1000);
  this.lastReviewDate = new Date();

  // Update status
  if (this.repetitions === 0) {
    this.status = 'learning';
  } else if (this.repetitions < 5) {
    this.status = 'review';
  } else if (this.ease > 2.5 && this.interval > 30) {
    this.status = 'mastered';
  }

  this.totalReviews += 1;
  if (quality >= 3) {
    this.correctCount += 1;
  }
};

// Compound index
reviewSchema.index({ userId: 1, vocabularyId: 1 }, { unique: true });
reviewSchema.index({ userId: 1, nextReviewDate: 1 });

module.exports = mongoose.model('Review', reviewSchema);
