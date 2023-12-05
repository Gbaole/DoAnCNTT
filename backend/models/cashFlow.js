const mongoose = require('mongoose');

const cashFlowSchema = new mongoose.Schema({
  mdh: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  shippingPrice: {
    type: Number,
    default: 0
  },
  COD: {
    type: Number,
    default: 0
  },
  shipperProfit: {
    type: Number,
    default: 0
  },
  xeduProfit: {
    type: Number,
    default: 0
  },
  shippingPriceIsPaid: {
    type: Boolean,
    default: false
  },
  CODIsPaid: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Cashflow = mongoose.model('Cashflow', cashFlowSchema);

module.exports = { Cashflow };
