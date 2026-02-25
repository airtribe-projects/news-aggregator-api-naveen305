const axios = require("axios");
const User = require("../models/user.model");

const fetchNews = async (userId) => {

    const user = await User.findById(userId);
    if(!user){
        throw new Error('User not found');
    }
    const { categories, languages } = user.preferences;
    
    const language = languages?.[0] || "en";
    let allArticles = [];
    if (!categories || categories.length === 0) {
         const response = await axios.get(
            "https://newsapi.org/v2/top-headlines",
            {
                params: {
                    language,
                    apiKey: process.env.NEWS_API_KEY
                }
            }
        );
        return response.data.articles;
    }

    const requests = categories.map(category =>
        axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                category,
                language,
                apiKey: process.env.NEWS_API_KEY
            }
        })
    );

    const responses = await Promise.all(requests);

    responses.forEach(res => {
        allArticles.push(...res.data.articles);
    });

    return allArticles;

    

}

module.exports = {fetchNews}