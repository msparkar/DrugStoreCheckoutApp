const mongoose = require('mongoose');
const Product = require('./product.model');
const User = require('./user.model');

const Schema = mongoose.Schema;

const orderHistorySchema = new Schema(
  {
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    user :  {type: Schema.Types.ObjectId, ref: 'User'},
    quantityOrdered: { type: Number},
    purchaseDate: { type: Date}
  },
  {
    collection: 'OrderHistory'
  }
);

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);

module.exports = OrderHistory;