const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const {
  allCashFlows,
  getAllFeedback,
  adminResetPassword,
  addNewProductType,
  getAllProductType,
  updateCategory,
  deleteCategory,
  addNewInfoPage,
  getAllInfoPage,
  updateInfoPage,
  deleteInfopage
} = require('../controllers/adminToolController');
const { deleteCloudinaryImage } = require('../controllers/miscController');

router.route('/admin/cashflow').get(isAuthenticatedUser, authorizeRoles('admin'), allCashFlows);
router
  .route('/admin/getAllFeedback')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllFeedback);
router
  .route('/admin/resetUserPassword/:id')
  .post(isAuthenticatedUser, authorizeRoles('admin'), adminResetPassword);

router
  .route('/admin/product/category')
  .post(isAuthenticatedUser, authorizeRoles('admin'), addNewProductType)
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllProductType)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

router
  .route('/admin/page')
  .post(isAuthenticatedUser, authorizeRoles('admin'), addNewInfoPage)
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllInfoPage)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateInfoPage)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteInfopage);

router
  .route('/admin/image')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCloudinaryImage);

module.exports = router;
