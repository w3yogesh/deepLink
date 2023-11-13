const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    skillName : {
        type: String,
        require: true,
    },
    skillLevel:{
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Skill", skillSchema);
