const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    employmentType:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
});
module.exports = mongoose.model("Experience", experienceSchema);
