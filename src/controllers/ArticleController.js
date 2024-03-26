const ArticleService = require('../services/ArticleService');

const searchUserArticles = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user information stored in req.user after authentication
        const query = req.query; // Get search query parameters
        const response = await ArticleService.searchUserArticles(userId, query);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

module.exports = {
    searchUserArticles
}