'use strict'

const express = require ('express')
const api = express.Router()
const offerController = require ('../controllers/offerController.js')
const auth = require('../middlewares/auth')

api.post('/create', offerController.createOffer)
api.get('/all', offerController.listOffers)
api.get('/find', offerController.findOffers)
api.get('/random', auth, offerController.getRandomOffer)
api.get('/validate', auth, offerController.validateOffer)

module.exports = api
