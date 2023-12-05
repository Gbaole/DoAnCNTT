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

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Thieu name']
  },
  routeName: {
    type: String,
    required: [true, 'Thieu route name'],
    unique: true
  },
  avatar: [
    {
      type: mediaSchema,
      required: true
    }
  ],
  cover: [
    {
      type: mediaSchema,
      required: true
    }
  ]
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = { Category };
