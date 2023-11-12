const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    city:{
        type: String,
        trim : true,
    },
    country:{
        type: String,
        trim: true,
    }
})

module.exports = mongoose.model("Address", addressSchema);
