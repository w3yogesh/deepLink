const express = require('express')
const app = express()

const connectDB = require('./config/dbConnect');
require("dotenv").config();

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})