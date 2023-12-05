const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { Feedback } = require('../models/feedback');
const { ErrorHandler } = require('../utils/errorHandler');
const { InfoPage } = require('../models/InfoPage');
const { deleteCloudinaryImage } = require('../utils/cloudinary');

//api/v1/misc/feedback
exports.newFeedback = catchAsyncErrors(async (req, res) => {
  const { title, content } = req.body;
  //console.log(title,content)
  try {
    const feedback = await Feedback.create({
      title,
      content,
      createdUser: req.user._id
    });
    res.status(200).json({
      success: true,
      message: 'Feedback created successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

exports.getPages = catchAsyncErrors(async (req, res, next) => {
  try {
    const pages = await InfoPage.find({}, { _id: 0, __v: 0 });
    res.status(200).json(pages);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.deleteCloudinaryImage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name } = req.query;
    await deleteCloudinaryImage(name);
    res.status(200).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, res));
  }
});
