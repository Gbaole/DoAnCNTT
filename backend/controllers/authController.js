const { User } = require('../models/user');
const { ErrorHandler } = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { sendToken } = require('../utils/jwtToken');
const crypto = require('crypto');
const UserBalanceQuery = require('./mongoQuery/UserQuery/UserBalanceQuery');
const AllUserQuery = require('./mongoQuery/UserQuery/AllUserQuery');
const { MailtrapClient } = require('mailtrap');
// const { endianness } = require('os');

//register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password, phone, username, dateOfBirth, CCCD } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      username,
      dateOfBirth,
      CCCD,

      phoneNumber: phone
    });
    console.log(user);
    const token = user.getJwtToken();

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

//login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler('Please enter email and password', 400, res));
  }
  //Finding user in database
  const user = await User.findOne({ username });

  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401, res));
  }
  //Check password is correct
  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401, res));
  }
  sendToken(user, 200, res);
});

//Forgot password => api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404, res));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset password url
  // const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
  const resetUrl =
    process.env.NODE_ENV !== 'prod'
      ? `http://localhost:5173/resetpassword/${resetToken}`
      : `https://xedu.tech/resetpassword/${resetToken}`;

  // Send email using Mailtrap
  const client = new MailtrapClient({
    endpoint: process.env.ENDPOINT,
    token: process.env.TOKEN
  });

  const sender = {
    email: process.env.SMTP_FROM_EMAIL,
    name: process.env.SMTP_FROM_NAME
  };
  const recipients = [
    {
      email: user.email
    }
  ];
  const template_variables = {
    user_email: user.email,
    pass_reset_link: resetUrl,
    support_email: process.env.SMTP_SUPPORT_EMAIL
  };

  try {
    await client.send({
      from: sender,
      to: recipients,
      template_uuid: process.env.MAILTRAP_TEMPLATE_ID,
      template_variables: template_variables
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500, res));
  }
});

//Reset password => api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Hash URL token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });
  if (!user) {
    return next(new ErrorHandler('Password reset token is invalid or has been expired', 400, res));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 401, res));
  }
  //Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

//Get current logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id, {
    avatar: 1,
    'location.distanceAccuracy': 1,
    _id: 1,
    name: 1,
    username: 1,
    dateOfBirth: 1,
    email: 1,
    CCCD: 1,
    point: 1,
    ratio: 1,
    role: 1,
    status: 1,
    recentActiveTimes: 1,
    phoneNumber: 1
  });
  res.status(200).json({
    success: true,
    user
  });
});

//Update / Change password =>   /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  //Check previous password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 200, res));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };
  //Update avatar

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    succes: true
  });
});

//Logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie('token', {
    domain: process.env.NODE_ENV === 'prod' ? `.${process.env.FRONTEND_DOMAIN}` : '',
    path: '/'
  });
  res.status(200).json({
    success: true,
    message: 'Logout Success'
  });
});

exports.updateStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const location = req.body?.location;
    const status = req.body?.status;
    const type = req.body?.type;
    let user = await User.findById(req.user.id, { balance: 0, password: 0 });
    user.recentActiveTimes = Date.now();
    if (location) {
      if (location.latitude != 0 && location.longitude != 0) {
        user.location.latitude = location.latitude;
        user.location.longitude = location.longitude;
        user.location.speed = location.speed;
        user.location.heading = location.heading;
        console.log('location updated');
      }
    }
    if (status !== undefined) {
      user.status = status;
    }
    user.recentActiveTimes = new Date();
    user.save();
    if (type !== undefined) {
      if (type == 'anonymous') {
        res.status(200).json({
          success: true
        });
      }
    } else {
      res.status(200).json({
        success: true,
        user
      });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.getUserBalance = catchAsyncErrors(async (req, res, next) => {
  try {
    let skip = req.query?.skip;
    let limit = req.query?.limit;

    const userBalance = await User.aggregate(UserBalanceQuery(req.user._id, skip, limit));
    if (userBalance.length !== 0) {
      res.status(200).json({
        success: true,
        userBalance: userBalance[0]
      });
    } else {
      res.status(200).json({
        success: true,
        userBalance: {
          count: 0,
          records: []
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

//Admin routes
//Get All Users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  let skip = req.query?.skip;
  let limit = req.query?.limit;
  let filter = req.query?.filter;
  let sort = req.query?.sort;
  try {
    if (filter) {
      filter = JSON.parse(filter);
    }
    if (sort) {
      sort = JSON.parse(sort);
    }
    console.log(filter, sort, skip, limit);
    const users = await User.aggregate(AllUserQuery(filter, sort, skip, limit));
    if (users.length !== 0) {
      res.status(200).json({
        success: true,
        users: users[0]
      });
    } else {
      res.status(200).json({
        success: true,
        users: {
          count: 0,
          users: []
        }
      });
    }
  } catch (error) {
    next(ErrorHandler('Error', 400, res));
  }
});

//Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  let skip = req.query?.skip;
  let limit = req.query?.limit;
  let user = await User.findById(req.params.id, { password: 0, balance: 0 });
  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 400, res));
  }
  let balance = await User.aggregate(UserBalanceQuery(req.params.id, skip, limit));
  if (balance.length !== 0) {
    balance = balance[0];
  } else {
    balance = {
      count: 0,
      total: 0,
      codTotal: 0,
      returnTotal: 0,
      cashbackTotal: 0,
      records: []
    };
  }
  res.status(200).json({
    success: true,
    user,
    balance
  });
});

//Admin update user profile => /api/v1/admin/user/update/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = req.body;

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    // TODO user Root ko dc edit
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true
  });
});

//Delete user  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user.username == 'root') {
    return next(new ErrorHandler('Cannot delete root user', 400, res));
  }
  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id} `));
  }

  await user.remove();

  res.status(200).json({
    success: true
  });
});
