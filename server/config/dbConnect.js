// external imports
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_URL } = process.env; // import .env file url var

async function dbConnect() {

    // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
  .connect(DB_URL, {
      //   these are options to ensure that the connection is done properly
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    }
  )

.then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

}

module.exports = dbConnect;
