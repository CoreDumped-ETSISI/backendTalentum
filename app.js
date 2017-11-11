'use strict'

const bodyParser  = require("body-parser")
const cors = require("cors")
const express = require("express")
const app = express()
const questionRoutes = require('./routes/questionRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/question', questionRoutes)
app.use('/user', userRoutes)

module.exports = app;
