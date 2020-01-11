const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    company:  { type: String, required: true, unique: false },
    price :{ type: Number},
    imageLink :{ type: String},
    stock: { type: Number},
    code:  { type: String, required: true, unique: false }
  },
  {
    collection: 'Product'
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;   