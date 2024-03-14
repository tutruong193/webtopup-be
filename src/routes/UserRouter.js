const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/detail/:id', UserController.detailUser);
router.get('/getAllUser', UserController.getAllUser);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
module.exports = router