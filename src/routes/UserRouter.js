const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authAdminMiddleWare, authStudentMiddleWare } = require('../middleware/authMiddleware');
router.post('/logout', UserController.logoutUser)
router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/detail/:id', authAdminMiddleWare, UserController.detailUser);
router.get('/getall', UserController.getAllUser);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id',authAdminMiddleWare, UserController.deleteUser);
router.get('/search/name', authAdminMiddleWare, UserController.searchUser);
module.exports = router