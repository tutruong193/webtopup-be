const Article = require('../models/ArticleModel');

const searchUserArticles = async (userId, query) => {
    try {
        const articles = await Article.find({ author: userId, ...query });
        return {
            status: 'OK',
            message: 'SUCCESS',
            data: articles
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    searchUserArticles
};