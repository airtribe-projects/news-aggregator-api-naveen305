const userService = require('../services/user.service')

const registerUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ "status": false, "message": err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body)
        res.status(200).json({ "status": true, token })

    } catch (err) {
        res.status(401).json({ "status": false, "message": err.message })
    }
}

module.exports = { registerUser, loginUser }