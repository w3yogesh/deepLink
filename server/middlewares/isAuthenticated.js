const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('http://localhost:3000/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id)
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.redirect('http://localhost:3000/login'); 
    }
  } catch (err) {
    return res.redirect('http://localhost:3000/login');
  }
};

module.exports = isAuthenticated;
