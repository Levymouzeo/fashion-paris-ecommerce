const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter.controller');
const auth = require('../middlewares/auth');

router.get('/', newsletterController.getAllNewsletters);
router.get('/:id', newsletterController.getNewsletterById);
router.post('/', newsletterController.createNewsletter);
router.delete('/:id', newsletterController.deleteNewsletter);

module.exports = router; 