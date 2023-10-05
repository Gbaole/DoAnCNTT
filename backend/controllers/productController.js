const Product = require("../models/product");

//Create a new Product => api/v1/products/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//Get All Product => api/v1/products
exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

//Get Single Product => api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Update Single Product => api/v1/product/update/:id
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

//delete Product => api/v1/product/delete/:id
exports.deleteProduct = async (req, res, next) => {
  // try {
  //   const product = await Product.findById(req.params.id);
  //   if (!product) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Product not found",
  //     });
  //   }
  //   await product.remove();
  //   res.status(200).json({
  //     success: true,
  //     message: "Product deleted successfully",
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({
  //     success: false,
  //     message: "Internal Server Error",
  //   });
  //   const product = await Product.findById(req.params.id);
  //   if (!product) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Product not found",
  //     });
  //   }
  //   await product.remove();
  //   res.status(200).json({
  //     success: true,
  //     message: "Product deleted successfully",
  //   });
  // }
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  await Product.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};
