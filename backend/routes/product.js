const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  newProduct,
} = require("../controllers/productController");

router.route("/products").get(getAllProducts);
router.route("/product/new").post(newProduct);

module.exports = router;
