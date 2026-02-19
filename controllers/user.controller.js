const userService = require('../services/user.service')

registerUser = async(req,res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user)
    } catch(err) {
        res.status(400).json({"status": false, "message" : err.message})
    }
}

module.exports = {registerUser}