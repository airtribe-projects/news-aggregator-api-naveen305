const preferenceServices = require('../services/preference.service')


const getPreferences = async (req, res) => {
    try {
        const preferences = await preferenceServices.getPreferences(req.user.id)
        res.status(200).json({ status: true, data: preferences });

    } catch (err) {
        res.status(400).json({ "status": false, "message": err.message })
    }
}


const updatePreferences = async (req, res) => {
    try {
        const preferences = await preferenceServices.updatePreferences(req.user.id,req.body.preferences);
        res.status(200).json({
            status: true,
            data: preferences
        });

    } catch (err) {
        res.status(400).json({ "status": false, "message": err.message });
    }
}

module.exports = { getPreferences, updatePreferences }