const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.getUserProfile = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id).populate({path:"education"});
      if (user) {
        user.password = null;
        return res.json({ status: true, user: user });
      }
      else return res.json({status: false})
    }
  })
}