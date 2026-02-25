const newsServices = require('../services/news.service');


const getNews = async (req, res) => {
    try {
        const news = await newsServices.fetchNews(req.user.id)
        //res.status(200).json({ status: true, totalResults: news.length, articles: news });
        res.status(200).json({news: news});

    } catch (err) {
        res.status(400).json({ "status": false, "message": err.message })
    }
}


module.exports = { getNews }