const {
  validateCreatedRide,
  validateCompletedRide,
  buildCreatedData,
  buildCompletedData,
} = require('../models/ride')

const riderDao = require('../dao/rider')
const rideDao = require('../dao/ride')

const loyaltyHelper = require('./loyalty')

exports.createRide = async function createRide(db, { payload } = {}) {
  if (validateCreatedRide(payload)) {
    const doesRiderExist = await riderDao.checkForRiderById(
      db,
      payload.rider_id
    )

    if (doesRiderExist) {
      return rideDao.createRide(db, buildCreatedData(payload))
    }

    throw new Error(
      `Ride creation failed: rider_id "${payload.rider_id}" not found.`,
      payload
    )
  }

  throw new Error('Ride creation failed: bad schema.', payload)
}

exports.completeRide = async function completeRide(db, { payload } = {}) {
  if (validateCompletedRide(payload)) {
    const doesRiderExist = await riderDao.checkForRiderById(
      db,
      payload.rider_id
    )

    if (doesRiderExist) {
      const completedRidesCount = await rideDao.findCompletedRidesCountByRiderId(
        db,
        payload.rider_id
      )

      const currentStatus = loyaltyHelper.computeLoyaltyStatus(
        completedRidesCount
      )

      const earnedPoints = loyaltyHelper.computeLoyaltyPoints(
        currentStatus,
        payload.amount
      )

      const completedRideData = buildCompletedData(payload, earnedPoints)

      return rideDao.updateCompletedRide(
        db,
        completedRideData._id,
        completedRideData.completed_amount,
        completedRideData.completed_at,
        completedRideData.earned_points
      )
    }

    throw new Error(
      `Ride completion update failed: rider_id "${
        payload.rider_id
      }" not found.`,
      payload
    )
  }

  throw new Error('Ride completion update failed: bad schema.', payload)
}
