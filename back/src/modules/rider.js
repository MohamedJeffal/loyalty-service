const {
  validateRiderSignup,
  validateRiderPhoneNumberUpdate,
} = require('../models/rider')
const dao = require('../dao/rider')

exports.riderSignup = function riderSignup(db, { payload }) {
  if (validateRiderSignup(payload)) {
    return dao.createRider(db, payload)
  }

  return Promise.reject(
    new Error('Rider creation failed: bad schema.', payload),
  )
}

exports.updateRiderPhoneNumber = function updateRiderPhoneNumber(
  db,
  { payload },
) {
  if (validateRiderPhoneNumberUpdate(payload)) {
    return dao.updateRiderPhoneNumber(db, payload)
  }

  return Promise.reject(
    new Error('Rider phone number update failed: bad schema.', payload),
  )
}
