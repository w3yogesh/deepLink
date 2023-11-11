const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    trim: true,

  },
  lastName: {
    type: String,
    trim: true,
    trim: true,

  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    trim: true,
  },
  address: [
    {
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    }
  ],
  education: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Education", 
      unique: true 
    },
  ],
  connections: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      unique: true 
    },
  ],
  sent_pending_connections: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      unique: true 
    },
  ],
  receive_pending_connections: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      unique: true 
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
