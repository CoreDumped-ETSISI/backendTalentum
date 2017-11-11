'use strict'

const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto');
const User = require('../models/user')
const services = require('../services')

function signUp(req, res){
  var email = req.body.email
  var firstname = req.body.firstname
  var surname = req.body.surname
  var avatarImage = req.body.avatarImage
  var password = req.body.password
  var phone = req.body.phone

  User.findOne({email: email})
  .exec((err, userExist) => {
    if (err) return res.sendStatus(500)
    if (userExist) return res.sendStatus(409)

    const user = new User({
      email: email,
      firstname:firstname,
      surname: surname,
      avatarImage: avatarImage,
      password: password,
      phone: phone
    })

    user.save((err, user) => {
      if (err) return res.sendStatus(500)
      if (!user) return res.sendStatus(500)
      return res.status(200).send({
        token: services.generate(user)
      })
    })
  })
}

function login(req, res){
  var email = req.body.email
  var password = req.body.password

  User.findOne({email: email})
  .select('+password')
  .exec((err, user) => {
    if (err) return res.sendStatus(500)
    if (!user) return res.sendStatus(404)

    bcrypt.compare(password, user.password, (err, equals) => {
      if (err) return res.sendStatus(500)
      if (!equals) return res.sendStatus(404)
      return res.status(200).send({
        token: services.generate(user) })
    })
  })
}

function saveAnswer(req, res){
  var questionId = req.body.questionId
  var answer = req.body.answer

  User.update({ _id: req.user},
    { $push: { answers: {questionId: questionId, answer: answer} } },
    (err, user) => {
      res.sendStatus(200)
    })
}

module.exports = {
  signUp,
  login,
  saveAnswer
};
