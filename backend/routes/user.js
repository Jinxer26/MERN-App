const express = require('express')
const requireAuth = require('../middleware/requireAuth')
// controller functions
const { loginUser, signupUser, updateUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)


router.use(requireAuth)

// update route
router.post('/update', updateUser)

module.exports = router