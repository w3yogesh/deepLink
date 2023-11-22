const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    require: true,
  },
  image:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
  
});

module.exports = mongoose.model("Post", postSchema);
