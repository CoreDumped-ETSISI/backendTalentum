'use strict'

const Question = require ('../models/question.js')

function getQuestions(req, res){
    Question.find({}, (err, question) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!question) return res.status(404).send({message: `No questions found: ${err}` })

        return res.status(200).send(question)
    })
}

function getCategoryQuestions (req, res){
    var category = req.params.category

    Question.find({category : category}, (err, questions) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!questions) return res.status(404).send({message: `No questions found: ${err}` })

        return res.status(200).send(questions)
    })
}


function publishQuestion (req, res) {
    let question: new Question ({
        text: req.body.text
        image: req.body.image
        category: req.body.category
        options: req.body.options
      })

    question.save(function (err, question) {
        if(err) return res.status(500).send(err.message);
        res.status(200).send(question)
    })
}

module.exports = {
    getQuestions,
    getCategoryQuestions,
    publishQuestion
}
