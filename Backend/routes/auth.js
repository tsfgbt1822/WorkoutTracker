const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Register new user
router.post('/register', async (req, res) => {
  const { userID, password } = req.body;
  console.log('[Register Attempt]', userID); 

  try {
    const existingUser = await User.findOne({ username: userID });
    if (existingUser) {
      return res.json({ success: false, message: 'Username already exists' });
    }

    const newUser = new User({ username: userID, password });
    await newUser.save();
    res.json({ success: true, user: { username: newUser.username } });
  } catch (err) {
    console.error('[Registration Error]', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Login user
router.post('/login', async (req, res) => {
  const { userID, password } = req.body;

  try {
    const user = await User.findOne({ username: userID });
    if (!user || user.password !== password) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
