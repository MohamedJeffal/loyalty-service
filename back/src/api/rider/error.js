const { NOT_FOUND, BAD_REQUEST } = require('http-status-codes')

exports.buildApiRiderBadRequest = function buildApiRiderBadRequest(template) {
  return {
    statusCode: BAD_REQUEST,
    response: {
      template,
      message: 'Invalid request: bad rider id.',
    },
  }
}

exports.buildApiRiderNotFoundResponse = function buildApiRiderNotFoundResponse(
  template,
  riderId
) {
  return {
    statusCode: NOT_FOUND,
    response: {
      template,
      message: `Rider with id ${riderId} not found.`,
    },
  }
}
