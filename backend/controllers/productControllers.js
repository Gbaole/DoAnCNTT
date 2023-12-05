const { Product } = require('../models/product');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { ErrorHandler } = require('../utils/errorHandler');
const { default: mongoose } = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { getAllProductQuery } = require('./mongoQuery/productQuery/getAllProduct');
const { Category } = require('../models/category');

function getArrayIndex(index, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].index === index) return i;
  }
  return -1;
}

//Create a new Product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    req.body.createdUser = req.user.id;
    const ptArray = [];
    if (req.files) {
      let filesArrayName = Object.getOwnPropertyNames(req.files);
      for (let i = 0; i < filesArrayName.length; i++) {
        if (filesArrayName[i] == 'thumbnail') continue;
        const val = filesArrayName[i].split('_');
        const attName = val.pop();
        const index = val.pop();
        const att = val.pop();
        if (att === 'productType') {
          ptArray.push({
            index,
            image: req.files[filesArrayName[i]]
          });
        }
      }
    }

    const attArray = Object.getOwnPropertyNames(req.body);
    for (let i = 0; i < attArray.length; i++) {
      const val = attArray[i].split('_');
      if (val.length === 3) {
        const attName = val.pop();
        const index = val.pop();
        const att = val.pop();
        if (att === 'productType') {
          const pos = getArrayIndex(index, ptArray);
          if (pos === -1) {
            ptArray.push({
              index,
              image: [],
              [attName]: req.body[attArray[i]]
            });
          } else {
            ptArray[pos][attName] = req.body[attArray[i]];
          }
        }
      }
    }
    const thumbnailFiles = req.files?.thumbnail;
    const body = { ...req.body, thumbnail: [], productType: [] };
    const thumbArray = [];
    if (thumbnailFiles !== undefined) {
      if (thumbnailFiles.length !== undefined) {
        for (let i = 0; i < thumbnailFiles.length; i++) {
          const imgObj = await uploadImg(thumbnailFiles[i]);
          thumbArray.push(imgObj);
        }
      } else {
        const imgObj = await uploadImg(thumbnailFiles);
        thumbArray.push(imgObj);
      }
    }
    // console.log(ptArray);
    const stdProductType = [];
    for (let i = 0; i < ptArray.length; i++) {
      const imageArray = [];
      if (ptArray[i].image.length === undefined) {
        const imgObj = await uploadImg(ptArray[i].image);
        imageArray.push(imgObj);
      } else {
        for (let j = 0; j < ptArray.length; j++) {
          const imgObj = await uploadImg(ptArray[i].image[j]);
          imageArray.push(imgObj);
        }
      }
      stdProductType.push({ ...ptArray[i], image: imageArray });
    }

    body.productType = stdProductType;

    const { name, price, description, category, createdUser } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      thumbnail: thumbArray,
      createdUser,
      productType: stdProductType
    });
    if (product.productType.length !== 0) {
      for (let i = 0; i < product.productType.length; i++) {
        product.productType[i].barcode = barcodeGenerator(product.productType[i]._id);
      }
    } else {
      product.barcode = barcodeGenerator(product._id);
    }

    const update = await Product.findByIdAndUpdate(product._id, product);

    res.status(200).json({
      success: true,
      product: update
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

async function uploadImg(imFile) {
  const savePath = '/tmp/' + imFile.name;
  await imFile.mv(savePath);
  const type = imFile.mimetype.split('/');
  const cloudinaryUrl = await upload2Cloudinary(savePath, imFile.name, type[0]);
  return {
    url: cloudinaryUrl,
    name: imFile.name,
    mediaType: imFile.mimetype
  };
}

//get all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const { type, skip, limit } = req.query;

    let filter = { category: type };
    let cat;
    if (type == 'all-products') {
      filter = {};
      cat = { name: 'Tất cả sản phẩm', cover: [] };
    } else {
      cat = await Category.findOne({ routeName: type }, { _id: 0, cover: 1, name: 1 });
    }
    const products = await Product.aggregate(getAllProductQuery(skip, limit, filter));
    if (products.length === 0) {
      res.status(200).json({
        success: true,
        productCount: 0,
        cat,
        products: []
      });
    } else {
      res.status(200).json({ ...products[0], cat });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler('Products not found', 404, res));
  }
});

