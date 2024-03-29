const User = require('../models/UserModel');
const { generalAccessToken } = require("./JWTService");
const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, role, faculty } = data;
        try {
            const checkEmail = await User.findOne({ email: email })
            if (checkEmail !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Email already exists'
                })
            } else {
                const createdUser = await User.create({
                    name,
                    email,
                    password,
                    role,
                    faculty,
                })
                if (createdUser) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createdUser
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (data) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = data;
        try {
            const checkUser = await User.findOne({ email: email })
            if (checkUser == null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                })
            }

            if (password !== checkUser.password) {
                resolve({
                    status: 'ERR',
                    message: 'The password or username is not correct'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                role: checkUser.role,
                faculty: checkUser.faculty
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token: access_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

const detailUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = async (limit = 5, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
        ///    const totalData = await User.length()
            const data = await User.find().limit(limit).skip(page*limit)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: data,
               // total: totalData,
                pageCurrent: page + 1,
                //totalPage: Math.ceil(totalData/limit)
            })
        } catch (error) {
            throw error;
        }
    })
};

const updateUser = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateUser = await User.findByIdAndUpdate(id, data);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            })
        } catch (error) {
            throw error;
        }
    })
};

const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
        } catch (error) {
            throw error;
        }
    })
};
const getUserName = async (id) => {
    try {
        const user = await User.findById(id);
        if (user) {
            return user.name;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

const searchUser = async (query) => {
    try {
        const users = await User.find(query);
        return {
            status: 'OK',
            message: 'SUCCESS',
            data: users
        };
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createUser,
    loginUser,
    detailUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserName,
    searchUser
}