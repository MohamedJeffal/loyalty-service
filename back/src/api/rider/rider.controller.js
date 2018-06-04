'use strict'

const {
  getRiderLoyaltyData,
  getRiderCompletedRidesData,
} = require('../../modules/rider')

const {
  buildApiRiderNotFoundResponse,
  buildApiRiderBadRequest,
} = require('./error')

const { RIDER_TEMPLATE, RIDER_RIDES_TEMPLATE } = require('./constants')

const {
  buildApiRiderLoyaltyResponse,
  buildRiderRidesResponse,
} = require('./dto')

/**
 * Get rider loyalty data by id
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function getRiderLoyalty(req, res) {
  const riderId = parseInt(req.params.id)

  if (Number.isNaN(riderId)) {
    const { statusCode, response } = buildApiRiderBadRequest(RIDER_TEMPLATE)

    return res.status(statusCode).send(response)
  }

  return getRiderLoyaltyData(req.context.db, riderId).then(result => {
    const { statusCode, response } =
      result !== null
        ? buildApiRiderLoyaltyResponse(riderId, result)
        : buildApiRiderNotFoundResponse(RIDER_TEMPLATE, riderId)

    return res.status(statusCode).send(response)
  })
}

/**
 * Get rider completed rides by id
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function getRiderCompletedRides(req, res) {
  const riderId = parseInt(req.params.id)

  if (Number.isNaN(riderId)) {
    const { statusCode, response } = buildApiRiderBadRequest(
      RIDER_RIDES_TEMPLATE
    )

    return res.status(statusCode).send(response)
  }

  return getRiderCompletedRidesData(req.context.db, riderId).then(result => {
    const { statusCode, response } =
      Array.isArray(result) && result.length > 0
        ? buildRiderRidesResponse(riderId, result)
        : buildApiRiderNotFoundResponse(RIDER_RIDES_TEMPLATE, riderId)

    return res.status(statusCode).send(response)
  })
}

module.exports = {
  getRiderLoyalty,
  getRiderCompletedRides,
}
