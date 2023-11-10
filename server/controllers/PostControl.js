const Post = require("../models/PostModel");
const User = require("../models/UserModel")
const Like = require("../models/LikeModel")
const Comments = require("../models/CommentModel")


//Post page for user
exports.createPost = async (req, res, next) => {
  try {
    const { user, content } = req.body;
    const post = await Post.create({
      user,
      content,
    });
    const postId = post._id;
    await User.updateOne({_id : user},{$push: {posts : postId}});
    return res.status(201).json({ success: true, post: post });
  
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

module.exports.Postlike = async(req, res, next) => {
  try {
    const{userId, postId} = req.body;
    const like = await Like.create({
      userId,
      postId,
    });
    const likeId = like._id;
    await Post.updateOne({_id: postId},{$push: {likes :  likeId}});
    return res.json("Liked");
    
  } catch (error) {
    
  }

}

module.exports.PostComment = async(req, res, next) => {
  try {
    const {userId, postId, comment} = req.body;
    const response = await Comments.create({
      userId,
      postId,
      comment,
    });
    const commentId = response._id;
    await Post.updateOne({_id: postId},{$push: {comments :  commentId}});
    // return res.json(commentId);
  } catch (error) {
    
  }
}

exports.fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().select("-__v");
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};
