const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   titel:{
    type : String,
    required: true,  
   },
   content : {
    type: String,
    required: true,
   },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Post", postSchema);