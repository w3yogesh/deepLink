const Post = require("../models/PostModel");
const User = require("../models/UserModel");
//Post page for user
module.exports.createPost = async (req, res, next) => {
  try {
    const { user, content } = req.body.newPost;
    const Posts = await Post.create({
      user,
      content
    });
    const postId = Posts._id;
    await User.updateOne({_id : user},{$push: {posts : postId}});
    res.json({Posts})
  } catch (error) {
    console.error(error);
  }
};

exports.fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().select("-__v");
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};
