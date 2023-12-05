const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: [true, 'duplicated key'],
    validate: [validator.isEmail, 'Email của bạn chưa đúng, vui lòng kiểm tra lại.']
  },
  phone: {
    type: String,
    required: [true, 'Thieu sdt']
  },
  address: {
    type: String,
    required: false
  },
  idProduct: {
    type: String,
    required: false
  },
  sizeOrType: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer };
