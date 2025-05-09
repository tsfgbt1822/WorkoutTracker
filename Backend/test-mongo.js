const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tsfgbt:tsfgbt@workouttracker.djkpwp0.mongodb.net/WorkoutTracker')
  .then(() => {
    console.log('Connected successfully to MongoDB!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to connect:', err);
    process.exit(1);
  });
