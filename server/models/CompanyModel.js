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
    unique: true, // If each company should have a unique email
  },
  companySize: {
    type: String, // Adjust the data type if it represents a numeric value
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
      unique: true,
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      unique: true,
    },
  ],
  jobOpenings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      unique: true,
    },
  ],
  posts:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyPost",
        unique: true,
    }
  ]
});

module.exports = mongoose.model("Company", CompanySchema);
