const express = require('express');
const router = express.Router();

const { getHomeContent } = require('../controllers/UiControllers');

router.route('/ui/home').get(getHomeContent);
module.exports = router;
