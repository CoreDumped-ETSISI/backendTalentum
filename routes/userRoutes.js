'use strict'

const express = require('express')
const api = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

api.post('/signup', userController.signUp)
api.post('/login', userController.login)
api.post('/offer/save', auth, userController.addOffers)
api.put('/update', auth, userController.updateUser)
api.get('/all', userController.getUsers)
api.get('/', auth, userController.getUser)

module.exports = api
