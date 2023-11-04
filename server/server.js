const express = require('express')
const app = express()

const connectDB = require('./config/dbConnect');
require("dotenv").config();

const authRoute = require("./routes/AuthRoutes");

connectDB()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start the server:', error);
  });

app.use("/", authRoute);