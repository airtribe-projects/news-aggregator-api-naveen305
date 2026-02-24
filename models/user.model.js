const mongoose = require('mongoose');


const allowedLanguages = [
    "ar", "de", "en", "es", "fr",
    "he", "it", "nl", "no",
    "pt", "ru", "sv", "ur", "zh"
];

const allowedCategories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
];

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
        categories: {
            type: [{
                type: String,
                enum: allowedCategories
            }],
            default: []
        },
        languages: {
            type: [{
                type: String,
                enum: allowedLanguages
            }],
            default: []
        }
    }
}, { timestamps: true })


module.exports = mongoose.model("Users", userSchema)