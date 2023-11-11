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
    return res.json("Commented");
  } catch (error) {
    
  }
}

module.exports.fatchComments = async (req, res, next) =>{
  const { postId } = req.params;
  try {
    const PostCommentId = await Post.findById(postId).populate('comments', 'userId comment createdAt');
    const allComments = PostCommentId.comments;
    const UserDetails = await Comments.findById(allComments).populate('userId', 'firstName username');
    return res.json(UserDetails);

  } catch (error) {
    console.log(error)
  }
}

exports.fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({path:"comments", select:"userId comment", populate:({path:"userId", select:"username firstName email"})});
    // {path: "comments", populate:({path:"userId",}
   
    // const allComments =  posts.select("-content");
    // const PostData = await Comments.find(allComments).populate('userId', 'firstName username')
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};
