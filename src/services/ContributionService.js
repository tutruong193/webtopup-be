const Contribution = require("../models/ContributionModel");
const Event = require("../models/EventModel");
const Faculty = require("../models/FacultyModel");
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
                status,
                comment: [],
                score: '',
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
const getDetailContributionByEvent = async (eventId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const contributionData = await Contribution.findOne({ eventId: eventId }); // Chú ý sử dụng await để đợi lấy dữ liệu
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
const getContributionsByEventAndFaculty = async (eventId, facultyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findEvent = await Event.findById(eventId);
            if (!findEvent) {
                resolve({
                    status: 'ERR',
                    message: 'ko có',
                })
            }
            const findFaculty = await Faculty.findById(facultyId);
            if (!findFaculty) {
                resolve({
                    status: 'ERR',
                    message: 'ko có',
                })
            }
            const data = await Contribution.find({ eventId: eventId, facultyId: facultyId }).exec()
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
    getDetailContributionByEvent,
    getContributionSubmited,
    deleteContribution,
    updateContribution,
    getContributionsByEventAndFaculty,
    getAllContributions,
    getDetailContribution
};
