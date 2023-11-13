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
      const user = await User.findById(data.id).populate({path:"education", select:"institution field degree startDate endDate"}).populate({path:"address", select: "city country"}).populate({path:"skill", select: "skillName skillLevel"});;
      if (user) {
        user.password = null;
        return res.json({ status: true, user: user });
      }
      else return res.json({status: false})
    }
  })
}

module.exports.userSearch = async(req, res, )=>{
  const {query} = req.query;

  try {
    const results = await User.find({
      $or: [
        {firstName: {$regex: new RegExp(query, "i")}},
        {lastName: {$regex: new RegExp(query, "i")}},
      ],
    });
    res.json({success:true, results});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
