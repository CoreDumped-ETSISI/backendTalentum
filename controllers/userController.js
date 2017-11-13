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
  var industries = req.body.industries

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
      phone: phone,
      industries: industries
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

function updateUser(req, res){
  var email = req.body.email
  var firstname = req.body.firstname
  var surname = req.body.surname
  var avatarImage = req.body.avatarImage
  var password = req.body.password
  var phone = req.body.phone
  var industries = req.body.industries
  var updatedFields = {}

  if(email) updatedFields.email = req.body.email
  if(firstname) updatedFields.firstname = req.body.firstname
  if(surname) updatedFields.surname = req.body.surname
  if(avatarImage) updatedFields.avatarImage = req.body.avatarImage
  if(password) updatedFields.password = req.body.password
  if(phone) updatedFields.phone = req.body.phone
  if(industries) updatedFields.industries = req.body.industries

  User.findById(req.user, (err, user) => {
      if (err) return res.sendStatus(500)
      if (!user) return res.sendStatus(404)
      user.set(updatedFields)
      user.save((err) => {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200)
      })
    })
}

function getUsers(req, res){
  User.find({}, (err, users) => {
      if(err) return res.status(500).send({message: `Error on request: ${err}` })
      if(!users) return res.status(404).send({message: `No users found: ${err}` })

      return res.status(200).send(users)
  })
}

function getUser(req, res){
  User.find({_id: req.user})
  .exec((err, user) => {
      if(err) return res.status(500).send({message: `Error on request: ${err}` })
      if(!user) return res.status(404).send({message: `No users found: ${err}` })

      return res.status(200).send(user)
  })
}

function addOffers(req, res){
  var offerId = req.body.offerId

  User.update({ _id: req.user},
    { $push: { offers: offerId } },
    (err, user) => {
      res.sendStatus(200)
    })
}

module.exports = {
  signUp,
  login,
  updateUser,
  getUsers,
  getUser,
  addOffers
};
