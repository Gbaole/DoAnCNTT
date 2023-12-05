const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please select content']
  },
  content: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please add createdUser data!'],
    ref: 'User'
  }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = { Feedback };
