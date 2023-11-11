const mongoose = require ("mongoose");

const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        require: true,
    },
    comment:{
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
      },
});

module.exports = mongoose.model("Comment", commentSchema);