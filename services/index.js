'use strict'

const jwt = require('jwt-simple')
const crypto = require('crypto')
const moment = require('moment')
const config = require('../config')

function generate(user) {
  const payload = {
    sub: encrypt(String(user._id)),
    iat: moment().unix(),
    exp: moment().add(config.EXP_DAYS, 'days').unix()
  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decode(token) {
  const decoded = new Promise((resolve, reject) => {
    try{
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      if(payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Your authorization has expired'
        })
      }
      var userId = decrypt(payload.sub)
      resolve(userId)
    } catch (err) {
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  })
  return decoded
}

function encrypt(text){
  var cipher = crypto.createCipher(config.algorithm, config.password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(config.algorithm, config.password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

module.exports = {
  generate,
  decode,
  encrypt,
  decrypt
}
