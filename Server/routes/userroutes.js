// routes/user.js
const express = require('express');
const router = express.Router();
const { clerkClient } = require('@clerk/backend');
const { requireAuth } = require('@clerk/clerk-sdk-node');
const User = require('../Models/User');

// Sync user data from Clerk
router.post('/sync-user', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    if (!userId) {
      return res.status(401).json({ error: 'No user ID provided' });
    }

    const clerkUser = await clerkClient.users.getUser(userId);
    if (!clerkUser) {
      return res.status(404).json({ error: 'Clerk user not found' });
    }

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = new User({
        clerkId: userId,
        username: clerkUser.username || `user_${userId.slice(-6)}`,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        xp: 0
      });
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Sync user error:', error);
    res.status(500).json({ error: 'Failed to sync user data' });
  }
});

// Update user XP
router.post('/update-xp', requireAuth(), async (req, res) => {
  try {
    const { xpToAdd } = req.body;
    if (typeof xpToAdd !== 'number' || xpToAdd < 0) {
      return res.status(400).json({ error: 'Invalid XP value' });
    }

    const user = await User.findOne({ clerkId: req.auth.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.xp += xpToAdd;
    user.lastUpdated = Date.now();
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Update XP error:', error);
    res.status(500).json({ error: 'Failed to update XP' });
  }
});

// Leaderboard route
router.get('/leaderboard', requireAuth(), async (req, res) => {
  try {
    const top25 = await User.find()
      .select('username xp')
      .sort({ xp: -1 })
      .limit(25);

    const currentUser = await User.findOne({ clerkId: req.auth.userId });
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRank = await User.countDocuments({ xp: { $gt: currentUser.xp } }) + 1;

    res.json({
      top25,
      currentUser: {
        ...currentUser.toObject(),
        rank: userRank,
      },
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;