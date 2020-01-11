const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId:{ type: Number, required: true, unique: true },
    firstName: { type: String, required: true, unique: false },
    lastName: { type: String, required: true, unique: false },
    emailAddress: { type: String, required: true, unique: true },
    password :{ type: String, required: true, unique: false },
    gender :{ type: String},
    phoneNumber: { type: String},
    creditCardNumber: { type: String}
  },
  {
    collection: 'User'
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;