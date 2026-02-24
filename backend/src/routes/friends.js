const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Friend = require('../models/Friend');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

/**
 * @route   POST /api/friends/request
 * @desc    Send a friend request
 * @access  Private
 */
router.post('/request', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot send a friend request to yourself'
      });
    }

    // Check if target user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if friendship already exists
    const existingFriendship = await Friend.findFriendship(req.user._id, userId);
    if (existingFriendship) {
      if (existingFriendship.status === 'accepted') {
        return res.status(400).json({
          success: false,
          message: 'You are already friends with this user'
        });
      }
      if (existingFriendship.status === 'pending') {
        return res.status(400).json({
          success: false,
          message: 'A friend request already exists between you and this user'
        });
      }
    }

    // Create friend request
    const friendRequest = await Friend.create({
      requester: req.user._id,
      recipient: userId
    });

    // Populate for response
    await friendRequest.populate('recipient', 'name email level xp rank');

    res.status(201).json({
      success: true,
      message: 'Friend request sent',
      data: friendRequest
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Friend request already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/friends/accept/:requestId
 * @desc    Accept a friend request
 * @access  Private
 */
router.post('/accept/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;

    const friendRequest = await Friend.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({
        success: false,
        message: 'Friend request not found'
      });
    }

    // Only the recipient can accept
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only accept requests sent to you'
      });
    }

    if (friendRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This request has already been processed'
      });
    }

    friendRequest.status = 'accepted';
    friendRequest.acceptedAt = new Date();
    await friendRequest.save();

    // Add each other to friends arrays
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { friends: friendRequest.requester }
    });
    await User.findByIdAndUpdate(friendRequest.requester, {
      $addToSet: { friends: req.user._id }
    });

    await friendRequest.populate('requester', 'name email level xp rank');

    res.json({
      success: true,
      message: 'Friend request accepted',
      data: friendRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/friends/reject/:requestId
 * @desc    Reject a friend request
 * @access  Private
 */
router.post('/reject/:requestId', async (req, res) => {
  try {
    const { requestId } = req.params;

    const friendRequest = await Friend.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({
        success: false,
        message: 'Friend request not found'
      });
    }

    // Only the recipient can reject
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only reject requests sent to you'
      });
    }

    if (friendRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This request has already been processed'
      });
    }

    friendRequest.status = 'rejected';
    await friendRequest.save();

    res.json({
      success: true,
      message: 'Friend request rejected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/friends/:friendId
 * @desc    Remove a friend
 * @access  Private
 */
router.delete('/:friendId', async (req, res) => {
  try {
    const { friendId } = req.params;

    // Find and delete the friendship
    const friendship = await Friend.findOne({
      $or: [
        { requester: req.user._id, recipient: friendId, status: 'accepted' },
        { requester: friendId, recipient: req.user._id, status: 'accepted' }
      ]
    });

    if (!friendship) {
      return res.status(404).json({
        success: false,
        message: 'Friendship not found'
      });
    }

    await Friend.findByIdAndDelete(friendship._id);

    // Remove from each other's friends arrays
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { friends: friendId }
    });
    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: req.user._id }
    });

    res.json({
      success: true,
      message: 'Friend removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/friends
 * @desc    Get friends list with online status
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const friends = await Friend.getFriends(req.user._id);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const friendsWithStatus = friends.map(({ friend, friendshipId, acceptedAt }) => ({
      friendshipId,
      _id: friend._id,
      name: friend.name,
      email: friend.email,
      level: friend.level,
      xp: friend.xp,
      totalXP: friend.totalXP || friend.xp,
      weeklyXP: friend.weeklyXP || 0,
      rank: friend.rank || 'Bronze',
      streak: friend.streak?.currentStreak || 0,
      isOnline: friend.lastActive && new Date(friend.lastActive) > fiveMinutesAgo,
      lastActive: friend.lastActive,
      friendsSince: acceptedAt
    }));

    res.json({
      success: true,
      count: friendsWithStatus.length,
      data: friendsWithStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/friends/requests
 * @desc    Get pending friend requests
 * @access  Private
 */
router.get('/requests', async (req, res) => {
  try {
    const pendingRequests = await Friend.getPendingRequests(req.user._id);
    const sentRequests = await Friend.getSentRequests(req.user._id);

    res.json({
      success: true,
      data: {
        received: pendingRequests.map(req => ({
          _id: req._id,
          from: {
            _id: req.requester._id,
            name: req.requester.name,
            email: req.requester.email,
            level: req.requester.level,
            xp: req.requester.xp,
            rank: req.requester.rank || 'Bronze'
          },
          createdAt: req.createdAt
        })),
        sent: sentRequests.map(req => ({
          _id: req._id,
          to: {
            _id: req.recipient._id,
            name: req.recipient.name,
            email: req.recipient.email,
            level: req.recipient.level,
            xp: req.recipient.xp,
            rank: req.recipient.rank || 'Bronze'
          },
          createdAt: req.createdAt
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/friends/search
 * @desc    Search users by username/name
 * @access  Private
 */
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }

    // Search by name or email (case-insensitive)
    const users = await User.find({
      _id: { $ne: req.user._id }, // Exclude current user
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    })
    .select('name email level xp rank')
    .limit(20);

    // Check existing friendship status for each user
    const usersWithStatus = await Promise.all(
      users.map(async (user) => {
        const friendship = await Friend.findFriendship(req.user._id, user._id);
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          level: user.level,
          xp: user.xp,
          rank: user.rank || 'Bronze',
          friendshipStatus: friendship ? friendship.status : null,
          isRequester: friendship ? friendship.requester.toString() === req.user._id.toString() : null
        };
      })
    );

    res.json({
      success: true,
      count: usersWithStatus.length,
      data: usersWithStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
