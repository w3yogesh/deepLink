const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// signup
module.exports.Signup = async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      confirm_password,
      createdAt,
      address: { country, state, city, zipCode },
      institution
    } = req.body.formData;

      if (password === confirm_password) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const username = email.split("@")[0];
      const user = await User.create({
        email,
        username,
        firstName,
        lastName,
        password,
        address: { country, state, city, zipCode },
        institution,
        createdAt
      });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        maxAge: 10 * 1000,
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } else {
      return res.json({ message: "Password not match" });
    }
  } catch (error) {
    console.error(error);
  }
};

// Login
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      maxAge: 10 * 1000,
      withCredentials: true,
      httpOnly: false,
    });
    //const email = user.email;
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, email });
    next();
  } catch (error) {
    console.error(error);
  }
};
