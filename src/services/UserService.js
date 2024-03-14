const User = require('../models/UserModel');
const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, role } = data;
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
                    role
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
            const checkEmail = await User.findOne({ email: email })
            if (checkEmail == null) {
                resolve({
                    status: 'ERR',
                    message: 'Email not found'
                })
            }
            if (checkEmail.password !== password) {
                resolve({
                    status: 'ERR',
                    message: 'Password not true'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser
}