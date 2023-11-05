const mongoose = require ("mongoose");

const commentSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "post"    // this is the refference to the post model
    },
    user : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    // we can create [ comment ] for reply 

});

module.exports = mongoose.model("Comment", commentSchema);