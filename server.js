require('dotenv').config({ path: './.env' });
console.log('[MONGO_URI]', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Backend/routes/auth');
const workoutRoutes = require('./Backend/routes/workoutRoutes');
const userRoutes = require('./Backend/routes/users');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('[MongoDB Connection Error]', err);
});


// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);
