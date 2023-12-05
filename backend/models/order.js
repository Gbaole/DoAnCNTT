const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  homeSt: {
    type: String,
    required: [true, 'Please add số nhà!']
  },
  ward: {
    type: String,
    required: [true, 'Please add phường!']
  },
  district: {
    type: String,
    required: [true, 'Please add quận!']
  },
  province: {
    type: String,
    required: [true, 'Please add tỉnh!']
  }
});

const orderSchema = mongoose.Schema({
  mdh: {
    type: String,
    required: false,
    default: 'KOGLA'
  },
  contactInfo: {
    name: {
      type: String,
      required: [true, 'Please add tên!']
    },
    email: {
      type: String,
      required: [true, 'Please add email!']
    },
    phone: {
      type: String,
      required: [true, 'Please add sdt!']
    },
    address: {
      type: addressSchema,
      required: true
    }
  },
  cart: {
    products: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          required: [true, 'Please add id!']
        },
        typeID: {
          type: mongoose.Types.ObjectId,
          required: false
        },
        name: {
          type: String,
          required: [true, 'Please add ten sp!']
        },
        price: {
          type: Number,
          required: [true, 'Please add item price!']
        },
        quantity: {
          type: Number,
          required: [true, 'Please add quantity!']
        }
      }
    ],
    count: {
      type: Number,
      required: [true, 'Please add count!']
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please add total price!']
    }
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
