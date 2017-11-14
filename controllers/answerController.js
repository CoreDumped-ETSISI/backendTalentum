'use strict'

const Answer = require ('../models/answer.js')
const User = require('../models/user')

function createAnswer(req, res) {
    var answer = new Answer ({
        userId: req.user,
        answer: req.body.answer,
        questionId: req.body.questionId
      })

      answer.save(function (err, answer) {
          if(err) return res.status(500).send(err.message);
          User.update({_id:req.user},{$inc:{points:10}},(err, user) => {
            res.status(200).send(answer)
          })
      })
}

function listAnswers(req, res){
    Answer.find({userId: req.user})
    .populate("questionId")
    .exec((err, answers) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!answers) return res.status(404).send({message: `No answers found: ${err}` })

        return res.status(200).send(answers)
    })
}

function findAnswers(req, res){
    Answer.find({ $and: [{userId: req.user}, req.query]}, (err, answers) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!answers) return res.status(404).send({message: `No answers found: ${err}` })

        return res.status(200).send(answers)
    })
}

module.exports = {
    createAnswer,
    listAnswers,
    findAnswers
}
