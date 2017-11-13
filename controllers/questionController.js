'use strict'

const Question = require ('../models/question.js')

function createQuestion(req, res) {
  var options = {option1: req.body.option1, option2: req.body.option2,
                 option3: req.body.option3, option4: req.body.option4}
    var question = new Question ({
        text: req.body.text,
        image: req.body.image,
        category: req.body.category,
        options: options
      })

    question.save(function (err, question) {
        if(err) return res.status(500).send(err.message);
        res.status(200).send(question)
    })
}

function listQuestions(req, res){
    Question.find({}, (err, question) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!question) return res.status(404).send({message: `No questions found: ${err}` })

        return res.status(200).send(question)
    })
}

function findQuestions(req, res){
    Question.find(req.query, (err, questions) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!questions) return res.status(404).send({message: `No questions found: ${err}` })

        return res.status(200).send(questions)
    })
}

function userOffer(req, res){
  Question.find({}, (err, question) => {
      if(err) return res.status(500).send({message: `Error on request: ${err}` })
      if(!question) return res.status(404).send({message: `No questions found: ${err}` })

      return res.status(200).send(question)
  })
}

module.exports = {
    listQuestions,
    findQuestions,
    createQuestion
}
