const Like = require("../models/LikeModel")
const Comments = require("../models/CommentModel");
const CompanyPost=require("../models/CompanyPostModel");
const Company=require("../models/CompanyModel");
const Post=require("../models/PostModel");

exports.createCompanyPost = async (req, res, next) => {
    try {
    const image = req.file ? req.file.filename : null;
      const { company, content } = req.body;
      const post = await CompanyPost.create({
        company,
        content,
        image
      });
      const postId = post._id;
      await Company.updateOne({_id : company},{$push: {posts : postId}});
      return res.status(201).json({ success: true, post: post });
    
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  };
  
  
  module.exports.CompanyPostlike = async(req, res, next) => {
    try {
      const status = false;
      const{userId, postId} = req.body;
      const like = await Like.create({
        userId,
        postId,
      }); 
      const likeId = like._id;
      const response = await CompanyPost.updateOne({_id: postId},{$push: {likes :  likeId}});
      if(response){
        return res.json({status: true, message:"liked"});
      }
      return res.json({status, message:"not liked"})
      
    } catch (error) {
      return res.json(error)
    }
  }
  
  module.exports.RemoveCompanyPostLike = async(req, res, next)=>{
    try {
      // const status = false;
      // res.json("hello");
      const {userId, postId} = req.params;
      const like = await Like.findOne({postId:postId,userId:userId});
      
      if (!like) {
        return res.json({ status: false, message: like });
      }
      const likeId = like._id;
      const resu = await CompanyPost.updateOne({_id: postId},{$unset:{likes:likeId}});
      
      const result = await Like.findByIdAndDelete({_id: likeId});
      // return res.json({ status: false, message: result });
      // return res.json(result);
  
        return res.status(200).json({ status: true, message: 'Like removed successfully.' });
    } catch (error) {
        
    }
  }
  
  module.exports.CompanyPostComment = async(req, res, next) => {
    try {
      const {userId, postId, comment} = req.body;
      const response = await Comments.create({
        userId,
        postId,
        comment,
      });
      const commentId = response._id;
      await CompanyPost.updateOne({_id: postId},{$push: {comments :  commentId}});
      return res.json("Commented");
    } catch (error) {
      
    }
  }
  
  module.exports.fetchCompanyComments = async (req, res, next) =>{
    const { postId } = req.params;
    try {
      const PostCommentId = await CompanyPost.findById(postId).populate('comments', 'userId comment createdAt');
      const allComments = PostCommentId.comments;
      const UserDetails = await Comments.findById(allComments).populate('userId', 'firstName username');
      return res.json(UserDetails);
  
    } catch (error) {
      console.log(error)
    }
  }
  
  exports.fetchCompanyPosts = async (req, res) => {
    try {
      const posts = await CompanyPost.find().populate({path:"comments", select:"userId comment", populate:({path:"userId", select:"firstName lastName"})})
      .populate("company", "companyName logo").populate("likes", "userId");
      // {path: "comments", populate:({path:"userId",}
     
      // const allComments =  posts.select("-content");
      // const PostData = await Comments.find(allComments).populate('userId', 'firstName username')
      res.json(posts);
    } catch (error) {
      console.error(error);
    }
  };
  exports.fetchCompanyPostsSpecific = async (req, res) => {
    try {
      const companyId=req.params.companyId;
      const posts = await CompanyPost.find({company:companyId}).populate({path:"comments", select:"userId comment", populate:({path:"userId", select:"firstName lastName"})})
      .populate("company", "companyName logo").populate("likes", "userId");
      // {path: "comments", populate:({path:"userId",}
     
      // const allComments =  posts.select("-content");
      // const PostData = await Comments.find(allComments).populate('userId', 'firstName username')
      res.json(posts);
    } catch (error) {
      console.error(error);
    }
  };
  


  exports.deleteCompanyPosts=async(req,res)=>{
    try{
      const companyId=req.params.companyId;
      const postId=req.params.postId;
  
      if(!postId||!companyId){
        return res.status(400).json({ status: false, message: "company or post not found" });
      }
  
      const company = await Company.findOneAndUpdate(
        { _id: companyId, posts: postId },
        { $pull: { posts: postId } }, 
        { new: true } 
      );
  
      if (!company) {
        return res.status(404).json({ status: false, message: "You can't delete others post" });
      }
  
      const deletedPost = await CompanyPost.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ status: false, message: "post not found" });
      }
      res.json({ status: true, message: "Post Deleted Successfully" });
    }catch(error){
      console.error(error);
    }
  };