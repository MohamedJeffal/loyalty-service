const {
  validateCreatedRide,
  validateCompletedRide,
  buildCreatedData,
  buildCompletedData,
} = require('../models/ride')

const riderDao = require('../dao/rider')
const rideDao = require('../dao/ride')

exports.createRide = function createRide(db, { payload } = {}) {
  // Todo: check that rider_id exists
  if (validateCreatedRide(payload)) {
    return riderDao
      .findRiderbyId(db, payload.rider_id)
      .then(
        doesRiderExist =>
          doesRiderExist
            ? rideDao.createRide(db, buildCreatedData(payload))
            : Promise.reject(
                new Error(
                  `Ride creation failed: rider_id "${
                    payload.rider_id
                  }" not found.`,
                  payload,
                ),
              ),
      )
  }

  return Promise.reject(new Error('Ride creation failed: bad schema.', payload))
}

exports.completeRide = function completeRide(db, { payload } = {}) {
  if (validateCompletedRide(payload)) {
    return riderDao.findRiderbyId(db, payload.rider_id).then(doesRiderExist => {
      const completedRideData = buildCompletedData(payload)

      return doesRiderExist
        ? rideDao.updateCompletedRide(
            db,
            completedRideData._id,
            completedRideData.completed_amount,
            completedRideData.completed_at,
          )
        : Promise.reject(
            new Error(
              `Ride creation failed: rider_id "${payload.rider_id}" not found.`,
              payload,
            ),
          )
    })
  }
}