//get single products details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    return next(new ErrorHandler('Product not found', 404, res));
  }
  // if (!product) {
  //   return next(new ErrorHandler('Product not found', 404, res));
  // }
});

exports.scanBarcode = catchAsyncErrors(async (req, res, next) => {
  console.log(req.params.barcode);
  try {
    let productType = await Product.aggregate([
      {
        $match: {
          $or: [{ barcode: req.params.barcode }, { 'productType.barcode': req.params.barcode }]
        }
      },
      {
        $project: {
          productType: 1
        }
      }
    ]);

    if (productType.length !== 0) {
      if (productType[0].productType.length == 0) {
        console.log('type 1');
        const prod = await Product.findOne({ barcode: req.params.barcode });

        res.status(200).json({
          id: prod._id,
          typeID: null,
          name: prod.name,
          image: prod?.thumbnail[0],
          price: prod.price
        });
      } else {
        let pt;
        for (let i = 0; i < productType[0].productType.length; i++) {
          if (productType[0].productType[i]?.barcode === req.params.barcode) {
            res.status(200).json({
              ...productType[0].productType[i],
              typeID: i,
              _id: undefined,
              id: productType[0].productType[i]._id,
              stock: undefined
            });
            return;
          }
        }
      }
    } else {
      return next(new ErrorHandler('Product not found', 404, res));
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler('Product not found', 404, res));
  }
  // if (!product) {
  //   return next(new ErrorHandler('Product not found', 404, res));
  // }
});

exports.getProductBarcodes = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const barcode = await Product.findById(id, { barcode: 1, 'productType.barcode': 1 });
  if (barcode) {
    if (barcode.productType.length > 0) {
      res.status(200).json(barcode.productType);
    } else {
      res.status(200).json([{ barcode: barcode.barcode }]);
    }
  } else {
    return next(new ErrorHandler('Product not found', 404, res));
  }
});

//update product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(req.body);

    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler('Product not found', 404, res));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.log(error);
    return next(ErrorHandler(error.message, 500, res));
  }
});

//Delete product =)/api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

//Create new review =)/api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, rating, comment, productId } = req.body; // TODO Khách đã mua sp rồi thì mới có quyền add review
    const review = {
      name,
      email,
      rating: Number(rating),
      comment
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((r) => r.email === req.body.email);

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.email == req.body.email) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numofReviews = product.reviews.length;
    }
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(error.message, 400, res));
  }
});

//Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  console.log(req.query.id);
  const reviewObject = await Product.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.query.id)
      }
    },
    {
      $project: {
        _id: 0,
        // rating: 1,
        reviews: 1
      }
    },
    {
      $unwind: {
        path: '$reviews'
      }
    },
    {
      $group: {
        _id: '$_id',
        count: {
          $sum: 1
        },
        reviews: {
          $push: '$$ROOT.reviews'
        }
      }
    },
    {
      $project: {
        _id: 0,
        count: 1,
        reviews: {
          $slice: ['$reviews', 0, 2]
        }
      }
    }
  ]);
  res.status(200).json({
    success: true,
    reviewObject
  });
});

//Delete Product Review => /api/v1/reviews
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.query);
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    );

    const numofReviews = reviews.length;

    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length; //TODO check lại lần nữa

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numofReviews
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    );
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400, res));
  }
});

async function upload2Cloudinary(path, mdh, resource_type = 'image') {
  let res;
  console.log('Uploading to cloudinary');
  await cloudinary.uploader
    .upload(path, { public_id: mdh, resource_type })
    .then((data) => {
      // console.log(data);
      // console.log(data.secure_url);
      res = data.secure_url;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('Upload done!');
  return res;
}

function barcodeGenerator(ID) {
  let str = `KGL`;
  str += ID.toString().substr(-8).toUpperCase();
  return str;
}
