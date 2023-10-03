const Product = require("../models/product");

//Create a new Product => api/v1/products/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
exports.getAllProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Get All Products",
  });
};
