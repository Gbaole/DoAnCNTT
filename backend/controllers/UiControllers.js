const { Home } = require('../UIconstants/Home');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { News } = require('../models/news');
const { Product } = require('../models/product');

exports.getHomeContent = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.find(undefined, { name: 1, thumbnail: 1, price: 1 })
    .skip(0)
    .limit(6);
  const article = await News.find(undefined, {
    heading: 1,
    coverImage: 1,
    caption: 1,
    view: 1,
    like: 1
  })
    .skip(0)
    .limit(6);
  res.status(200).json({ product, article, component: Home });
});
