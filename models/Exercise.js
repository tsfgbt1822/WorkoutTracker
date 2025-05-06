const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String }, // e.g., 'cardio', 'legs', etc.
  instructions: { type: String },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
