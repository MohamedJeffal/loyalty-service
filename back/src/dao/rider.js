exports.COLLECTION_NAME = 'riders'

function getRidersCol(db) {
  return db.collection(exports.COLLECTION_NAME)
}

/**
 * Query rider by its identifier
 * @param {Object} db - Mongodb database reference
 * @param {Number} riderId - Rider identifier
 * @returns {Promise<Object|undefined|null>}
 */
exports.findRiderById = function findRiderById(db, riderId) {
  return getRidersCol(db).findOne({ _id: riderId })
}

/**
 * Check whether rider exists by its identifier
 * @param {Object} db - Mongodb database reference
 * @param {Number} riderId - Rider identifier
 * @returns {Promise<boolean>} - Does the rider exist?
 */
exports.checkForRiderById = function(db, riderId) {
  return exports
    .findRiderById(db, riderId)
    .then(r => r !== undefined && r !== null)
}

/**
 *
 * @param {Object} db - Mongodb database reference
 * @param {Object} riderData - Formatted rider payload
 * @returns {Promise<boolean>} - Did the creation succeed?
 */
exports.createRider = function createRider(db, riderData) {
  return getRidersCol(db)
    .insertOne(riderData)
    .then(r => r.insertedCount === 1)
}

/**
 * Update rider phone number by rider id
 * @param {Object} db - Mongodb database reference
 * @param {Number} riderId - Rider identifier
 * @param {String} riderPhoneNumber - Rider phone number to update with
 * @returns {Promise<boolean>} - Did the update succeed?
 */
exports.updateRiderPhoneNumber = function updateRiderPhoneNumber(
  db,
  riderId,
  riderPhoneNumber
) {
  return getRidersCol(db)
    .updateOne({ _id: riderId }, { $set: { phone_number: riderPhoneNumber } })
    .then(r => r.matchedCount === 1 && r.modifiedCount === 1)
}
