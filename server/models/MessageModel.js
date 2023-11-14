const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    content:{
        type: String,
        require: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
    },
    isRead:{
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Message",messageSchema);