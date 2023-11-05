const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like"    // this is the refference to the like model
    }],
    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment" // this is the refference to the comment model
    }]
});

module.exports = mongoose.model("Post", postSchema);