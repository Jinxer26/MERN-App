const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  dob: {
    type: String
  },
  age: {
    type: String
  },
  mobile: {
    type: String
  }
})

// static signup method
userSchema.statics.signup = async function(email, password, fname) {

  // validation
  if (!email || !password || !fname) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const dob = "11/2/2024"
  const mobile = "0000000000"
  const age = "00"

  const user = await this.create({ email, password: hash, fname , dob , mobile , age })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// static update method
userSchema.statics.modify = async function(fname,dob,mobile,age) {

  const user = await this.updateOne({fname,dob,mobile,age})

  return user

}

module.exports = mongoose.model('User', userSchema)