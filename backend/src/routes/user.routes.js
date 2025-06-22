const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', auth, userController.createUser);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router; 