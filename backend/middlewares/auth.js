const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('./catchAsyncErrors');
const { ErrorHandler } = require('../utils/errorHandler');

//Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler('Please login first to continue', 401, res));
  }
  // console.log(token);
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET, {});
    // console.log(decoded);
  } catch (error) {
    return next(new ErrorHandler('Session expired', 401, res));
  }
  req.user = await User.findById(decoded.id, { balance: 0 });
  // console.log(req.user);
  if (req.user) {
    next();
  } else {
    return next(new ErrorHandler('Không tìm thấy người dùng!', 401, res));
  }
});
//Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403, res)
      );
    }
    next();
  };
};
