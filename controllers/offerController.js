'use strict'

const Offer = require ('../models/offer.js')
const User = require('../models/user')

function createOffer(req, res) {
    var offer = new Offer ({
        title: req.body.title,
        payout: req.body.payout,
        companyName: req.body.companyName,
        sector: req.body.sector,
        description: req.body.description,
        tasks: req.body.tasks,
        questions: req.body.questions
      })

      offer.save(function (err, offer) {
          if(err) return res.status(500).send(err.message);
          res.status(200).send(offer)
      })
}

function listOffers(req, res){
    Offer.find({})
    .populate("questions.question")
    .exec((err, offers) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!offers) return res.status(404).send({message: `No offers found: ${err}` })

        return res.status(200).send(offers)
    })
}

function findOffers(req, res){
    Offer.find(req.query, (err, offers) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!offers) return res.status(404).send({message: `No offers found: ${err}` })

        return res.status(200).send(offers)
    })
}

function getRandomOffer(req, res){
  User.findOne({_id: req.user})
  .exec((err, user) => {
      if(err) return res.status(500).send({message: `Error on request: ${err}` })
      if(!user) return res.status(404).send({message: `No user found: ${err}` })
      Offer.find({ _id: {$nin: user.offers} })
      .exec((err, offers) => {
          if(err) return res.status(500).send({message: `Error on request: ${err}` })
          if(!offers) return res.status(404).send({message: `No offers found: ${err}` })
          var rand = Math.floor(Math.random() * (offers.length - 0))
          console.log(offers[rand])
          return res.status(200).send(offers[rand])
        })
  })
}

module.exports = {
    createOffer,
    listOffers,
    findOffers,
    getRandomOffer
}
