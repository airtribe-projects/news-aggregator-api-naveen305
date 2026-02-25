const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 5;

const createUser = async (userData) => {
     try {
          if (!userData.password || userData.password.length < 6) {
               throw new Error('Password min length is 6')
          }
          const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
          const newUser = await User.create({
               ...userData,
               password: hashedPassword
          })
          return {
               id: newUser._id,
               email: newUser.email,
               preferences: newUser.preferences

          }

     } catch (err) {
          if (err.code === 11000) {
               throw new Error('Email already exists')
          }
          throw err;
     }
}

const loginUser = async (userData) => {
          if (!userData.email || !userData.password) {
               throw new Error('Email / Password needed')
          }
          const { email, password } = userData

          const findUser = await User.findOne({ email: email.toLowerCase()  })
          if (!findUser) {
               throw new Error('Invalid Credentials')
          }
          const comparePassword = await bcrypt.compare(password, findUser.password)
          if (!comparePassword) {
               throw new Error('Invalid Credentials')
          }
          const token = jwt.sign({id:findUser._id, email: findUser.email}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN } )
          return token;
}

module.exports = { createUser, loginUser }