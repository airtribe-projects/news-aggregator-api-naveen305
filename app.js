const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes')
const preferenceRoutes  = require('./routes/preference.routes')
const newsRoutes  = require('./routes/news.routes')


dotenv.config();



//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//Routes
app.use('/users', userRoutes)
app.use('/users', preferenceRoutes)
app.use("/", newsRoutes);




const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Exit process if DB fails
  })



module.exports = app;