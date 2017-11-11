'use strict'

const Question = require ('../models/question.js')

function getQuestions(req, res){
    
    Question.find({}, (err, users) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!users) return res.status(404).send({message: `No questions found: ${err}` })

        return res.status(200).send(users)
    })
}

