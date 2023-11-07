const Post = require("../models/PostModel");

const bcrypt = require("bcryptjs");

// signup
module.exports.Posts = async (req, res, next) => {
  try {
    const {
        userEmail,
        text
    } = req.body.newPost;
    const Posts = await Post.create({
        userEmail,
        text
    });
    

  } catch (error) {
    console.error(error);
  }
};

