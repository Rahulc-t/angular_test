const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/routes');
const authRouter = require('./routes/authRoute')

// Middleware
app.use(cors({ 
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth',authRouter)
app.use('/', userRouter);

// Connect to MongoDB using environment variable
mongoose.connect("mongodb://localhost:27017/usermangement")
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.log("Failed to connect to database", err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});