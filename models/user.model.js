const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password : {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    }
})


module.exports = mongoose.model("Users", userSchema)