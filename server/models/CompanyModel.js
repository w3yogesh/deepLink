const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  companyName: {
    type: String,
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
    unique: true,
  },
  companySize: {
    type: String,
  },
  about: {
    type: String,
  },
  logo: {
    type: String,
  },
  cover: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  jobOpenings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyPost",
    },
  ],
  followers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
});

module.exports = mongoose.model("Company", CompanySchema);
