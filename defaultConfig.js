let userConfig = {}
try {
  userConfig = require('./config')
} catch (e) {
  console.log("No configuration file was found.")
}

const config = Object.assign ({}, {
  aatUsername: '',
  aatPassword: '',
}, userConfig)

module.exports = config;