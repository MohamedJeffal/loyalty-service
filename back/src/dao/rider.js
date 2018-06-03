const collectionName = 'riders'

exports.createRider = function createRider(db, userData) {
  return db
    .collection(collectionName)
    .insertOne(userData)
    .then(r => r.insertedCount === 1)
}
