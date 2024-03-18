
const Faculty = require("../models/FacultyModel")
const createFaculty = (newFaculty) => {
    return new Promise(async (resolve, reject) => {
        const { name } = newFaculty
        try {
            const checkFaculty = await Faculty.findOne({ name: name })
            if (checkFaculty !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The faculty is exist',
                })
            } else {
                await Faculty.create(newFaculty)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
const getNameFaculty = async (facultyId) => {
    try {
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            return null;
        }
        return faculty.name;
    } catch (error) {
        throw error;
    }
};
const getAllFaculty = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const faculty = await Faculty.find();
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: faculty
            });
        } catch (e) {
            reject(e);
        }
    })
};
const deleteFaculty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Faculty.findByIdAndDelete(id);
            if (!result) {
                throw new Error('User not found'); // Nếu không tìm thấy người dùng
            }
            resolve({
                status: 'OK',
                message: 'DELETE SUCCESS',
            });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createFaculty,
    getNameFaculty,
    deleteFaculty,
    getAllFaculty
}