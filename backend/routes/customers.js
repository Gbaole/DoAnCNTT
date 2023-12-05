const express = require('express');
const router = express.Router();
const { createCustomer } = require('../controllers/customerController');

router.route('/customers').post(createCustomer);
module.exports = router;
