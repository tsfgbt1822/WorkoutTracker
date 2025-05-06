require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Exercise = require('./models/Exercise');
const UserWorkout = require('./models/UserWorkout');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(console.error);

// Add dummy documents
const seed = async () => {
  try {
    const user = new User({ username: 'tori123', password: 'securepassword', goals: ['Workout 3x a week'] });
    await user.save();

    const exercise = new Exercise({ name: 'Squat', category: 'Legs', instructions: 'Keep your chest up' });
    await exercise.save();

    const workout = new UserWorkout({
      userId: user._id,
      date: new Date(),
      exercises: [{ name: 'Squat', sets: 3, reps: 10, weight: 95 }]
    });
    await workout.save();

    console.log(' Seed data inserted!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
