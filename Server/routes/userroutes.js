const express = require('express');
const router = express.Router();
const { clerkClient } = require('@clerk/backend');
const { requireAuth } = require('@clerk/express');
const User = require('../Models/User');

// Sync user data from Clerk
router.post('/sync-user', requireAuth(), async (req, res) => {
  try {
    const { userId } = req.auth;

    const clerkUser = await clerkClient.users.getUser(userId);

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = new User({
        clerkId: userId,
        username: clerkUser.username || `user_${userId.slice(-6)}`,
        email: clerkUser.emailAddresses[0]?.emailAddress,
      });
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user XP
router.post('/update-xp', requireAuth(), async (req, res) => {
  try {
    const { xpToAdd } = req.body;
    const user = await User.findOne({ clerkId: req.auth.userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.xp += xpToAdd;
    user.lastUpdated = Date.now();
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leaderboard route
router.get('/leaderboard', requireAuth(), async (req, res) => {
  try {
    const top25 = await User.find().sort({ xp: -1 }).limit(25);

    const currentUser = await User.findOne({ clerkId: req.auth.userId });
    const userRank = await User.countDocuments({ xp: { $gt: currentUser.xp } }) + 1;

    res.json({
      top25,
      currentUser: {
        ...currentUser.toObject(),
        rank: userRank,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
