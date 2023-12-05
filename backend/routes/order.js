const express = require('express');
const router = express.Router();

const {
  newOrder,
  myOrders,
  allOrders,
  deleteOrder,
  getSingleOrder
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// user.role == shipper ROUTE
router.route('/order/new').post(newOrder);
router.route('/order/:id').get(getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

// user.role == admin ROUTE
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router
  .route('/admin/order/:id')
  // .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

module.exports = router;
