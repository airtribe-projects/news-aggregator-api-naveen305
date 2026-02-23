const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters']
    },
    preferences: {
        categories : {
            type: [String],
            default: []
        },
        languages : {
            type: [String],
            default: []
        }
    }
}, {timestamps: true})


module.exports = mongoose.model("Users", userSchema)