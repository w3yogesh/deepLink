const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
      institution: {
        type: String,
        trim: true,
      },
      degree: {
        type: String,
        trim: true,
      },
      field: {
        type: String,
        trim: true,
      },
      grade: {
        type: String,
        trim: true,
      },
      startDate: {
        type: Date,
        // required: true,
      },
      endDate: {
        type: Date,
      },
});
module.exports = mongoose.model("Education", educationSchema);
