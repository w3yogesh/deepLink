const mongoose = require("mongoose");

const companypostSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
  
});

module.exports = mongoose.model("CompanyPost", companypostSchema);
