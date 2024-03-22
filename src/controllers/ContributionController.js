
const ContributionService = require('../services/ContributionService');
const createContribution = async (req, res) => {
    try {
        const response = await ContributionService.createContribution(req.file)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createContribution,
}