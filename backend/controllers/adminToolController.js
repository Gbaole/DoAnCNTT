const { ErrorHandler } = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { Cashflow } = require('../models/cashFlow');
const { Feedback } = require('../models/feedback');
const FeedbackQuery = require('./mongoQuery/FeedbackQuery');
const CashflowQuery = require('./mongoQuery/CashflowQuery');
const { User } = require('../models/user');
const { Category } = require('../models/category');
const { InfoPage } = require('../models/InfoPage');

const { uploadImg } = require('../utils/cloudinary');

//Get All Cash FLow => /api/v1/admin/cashflows
exports.allCashFlows = catchAsyncErrors(async (req, res, next) => {
  let period = req.query?.period;
  let filter = req.query?.filter;
  let sort = req.query?.sort;
  const skip = req.query?.skip;
  const limit = req.query?.limit;
  // console.log(period, filter, sort);
  try {
    if (period) {
      period = JSON.parse(period);
      period.from = new Date(period.from);
      period.to = new Date(period.to);
    }
    if (filter) {
      filter = JSON.parse(filter);
    }
    if (sort) {
      sort = JSON.parse(sort);
    }
    // console.log(period, filter, sort, skip, limit);
    let result = await Cashflow.aggregate(CashflowQuery(period, filter, sort, skip, limit));
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        result: result[0]
      });
    } else {
      res.status(200).json({
        success: false
      });
    }
  } catch (error) {
    return next(ErrorHandler(error.message, 400, res));
  }
});

//Get All Feedback => v1/admin/getFeedback
exports.getAllFeedback = catchAsyncErrors(async (req, res, next) => {
  // const feedback = await Feedback.find();
  let { filter, sort, skip, limit } = req.query;
  console.log(filter, sort, skip, limit);
  try {
    if (filter) {
      filter = JSON.parse(filter);
    }
    if (sort) {
      sort = JSON.parse(sort);
    }
    const feedback = await Feedback.aggregate(FeedbackQuery(filter, sort, skip, limit));
    res.status(200).json({
      success: true,
      feedbackObject: feedback[0]
    });
  } catch (error) {
    console.log(error);
  }
});

//Admin button to reset password of user to 123456 => v1/user/:id
exports.adminResetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  user.password = '123456';
  await user.save();
  // sendToken(user, 200, res);
  res.status(200).json({
    success: true,
    user
  });
});

