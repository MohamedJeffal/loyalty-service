const collectionName = 'riders'

exports.findRiderbyId = function findRiderbyId(db, riderId) {
  return db
    .collection(collectionName)
    .findOne({ _id: riderId })
    .then(r => r !== undefined && r !== null)
}

exports.createRider = function createRider(db, riderData) {
  // TODO: handle when rider already exists in db (same id) => code: 11000

  return db
    .collection(collectionName)
    .insertOne(riderData)
    .then(r => r.insertedCount === 1)
}

exports.updateRiderPhoneNumber = function updateRiderPhoneNumber(
  db,
  riderId,
  riderPhoneNumber,
) {
  // TODO: check whether rider already exists in db (same id)

  return db
    .collection(collectionName)
    .updateOne({ _id: riderId }, { $set: { phone_number: riderPhoneNumber } })
    .then(r => r.matchedCount === 1 && r.modifiedCount === 1)
}
