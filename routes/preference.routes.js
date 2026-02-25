const express = require('express');
const authenticate = require('../middlewares/auth.middleware');
const router = express.Router();
const preferenceController = require('../controllers/preference.controller')

router.get('/preferences', authenticate, preferenceController.getPreferences)
router.put('/preferences', authenticate, preferenceController.updatePreferences)



module.exports = router;


