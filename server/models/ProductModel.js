const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports  = mongoose.model('Product', productSchema);
