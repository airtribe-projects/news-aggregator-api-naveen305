const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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