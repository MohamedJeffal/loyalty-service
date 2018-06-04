const { OK } = require('http-status-codes')

const { RIDER_TEMPLATE, RIDER_RIDES_TEMPLATE } = require('./constants')
const { computeLoyaltyStatus } = require('../../modules/loyalty')

exports.buildApiRiderLoyaltyResponse = function buildApiRiderLoyaltyResponse(
  riderId,
  loyaltyPayload
) {
  return {
    statusCode: OK,
    response: {
      template: RIDER_TEMPLATE,
      id: riderId,
      completedRides: loyaltyPayload.completedRidesCount,
      loyaltyStatus: computeLoyaltyStatus(loyaltyPayload.completedRidesCount),
      totalPoints: loyaltyPayload.total_points,
    },
  }
}

exports.buildRiderRidesResponse = function buildRiderRidesResponse(
  riderId,
  ridesPayload
) {
  return {
    statusCode: OK,
    response: {
      template: RIDER_RIDES_TEMPLATE,
      riderId,
      rides: ridesPayload.map(buidRiderRideResponse),
    },
  }
}

function buidRiderRideResponse(ridePayload) {
  return {
    id: ridePayload._id,
    createdAt: ridePayload.created_at,
    // Todo: round to 2 decimals
    initialPrice: `${ridePayload.created_amount}€`,
    // Display as unix timestamp?
    completedAt: ridePayload.completed_at,
    // Todo: round to 2 decimals
    completedPrice: `${ridePayload.completed_amount}€`,
    earnedPoints: ridePayload.earned_points,
  }
}
