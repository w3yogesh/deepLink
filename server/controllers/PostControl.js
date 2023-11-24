const Post = require("../models/PostModel");
const User = require("../models/UserModel")
const Like = require("../models/LikeModel")
const Comments = require("../models/CommentModel");
const Notification=require("../models/NotificationModel");


exports.createPost = async (req, res, next) => {
  try {
    const image = req.file ? req.file.filename : null;
    const { user, content } = req.body;
    const post = await Post.create({
      user,
      content,
      image
    });
    const postId = post._id;
    await User.updateOne({_id : user},{$push: {posts : postId}});
    return res.status(201).json({ success: true, post: post });
  
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

module.exports.fetchLikeData = async(req, res) => {
  try {
    const { likeId } = req.params;
    const result = await Like.findById(likeId);
  
    if (!result) {
      // console.log('No like found with the provided ID.');
      return res.status(404).json({ error: 'No like found with the provided ID.' });
    }
  
    // console.log('Like result:', result);
    // console.log('Like Id:', likeId);
    res.json(result);
  } catch (error) {
    // console.error('Error fetching like data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports.Postlike = async(req, res, next) => {
  try {
    const status = false;
    const{userId, postId} = req.body;
    const like = await Like.create({
      userId,
      postId,
    }); 
    const likeId = like._id;
    const response = await Post.updateOne({_id: postId},{$push: {likes :  likeId}});
    if(response){
      
      const user=await User.findById(userId);
   const userName=user.firstName;
    const message = `${userName} Reacted to your post`;
    await createNotification(postId, message);
      return res.json({status: true, message:"liked"});
    }
    return res.json({status, message:"not liked"})
    
  } catch (error) {
    return res.json(error)
  }
}

module.exports.postReaction = async(req, res) => {
  try {
    const{userId, postId, reactionType} = req.body;
    const like = await Like.create({
      userId,
      postId,
      reaction: reactionType,
    }); 
    const likeId = like._id;
    const response = await Post.updateOne({_id: postId},{$push: {likes :  likeId}});
    if(response){

      const user=await User.findById(userId);
   const userName=user.firstName;
    const message = `${userName} Reacted to your post`;
    await createNotification(postId, message);



      return res.json({status: true, message:"reacted and notified"});
    }
    return res.json({status : false, message:"not reacted"})
    
  } catch (error) {
    console.log(error);
  }
}


module.exports.RemovePostLike = async(req, res, next)=>{
  try {
    // const status = false;
    // res.json("hello");
    const {userId, postId} = req.params;
    const like = await Like.findOne({postId:postId,userId:userId});
    
    if (!like) {
      return res.json({ status: false, message: like });
    }
    const likeId = like._id;

    const resu = await Post.findOneAndUpdate({_id: postId},{$pull:{likes:likeId}});
    const result = await Like.findByIdAndDelete({_id: likeId});

    // return res.json({ status: false, message: result });
    // return res.json(result);

      return res.status(200).json({ status: true, message: 'Like removed successfully.' });
  } catch (error) {
      
  }
}

module.exports.removePostReaction = async(req, res) => {
  try {
    const {userId, postId} = req.params;
    const like = await Like.findOne({postId:postId,userId:userId});

    if (!like) {
      return res.json({ status: false, message: like });
    }
    const likeId = like._id;

    const postUpdateResponse = await Post.findOneAndUpdate({_id: postId},{$pull:{likes:likeId}});
    const reactionDeleteResponse = await Like.findByIdAndDelete({_id: likeId});

    return res.status(200).json({ status: true, message: 'reaction removed successfully.' });
  } catch (error) {
    console.log(error);
  }
}

module.exports.updateReaction = async(req, res) => {
  try {
    const {likeId, reactionType} = req.params;

    const postUpdateResponse = await Like.findOneAndUpdate(
      { _id: likeId },
      { $set: { reaction: reactionType } },
      { new: true });

    return res.status(200).json({ status: true, message: 'reaction updated successfully.' });
  } catch (error) {
    console.log(error);
  }
}


const createNotification = async (postId, message) => {
  try {
    const post = await Post.findById(postId);
    const userId = post.user;
    const notification = await Notification.create({
      userId,
      message,
    });
    console.log('Notification created:', notification);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

module.exports.PostComment = async (req, res, next) => {

  try {
    const { userId, postId, comment } = req.body;

   
    const response = await Comments.create({
      userId,
      postId,
      comment,
    });

    const commentId = response._id;

    
    await Post.updateOne({ _id: postId }, { $push: { comments: commentId } });

   const user=await User.findById(userId);
   const userName=user.firstName;
    const message = `${userName} commented on your post`;
    await createNotification(postId, message);

  
    res.json({ status: "Commented and Notified" });

  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




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
    const posts = await Post.find().populate({path:"comments", select:"userId comment", populate:({path:"userId", select:"username firstName email"})})
    .populate("user", "username firstName profileImage").populate("likes", "userId");
    // {path: "comments", populate:({path:"userId",}
   
    // const allComments =  posts.select("-content");
    // const PostData = await Comments.find(allComments).populate('userId', 'firstName username')
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};



exports.deletePosts=async(req,res)=>{
  try{
    const userId=req.params.userId;
    const postId=req.params.postId;

    if(!userId||!postId){
      return res.status(400).json({ status: false, message: "user or post not found" });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, posts: postId },
      { $pull: { posts: postId } }, 
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ status: false, message: "You can't delete others post" });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ status: false, message: "post not found" });
    }
    res.json({ status: true, message: "Post Deleted Successfully" });
  }catch(error){
    console.error(error);
  }
};

exports.fetchPostsSpecific = async (req, res) => {
  try {
    const userId = req.params.userId; 
    if (!userId) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    const posts = await Post.find({ user: userId })
      .populate({
        path: "comments",
        select: "userId comment",
        populate: { path: "userId", select: "username firstName email" }
      })
      .populate("user", "username firstName profileImage")
      .populate("likes", "userId");

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};