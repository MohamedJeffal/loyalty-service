const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes')

const { SERVICE_TEMPLATE } = require('./constants')

exports.buildApiRiderBadRequest = function buildApiRiderBadRequest() {
  return {
    statusCode: BAD_REQUEST,
    template: SERVICE_TEMPLATE,
    message: 'Invalid request.',
  }
}

exports.buildApiRiderNotFoundResponse = function buildApiRiderNotFoundResponse(
  riderId
) {
  return {
    statusCode: NOT_FOUND,
    response: {
      template: SERVICE_TEMPLATE,
      message: `Rider with id ${riderId} not found.`,
    },
  }
}
