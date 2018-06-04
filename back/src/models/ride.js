const Joi = require('joi')
const validatePayload = require('./validatePayload')

const schema = Joi.object({
  id: Joi.number().required(),
  amount: Joi.number()
    .positive()
    .required(),
  rider_id: Joi.number().required(),
})

exports.buildCreatedData = function buildCreatedData(ridePayload) {
  return {
    _id: ridePayload.id,
    created_amount: ridePayload.amount,
    rider_id: ridePayload.rider_id,
    created_at: new Date(),
  }
}

exports.buildCompletedData = function buildCompletedData(ridePayload) {
  return {
    _id: ridePayload.id,
    completed_amount: ridePayload.amount,
    rider_id: ridePayload.rider_id,
    completed_at: new Date(),
  }
}

exports.validateCreatedRide = validatePayload(schema)
exports.validateCompletedRide = validatePayload(schema)
