const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const createUser = async (userData) => {
   try {
       if(!userData.password || userData.password.length < 6) {
               throw new Error('Password min length is 6')
       }
       const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
          const newUser = await User.create({
               ...userData,
               password : hashedPassword
          })
          return {
               id : newUser._id,
               email: newUser.email
          }

   } catch(err) {
          if(err.code === 11000) {
               throw new Error('Email already exists')
          }
          throw err;
   }
}


module.exports = {createUser}