const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const {
  createNews,
  getAllNews,
  deleteNews,
  updateNews,
  getSingleArticle,
  createComment,
  likeNew,
  viewNew
} = require('../controllers/newsController');

router.route('/news/createNews').post(isAuthenticatedUser, authorizeRoles('admin'), createNews);
router.route('/news/find/:id').get(getSingleArticle);
router.route('/news/allNews').get(getAllNews);
router
  .route('/news/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteNews)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateNews);
//router.route('/news/comment/:id').post(createComment);

router.route('/news/:id/comments').post(createComment);
router.route('/news/:id/likeCount').post(likeNew);
router.route('/news/:id/viewCount').post(viewNew);

router.route('/admin/news/allNews').get(isAuthenticatedUser, authorizeRoles('admin'), getAllNews);

module.exports = router;
