const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter your username'],
    maxLength: [30, 'Your name cannot exceed 30 characters']
  },
  dateOfBirth: {
    type: Date,
    required: false
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be at least 6 characters']
    // select: false
  },
  phoneNumber: {
    type: String,
    required: false,
    maxlength: [15, 'Please enter a valid phone number']
  },
  avatar: {
    url: {
      type: String,
      required: false
    },
    required: false
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date
});
// add virtual value for Total, to access : userSchema.Total
userSchema.virtual('Total').get(function () {
  return this.income - this.outcome;
});

//Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
};
//Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash and sdt to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  //Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
