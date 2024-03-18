const express = require('express');
const router = express.Router();
const FacultyController = require('../controllers/FacultyController');

router.post('/create', FacultyController.createFaculty)
router.delete('/delete/:id', FacultyController.deleteFaculty)
router.get('/getall', FacultyController.getAllFaculty)
router.get('/getname/:id', FacultyController.getNameFaculty)
module.exports = router
