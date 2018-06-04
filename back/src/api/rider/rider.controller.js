'use strict'

const { getRiderLoyaltyData } = require('../../modules/rider')

const {
  buildApiRiderNotFoundResponse,
  buildApiRiderBadRequest,
} = require('./error')
const { buildApiRiderLoyaltyResponse } = require('./dto')

/**
 * Get rider loyalty data by id
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function getRiderLoyalty(req, res) {
  const riderId = parseInt(req.params.id)

  if (Number.isNaN(riderId)) {
    const { statusCode, response } = buildApiRiderBadRequest()

    return res.status(statusCode).send(response)
  }

  return getRiderLoyaltyData(req.context.db, riderId).then(result => {
    const { statusCode, response } =
      result !== null
        ? buildApiRiderLoyaltyResponse(riderId, result)
        : buildApiRiderNotFoundResponse(riderId)

    return res.status(statusCode).send(response)
  })
}

module.exports = {
  getRiderLoyalty,
}
