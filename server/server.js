// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

// Apply middlewares
app.use(express.json()); // for parsing application/json
app.use(cors()); // enable CORS for all routes
app.use(morgan('dev')); // logging HTTP requests

// Setup MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = socketIo(server);

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Define routes
const uploadRoutes = require('./routes/upload');
app.use('/upload', uploadRoutes);

// Global error handler
// This should be after all other app.use() calls and routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export Socket.io instance for use in other modules
module.exports = { io };