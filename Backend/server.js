//import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const models = require('./models');



// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
//app.use(morgan("dev")); // Logging

// Connect to MongoDB
connectDB;
// API Routes
app.get("/",(req,res)=>{res.send("bike buddies API is running")});
app.use('/api/client', require('./routes/clientAuth'));
app.use('/api/provider', require('./routes/serviceProviderAuth'));
app.use('/api/admin', require('./routes/adminAuth'));


// Error Handling Middleware
//app.use(notFound);
//app.use(errorHandler);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
    console.log(`Local: http://localhost:${PORT}`);
  });
  