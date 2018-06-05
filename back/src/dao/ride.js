const maxQueryLimit = require('../config/index').mongodb.maxQueryLimit

exports.COLLECTION_NAME = 'rides'

/**
 * Get ride collection reference from database one
 * @param {Object} db - Mongodb database reference
 * @returns {Promise<Object>} - rides collection reference
 */
function getRidesCol(db) {
  return db.collection(exports.COLLECTION_NAME)
}

/**
 * Insert a ride
 * @param {Object} db - Mongodb database reference
 * @param {Object} rideData - Formatted ride payload
 * @returns {Promise<boolean>} - Did the insertion succeed?
 */
exports.createRide = function createRide(db, rideData) {
  return getRidesCol(db)
    .insertOne(rideData)
    .then(r => r.insertedCount === 1)
}

/**
 * Update a ride to completion
 * @param {Object} db - Mongodb database reference
 * @param {Number} rideId - Ride identifier
 * @param {Number} completedAmount - Completed ride paid amount
 * @param {Date} completedAt - Completed ride date
 * @param {Number} earnedPoints - Loyalty points earned from completing this ride
 * @returns {Promise<boolean>} - Did the update succeed?
 */
exports.updateCompletedRide = function updateCompletedRide(
  db,
  rideId,
  completedAmount,
  completedAt,
  earnedPoints
) {
  return getRidesCol(db)
    .updateOne(
      { _id: rideId },
      {
        $set: {
          completed_amount: completedAmount,
          completed_at: completedAt,
          earned_points: earnedPoints,
        },
      }
    )
    .then(r => r.matchedCount === 1 && r.modifiedCount === 1)
}

/**
 *
 * Query completed rides count by rider id
 * @param {Object} db - Mongodb database reference
 * @param {Number} riderId - Rider identifier
 * @returns {Promise<Number>}
 */
exports.findCompletedRidesCountByRiderId = function findCompletedRidesCountByRiderId(
  db,
  riderId
) {
  return getRidesCol(db).count({
    rider_id: riderId,
    earned_points: { $exists: true },
  })
}

/**
 * Query last completed rides by rider id
 * @param {Object} db - Mongodb database reference
 * @param {Number} riderId - Rider identifier
 * @returns {Promise<Array<Object>|null>}
 */
exports.findCompletedRidesByRiderId = function findCompletedRidesByRiderId(
  db,
  riderId
) {
  return getRidesCol(db)
    .find({ rider_id: riderId, earned_points: { $exists: true } })
    .sort({ completed_at: -1 })
    .limit(maxQueryLimit)
    .toArray()
    .catch(err => {
      console.warn('* findCompletedRidesByRiderId - Query error: ', err)
      return null
    })
}

/**
 * Query completed rides count & earned points by rider id
 * @param {Object} db - Mongodb database reference
 * @param {Number} riderId - Rider identifier
 * @returns {Promise<Array<Object>|null>}
 */
exports.findCompletedRidesPointsAndCountByRiderId = function findCompletedRidesPointsAndCountByRiderId(
  db,
  riderId
) {
  return getRidesCol(db)
    .aggregate([
      { $match: { rider_id: riderId, earned_points: { $exists: true } } },
      {
        $group: {
          _id: null,
          completedRidesCount: { $sum: 1 },
          total_points: { $sum: '$earned_points' },
        },
      },
    ])
    .toArray()
    .then(aggregateResultCollection => {
      if (
        !Array.isArray(aggregateResultCollection) ||
        aggregateResultCollection.length === 0
      ) {
        // Todo: Log not found event
        return null
      }

      return aggregateResultCollection[0]
    })
    .catch(err => {
      console.warn(
        '* findCompletedRidesPointsAndCountByRiderId - Query error: ',
        err
      )
      return null
    })
}
