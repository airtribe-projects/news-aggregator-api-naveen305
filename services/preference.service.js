const User = require('../models/user.model');

const getPreferences = async (userId) => {
    const user = await User.findById(userId).select('preferences');
    if (!user) throw new Error('User not found');
    return user.preferences;
}


const updatePreferences = async (userId, preferences) => {
    if(!preferences) {
        throw new Error('Preferences are required');
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { preferences } },
        { returnDocument: 'after', runValidators: true }
    ).select('preferences');

    if (!user) throw new Error('User not found');
    return user.preferences;

}

module.exports = { getPreferences, updatePreferences }