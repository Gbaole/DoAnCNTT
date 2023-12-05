const mongoose = require('mongoose');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { ErrorHandler } = require('../utils/errorHandler');
const { News } = require('../models/news');
const NewsQuery = require('./mongoQuery/NewsQueryAdmin');
const { uploadImg } = require('../utils/cloudinary');
const NewsQueryAdmin = require('./mongoQuery/NewsQueryAdmin');

exports.createNews = catchAsyncErrors(async (req, res, next) => {
  try {
    const { type, heading, caption, content, view, endDay, status, priority } = req.body;
    const newArticle = {
      type,
      heading,
      caption,
      content,
      view,
      endDay,
      status,
      priority,
      editedUser: req.user._id,
      createdUser: req.user._id
    };
    if (req.files?.coverImage.mv) {
      console.log(req.files.coverImage);
      //upload coverImage
      const imgObj = await uploadImg(req.files.coverImage);
      newArticle.coverImage = imgObj;
    }
    const news = await News.create(newArticle);
    res.status(200).json({
      success: true,
      message: 'News created successfully',
      news
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

exports.getSingleArticle = catchAsyncErrors(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler('Invaid new ID', 404, res));
  }
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(new ErrorHandler(`No News not found with Id: ${req.params.id}`, 404, res));
  } else {
    news.view += 1;
    news.save();
    res.status(200).json({
      success: true,
      news
    });
  }
});

exports.getAllNews = catchAsyncErrors(async (req, res) => {
  let { filter, skip, limit } = req.query;
  console.log(filter, skip, limit);
  try {
    if (filter) {
      filter = JSON.parse(filter);
    }
    let feedback;
    if (req?.user?.role == 'admin') {
      console.log('admin');
      feedback = await News.aggregate(NewsQueryAdmin(filter, skip, limit));
    } else {
      console.log('not Admin');
      feedback = await News.aggregate(NewsQuery(filter, skip, limit));
    }
    if (feedback.length > 0) {
      res.status(200).json({
        success: true,
        feedbackObject: feedback[0]
      });
    } else {
      res.status(200).json({
        success: true,
        feedbackObject: { count: 0, records: [] }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

exports.deleteNews = catchAsyncErrors(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler('Invaid new ID', 404, res));
  }
  const news = await News.findById(req.params.id);

  if (!news) {
    return next(new ErrorHandler('New not found', 404));
  }
  await news.remove();

  res.status(200).json({
    success: true,
    message: 'New deleted successfully'
  });
});

exports.updateNews = catchAsyncErrors(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler('Invaid new ID', 404, res));
  }
  try {
    if (typeof req.body.coverImage == 'string') {
      req.body.coverImage = JSON.parse(req.body.coverImage);
    } else {
      const imgObj = await uploadImg(req.files.coverImage);
      req.body.coverImage = imgObj;
    }
    const { coverImage, type, heading, caption, content, endDay, priority } = req.body;

    const news = await News.findByIdAndUpdate(
      req.params.id,
      { coverImage, type, heading, caption, content, endDay, priority },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    );
    res.status(200).json({
      success: true,
      news
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400, res));
  }
});

exports.createComment = catchAsyncErrors(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler('Invaid new ID', 404, res));
  }
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(new ErrorHandler(`No news not found with id: ${req.params.id}`, 404, res));
  }
  const { name, content } = req.body;
  news.comments.unshift({ name: name, content: content });
  news.save();

  res.status(200).json({
    success: true,
    news
  });
});

exports.likeNew = catchAsyncErrors(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler('Invaid new ID', 404, res));
  }
  console.log('id ok');
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(new ErrorHandler(`No news not found with id: ${req.params.id}`, 404, res));
  }
  news.like += 1;
  news.save();

  res.status(200).json({
    success: true,
    news
  });
});

//view new
exports.viewNew = catchAsyncErrors(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler('Invaid new ID', 404, res));
  }
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(new ErrorHandler(`No news not found with id: ${req.params.id}`, 404, res));
  }
  news.view = news.view + 1;
  news.save();

  res.status(200).json({
    success: true,
    news
  });
});
