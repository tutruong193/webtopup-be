const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authAdminMiddleWare, authStudentMiddleWare } = require('../middleware/authMiddleware');
router.post('/logout', UserController.logoutUser)
router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/detail/:id', authStudentMiddleWare, UserController.detailUser);
router.get('/getall', UserController.getAllUser);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
module.exports = router