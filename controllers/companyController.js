'use strict'

const Company = require ('../models/company.js')
const Offer = require ('../models/offer.js')

function getCompany (req, res){
    var companyName = req.params.companyName

    Company.find({name : companyName}, (err, company) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!company) return res.status(404).send({message: `No company found: ${err}` })

        return res.status(200).send(company)
    })
}

function createCompany (req, res) {
  var name = req.body.name
  var address = req.body.address
  var email = req.body.email
  var offers = []
  var company = new Company({
    name: name,
    address: address,
    email: email,
    offers: offers
  })
  company.save(function (err, company) {
      if(err) return res.status(500).send( err.message);
      res.status(200).send(company)
  })
}

function createOffer (req, res) {
    var companyName = req.params.companyName

    var receivedOffer = new Offer ({
        title: req.body.title,
        payout: req.body.payout,
        companyName: req.body.companyName,
        sector: req.body.sector,
        description: req.body.description,
        tasks: req.body.tasks
      })

    Company.find({name : companyName}, (err, company) => {
        if(err) return res.status(500).send({message: `Error at processing request: ${err}`})
        if (!company) return res.status(404).send({message: `No updatable company found: ${err}`})

        company.offers.push(receivedOffer)
        Company.findOneAndUpdate({name : company.name}, company, (err, companyUpdated) => {
            if(err) res.status(500).send({message: `{Error processing request: ${err}`})
            res.status(200).send(receivedOffer)
        })
    })
}

module.exports = {
    getCompany,
    createCompany,
    createOffer
}
