'use strict'

const bodyParser  = require("body-parser")
const cors = require("cors")
const express = require("express")
const app = express()

const offerRoutes = require('./routes/offerRoutes')
const answerRoutes = require('./routes/answerRoutes')
const companyRoutes = require('./routes/companyRoutes')
const questionRoutes = require('./routes/questionRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/answer', answerRoutes)
app.use('/offer', offerRoutes)
app.use('/company', companyRoutes)
app.use('/question', questionRoutes)
app.use('/user', userRoutes)

module.exports = app;
