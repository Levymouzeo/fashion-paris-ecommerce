const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogPost.controller');
const auth = require('../middlewares/auth');

router.get('/', blogPostController.getAllBlogPosts);
router.get('/:id', blogPostController.getBlogPostById);
router.post('/', blogPostController.createBlogPost);
router.put('/:id', blogPostController.updateBlogPost);
router.delete('/:id', blogPostController.deleteBlogPost);

module.exports = router; 