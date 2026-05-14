const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "frame-src": ["'self'", "https://maps.google.com"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:", "blob:"]
    },
  },
})); // Relaxed security headers for Maps and Charts
app.use(morgan('dev')); // HTTP request logging

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', require('./routes/mockRoutes')); // Restore frontend compatibility

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running successfully', timestamp: new Date() });
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'null' : err.stack,
  });
});

module.exports = app;
