const mongoose = require('mongoose');

const UserWorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
  }],
});

module.exports = mongoose.model('UserWorkout', UserWorkoutSchema);
