// Load environment variables first, before any other imports
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

// Import controllers
const chatController = require('./controllers/chatController');
const problemController = require('./controllers/problemController');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create a single API router
const apiRouter = express.Router();

// Chat routes
apiRouter.post('/chat', chatController.handleChat);
apiRouter.post('/chat/validate-url', chatController.validateLeetCodeUrl);
apiRouter.get('/chat/:sessionId', chatController.getChatHistory);

// Problem routes - Note: specific route before general route
apiRouter.get('/problems/validate/:titleSlug', problemController.validateProblem);
apiRouter.get('/problems/:titleSlug', problemController.getProblemDetails);

// Health check route
apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Mount the API router
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connect to local MongoDB without authentication
mongoose.connect('mongodb://localhost:27017/dsa-coach', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.log('Continuing without database connection...');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;