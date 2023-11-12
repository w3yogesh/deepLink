const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    skillName : {
        type: String,
        require: true,
    },
    skillLavel:{
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Skill", skillSchema);
