const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userEmail: {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    },

});

module.exports = mongoose.model("Post", postSchema);