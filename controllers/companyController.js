'use strict'

const Company = require ('../models/company.js')

function createCompany (req, res) {
  var name = req.body.name
  var address = req.body.address
  var email = req.body.email
  var company = new Company({
    name: name,
    address: address,
    email: email
  })
  company.save(function (err, company) {
      if(err) return res.status(500).send(err.message);
      res.status(200).send(company)
  })
}

function listCompanies (req, res){
    Company.find({}, (err, companies) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!companies) return res.status(404).send({message: `No company found: ${err}` })

        return res.status(200).send(companies)
    })
}

function findCompany (req, res){
    Company.find(req.query, (err, company) => {
        if(err) return res.status(500).send({message: `Error on request: ${err}` })
        if(!company) return res.status(404).send({message: `No company found: ${err}` })

        return res.status(200).send(company)
    })
}

module.exports = {
    findCompany,
    listCompanies,
    createCompany
}
