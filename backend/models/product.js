const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name Missing"],
    trim: true,
    maxLength: [100, "Product Name Max Length is 100 Characters"],
  },
  price: {
    type: Number,
    required: [true, "Price Missing"],
    default: 0,
    maxLength: [15, "Price Max Length is 12 Characters"],
  },
  stock: {
    type: Number,
    required: [true, "Stock Missing"],
    default: 0,
    maxLength: [5, "Stock cannot 12 Characters"],
  },
  description: {
    type: String,
    required: [true, "Description Missing"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  // images: [
  //   {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },

  // ],
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Product Category Missing"],
    enum: {
      values: ["men clothing", "jewelery", "electronics", "women clothing"],
      message: "Select product category",
    },
  },
  seller: {
    type: String,
    required: [true, "Seller Missing"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Product", productSchema);
