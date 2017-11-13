'use strict'

const express = require ('express')
const api = express.Router()
const answerController = require ('../controllers/answerController.js')
const auth = require('../middlewares/auth')

api.post('/create', auth, answerController.createAnswer)
api.get('/all', auth, answerController.listAnswers)
api.get('/find', auth, answerController.findAnswers)

module.exports = api
