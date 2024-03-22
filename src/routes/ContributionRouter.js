const express = require('express');
const router = express.Router();
const ContributionController = require('../controllers/ContributionController');

router.post('/create', ContributionController.createContribution)

module.exports = router
