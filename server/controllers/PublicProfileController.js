const User = require("../models/UserModel");
module.exports.userSearch = async(req, res, )=>{
    const {query} = req.query;
    try {
      const results = await User.find({
        $or: [
          {firstName: {$regex: new RegExp(query, "i")}},
          {lastName: {$regex: new RegExp(query, "i")}},
        ],
      });
      res.json({success:true, results});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  
  
  module.exports.getUserProfileById= async (req,res,next)=>{
    const {userId}=req.params;
    try{
    const user=await User.findById(userId).select("-password -createdAt -updatedAt").populate("skill").populate("address").populate("education").populate({path:"posts", populate:{path:"user"}}).populate("experience");
    if(!user){
      return res.status(404).json({ success: false, message: "user not found" });
    }
    res.json({ success: true, user });
    // next();
    } catch(error){
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }