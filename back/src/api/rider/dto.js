const { OK } = require('http-status-codes')

const { SERVICE_TEMPLATE } = require('./constants')
const { computeLoyaltyStatus } = require('../../modules/loyalty')

exports.buildApiRiderLoyaltyResponse = function buildApiRiderLoyaltyResponse(
  riderId,
  loyaltyPayload
) {
  return {
    statusCode: OK,
    response: {
      template: SERVICE_TEMPLATE,
      id: riderId,
      completedRides: loyaltyPayload.completedRidesCount,
      loyaltyStatus: computeLoyaltyStatus(loyaltyPayload.completedRidesCount),
      totalPoints: loyaltyPayload.total_points,
    },
  }
}
