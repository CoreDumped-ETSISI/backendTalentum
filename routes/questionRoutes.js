'use strict'

const express = require ('express')
const api = express.Router()
const questionController = require ('../controllers/questionController.js')

api.get('/getQuestions', questionController.getQuestions)
api.get('/getCategoryQuestions', questionController.getCategoryQuestions)
api.post('/publishQuestion', questionController.publishQuestion)

module.exports = api
