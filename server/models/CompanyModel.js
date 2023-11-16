const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
      },
      field: {
        type: String,
        trim: true,
      },
      headquarter: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: true,
      },
      companySize: {
        type: String,
        required: true,
      },
      about: {
        type: String,
        required: true,
      },
      image:{
        type:String,
      },
});
module.exports = mongoose.model("Company", CompanySchema);
