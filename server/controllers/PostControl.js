const Post = require("../models/PostModel");

//Post page for user
module.exports.Posts = async (req, res, next) => {
  try {
    const { title, content, author } = req.body.newPost;
    const Posts = await Post.create({
      title,
      content,
      author,
    });
  } catch (error) {
    console.error(error);
  }
};
