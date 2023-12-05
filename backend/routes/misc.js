const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/auth');
const { newFeedback, getPages } = require('../controllers/miscController');
const { getSinglePage } = require('../controllers/adminToolController');

router.route('/misc/feedback').post(isAuthenticatedUser, newFeedback);
router.route('/home/pages').get(getPages);
router.route('/home/page').get(getSinglePage);

module.exports = router;
