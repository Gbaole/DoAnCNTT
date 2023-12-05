const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please select type!']
  },
  heading: {
    type: String,
    required: [true, 'Please add Heading!']
  },
  caption: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: [true, 'Please add Content!']
  },
  coverImage: [
    {
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
    }
  ],
  view: {
    type: Number,
    default: 0
  },
  like: {
    type: Number,
    default: 0
  },
  endDay: {
    type: Date
  },
  status: {
    type: Number,
    required: false,
    default: 0
  },
  priority: {
    type: Number,
    default: 1
  },
  editedUser: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdUser: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      name: {
        type: String,
        required: [true, 'Thieu ten nguoi comment']
      },
      content: {
        type: String,
        required: [true, 'thieu noi dung comment']
      }
    }
  ]
});

const News = mongoose.model('News', newsSchema);

module.exports = { News };
