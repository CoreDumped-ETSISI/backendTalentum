'use strict'

const Offer = require ('../models/offer')
const User = require('../models/user')
const Answer = require ('../models/answer')

function createOffer(req, res) {

    var offer = new Offer ({
        title: req.body.title,
        payout: req.body.payout,
        image: req.body.image,
        ubication: req.body.ubication,
        companyName: req.body.companyName,
        industries: req.body.sector,
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
    Offer.find(req.query)
    .populate("questions.question")
    .exec((err, offers) => {
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
      .populate("questions.question")
      .exec((err, offers) => {
          if(err) return res.status(500).send({message: `Error on request: ${err}` })
          if(offers.length == 0) return res.status(404).send({message: `No offers found: ${err}` })
          var rand = Math.floor(Math.random() * (offers.length - 0))
          console.log(offers[rand])
          return res.status(200).send(offers[rand])
        })
  })
}

function validateOffer (req, res) {
    var userID = req.user

    Offer.findOne({_id: req.query._id}, (err, offer) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}`})
        if(!offer) return res.status(404).send({message: `No offer was found: ${err}`})

        var choosability = 0
        var questionIDs = []
        var questions = offer.questions
        for(var i = 0; i < questions.length; i++){
            questionIDs.push(questions[i].question)
        }
            Answer.find({$and:[{questionId: {$in : questionIDs}}, {userId: userID}]}, (err, answers) => {
                if(err) return res.status(500).send({message: `Error on request: ${err}`})
                if(!answers) return res.status(404).send({message: `No answer related to selected question was found: ${err}`})

                for(var j = 0 ; j < questions.length; j++){
                    console.log("questions at j found: " + questions[j])
                    console.log("answers at j found: " + answers[j].answer)
                    if(questions[j].answer == (answers[j].answer))
                    choosability = choosability + (1/questions.length)*100
                }

                return res.status(200).send({choosability})
            })
        }
    )
}

module.exports = {
    createOffer,
    listOffers,
    findOffers,
    getRandomOffer,
    validateOffer
}
