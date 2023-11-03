const express = require('express')
const app = express()
const mongoose = require("mongoose");
const PORT = 4000;
const MONGO_URL = `mongodb+srv://Admin:sxYj5olZBKIUuroj@cluster0.erw4wx7.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})