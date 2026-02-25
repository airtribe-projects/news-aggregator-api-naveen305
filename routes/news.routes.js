const express = require('express');
const authenticate = require('../middlewares/auth.middleware');
const newsController = require('../controllers/news.controller')


const router = express.Router();


router.get('/news', authenticate, newsController.getNews)


module.exports = router;


