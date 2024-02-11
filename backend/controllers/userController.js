
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    const temp = await User.findOne({_id:user._id})

    res.status(200).json({token,email:temp.email,fname:temp.fname,age:temp.age,mobile:temp.mobile,dob:temp.dob})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, name} = req.body
  try {
    const user = await User.signup(email, password, name)

    // create a token
    const token = createToken(user._id)
    const temp = await User.findOne({_id:user._id})
    res.status(200).json({token,email:temp.email,fname:temp.fname,age:temp.age,mobile:temp.mobile,dob:temp.dob})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


const updateUser = async (req, res) => {
  const {name,dob,mobile,age} = req.body
  try{
    const user = await User.modify(name,dob,mobile,age)
    res.status(200).json(user)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser,  updateUser}