const User = require("../models/UserModel");

module.exports.Signup = async (req, res, next) => {
    const { username, email, password, confirm_password, createdAt } = req.body;
    if (password === confirm_password) {
      const user = await User.create({
        username,
        email,
        password,
        confirm_password,
        createdAt,
      });
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
        next();
    } else {
      return res.json({ message: "Password not match" });
    }
  }

