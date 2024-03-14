const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/detail/:id', UserController.detailUser);
router.get('/getAllUser', UserController.getAllUser);
// router.post('/update', UserController.updateUser);
module.exports = router