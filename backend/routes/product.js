const express = require('express');
const router = express.Router();
// const uploadMultipleImages = require('../middlewares/multer');
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReviews,
  scanBarcode,
  getProductBarcodes
} = require('../controllers/productControllers');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { processProductForm } = require('../middlewares/processProductForm');
const { getAllProductTypeWeb } = require('../controllers/adminToolController');

router.route('/products').get(getProducts);

router.route('/product/:id').get(getSingleProduct);
router.route('/product/scan/:barcode').get(scanBarcode);
router
  .route('/product/getbarcode/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getProductBarcodes);

router.route('/admin/product/new').post(isAuthenticatedUser, newProduct);
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), processProductForm, updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/review').put(createProductReview);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReviews);

router.route('/product/category/all').get(getAllProductTypeWeb);

module.exports = router;
