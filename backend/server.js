require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const SocketService = require('./src/services/socketService');

// Initialize MongoDB connection
connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP Server for Express
const server = http.createServer(app);

// Attach Socket.IO for real-time WebSocket communication
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Initialize real-time services
new SocketService(io);

server.listen(PORT, () => {
  console.log(`VitalSync AI Backend running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`WebSocket Server Ready on ws://localhost:${PORT}`);
});
