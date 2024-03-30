const ContributionService = require('../services/ContributionService');

const createContribution = async (req, res) => {
    try {
        const { studentId, title, submission_date, lastupdated_date, eventId, facultyId, status } = req.body;
        const filename = process.env.FILENAME
        console.log(filename)
        if (!studentId || !title || !submission_date || !lastupdated_date || !eventId || !facultyId || !status) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Incomplete input data',
            });
        }
        let imageFiles = [];
        for (let i = 0; i < 3; i++) {
            const imageKey = `image_${i}`;
            if (req.body[imageKey] !== null && req.body[imageKey] !== undefined) {
                imageFiles.push(req.body[imageKey]);
            }
        }

        const response = await ContributionService.createContribution({
            studentId,
            title,
            submission_date,
            lastupdated_date,
            eventId,
            facultyId,
            status,
            imageFiles: imageFiles,
            wordFile: filename,
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getDetailContributionByEvent = async (req, res) => {
    try {
        const contributionId = req.params.id
        if (!contributionId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Incomplete input data',
            });
        }
        const response = await ContributionService.getDetailContributionByEvent(contributionId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
const getDetailContribution = async (req, res) => {
    try {
        const contributionId = req.params.id
        if (!contributionId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Incomplete input data',
            });
        }
        const response = await ContributionService.getDetailContribution(contributionId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
const getContributionSubmited = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Incomplete input data',
            });
        }
        const response = await ContributionService.getContributionSubmited(studentId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
const deleteContribution = async (req, res) => {
    try {
        const contributionId = req.params.id
        console.log(contributionId)
        if (!contributionId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Contribution not found',
            });
        }
        const response = await ContributionService.deleteContribution(contributionId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
const updateContribution = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ContributionID is required'
            })
        }
        const response = await ContributionService.updateContribution(id, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getContributionsByEventAndFaculty = async (req, res) => {
    try {
        const { eventId, facultyId } = req.params;
        if (!eventId || !facultyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The eventId and facultyId is required'
            })
        }
        const response = await ContributionService.getContributionsByEventAndFaculty(eventId, facultyId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllContributions = async (req, res) => {
    try {
        const response = await ContributionService.getAllContributions()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createContribution,
    getDetailContributionByEvent,
    getContributionSubmited,
    deleteContribution,
    updateContribution,
    getContributionsByEventAndFaculty,
    getAllContributions,
    getDetailContribution
};
