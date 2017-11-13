'use strict'

const express = require ('express')
const api = express.Router()
const companyController = require ('../controllers/companyController.js')

api.post('/create', companyController.createCompany)
api.get('/all', companyController.listCompanies)
api.get('/find', companyController.findCompany)

module.exports = api
