const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const UserWorkout = require('../../models/UserWorkout');

// Save or update user's goal
router.post('/goal', async (req, res) => {
  const { userId, goal } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { goals: [goal] } },
      { new: true }
    );
    res.json({ success: true, goals: user.goals });
  } catch (err) {
    console.error('[Goal Update Error]', err);
    res.status(500).json({ success: false, message: 'Failed to save goal' });
  }
});

// Get all workouts for a user
router.get('/workouts/:userId', async (req, res) => {
  try {
    const workouts = await UserWorkout.find({ userId: req.params.userId });
    res.json({ success: true, workouts });
  } catch (err) {
    console.error('[Workout Fetch Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch workouts' });
  }
});

module.exports = router;
