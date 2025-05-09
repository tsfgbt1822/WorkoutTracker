const express = require('express');
const router = express.Router();
const UserWorkout = require('../../models/UserWorkout');

// Create workout
router.post('/create', async (req, res) => {
  try {
    const { userId, workoutName, workoutDate, exercises } = req.body;

    const newWorkout = new UserWorkout({
      userId, // can be null if not logged in
      date: workoutDate,
      exercises,
    });

    await newWorkout.save();
    res.json({ success: true, workout: newWorkout });
  } catch (err) {
    console.error('[Workout Creation Error]', err);
    res.status(500).json({ success: false, message: 'Failed to save workout' });
  }
});

module.exports = router;
