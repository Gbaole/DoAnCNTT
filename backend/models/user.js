const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  passportId: String,
  displayName: String,
  userName: {
    type: String,
    required: [false, "Please enter a name"],
    maxLength: [30, "Your name can not exceed 30 characters"],
  },
  // email: {
  //   type: String,
  //   required: [true, "Please enter your email"],
  //   unique: true,
  //   validate: [validator.isEmail, "Please enter a valid email"],
  // },
  // password: {
  //   type: String,
  //   required: [false, "Please enter your password"],
  //   minLength: [9, "Your password must be at least 9 characters"],
  //   select: false,
  // },
  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // role: {
  //   type: String,
  //   default: "user",
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
  // resetPasswordToken: String,
  // resetPasswordExpire: Date,
});
module.exports = mongoose.model("User", userSchema);
