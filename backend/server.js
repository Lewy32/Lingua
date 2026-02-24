require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');

const authRoutes = require('./src/routes/auth');
const lessonRoutes = require('./src/routes/lessons');
const progressRoutes = require('./src/routes/progress');
const reviewRoutes = require('./src/routes/reviews');
const friendRoutes = require('./src/routes/friends');
const leaderboardRoutes = require('./src/routes/leaderboard');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activity tracking middleware (updates lastActive for online status)
const { updateActivity } = require('./src/middleware/activity');
app.use(updateActivity);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Farsi Learning API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
