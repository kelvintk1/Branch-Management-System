require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db');
const branchRoutes = require('./router/branchRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use('/api/branches', branchRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// ✅ Export app instead of app.listen()
module.exports = app;
