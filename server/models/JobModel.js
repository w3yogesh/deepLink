const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      company: [{
        type: String,
        trim: true,
      }],
      location: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      requirements: {
        type: String,
        required: true,
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
      },
      appliedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      createdAt: {
        type: Date,
        default: Date.now,
      },

})

module.exports = mongoose.model("JobModel", jobSchema);
