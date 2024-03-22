const Contribution = require("../models/ContributionModel");

const createFile = async (req, res) => {
    try {

        await Contribution.create({ files: files });

        return res.status(200).json({ status: 'OK', message: 'Files uploaded and saved successfully' });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createFile
};
