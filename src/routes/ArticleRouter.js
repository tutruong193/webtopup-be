const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');

router.get('/articles/search', ArticleController.searchUserArticles);

module.exports = router;