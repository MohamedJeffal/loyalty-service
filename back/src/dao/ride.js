const collectionName = 'rides'

exports.createRide = function createRide(db, rideData) {
  // TODO: handle when ride already exists in db (same id) => code: 11000

  return db
    .collection(collectionName)
    .insertOne(rideData)
    .then(r => r.insertedCount === 1)
}

exports.updateCompletedRide = function updateCompletedRide(
  db,
  rideId,
  completedAmount,
  completedAt,
  earnedPoints
) {
  // TODO: check whether ride already exists in db (same id)

  return db
    .collection(collectionName)
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

exports.findCompletedRidesCountByRiderId = function findCompletedRidesCountByRiderId(
  db,
  riderId
) {
  return db
    .collection(collectionName)
    .count({ rider_id: riderId, earned_points: { $exists: true } })
}

exports.findCompletedRidesByRiderId = function findCompletedRidesByRiderId(
  db,
  riderId
) {
  return db
    .collection(collectionName)
    .find({ rider_id: riderId, earned_points: { $exists: true } })
    .toArray()
}

exports.findCompletedRidesPointsAndCountByRiderId = function findCompletedRidesPointsAndCountByRiderId(
  db,
  riderId
) {
  return db
    .collection(collectionName)
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
        // Log not found event
        return null
      }

      return aggregateResultCollection[0]
    })
}
