//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const { signup, login } = userController
const userAuth = require('../middlewares/userAuth.js')

const router = express.Router()

// Signup endpoint
// Passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

// Login route
router.post('/login', login)

module.exports = router