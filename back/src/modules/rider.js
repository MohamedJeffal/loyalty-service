const {
  validateRiderSignup,
  validateRiderPhoneNumberUpdate,
  buildInsertData,
} = require('../models/rider')

const riderDao = require('../dao/rider')
const rideDao = require('../dao/ride')

exports.riderSignup = function riderSignup(db, { payload } = {}) {
  if (validateRiderSignup(payload)) {
    return riderDao.createRider(db, buildInsertData(payload))
  }

  return Promise.reject(
    new Error('Rider creation failed: bad schema.', payload)
  )
}

exports.updateRiderPhoneNumber = function updateRiderPhoneNumber(
  db,
  { payload } = {}
) {
  if (validateRiderPhoneNumberUpdate(payload)) {
    return riderDao.updateRiderPhoneNumber(db, payload.id, payload.phone_number)
  }

  return Promise.reject(
    new Error('Rider phone number update failed: bad schema.', payload)
  )
}

exports.getRiderLoyaltyData = function getRiderLoyaltyData(db, riderId) {
  return rideDao.findCompletedRidesPointsAndCountByRiderId(db, riderId)
}
