const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  // The user who sent the request
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // The user who received the request
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  acceptedAt: {
    type: Date,
    default: null
  }
});

// Compound index to prevent duplicate friendships
friendSchema.index({ requester: 1, recipient: 1 }, { unique: true });

// Index for quick lookups
friendSchema.index({ requester: 1, status: 1 });
friendSchema.index({ recipient: 1, status: 1 });

// Static method to check if friendship exists
friendSchema.statics.findFriendship = async function(userId1, userId2) {
  return this.findOne({
    $or: [
      { requester: userId1, recipient: userId2 },
      { requester: userId2, recipient: userId1 }
    ]
  });
};

// Static method to get all accepted friends for a user
friendSchema.statics.getFriends = async function(userId) {
  const friendships = await this.find({
    $or: [
      { requester: userId, status: 'accepted' },
      { recipient: userId, status: 'accepted' }
    ]
  }).populate('requester recipient', 'name email level xp streak totalXP weeklyXP lastActive rank');

  // Return the friend (not the current user) from each friendship
  return friendships.map(f => {
    const friend = f.requester._id.toString() === userId.toString()
      ? f.recipient
      : f.requester;
    return {
      friendshipId: f._id,
      friend,
      acceptedAt: f.acceptedAt
    };
  });
};

// Static method to get pending requests for a user
friendSchema.statics.getPendingRequests = async function(userId) {
  return this.find({
    recipient: userId,
    status: 'pending'
  }).populate('requester', 'name email level xp rank');
};

// Static method to get sent requests for a user
friendSchema.statics.getSentRequests = async function(userId) {
  return this.find({
    requester: userId,
    status: 'pending'
  }).populate('recipient', 'name email level xp rank');
};

module.exports = mongoose.model('Friend', friendSchema);
