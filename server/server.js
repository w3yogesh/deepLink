const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require('./config/dbConnect'); // Import the connectDB function

require("dotenv").config(); // Import .env file var

// import cookie and auth
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoutes");


// Connect to MongoDB by calling the imported connectDB function
connectDB()
  .then(() => {
    // Start your server once the MongoDB connection is established
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start the server:', error);
  });


  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(cookieParser());
  
  app.use(express.json());

  app.use("/", authRoute);
