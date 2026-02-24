// Spaced Repetition System (SM-2 Algorithm)
// Based on SuperMemo 2 algorithm

const calculateNextInterval = (currentInterval, repetitions, ease, quality) => {
  // quality: 0-5
  // 0 = complete blackout
  // 1 = incorrect with hint
  // 2 = incorrect but remembered
  // 3 = correct but difficult
  // 4 = correct with hesitation
  // 5 = perfect recall

  if (quality < 3) {
    // Failed - reset
    return {
      interval: 1,
      repetitions: 0,
      ease: Math.max(1.3, ease - 0.2),
    };
  }

  let newInterval;
  let newRepetitions = repetitions + 1;
  let newEase = ease;

  if (newRepetitions === 1) {
    newInterval = 1;
  } else if (newRepetitions === 2) {
    newInterval = 6;
  } else {
    newInterval = Math.round(currentInterval * newEase);
  }

  // Update ease factor
  newEase = newEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEase = Math.max(1.3, newEase); // Minimum ease factor

  return {
    interval: newInterval,
    repetitions: newRepetitions,
    ease: newEase,
  };
};

const calculateNextReviewDate = (intervalDays) => {
  const now = new Date();
  now.setDate(now.getDate() + intervalDays);
  return now;
};

const getStatus = (repetitions, ease, interval) => {
  if (repetitions === 0) return 'learning';
  if (repetitions < 5) return 'review';
  if (ease > 2.5 && interval > 30) return 'mastered';
  return 'review';
};

export const updateReview = (currentReview, quality) => {
  const { interval, repetitions, ease } = calculateNextInterval(
    currentReview.interval,
    currentReview.repetitions,
    currentReview.ease,
    quality
  );

  const nextReviewDate = calculateNextReviewDate(interval);
  const status = getStatus(repetitions, ease, interval);

  return {
    ...currentReview,
    interval,
    repetitions,
    ease,
    nextReviewDate,
    lastReviewDate: new Date(),
    status,
    totalReviews: (currentReview.totalReviews || 0) + 1,
    correctCount: quality >= 3
      ? (currentReview.correctCount || 0) + 1
      : (currentReview.correctCount || 0),
  };
};

export const createNewReview = (vocabularyId) => {
  return {
    vocabularyId,
    ease: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date(),
    lastReviewDate: null,
    status: 'new',
    totalReviews: 0,
    correctCount: 0,
  };
};

export const isDue = (review) => {
  if (!review || !review.nextReviewDate) return false;
  const now = new Date();
  const dueDate = new Date(review.nextReviewDate);
  return now >= dueDate;
};

export const getDueCount = (reviews) => {
  return reviews.filter(isDue).length;
};

export const sortByDueDate = (reviews) => {
  return reviews.sort((a, b) => {
    const dateA = new Date(a.nextReviewDate);
    const dateB = new Date(b.nextReviewDate);
    return dateA - dateB;
  });
};

export default {
  updateReview,
  createNewReview,
  isDue,
  getDueCount,
  sortByDueDate,
};
