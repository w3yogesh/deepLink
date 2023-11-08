const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
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
  password: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    trim: true,
  },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
  sent_pending_connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
  receive_pending_connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
