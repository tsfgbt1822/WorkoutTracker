const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@workouttracker.djkpwp0.mongodb.net/WorkoutTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
