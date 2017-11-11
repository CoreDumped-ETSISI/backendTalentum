'use strict'

const express = require ('express')
const api = express.Router()
const companyController = require ('../controllers/companyController.js')

api.get('/getCompany', companyController.getCompany)
api.post('/createCompany', companyController.createCompany)
api.put('/createOffer', companyController.createOffer)