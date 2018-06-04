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
) {
  // TODO: check whether ride already exists in db (same id)

  return db
    .collection(collectionName)
    .updateOne(
      { _id: rideId },
      {
        $set: { completed_amount: completedAmount, completed_at: completedAt },
      },
    )
    .then(r => r.matchedCount === 1 && r.modifiedCount === 1)
}
