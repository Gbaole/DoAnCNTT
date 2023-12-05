const { default: mongoose } = require('mongoose');

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

const InfoPageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Thieu name']
  },
  routeName: {
    type: String,
    required: [true, 'Thieu route name']
  },
  cover: [
    {
      type: mediaSchema,
      required: true
    }
  ],
  title: {
    type: String,
    required: false,
    default: ''
  },
  content: {
    type: String,
    required: false,
    default: ''
  }
});

const InfoPage = mongoose.model('InfoPage', InfoPageSchema);
module.exports = { InfoPage };
