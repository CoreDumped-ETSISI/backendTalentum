'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema
const question  = require('./question.js')
const bcrypt = require('bcrypt-nodejs')

var userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String },
  avatarImage: String,
  password: { type: String, select: false, required: true },
  signUpDate: { type:Date, default: Date.now() },
  answers: [{
    questionId: { type: Schema.Types.ObjectId , ref: 'question', required: true},
    answer: { type: String , require: true},
    timestamp: { type:Date, default: Date.now() }
  }]
});

userSchema.pre('save', function(next) {
  let user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(8, (err, salt) => {
    if(err) return next(err)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('User', userSchema);
