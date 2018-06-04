const Joi = require('joi')

module.exports = schema => payload => {
  const { error } = Joi.validate(payload, schema)

  return error === undefined || error === null
}
