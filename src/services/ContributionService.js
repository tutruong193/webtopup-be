const Contribution = require("../models/ContributionModel");
const Event = require("../models/EventModel");
const Faculty = require("../models/FacultyModel");
const createContribution = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { studentId, title, nameofworddb, submission_date, lastupdated_date, eventId, facultyId, status, imageFiles, content, nameofword } = data;
            const newContribution = new Contribution({
                studentId,
                title,
                imageFiles,
                submission_date,
                lastupdated_date,
                eventId,
                facultyId,
                status,
                comment: [],
                score: '',
                content,
                nameofword,
                nameofworddb
            });

            // Lưu Contribution
            const savedContribution = await newContribution.save();

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: savedContribution
            });
        } catch (error) {
            reject(error);
            console.error(error);
        }
    });
};

const getDetailContribution = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contributionData = await Contribution.findOne({ _id: id }); // Chú ý sử dụng await để đợi lấy dữ liệu
            if (!contributionData) {
                resolve({
                    status: 'ERR',
                    message: 'ko có',
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
const getAllContributions = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Contribution.find().exec()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: data
            })
        } catch (error) {
            throw error;
        }
    })
}
module.exports = {
    createContribution,
    getContributionSubmited,
    deleteContribution,
    updateContribution,
    getAllContributions,
    getDetailContribution
};
