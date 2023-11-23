const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    skillName : {
        type: String,
        require: true,
    },
    skillLevel:{
        type: String,
        require: true,
    },
    endorsement:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }]
});

module.exports = mongoose.model("Skill", skillSchema);
