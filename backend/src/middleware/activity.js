/**
 * Activity Tracking Middleware
 * Updates user's lastActive timestamp on each authenticated request
 */

const updateActivity = async (req, res, next) => {
  try {
    // Only update if user is authenticated
    if (req.user) {
      req.user.lastActive = new Date();
      
      // Also check for weekly XP reset
      if (typeof req.user.checkWeeklyReset === 'function') {
        req.user.checkWeeklyReset();
      }
      
      // Save without validation to avoid any issues
      await req.user.save({ validateBeforeSave: false });
    }
    next();
  } catch (error) {
    // Don't fail the request if activity update fails
    console.error('Activity update error:', error);
    next();
  }
};

module.exports = { updateActivity };
