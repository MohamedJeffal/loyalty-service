const collectionName = 'riders'

exports.createRider = function createRider(db, riderData) {
  // TODO: check whether rider already exists in db (same id)

  return db
    .collection(collectionName)
    .insertOne(riderData)
    .then(r => r.insertedCount === 1)
}

exports.updateRiderPhoneNumber = function updateRiderPhoneNumber(
  db,
  riderData,
) {
  // TODO: check whether rider already exists in db (same id)

  return db
    .collection(collectionName)
    .updateOne(
      { id: riderData.id },
      { $set: { phone_number: riderData.phone_number } },
    )
    .then(r => r.matchedCount === 1 && r.modifiedCount === 1)
}