exports.getAllProductType = catchAsyncErrors(async (req, res, next) => {
  try {
    const { skip, limit } = req.query;
    const cat = await Category.aggregate([
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          },
          records: {
            $push: '$$ROOT'
          }
        }
      },
      {
        $project: {
          _id: 0,
          count: 1,
          records: {
            $slice: ['$records', parseInt(skip), parseInt(limit)]
          }
        }
      },
      {
        $addFields: {
          definition: [
            { dis: 'Tên', key: 'name', type: 'string' },
            { dis: 'Mã (#hashtag)', key: 'routeName', type: 'string' }
          ]
        }
      }
    ]);
    if (cat.length > 0) {
      res.status(200).json(cat[0]);
    } else {
      res.status(200).json({
        count: 0,
        records: []
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.addNewProductType = catchAsyncErrors(async (req, res, next) => {
  try {
    let { name, routeName, avatar, cover } = req.body;
    const avaArray = [];
    // chi 1 avatar duy nhat
    if (req.files?.avatar) {
      const imgObj = await uploadImg(req.files.avatar);
      avaArray.push(imgObj);
    }
    let coverArray = [];
    if (req.files?.cover) {
      if (req.files.cover.length !== undefined) {
        for (let i = 0; i < req.files.cover.length; i++) {
          const imgObj = await uploadImg(req.files.cover[i]);
          coverArray.push(imgObj);
        }
      } else {
        const imgObj = await uploadImg(req.files.cover);
        coverArray.push(imgObj);
      }
    }

    if (avatar) {
      if (typeof avatar == 'string') {
        avatar = JSON.parse(avatar);
      }
    }
    if (cover) {
      if (typeof cover == 'string') {
        const coverObj = JSON.parse(cover);
        if (coverObj.length !== undefined) {
          coverArray = [...coverArray, ...coverObj];
        } else {
          coverArray = [...coverArray, coverObj];
        }
      }
    }
    const pt = await Category.create({
      name,
      routeName,
      avatar: avatar ? avatar : avaArray,
      cover: coverArray
    });
    res.status(200).json(pt);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    let { name, routeName, avatar, cover } = req.body;
    const avaArray = [];
    // chi 1 avatar duy nhat
    if (req.files?.avatar) {
      const imgObj = await uploadImg(req.files.avatar);
      avaArray.push(imgObj);
    }
    const coverArray = [];
    if (req.files?.cover) {
      if (req.files.cover.length !== undefined) {
        for (let i = 0; i < req.files.cover.length; i++) {
          const imgObj = await uploadImg(req.files.cover[i]);
          coverArray.push(imgObj);
        }
      } else {
        const imgObj = await uploadImg(req.files.cover);
        coverArray.push(imgObj);
      }
    }

    if (avatar) {
      if (typeof avatar == 'string') {
        avatar = JSON.parse(avatar);
      }
    }
    // console.log(typeof cover);
    if (cover) {
      if (typeof cover === 'string') {
        // const coverObj = JSON.parse(cover);
        coverArray.push(JSON.parse(cover));
      } else {
        for (let i = 0; i < cover.length; i++) {
          console.log(cover[i]);
          coverArray.push(JSON.parse(cover[i]));
        }
      }
    }

    // console.log(coverArray);
    const pt = await Category.findByIdAndUpdate(
      req.body._id,
      {
        name,
        routeName,
        avatar: avatar ? avatar : avaArray,
        cover: coverArray
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.query;
    await Category.findByIdAndRemove(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.getAllProductTypeWeb = catchAsyncErrors(async (req, res, next) => {
  try {
    const cat = await Category.find({}, { _id: 0, __v: 0, cover: 0 });
    if (cat.length > 0) {
      res.status(200).json(cat);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, res));
  }
});

//ID
exports.addNewInfoPage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, routeName, cover, title, content } = req.body;

    let coverArray = [];
    if (req.files?.cover) {
      if (req.files.cover.length !== undefined) {
        for (let i = 0; i < req.files.cover.length; i++) {
          const imgObj = await uploadImg(req.files.cover[i]);
          coverArray.push(imgObj);
        }
      } else {
        const imgObj = await uploadImg(req.files.cover);
        coverArray.push(imgObj);
      }
    }

    if (cover) {
      if (typeof cover == 'string') {
        const coverObj = JSON.parse(cover);
        if (coverObj.length !== undefined) {
          coverArray = [...coverArray, ...coverObj];
        } else {
          coverArray = [...coverArray, coverObj];
        }
      }
    }
    const ip = await InfoPage.create({
      name,
      routeName,
      cover: coverArray,
      title,
      content
    });
    res.status(200).json(ip);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.getAllInfoPage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { skip, limit } = req.query;
    const ip = await InfoPage.aggregate([
      {
        $project: {
          content: 0
        }
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1
          },
          records: {
            $push: '$$ROOT'
          }
        }
      },
      {
        $project: {
          _id: 0,
          count: 1,
          records: {
            $slice: ['$records', parseInt(skip), parseInt(limit)]
          }
        }
      },
      {
        $addFields: {
          definition: [
            { dis: 'Tên', key: 'name', type: 'string' },
            { dis: 'Mã', key: 'routeName', type: 'string' }
          ]
        }
      }
    ]);
    if (ip.length > 0) {
      res.status(200).json(ip[0]);
    } else {
      res.status(200).json({
        count: 0,
        records: []
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.getSinglePage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { routeName } = req.query;
    if (routeName) {
      const page = await InfoPage.findOne({ routeName });
      if (page) {
        res.status(200).json(page);
      } else {
        return next(new ErrorHandler('Invalid routeName', 500, res));
      }
    } else {
      return next(new ErrorHandler('No routeName provided', 500, res));
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.updateInfoPage = catchAsyncErrors(async (req, res, next) => {
  try {
    let { name, routeName, cover, title, content } = req.body;

    const coverArray = [];
    if (req.files?.cover) {
      if (req.files.cover.length !== undefined) {
        for (let i = 0; i < req.files.cover.length; i++) {
          const imgObj = await uploadImg(req.files.cover[i]);
          coverArray.push(imgObj);
        }
      } else {
        const imgObj = await uploadImg(req.files.cover);
        coverArray.push(imgObj);
      }
    }

    if (cover) {
      if (typeof cover === 'string') {
        // const coverObj = JSON.parse(cover);
        coverArray.push(JSON.parse(cover));
      } else {
        for (let i = 0; i < cover.length; i++) {
          console.log(cover[i]);
          coverArray.push(JSON.parse(cover[i]));
        }
      }
    }

    console.log(coverArray);
    const ip = await InfoPage.findByIdAndUpdate(
      req.body._id,
      {
        name,
        routeName,
        cover: coverArray,
        title,
        content
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    );
    res.status(200).json({ success: true, page: ip });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500, res));
  }
});

exports.deleteInfopage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.query;
    await InfoPage.findByIdAndRemove(id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500, res));
  }
});
