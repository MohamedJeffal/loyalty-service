const { validateRider } = require('../models/rider')
const { createRider } = require('../dao/rider')

exports.riderSignup = function riderSignup(db, payload) {
  if (validateRider(payload)) {
    return createRider(db, payload)
  }

  return Promise.reject(new Error('User creation failed: bad schema.'))
}
