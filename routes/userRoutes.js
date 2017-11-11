'use strict'

const express = require('express')
const api = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

api.post('/signup', userController.signUp)
api.post('/login', userController.login)
api.post('/answer/save', auth, userController.saveAnswer)

module.exports = api
