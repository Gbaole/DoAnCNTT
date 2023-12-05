const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true
  }
});

const productsTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Thieu phan loai name']
  },
  stock: {
    type: Number,
    required: false,
    default: 0
  },
  price: {
    type: Number,
    require: [true, 'Please enter product price'],
    default: 0.0,
    maxLength: [9, 'Product price cannot exceed 9 characters']
  },
  image: [
    {
      type: mediaSchema,
      required: true
    }
  ],
  barcode: {
    type: String,
    required: false
  }
});

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },

  price: {
    type: Number,
    require: [true, 'Please enter product price'],
    default: 0.0,
    maxLength: [9, 'Product price cannot exceed 9 characters']
  },
  description: {
    type: String,
    require: [true, 'Please enter product description']
  },
  ratings: {
    type: Number,
    default: 0.0
  },
  thumbnail: [
    {
      type: mediaSchema,
      required: true
    }
  ],
  category: {
    type: String,
    required: [true, 'Please select category for this product']
  },
  numofReviews: {
    type: Number,
    default: 0
  },
  productType: [
    {
      type: productsTypeSchema,
      required: [true, 'Thieu productType']
    }
  ],
  reviews: [
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  createdUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  barcode: {
    type: String,
    required: false
  },
  ecomURL: [
    {
      platform: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ]
});

const Product = mongoose.model('Product', productsSchema);
module.exports = { Product };
