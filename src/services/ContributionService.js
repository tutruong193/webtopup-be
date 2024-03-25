const Contribution = require("../models/ContributionModel");

const createContribution = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { studentId, title, wordFile, submission_date, lastupdated_date, eventId, facultyId, status, imageFiles } = data;
            const newContribution = new Contribution({
                studentId,
                title,
                wordFile,
                imageFiles, // Thêm thông tin về tệp vào bản ghi
                submission_date,
                lastupdated_date,
                eventId,
                facultyId,
                status
            });
            await newContribution.save();
            resolve({
                status: 'OK',
                message: 'SUCCESS'
            });
        } catch (error) {
            reject(error);
            console.error(error);
        }
    });
};
const getDetailContribution = async (contributionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contributionData = await Contribution.findOne({ eventId: contributionId }); // Chú ý sử dụng await để đợi lấy dữ liệu
            if (!contributionData) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: null
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: contributionData
            });
        } catch (error) {
            reject(error);
            console.error(error);
        }
    })
}
const getContributionSubmited = async (studentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contributionSubmited = await Contribution.find({ studentId: studentID }); // Chú ý sử dụng await để đợi lấy dữ liệu
            if (!contributionSubmited) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: null
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: contributionSubmited
            });
        } catch (error) {
            reject(error);
            console.error(error);
        }
    })
}
const deleteContribution = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Contribution.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
        } catch (error) {
            throw error;
        }
    })
};
const updateContribution = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateContribution = await Contribution.findByIdAndUpdate(id, data);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateContribution
            })
        } catch (error) {
            throw error;
        }
    })
};

module.exports = {
    createContribution,
    getDetailContribution,
    getContributionSubmited,
    deleteContribution,
    updateContribution
};
