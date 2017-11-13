'use strict'

const express = require ('express')
const api = express.Router()
const questionController = require ('../controllers/questionController.js')

api.post('/create', questionController.createQuestion)
api.get('/all', questionController.listQuestions)
api.get('/find', questionController.findQuestions)

module.exports = api
