const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !name || !role) {
            // || !faculty
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const detailUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'ERR',
                message: 'User not found.'
            });
        }
    
        return res.status(200).json({
            status: 'OK',
            data: user
        });
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}




module.exports = {
    createUser,
    loginUser,
    detailUser
}