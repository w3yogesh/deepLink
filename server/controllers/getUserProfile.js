const User1 = require("../models/UserModel");
require("dotenv").config();
const jwt1 = require("jsonwebtoken");

module.exports.getUserProfile = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt1.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User1.findById(data.id);
      if (user) {
        user.password = null;
        return res.json({ status: true, user: user });
      }
      else return res.json({status: false})
    }
  })
}
const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.firstName })
      else return res.json({ status: false })
    }
  })
}